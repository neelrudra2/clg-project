const Notification = require('../models/Notification');
const User = require('../models/User');
const sendSMS = require('../utils/sendSMS');

// CREATE NOTIFICATION (TnP)
exports.createNotification = async (req, res) => {
  try {
    const { title, message } = req.body;

    const notification = await Notification.create({
      title,
      message,
      createdBy: req.user.id,
    });

    // Send SMS to ONE student only
    const testPhone = '6033061894'; // your phone number

    await sendSMS(testPhone, 'NITA-PlacementPro: New notification posted. Login to view details.');

    res.status(201).json({
      message: 'Notification created successfully',
      notification,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL NOTIFICATIONS
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });

    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE NOTIFICATION
exports.deleteNotification = async (req, res) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);

    res.json({ message: 'Notification deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
