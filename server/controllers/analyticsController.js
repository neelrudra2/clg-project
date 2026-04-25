const User = require('../models/User');
const Company = require('../models/Company');
const Application = require('../models/Application');

// GET DASHBOARD STATS
exports.getDashboardStats = async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({ role: 'student' });
    const totalCompanies = await Company.countDocuments();
    const totalApplications = await Application.countDocuments();
    const totalSelected = await Application.countDocuments({
      status: 'Selected',
    });

    res.status(200).json({
      totalStudents,
      totalCompanies,
      totalApplications,
      totalSelected,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// BRANCH-WISE PLACEMENT STATS
exports.getBranchStats = async (req, res) => {
  try {
    const stats = await Application.aggregate([
      { $match: { status: 'Selected' } },
      {
        $lookup: {
          from: 'users',
          localField: 'student',
          foreignField: '_id',
          as: 'studentData',
        },
      },
      { $unwind: '$studentData' },
      {
        $group: {
          _id: '$studentData.branch',
          selectedCount: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
