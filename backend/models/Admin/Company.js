const { DataTypes } = require('sequelize');
const sequelize = require('../../config/config');

const Company = sequelize.define('Company', {
    companyName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    companyLogo: {
        type: DataTypes.STRING, // Stores the image URL or file path
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true // Ensures it's a valid email format
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    socialMedia: {
        type: DataTypes.JSON, // Stores an array of objects for social media links
        allowNull: true,
        defaultValue: [] // Default to an empty array
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true
    },
    branches: {
        type: DataTypes.JSON, // Stores an array of objects for branches (address and map link)
        allowNull: true,
        defaultValue: [] // Default to an empty array
    }
});

module.exports = Company;