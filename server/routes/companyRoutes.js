const express = require('express');
const { addCompany, getAllCompanies, getCompanyById } = require('../controllers/companyController');

const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

const router = express.Router();

// Only TnP can add company
router.post('/', protect, authorizeRoles('tnp'), addCompany);

// Any logged-in user can view companies
router.get('/', protect, getAllCompanies);
router.get('/:id', protect, getCompanyById);

module.exports = router;
