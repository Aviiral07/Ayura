const express = require('express');
const router = express.Router();
const { verifyDoctorDetails } = require('../services/doctorVerification');

// Doctor verification endpoint
router.post('/', async (req, res) => {
  try {
    const details = req.body;
    const verificationResult = await verifyDoctorDetails(details);
    res.json(verificationResult);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;