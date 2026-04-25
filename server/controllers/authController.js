const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// REGISTER
exports.registerUser = async (req, res) => {
  try {
    const {
      name,
      role,
      enrollmentNumber,
      branch,
      batch,
      cgpa,
      email,
      phone,
      password,
      department,
    } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      role,
      enrollmentNumber,
      branch,
      batch,
      cgpa,
      email,
      phone,
      password: hashedPassword,
      department,
    });

    res.status(201).json({
      message: 'User registered successfully',
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// LOGIN
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by enrollment OR email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.status(200).json({
      message: 'Login successful',
      token,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET MY PROFILE
exports.getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE MY PROFILE
exports.updateMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update allowed fields only
    user.name = req.body.name || user.name;
    user.phone = req.body.phone || user.phone;

    if (user.role === 'student') {
      user.cgpa = req.body.cgpa || user.cgpa;
      user.branch = req.body.branch || user.branch;
    }

    if (user.role === 'tnp') {
      user.department = req.body.department || user.department;
    }

    await user.save();

    res.status(200).json({
      message: 'Profile updated successfully',
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// REQUEST PASSWORD RESET
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hash token before saving
    user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

    await user.save();

    res.status(200).json({
      message: 'Reset token generated',
      resetToken, // In production, send via email
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// RESET PASSWORD
exports.resetPassword = async (req, res) => {
  try {
    const resetToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    const user = await User.findOne({
      resetPasswordToken: resetToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
