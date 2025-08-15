const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorResponse');

// Admin login
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse('Please provide email and password', 400));
  }

  try {
    // Verify admin credentials (from .env)
    if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
      return next(new ErrorResponse('Invalid credentials', 401));
    }

    // Create JWT token
    const token = jwt.sign(
      { id: process.env.ADMIN_ID || 'admin' }, // Payload
      process.env.JWT_SECRET, // Secret key
      { expiresIn: process.env.JWT_EXPIRE || '1d' } // Expiration
    );

    res.status(200).json({
      success: true,
      token
    });
  } catch (err) {
    next(err);
  }
};

// Get current admin
exports.getMe = async (req, res, next) => {
  res.status(200).json({
    success: true,
    data: {
      id: req.user.id,
      email: process.env.ADMIN_EMAIL,
      role: 'admin'
    }
  });
};
