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
    subject: '✅ Appointment Confirmed - Ayura Healthcare',
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

// ── POST /api/appointments/book ──
router.post('/book', authMiddleware, async (req, res) => {
  try {
    const { doctor, date, time, reason, patientEmail, patientName } = req.body;

    if (!doctor || !date || !time) {
      return res.status(400).json({ error: 'Doctor, date and time are required' });
    }

    const appointment = await Appointment.create({
      patientId: req.user.id,
