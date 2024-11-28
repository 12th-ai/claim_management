const Module = require("../../../models/Admin/Module");

// Create a new module
const createModule = async(req, res) => {
    try {
        const { module_name, description } = req.body;

        const existingModule = await Module.findOne({ where: { module_name } });

        if (existingModule) {
            return res.status(400).json({ message: "Module already exists" });
        }

        await Module.create({ module_name, description });
        res.status(201).json({ message: "Module created successfully!" });

    } catch (err) {
        console.error("Error creating module:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get all modules
const getModules = async(req, res) => {
    try {
        const modules = await Module.findAll();
        res.status(200).json(modules);
    } catch (err) {
        console.error("Error fetching modules:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get a single module by ID
const getModuleById = async(req, res) => {
    try {
        const { id } = req.params;
        const module = await Module.findByPk(id);

        if (!module) {
            return res.status(404).json({ message: "Module not found" });
        }

        res.status(200).json(module);
    } catch (err) {
        console.error("Error fetching module:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Update a module
const updateModule = async(req, res) => {
    try {
        const { id } = req.params;
        const { module_name, description } = req.body;

        const module = await Module.findByPk(id);

        if (!module) {
            return res.status(404).json({ message: "Module not found" });
        }

        module.module_name = module_name || module.module_name;
        module.description = description || module.description;
        await module.save();

        res.status(200).json({ message: "Module updated successfully!" });
    } catch (err) {
        console.error("Error updating module:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Delete a module
const deleteModule = async(req, res) => {
    try {
        const { id } = req.params;
        const module = await Module.findByPk(id);

        if (!module) {
            return res.status(404).json({ message: "Module not found" });
        }

        await module.destroy();
        res.status(200).json({ message: "Module deleted successfully!" });
    } catch (err) {
        console.error("Error deleting module:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Activate a module
const activateModule = async(req, res) => {
    try {
        const { id } = req.params;

        const module = await Module.findByPk(id);

        if (!module) {
            return res.status(404).json({ message: "Module not found" });
        }

        module.isActive = true;
        await module.save();

        res.status(200).json({ message: "Module activated successfully!" });
    } catch (err) {
        console.error("Error activating module:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Deactivate a module
const deactivateModule = async(req, res) => {
    try {
        const { id } = req.params;

        const module = await Module.findByPk(id);

        if (!module) {
            return res.status(404).json({ message: "Module not found" });
        }

        module.isActive = false;
        await module.save();

        res.status(200).json({ message: "Module deactivated successfully!" });
    } catch (err) {
        console.error("Error deactivating module:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    createModule,
    getModules,
    getModuleById,
    updateModule,
    deleteModule,
    activateModule,
    deactivateModule,
};