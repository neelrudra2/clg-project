const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      required: true,
    },

    status: {
      type: String,
      enum: ['Applied', 'Shortlisted', 'Rejected', 'Selected'],
      default: 'Applied',
    },

    appliedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Prevent duplicate applications
applicationSchema.index({ student: 1, company: 1 }, { unique: true });

module.exports = mongoose.model('Application', applicationSchema);
