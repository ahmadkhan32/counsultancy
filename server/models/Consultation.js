const mongoose = require('mongoose');

const consultationSchema = new mongoose.Schema({
  clientInfo: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true }
  },
  consultationDetails: {
    visaType: { type: String, required: true },
    country: { type: String, required: true },
    preferredDate: { type: Date, required: true },
    preferredTime: { type: String, required: true },
    message: String,
    consultationType: {
      type: String,
      enum: ['in-person', 'online', 'phone'],
      default: 'online'
    }
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
  },
  adminNotes: String,
  scheduledAt: Date,
  createdAt: { type: Date, default: Date.now }
}, {
  timestamps: true
});

module.exports = mongoose.model('Consultation', consultationSchema);
