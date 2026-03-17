const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const nodemailer = require('nodemailer');
const { appointments } = require('../data/store');
const authMiddleware = require('../middleware/auth');

// ── Email transporter ──
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS  // Gmail App Password
  }
});

async function sendConfirmationEmail(appointment) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) return;

  const mailOptions = {
    from: `"Ayura Healthcare" <${process.env.EMAIL_USER}>`,
    to: appointment.patientEmail,
    subject: '✅ Appointment Confirmed - Ayura Healthcare',
    html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body{font-family:Arial,sans-serif;background:#f4f4f4;margin:0;padding:0;}
    .container{max-width:600px;margin:30px auto;background:white;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.1);}
    .header{background:linear-gradient(135deg,#0a9e8a,#12c4ab);padding:40px 30px;text-align:center;}
    .header h1{color:white;margin:0;font-size:26px;}
    .header p{color:rgba(255,255,255,0.85);margin:8px 0 0;}
    .body{padding:35px 30px;}
    .greeting{font-size:17px;color:#2c3e50;margin-bottom:20px;}
    .detail-box{background:#f8fffe;border:1px solid #d0f0ec;border-radius:10px;padding:20px;margin:20px 0;}
    .detail-row{display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid #e8f5f3;}
    .detail-row:last-child{border-bottom:none;}
    .detail-label{color:#7f8c8d;font-size:13px;text-transform:uppercase;}
    .detail-value{color:#2c3e50;font-weight:600;font-size:14px;}
    .note{background:#fff9e6;border-left:4px solid #f39c12;padding:15px;border-radius:0 8px 8px 0;margin:20px 0;font-size:14px;color:#7f6000;}
    .personal-note{background:linear-gradient(135deg,rgba(10,158,138,0.08),rgba(18,196,171,0.05));border:1px solid rgba(10,158,138,0.2);border-radius:12px;padding:20px 25px;margin-top:20px;}
    .footer{background:#0b1e34;padding:25px 30px;text-align:center;}
    .footer p{color:rgba(255,255,255,0.5);font-size:13px;margin:5px 0;}
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div style="font-size:40px;">🏥</div>
      <h1>Ayura Healthcare</h1>
      <p>Your appointment has been confirmed</p>
    </div>
    <div class="body">
      <div class="greeting">Hello <strong>${appointment.patientName}</strong>,</div>
      <p style="color:#555;line-height:1.7;">Your appointment has been successfully booked. Please find your details below:</p>
      <div class="detail-box">
        <div class="detail-row">
          <span class="detail-label">👨‍⚕️ Doctor</span>
          <span class="detail-value">${appointment.doctor}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">📅 Date</span>
          <span class="detail-value">${appointment.date}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">⏰ Time</span>
          <span class="detail-value">${appointment.time}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">📝 Reason</span>
          <span class="detail-value">${appointment.reason || 'General consultation'}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">🆔 Booking ID</span>
          <span class="detail-value">${appointment.id.slice(0, 8).toUpperCase()}</span>
        </div>
      </div>
      <div class="note">⚠️ Please arrive <strong>10 minutes early</strong> and carry a valid ID and any previous medical records.</div>
      <div class="personal-note">
        <p style="color:#2c3e50;font-size:15px;line-height:1.8;margin:0;">
          Dear <strong>${appointment.patientName}</strong>, 🌿<br><br>
          Wishing you a <strong style="color:#0a9e8a;">speedy recovery</strong> and good health ahead.
          Your trust in Ayura means the world to us — we are committed to making your healthcare
          experience safe, verified, and seamless.<br><br>
          <em style="color:#555;">Get well soon! 💚</em><br><br>
          Warm regards,<br>
          <strong style="color:#0a9e8a;font-size:16px;">Aviral</strong><br>
          <span style="color:#7f8c8d;font-size:13px;">Founder, Ayura Healthcare Platform</span>
        </p>
      </div>
    </div>
    <div class="footer">
      <p>© 2025 <strong style="color:white;">Ayura</strong> Healthcare Platform</p>
      <p>Questions? contact us at support@ayura.in</p>
    </div>
  </div>
</body>
</html>`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Confirmation email sent to ${appointment.patientEmail}`);
  } catch (err) {
    console.error('Email send failed:', err.message);
  }
}

// ── POST /api/appointments/book ── (protected)
router.post('/book', authMiddleware, async (req, res) => {
  try {
    const { doctor, date, time, reason, patientEmail, patientName } = req.body;

    if (!doctor || !date || !time) {
      return res.status(400).json({ error: 'Doctor, date and time are required' });
    }

    const appointment = {
      id: uuidv4(),
      patientId: req.user.id,
      patientName: patientName || req.user.name,
      patientEmail: patientEmail || req.user.email,
      doctor,
      date,
      time,
      reason: reason || 'General consultation',
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    appointments.push(appointment);

    // Send email (non-blocking)
    sendConfirmationEmail(appointment);

    res.status(201).json({
      message: 'Appointment booked successfully!',
      appointment: {
        id: appointment.id,
        doctor: appointment.doctor,
        date: appointment.date,
        time: appointment.time,
        reason: appointment.reason,
        status: appointment.status,
        bookingId: appointment.id.slice(0, 8).toUpperCase()
      }
    });

  } catch (err) {
    console.error('Book appointment error:', err);
    res.status(500).json({ error: 'Failed to book appointment' });
  }
});

// ── GET /api/appointments/my ── (protected)
router.get('/my', authMiddleware, (req, res) => {
  const myAppointments = appointments
    .filter(a => a.patientId === req.user.id)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  res.json({ appointments: myAppointments });
});

// ── GET /api/appointments/all ── (doctor only)
router.get('/all', authMiddleware, (req, res) => {
  if (req.user.role !== 'doctor') {
    return res.status(403).json({ error: 'Doctors only' });
  }
  res.json({ appointments: appointments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) });
});

module.exports = router;
