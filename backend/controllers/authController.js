const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendVerificationMail } = require('../utils/mailer');

exports.register = async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;
  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ message: 'User already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const code = Math.floor(100000 + Math.random() * 900000).toString();

  const user = await User.create({
    firstName, lastName, email,
    password: hashedPassword,
    role,
    verificationCode: code
  });

  await sendVerificationMail(email, code);
  res.json({ message: 'Registered. Check your email for verification code.' });
};

exports.verify = async (req, res) => {
  const { email, code } = req.body;
  const user = await User.findOne({ email });
  if (!user || user.verificationCode !== code) return res.status(400).json({ message: 'Invalid code' });

  user.isVerified = true;
  user.verificationCode = null;
  await user.save();

  res.json({ message: 'Email verified successfully' });
};

exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || user.role !== 'admin') return res.status(403).json({ message: 'You are not allowed to login from here' });
  if (!user.isVerified) return res.status(403).json({ message: 'Email not verified' });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token });
};
