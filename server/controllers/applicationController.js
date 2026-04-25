const Application = require('../models/Application');
const Company = require('../models/Company');

// STUDENT APPLY TO COMPANY
exports.applyToCompany = async (req, res) => {
  try {
    const companyId = req.params.companyId;

    // Check if company exists
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    // Create application
    const application = await Application.create({
      student: req.user.id,
      company: companyId,
    });

    res.status(201).json({
      message: 'Applied successfully',
      application,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: 'You have already applied to this company',
      });
    }
    res.status(500).json({ message: error.message });
  }
};

// STUDENT VIEW OWN APPLICATIONS
exports.getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      student: req.user.id,
    }).populate('company');

    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// TnP VIEW APPLICANTS FOR A COMPANY
exports.getCompanyApplicants = async (req, res) => {
  try {
    const companyId = req.params.companyId;

    const applications = await Application.find({
      company: companyId,
    }).populate('student');

    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// TnP UPDATE APPLICATION STATUS
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.applicationId;

    const application = await Application.findById(applicationId);

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    application.status = status;
    await application.save();

    res.status(200).json({
      message: 'Application status updated successfully',
      application,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
