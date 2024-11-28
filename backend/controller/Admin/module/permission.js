const {
    Permission,
    Company,
    Module

} = require('../../../models/Admin/Permission'); // Adjust path as needed


// Assign a module to a company
exports.assignModuleToCompany = async(req, res) => {

    try {
        const { companyId, moduleIds } = req.body; // Removed accessGranted from the request

        // Ensure Company exists
        const company = await Company.findByPk(companyId);
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }

        // Ensure all provided modules exist
        const modules = await Module.findAll({
            where: {
                id: moduleIds, // Fetch modules with IDs from the array
            },
        });

        if (modules.length !== moduleIds.length) {
            return res.status(404).json({ message: 'One or more modules not found' });
        }

        // Set `accessGranted` to a default value (e.g., true or false)
        const defaultAccessGranted = true; // Change this to `false` if needed

        // Create or update permissions for each module
        const permissionPromises = modules.map(async(module) => {
            const [permission, created] = await Permission.findOrCreate({
                where: { CompanyId: companyId, ModuleId: module.id },
                defaults: { accessGranted: defaultAccessGranted, saved: true }, // Default `accessGranted` and `saved`
            });

            if (!created) {
                permission.accessGranted = defaultAccessGranted; // Update accessGranted if already exists
                permission.saved = true; // Ensure saved remains true
                await permission.save();
            }

            return permission; // Return the updated/created permission
        });

        const permissions = await Promise.all(permissionPromises); // Resolve all promises

        res.status(200).json({
            message: 'Permissions updated successfully for modules',
            permissions,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }

};

exports.denyAccess = async(req, res) => {
    try {
        const { companyId, moduleId } = req.body;

        // Log the incoming data to verify it's being received correctly
        console.log("Received data:", { companyId, moduleId });

        if (!companyId || !moduleId) {
            return res.status(400).json({ message: 'CompanyId and ModuleId are required' });
        }

        // Find the permission record based on companyId and moduleId
        const permission = await Permission.findOne({
            where: { CompanyId: companyId, ModuleId: moduleId },
        });

        if (!permission) {
            return res.status(404).json({ message: 'Permission not found' });
        }

        // Delete the permission record (removes the relationship)
        await permission.destroy(); // This deletes the permission record from the database

        res.status(200).json({ message: 'Access denied and relationship deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
};



// Get all modules assigned to a company
exports.getCompanyModules = async(req, res) => {
    try {
        const { companyId } = req.params;

        const company = await Company.findByPk(companyId, {
            include: {
                model: Module,
                through: { attributes: ['accessGranted'] },
            },
        });

        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }

        res.status(200).json(company.Modules);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
};