const { DataTypes } = require('sequelize');
const sequelize = require('../../config/config'); // Update path to your DB configuration

// Import Company and Module Models
const Company = require('./Company'); // Adjust the path to the Company model
const Module = require('./Module'); // Adjust the path to the Module model

// Define Permission Model (Association Table)
const Permission = sequelize.define('Permission', {
    accessGranted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true, // Whether access is granted or denied
    },
});

// Define Associations
Company.belongsToMany(Module, { through: Permission });
Module.belongsToMany(Company, { through: Permission });

// Export Models
module.exports = {
    Permission,
    Company,
    Module

};