const express = require('express');
const {
  applyToCompany,
  getMyApplications,
  getCompanyApplicants,
  updateApplicationStatus,
} = require('../controllers/applicationController');

const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

const router = express.Router();

// Student apply
router.post('/apply/:companyId', protect, authorizeRoles('student'), applyToCompany);

// Student view own applications
router.get('/my', protect, authorizeRoles('student'), getMyApplications);

// TnP view applicants
router.get('/company/:companyId', protect, authorizeRoles('tnp'), getCompanyApplicants);

// TnP update application status
router.put('/update/:applicationId', protect, authorizeRoles('tnp'), updateApplicationStatus);

module.exports = router;
