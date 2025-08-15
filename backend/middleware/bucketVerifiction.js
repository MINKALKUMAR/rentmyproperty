// middleware/verifyBucket.js
const { bucket } = require('../config/firebase');

exports.verifyBucket = async (req, res, next) => {
  try {
    const [exists] = await bucket.exists();
    if (!exists) {
      console.error('Bucket verification failed:', bucket.name);
      return res.status(500).json({
        success: false,
        error: `Storage bucket ${bucket.name} not found`
      });
    }
    next();
  } catch (err) {
    console.error('Bucket check error:', err);
    res.status(500).json({
      success: false,
      error: 'Storage service unavailable'
    });
  }
};