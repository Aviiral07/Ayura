const express = require('express');
const cors = require('cors');
const app = express();

// ── Middleware ──
app.use(cors({
  origin: [
    'https://aviiral07.github.io',
    'http://localhost:5500',
    'http://127.0.0.1:5500'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// ── Routes ──
app.use('/api/auth',         require('./routes/auth'));
app.use('/api/appointments', require('./routes/appointments'));
app.use('/api/verify',       require('./routes/verify'));

// ── Health check ──
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Ayura Backend is running!',
    version: '1.0.0',
    endpoints: [
      'POST /api/auth/register',
      'POST /api/auth/login',
      'GET  /api/auth/me',
      'POST /api/appointments/book',
      'GET  /api/appointments/my',
      'POST /api/verify/doctor'
    ]
  });
});

// ── 404 handler ──
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// ── Error handler ──
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Ayura Backend running on port ${PORT}`);
});
