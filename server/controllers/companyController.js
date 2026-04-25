const Company = require('../models/Company');

// ADD COMPANY (TnP only)
exports.addCompany = async (req, res) => {
  try {
    const {
      name,
      roleOffered,
      jobType,
      ctc,
      location,
      mode,
      hiringModel,
      testDetails,
      description,
      minCGPA,
      eligibleBranches,
      openings,
      activeFrom,
      activeTill,
    } = req.body;

    const company = await Company.create({
      name,
      roleOffered,
      jobType,
      ctc,
      location,
      mode,
      hiringModel,
      testDetails,
      description,
      minCGPA,
      eligibleBranches,
      openings,
      activeFrom,
      activeTill,
      createdBy: req.user.id,
    });

    res.status(201).json({
      message: 'Company added successfully',
      company,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL COMPANIES
exports.getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find().sort({ createdAt: -1 });
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);

    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
