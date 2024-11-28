const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../../config/config"); // Update path to your DB configuration

const Module = sequelize.define("Module", {
    module_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
});

module.exports = Module;