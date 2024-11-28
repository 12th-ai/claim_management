const express = require('express');
const router = express.Router();
const permissionController = require('../../controller/Admin/module/permission');

router.post('/assign', permissionController.assignModuleToCompany); // Assign module
router.post('/deny-access', permissionController.denyAccess); // Deny access
router.get('/company/:companyId/modules', permissionController.getCompanyModules); // Get modules for a company

module.exports = router;