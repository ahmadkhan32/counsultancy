const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  clientName: { type: String, required: true },
  clientLocation: String,
  visaType: String,
  country: String,
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  testimonial: { type: String, required: true },
  clientPhoto: String,
  isApproved: { type: Boolean, default: false },
  isFeatured: { type: Boolean, default: false }
}, {
  timestamps: true
});

module.exports = mongoose.model('Testimonial', testimonialSchema);
