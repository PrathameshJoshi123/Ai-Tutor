const Student = require('../models/student');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path')
const dotenv = require('dotenv');

// Set the path to the .env file
const envPath = path.resolve(__dirname, '../.env');

// Load environment variables from .env file
dotenv.config({ path: envPath });

// Register Controller
exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    console.log('hi')
    // Check if user exists
    let student = await Student.findOne({ email });
    if (student) return res.status(400).json({ msg: 'User already exists' });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new student
    student = new Student({ name, email, password: hashedPassword });
    await student.save();

    // Create JWT
    const payload = { studentId: student.id };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, 
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Login Controller
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log('hi')
    // Check if user exists
    let student = await Student.findOne({ email });
    if (!student) return res.status(400).json({ msg: 'Invalid Credentials' });

    // Compare password
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' });

    // Create JWT
    const payload = { studentId: student.id };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, 
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// In authController.js
exports.getUser = async (req, res) => {
  const studentId = req.student;
  if (!studentId) {
    return res.status(400).json({ msg: 'Student ID not found in request' });
  }
  try {
    const student = await Student.findById(studentId).select('-password');
    if (!student) return res.status(404).json({ msg: 'Student not found' });
    res.json(student);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

  


