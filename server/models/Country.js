const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  code: { type: String, required: true, unique: true },
  flag: String,
  description: String,
  popularVisaTypes: [String],
  processingTime: String,
  generalRequirements: [String],
  isActive: { type: Boolean, default: true },
  featured: { type: Boolean, default: false }
}, {
  timestamps: true
});

module.exports = mongoose.model('Country', countrySchema);
