const express = require("express");
const router = express.Router();
const {
    createModule,
    getModules,
    getModuleById,
    updateModule,
    deleteModule,
    activateModule,
    deactivateModule,
} = require("../../controller/Admin/module/module");

// Create a new module
router.post('/', createModule);

// Get all modules
router.get("/", getModules);

// Get a single module by ID
router.get("/:id", getModuleById);

// Update a module
router.put("/:id", updateModule);

// Delete a module
router.delete("/:id", deleteModule);

// Activate a module
router.patch("/activate/:id", activateModule);

// Deactivate a module
router.patch("/deactivate/:id", deactivateModule);

module.exports = router;