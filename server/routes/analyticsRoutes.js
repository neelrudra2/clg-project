const express = require('express');
const { getDashboardStats, getBranchStats } = require('../controllers/analyticsController');

const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

const router = express.Router();

// Only TnP can see analytics
router.get('/dashboard', protect, authorizeRoles('tnp'), getDashboardStats);
router.get('/branch-stats', protect, authorizeRoles('tnp'), getBranchStats);

module.exports = router;
