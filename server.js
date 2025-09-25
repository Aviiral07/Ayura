const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

const mockDoctorDatabase = [
    {
        name: "Dr. Rajesh Kumar",
        registrationNumber: "MH12345",
        state: "Maharashtra",
        specialization: "Cardiology",
        yearOfRegistration: 2015,
        status: "Active"
    },
    {
        name: "Dr. Priya Sharma",
        registrationNumber: "DL67890",
        state: "Delhi",
        specialization: "Pediatrics",
        yearOfRegistration: 2018,
        status: "Active"
    },
    {
        name: "Dr. Amit Patel",
        registrationNumber: "GJ11111",
        state: "Gujarat",
        specialization: "General Medicine",
        yearOfRegistration: 2012,
        status: "Active"
    },
    {
        name: "Dr. Sunita Reddy",
        registrationNumber: "KA22222",
        state: "Karnataka",
        specialization: "Dermatology",
        yearOfRegistration: 2020,
        status: "Active"
    },
    {
        name: "Dr. Vikram Singh",
        registrationNumber: "RJ33333",
        state: "Rajasthan",
        specialization: "Orthopedics",
        yearOfRegistration: 2016,
        status: "Active"
    }
];

app.post('/verify-doctor', (req, res) => {
    const inputData = req.body;
    const foundDoctor = mockDoctorDatabase.find(doctor =>
        doctor.name.toLowerCase().includes(inputData.name.toLowerCase()) &&
        doctor.registrationNumber === inputData.registrationNumber &&
        doctor.state === inputData.state
    );
    if (foundDoctor) {
        res.json({ verified: true, doctor: foundDoctor });
    } else {
        res.json({ verified: false });
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
