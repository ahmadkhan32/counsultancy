const mongoose = require('mongoose');

const visaTypeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: {
    type: String,
    enum: ['student', 'work', 'tourist', 'immigration', 'business', 'transit'],
    required: true
  },
  countries: [{ type: String }],
  description: String,
  eligibility: [String],
  requiredDocuments: [String],
  processingTime: String,
  fees: {
    consultation: Number,
    application: Number,
    currency: { type: String, default: 'USD' }
  },
  validity: String,
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('VisaType', visaTypeSchema);
