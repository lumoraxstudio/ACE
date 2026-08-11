const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const User = require('../models/User');
const { sendMail } = require('../utils/email');

const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET;
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

// helper: verify recaptcha token
async function verifyRecaptcha(token) {
  if (!RECAPTCHA_SECRET) return false;
  const res = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `secret=${encodeURIComponent(RECAPTCHA_SECRET)}&response=${encodeURIComponent(token)}`
  });
  const data = await res.json();
  return data.success;
}

// Signup: create user, send OTP
router.post('/signup', async (req, res) => {
  try {
    const { email, password, recaptchaToken } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Missing fields' });

    // verify recaptcha
    if (RECAPTCHA_SECRET) {
      const ok = await verifyRecaptcha(recaptchaToken);
      if (!ok) return res.status(400).json({ message: 'reCAPTCHA failed' });
    }

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already registered' });

    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    const user = new User({ email, passwordHash, otp, otpExpires, isVerified: false });
    await user.save();

    await sendMail(
      email,
      'Your verification OTP',
      `Your OTP: ${otp}`,
      `<p>Your verification code is <strong>${otp}</strong>. It expires in 10 minutes.</p>`
    );

    return res.json({ message: 'Registered. Check your email for OTP.' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Verify OTP
router.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) return res.status(400).json({ message: 'Missing' });
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: 'No such user' });
  if (user.isVerified) return res.json({ message: 'Already verified' });

  if (user.otp === otp && user.otpExpires > new Date()) {
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();
    return res.json({ message: 'Email verified' });
  } else {
    return res.status(400).json({ message: 'Invalid or expired OTP' });
  }
});

// Resend OTP
router.post('/resend-otp', async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: 'No such user' });
  if (user.isVerified) return res.status(400).json({ message: 'Already verified' });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  user.otp = otp;
  user.otpExpires = new Date(Date.now() + 10 * 60 * 1000);
  await user.save();
  await sendMail(email, 'Your verification OTP (resent)', `Your OTP: ${otp}`, `<p>OTP: <strong>${otp}</strong></p>`);
  return res.json({ message: 'OTP resent' });
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password, recaptchaToken } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Missing fields' });

    if (RECAPTCHA_SECRET) {
      const ok = await verifyRecaptcha(recaptchaToken);
      if (!ok) return res.status(400).json({ message: 'reCAPTCHA failed' });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });

    if (!user.isVerified) return res.status(403).json({ message: 'Email not verified' });

    // For demo: we return a simple message; you can issue JWT here.
    return res.json({ message: 'Logged in' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Forgot password -> email reset link
router.post('/forgot', async (req, res) => {
  try {
    const { email, recaptchaToken } = req.body;
    if (!email) return res.status(400).json({ message: 'Missing email' });

    if (RECAPTCHA_SECRET) {
      const ok = await verifyRecaptcha(recaptchaToken);
      if (!ok) return res.status(400).json({ message: 'reCAPTCHA failed' });
    }

    const user = await User.findOne({ email });
    if (!user) return res.json({ message: 'If the email exists you will receive a reset link' });

    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetToken = resetToken;
    user.resetExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
    await user.save();

    const resetLink = `${BASE_URL}/reset.html?token=${resetToken}&email=${encodeURIComponent(email)}`;

    await sendMail(
      email,
      'Password reset',
      `Reset link: ${resetLink}`,
      `<p>Click to reset: <a href="${resetLink}">Reset password</a></p><p>Link expires in 1 hour.</p>`
    );

    return res.json({ message: 'If the email exists you will receive a reset link' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Reset password endpoint (called by frontend)
router.post('/reset', async (req, res) => {
  try {
    const { email, token, newPassword } = req.body;
    if (!email || !token || !newPassword) return res.status(400).json({ message: 'Missing' });

    const user = await User.findOne({ email, resetToken: token, resetExpires: { $gt: new Date() } });
    if (!user) return res.status(400).json({ message: 'Invalid or expired token' });

    user.passwordHash = await bcrypt.hash(newPassword, 12);
    user.resetToken = undefined;
    user.resetExpires = undefined;
    await user.save();

    return res.json({ message: 'Password reset success' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;