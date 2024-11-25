const { DataTypes } = require('sequelize');
const sequelize = require('../../config/config');

const Admin = sequelize.define('Admin', {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ProfileImage: {
        type: DataTypes.STRING,
        allowNull: true
    },
    IsActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
});

module.exports = Admin;