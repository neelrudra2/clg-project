const express = require('express');

const {
  createNotification,
  getNotifications,
  deleteNotification,
} = require('../controllers/notificationController');

const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

const router = express.Router();

// student + tnp view
router.get('/', protect, getNotifications);

// only tnp create
router.post('/', protect, authorizeRoles('tnp'), createNotification);

// delete
router.delete('/:id', protect, authorizeRoles('tnp'), deleteNotification);

module.exports = router;
