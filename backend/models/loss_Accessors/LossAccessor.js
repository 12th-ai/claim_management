const { DataTypes } = require('sequelize');
const sequelize = require('../../config/config');

const LossAccessor = sequelize.define('LossAccessor', {
    lossAccessorName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lossAccessorLogo: {
        type: DataTypes.STRING, // Stores the logo URL or file path
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
    contactCode: {
        type: DataTypes.STRING, // Stores contact code
        allowNull: true
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true
    },
    address: {
        type: DataTypes.STRING, // Stores address information
        allowNull: true
    },
    employee: {
        type: DataTypes.INTEGER, // Links to the 'Company' ID, should match the type of Company.id
        allowNull: false,
        references: {
            model: 'Companies', // Ensure the correct table name (case-sensitive)
            key: 'id'
        },
        onDelete: 'CASCADE', // Optional: add onDelete behavior for foreign key
        onUpdate: 'CASCADE' // Optional: add onUpdate behavior for foreign key
    }
}, {
    tableName: 'LossAccessors', // Make sure the table name matches the one in the database
    timestamps: true // Enable timestamps for createdAt and updatedAt
});

module.exports = LossAccessor;