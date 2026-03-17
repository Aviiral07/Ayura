// Simple in-memory store — works perfectly for demo/hackathon
// For production: replace with MongoDB/PostgreSQL

const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

// ── Users ──
const users = [
  {
    id: uuidv4(),
    name: 'Demo Patient',
    email: 'patient@ayura.in',
    password: bcrypt.hashSync('1234', 10),
    role: 'patient',
    createdAt: new Date().toISOString()
  },
  {
    id: uuidv4(),
    name: 'Dr. Demo Doctor',
    email: 'doctor@ayura.in',
    password: bcrypt.hashSync('1234', 10),
    role: 'doctor',
    createdAt: new Date().toISOString()
  }
];

// ── Appointments ──
const appointments = [];

// ── Doctor Database ──
const doctors = [
  { name: 'Dr. Rajesh Kumar',  reg: 'MH12345', state: 'Maharashtra', spec: 'Cardiology',       year: 2015, status: 'Active' },
  { name: 'Dr. Priya Sharma',  reg: 'DL67890', state: 'Delhi',       spec: 'Pediatrics',       year: 2018, status: 'Active' },
  { name: 'Dr. Amit Patel',    reg: 'GJ11111', state: 'Gujarat',     spec: 'General Medicine', year: 2012, status: 'Active' },
  { name: 'Dr. Sunita Reddy',  reg: 'KA22222', state: 'Karnataka',   spec: 'Dermatology',      year: 2020, status: 'Active' },
  { name: 'Dr. Vikram Singh',  reg: 'RJ33333', state: 'Rajasthan',   spec: 'Orthopedics',      year: 2016, status: 'Active' },
  { name: 'Dr. Ananya Gupta',  reg: 'WB44444', state: 'West Bengal', spec: 'Neurology',        year: 2017, status: 'Active' },
  { name: 'Dr. Sarah Thomas',  reg: 'KL66666', state: 'Kerala',      spec: 'Gynecology',       year: 2014, status: 'Active' },
  { name: 'Dr. Rahul Mehta',   reg: 'MP77777', state: 'Madhya Pradesh', spec: 'ENT',           year: 2021, status: 'Active' },
  { name: 'Dr. Manaswini Chhikara', reg: '30853', state: 'Delhi',   spec: 'General Medicine', year: 2021, status: 'Active' },
  { name: 'Dr. Prashant Kumar Dash', reg: '24422', state: 'Delhi',  spec: 'General Medicine', year: 2004, status: 'Active' },
];

module.exports = { users, appointments, doctors };
