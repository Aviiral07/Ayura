const express = require('express');
const app = express();

// Import doctor verification route
const verifyDoctorRouter = require('./routes/verifyDoctor');

app.use(express.json());
// Register doctor verification endpoint
app.use('/api/verify-doctor', verifyDoctorRouter);

// ... other routes and middleware

module.exports = app;