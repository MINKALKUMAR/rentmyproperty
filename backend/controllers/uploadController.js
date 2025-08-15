const ErrorResponse = require('../utils/errorResponse');
const Property = require('../models/Property');
const PropertyImage = require('../models/PropertyImage');
const path = require('path');
const fs = require('fs');
const util = require('util');
const unlink = util.promisify(fs.unlink);

// Use the bucket from your firebase config
const { bucket } = require('../config/firebase');

exports.uploadPropertyImage = async (req, res, next) => {
  if (!req.files || !req.files.file) {
    return next(new ErrorResponse('No file uploaded', 400));
  }

  const file = req.files.file;
  const tempFilePath = file.tempFilePath;

  try {
    // Validate file
    if (!file.mimetype.startsWith('image')) {
      throw new ErrorResponse('Only image files are allowed', 400);
    }

    // Process file upload to Firebase
    const filename = `properties/${req.params.id}/${Date.now()}${path.extname(file.name)}`;
    const blob = bucket.file(filename);

    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: file.mimetype
      }
    });

    blobStream.on('error', (err) => {
      throw new ErrorResponse(`Upload error: ${err.message}`, 500);
    });

    blobStream.on('finish', async () => {
      try {
        // Make the file public
        await blob.makePublic();

        // Create image record
        const image = await PropertyImage.create({
          property: req.params.id,
          filename: filename,
          url: `https://storage.googleapis.com/${bucket.name}/${filename}`,
          size: file.size,
          mimetype: file.mimetype
        });

        // Add to property
        await Property.findByIdAndUpdate(
          req.params.id,
          { $push: { images: image._id } }
        );

        // Clean up temp file
        if (tempFilePath && fs.existsSync(tempFilePath)) {
          await unlink(tempFilePath);
        }

        res.status(200).json({
          success: true,
          data: image
        });
      } catch (err) {
        next(err);
      }
    });

    blobStream.end(file.data);
  } catch (err) {
    // Clean up temp file if it exists
    if (tempFilePath && fs.existsSync(tempFilePath)) {
      await unlink(tempFilePath).catch(console.error);
    }
    next(err);
  }
};
// Delete property image (unchanged)
exports.deletePropertyImage = async (req, res, next) => {
  try {
    const propertyImage = await PropertyImage.findOne({
      _id: req.params.imageId,
      property: req.params.id
    });

    if (!propertyImage) {
      return next(
        new ErrorResponse(`Image not found with id of ${req.params.imageId}`, 404)
      );
    }

    // Remove from Firebase Storage
    await bucket.file(propertyImage.filename).delete();

    // Remove from property's images array
    await Property.findByIdAndUpdate(req.params.id, {
      $pull: { images: propertyImage._id }
    });

    await propertyImage.remove();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};