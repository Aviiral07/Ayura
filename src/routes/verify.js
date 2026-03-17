const express = require('express');
const router = express.Router();
const { doctors } = require('../data/store');

// ── POST /api/verify/doctor ──
router.post('/doctor', (req, res) => {
  try {
    const { name, registrationNumber, state } = req.body;

    if (!name || !registrationNumber || !state) {
      return res.status(400).json({ error: 'Name, registration number and state are required' });
    }

    const found = doctors.find(d =>
      d.name.toLowerCase().includes(name.toLowerCase().trim()) &&
      d.reg.toUpperCase() === registrationNumber.toUpperCase().trim() &&
      d.state.toLowerCase() === state.toLowerCase().trim()
    );

    if (found) {
      res.json({
        verified: true,
        doctor: {
          name: found.name,
          registrationNumber: found.reg,
          state: found.state,
          specialization: found.spec,
          yearOfRegistration: found.year,
          status: found.status
        },
        message: 'Doctor is verified and registered'
      });
    } else {
      res.json({
        verified: false,
        message: 'No matching record found in our database',
        suggestion: 'Please verify with your State Medical Council'
      });
    }

  } catch (err) {
    console.error('Verify error:', err);
    res.status(500).json({ error: 'Verification failed' });
  }
});

// ── GET /api/verify/doctors ── (list all verified doctors)
router.get('/doctors', (req, res) => {
  res.json({
    doctors: doctors.map(d => ({
      name: d.name,
      state: d.state,
      specialization: d.spec,
      status: d.status
    }))
  });
});

module.exports = router;
