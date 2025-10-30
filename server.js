const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

const mockDoctorDatabase = [
    {
        name: "Dr. Manaswini Chhikara",
        registrationNumber: "30853",
        state: "Delhi",
        specialization: "General Medicine",
        yearOfRegistration: 2021,
        status: "Active",
        additionalInfo: {
            fatherName: "Kulbir Chhikara",
            dateOfBirth: "25/01/1997",
            dateOfRegistration: "10/08/2021",
            uprnNo: "N/A",
            stateMedicalCouncil: "Delhi Medical Council",
            qualifications: [
                {
                    degree: "MBBS",
                    year: 2021,
                    university: "Swami Rama Himalayan University, Dehradun"
                }
            ],
            permanentAddress: "House No. 1394, Sector- 3, Rohtak, Haryana 124001"
        }
    },
    {
        name: "Dr. Prashant Kumar Dash",
        registrationNumber: "24422",
        state: "Delhi",
        specialization: "General Medicine",
        yearOfRegistration: 2004,
        status: "Active",
        additionalInfo: {
            fatherName: "Bhagwan Dash",
            dateOfBirth: "30/04/1980",
            dateOfRegistration: "27/08/2004",
            uprnNo: "N/A",
            stateMedicalCouncil: "Delhi Medical Council",
            qualifications: [
                {
                    degree: "M.D. General Medicine",
                    year: 2008,
                    university: "H.N.B. Garhwal University"
                }
            ],
            permanentAddress: "A-71, Swasthya Vihar, Vikas Marg, Delhi, 110092"
        }
    },
    {
        name: "Dr. Himanshu Sharma",
        registrationNumber: "110747",
        state: "Delhi",
        specialization: "Hospital Administration",
        yearOfRegistration: 2023,
        status: "Active",
        additionalInfo: {
            fatherName: "Chakravarty Sharma",
            dateOfBirth: "17/01/1995",
            dateOfRegistration: "12/10/2023",
            uprnNo: "N/A",
            stateMedicalCouncil: "Delhi Medical Council",
            qualifications: [
                {
                    degree: "MBBS",
                    year: 2019,
                    university: "Sri Siddhartha Academy of Higher Education, Tumkur"
                },
                {
                    degree: "M.D. Hospital Administration",
                    year: 2023,
                    university: "Rajiv Gandhi University of Health Sciences"
                }
            ],
            permanentAddress: "159-R, Model Town, Rohtak, Haryana, 124001"
        }
    },
    {
        name: "Dr. Pranav Vig",
        registrationNumber: "105615",
        state: "Delhi",
        specialization: "General Medicine",
        yearOfRegistration: 2022,
        status: "Active",
        additionalInfo: {
            fatherName: "Pardip Kumar Vig",
            dateOfBirth: "24/11/1997",
            dateOfRegistration: "16/11/2022",
            uprnNo: "N/A",
            stateMedicalCouncil: "Delhi Medical Council",
            qualifications: [
                {
                    degree: "MBBS",
                    year: 2022,
                    university: "All India Institute of Medical Sciences, Jodhpur"
                }
            ],
            permanentAddress: "1106, Opposite Street Number 4, Guru Nanak Nagar Post Office Vijay Nagar Amritsar, Punjab, 143001"
        }
    },
    {
        name: "Dr. Jasjeet Kaur",
        registrationNumber: "100750",
        state: "Delhi",
        specialization: "General Medicine",
        yearOfRegistration: 2021,
        status: "Active",
        additionalInfo: {
            fatherName: "Hardev Singh",
            dateOfBirth: "24/12/1991",
            dateOfRegistration: "20/12/2021",
            uprnNo: "N/A",
            stateMedicalCouncil: "Delhi Medical Council",
            qualifications: [
                {
                    degree: "MBBS",
                    year: 2015,
                    university: "Baba Farid University of Health Sciences, Faridkot"
                }
            ],
            permanentAddress: "1177, Japani Mills Colony, Gt Road Chheharta, Amritsar, Punjab, 143105"
        }
    },
    {
        name: "Dr. Bhavya Jain",
        registrationNumber: "DMC/R/37406",
        state: "Delhi",
        specialization: "General Medicine",
        yearOfRegistration: 2023,
        status: "Active",
        additionalInfo: {
            fatherName: "Sanjay Kumar Jain",
            dateOfBirth: "12/02/1999",
            dateOfRegistration: "24/07/2023",
            uprnNo: "N/A",
            stateMedicalCouncil: "Delhi Medical Council",
            qualifications: [
                {
                    degree: "MBBS",
                    year: 2022,
                    university: "ALL INDIA INSTITUTE OF MEDICAL SCIENCES, JODHPUR"
                }
            ],
            permanentAddress: "J - 125 PARASAVNATH CITY, NEAR SANGARIA BY PASS, RAJASTHAN, 342013"
        }
    },
    {
        name: "Dr. Aditi Gupta",
        registrationNumber: "72607",
        state: "Delhi",
        specialization: "Pediatrics",
        yearOfRegistration: 2015,
        status: "Active",
        additionalInfo: {
            fatherName: "Saurabh Gupta",
            dateOfBirth: "09/01/1990",
            dateOfRegistration: "13/08/2015",
            uprnNo: "N/A",
            stateMedicalCouncil: "Delhi Medical Council",
            qualifications: [
                {
                    degree: "MBBS",
                    year: 2013,
                    university: "Dr. D Y PATIL UNIVERSITY, PIMPRI, PUNE"
                },
                {
                    degree: "M.D. Paediatrics",
                    year: 2019,
                    university: "M J P ROHILKHAND UNIVERSITY"
                }
            ],
            permanentAddress: "A-151, THE BELAIRE, GOLF COURSE ROAD, DLF PHASE 5, SECTOR 54, GURUGRAM, HARYANA- 122011"
        }
    },
    {
        name: "Dr. Divya Jain",
        registrationNumber: "111730",
        state: "Delhi",
        specialization: "Pediatrics",
        yearOfRegistration: 2023,
        status: "Active",
        additionalInfo: {
            fatherName: "Lalit Jain",
            dateOfBirth: "04/06/1994",
            uprnNo: "N/A",
            stateMedicalCouncil: "Delhi Medical Council",
            qualifications: [
                {
                    degree: "MBBS",
                    year: 2019,
                    university: "Rajasthan University of Health Sciences"
                },
                {
                    degree: "M.D. Paediatrics",
                    year: 2023,
                    university: "Rajasthan University of Health Sciences"
                }
            ],
            permanentAddress: "1084- Vivekanand Nagar, Near Chawala Circle Kota, Rajasthan, 324010, Near Balaji Temple Park"
        }
    },
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
    },
    {
        name: "Dr. Ananya Gupta",
        registrationNumber: "WB44444",
        state: "West Bengal",
        specialization: "Neurology",
        yearOfRegistration: 2017,
        status: "Active"
    },
    {
        name: "Dr. Mohammed Khan",
        registrationNumber: "UP55555",
        state: "Uttar Pradesh",
        specialization: "Psychiatry",
        yearOfRegistration: 2019,
        status: "Active"
    },
    {
        name: "Dr. Sarah Thomas",
        registrationNumber: "KL66666",
        state: "Kerala",
        specialization: "Gynecology",
        yearOfRegistration: 2014,
        status: "Active"
    },
    {
        name: "Dr. Rahul Mehta",
        registrationNumber: "MP77777",
        state: "Madhya Pradesh",
        specialization: "ENT",
        yearOfRegistration: 2021,
        status: "Active"
    },
    {
        name: "Dr. Nina Patel",
        registrationNumber: "TN88888",
        state: "Tamil Nadu",
        specialization: "Ophthalmology",
        yearOfRegistration: 2016,
        status: "Active"
    },
    {
        name: "Dr. Ravi Verma",
        registrationNumber: "HR99999",
        state: "Haryana",
        specialization: "Pulmonology",
        yearOfRegistration: 2013,
        status: "Active"
    },
    {
        name: "Dr. Meera Desai",
        registrationNumber: "PB10101",
        state: "Punjab",
        specialization: "Endocrinology",
        yearOfRegistration: 2018,
        status: "Active"
    },
    {
        name: "Dr. John Matthew",
        registrationNumber: "GA20202",
        state: "Goa",
        specialization: "Dentistry",
        yearOfRegistration: 2019,
        status: "Active"
    },
    {
        name: "Dr. Deepa Nair",
        registrationNumber: "AP30303",
        state: "Andhra Pradesh",
        specialization: "Oncology",
        yearOfRegistration: 2015,
        status: "Active"
    },
    {
        name: "Dr. Arjun Malhotra",
        registrationNumber: "JH40404",
        state: "Jharkhand",
        specialization: "Gastroenterology",
        yearOfRegistration: 2017,
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
