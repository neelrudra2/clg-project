const mongoose = require('mongoose');

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    roleOffered: {
      type: String,
      required: true,
    },

    jobType: {
      type: String,
      enum: ['Intern', 'Full-Time', 'Intern + PPO'],
      required: true,
    },

    ctc: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    mode: {
      type: String,
      enum: ['Onsite', 'Hybrid', 'Remote'],
      required: true,
    },

    hiringModel: {
      type: String,
      required: true,
    },

    testDetails: {
      type: String,
    },

    description: {
      type: String,
    },

    minCGPA: {
      type: Number,
      required: true,
    },

    eligibleBranches: [
      {
        type: String,
      },
    ],

    openings: {
      type: Number,
    },

    activeFrom: {
      type: Date,
      required: true,
    },

    activeTill: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ['upcoming', 'active', 'past'],
      default: 'upcoming',
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Company', companySchema);
