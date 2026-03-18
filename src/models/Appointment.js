const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  patientName: { type: String, required: true },
  patientEmail: { type: String, required: true },
  doctor: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  reason: { type: String, default: 'General consultation' },
  status: { type: String, default: 'confirmed' },
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);
