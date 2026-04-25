const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ['student', 'tnp', 'alumni'],
      required: true,
    },

    enrollmentNumber: {
      type: String,
      required: function () {
        return this.role === 'student';
      },
      uppercase: true,
      trim: true,
    },

    branch: {
      type: String,
      required: function () {
        return this.role === 'student';
      },
    },

    batch: {
      type: Number,
      required: function () {
        return this.role === 'student';
      },
    },

    cgpa: {
      type: Number,
      required: function () {
        return this.role === 'student';
      },
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    phone: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    department: {
      type: String,
      required: function () {
        return this.role === 'tnp';
      },
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpire: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
