const express = require('express');
const {
  registerUser,
  loginUser,
  getMyProfile,
  updateMyProfile,
  forgotPassword,
  resetPassword,
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

// Get logged-in user profile
router.get('/me', protect, getMyProfile);

// Update profile
router.put('/me', protect, updateMyProfile);

// Forgot and Reset password
router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:token', resetPassword);

module.exports = router;
