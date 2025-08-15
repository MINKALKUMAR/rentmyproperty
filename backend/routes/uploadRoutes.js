// const express = require('express');
// const path = require('path');
// const fs = require('fs');
// const {
//   uploadPropertyImage,
//   deletePropertyImage
// } = require('../controllers/uploadController');
// const { protect } = require('../middleware/auth');
// const fileUpload = require('express-fileupload');

// const router = express.Router();

// // Configure file upload once with proper options
// router.use(fileUpload({
//   useTempFiles: true,
//   tempFileDir: '/tmp/',
//   limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
//   abortOnLimit: true
// }));

// router.route('/:id/photo')
//   .put(protect, uploadPropertyImage);

// router.route('/:id/images/:imageId')
//   .delete(protect, deletePropertyImage);

// // Test endpoint
// router.post('/test-upload', protect, (req, res) => {
//   console.log('Request headers:', req.headers);
  
//   if (!req.files || !req.files.file) {
//     console.log('No file detected');
//     return res.status(400).json({ error: 'No file received' });
//   }

//   const file = req.files.file;
//   const uploadDir = path.join(__dirname, '../../test_uploads');
  
//   // Ensure directory exists
//   if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir, { recursive: true });
//   }

//   const savePath = path.join(uploadDir, file.name);
  
//   file.mv(savePath, (err) => {
//     if (err) {
//       console.error('Save error:', err);
//       return res.status(500).json({ error: 'Failed to save file' });
//     }
//     res.json({ 
//       success: true,
//       file: {
//         name: file.name,
//         size: file.size,
//         type: file.mimetype,
//         path: savePath
//       }
//     });
//   });
// });

// module.exports = router;