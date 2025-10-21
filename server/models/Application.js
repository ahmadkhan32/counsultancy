const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  personalInfo: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    nationality: { type: String, required: true },
    passportNumber: { type: String, required: true },
    passportExpiry: { type: Date, required: true }
  },
  visaInfo: {
    country: { type: String, required: true },
    visaType: { type: String, required: true },
    purpose: { type: String, required: true },
    intendedArrivalDate: { type: Date },
    duration: { type: String }
  },
  documents: [{
    name: String,
    filePath: String,
    uploadedAt: { type: Date, default: Date.now }
  }],
  status: {
    type: String,
    enum: ['pending', 'under-review', 'approved', 'rejected', 'completed'],
    default: 'pending'
  },
  notes: String,
  submittedAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  timestamps: true
});

module.exports = mongoose.model('Application', applicationSchema);
