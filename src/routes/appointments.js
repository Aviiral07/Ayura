const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Appointment = require('../models/Appointment');
const authMiddleware = require('../middleware/auth');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

async function sendConfirmationEmail(appointment) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) return;
  const mailOptions = {
    from: `"Ayura Healthcare" <${process.env.EMAIL_USER}>`,
    to: appointment.patientEmail,
    subject: 'Appointment Confirmed - Ayura Healthcare',
    html: `<h2>Hello ${appointment.patientName}!</h2>
           <p>Your appointment with <strong>${appointment.doctor}</strong> is confirmed.</p>
           <p>Date: ${appointment.date} | Time: ${appointment.time}</p>
           <p>Reason: ${appointment.reason}</p>`
  };
  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.error('Email failed:', err.message);
  }
}

router.post('/book', authMiddleware, async (req, res) => {
  try {
    const { doctor, date, time, reason, patientEmail, patientName } = req.body;
    if (!doctor || !date || !time) {
      return res.status(400).json({ error: 'Doctor, date and time are required' });
    }
    const appointment = await Appointment.create({
      patientId: req.user.id,
      patientName: patientName || req.user.name,
      patientEmail: patientEmail || req.user.email,
      doctor,
      date,
      time,
      reason: reason || 'General consultation',
      status: 'confirmed',
    });
    sendConfirmationEmail(appointment);
    res.status(201).json({
      message: 'Appointment booked successfully!',
      appointment: {
        id: appointment._id,
        doctor: appointment.doctor,
        date: appointment.date,
        time: appointment.time,
        reason: appointment.reason,
        status: appointment.status,
      }
    });
  } catch (err) {
    console.error('Book appointment error:', err);
    res.status(500).json({ error: 'Failed to book appointment' });
  }
});

router.get('/my', authMiddleware, async (req, res) => {
  try {
    const myAppointments = await Appointment.find({ patientId: req.user.id }).sort({ createdAt: -1 });
    res.json({ appointments: myAppointments });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
});

router.get('/all', authMiddleware, async (req, res) => {
  if (req.user.role !== 'doctor') {
    return res.status(403).json({ error: 'Doctors only' });
  }
  try {
    const all = await Appointment.find().sort({ createdAt: -1 });
    res.json({ appointments: all });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
});

module.exports = router;
