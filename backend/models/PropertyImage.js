const mongoose = require('mongoose');

const PropertyImageSchema = new mongoose.Schema({
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property',
    required: true
  },
  url: {
    type: String,
    required: true
  },
  filename: {
    type: String,
    required: true
  },
  isPrimary: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Ensure only one primary image per property
PropertyImageSchema.index(
  { property: 1, isPrimary: 1 },
  { unique: true, partialFilterExpression: { isPrimary: true } }
);

module.exports = mongoose.model('PropertyImage', PropertyImageSchema);