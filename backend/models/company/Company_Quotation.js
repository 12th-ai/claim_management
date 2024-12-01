const { DataTypes } = require('sequelize');
const sequelize = require('../../config/config');

// Define the Quotation model
const Quotation = sequelize.define('Quotation', {
    claimNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    customerName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true
    },
    vehiclePlate: {
        type: DataTypes.STRING,
        allowNull: true
    },
    damageDescription: {
        type: DataTypes.STRING,
        allowNull: true
    },
    deadlineDate: {
        type: DataTypes.DATE,
        allowNull: true
    },
    inspectionAddress: {
        type: DataTypes.STRING,
        allowNull: true
    },
    quotationValue: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    quotationDescription: {
        type: DataTypes.STRING,
        allowNull: true
    },
    quotationFile: {
        type: DataTypes.STRING, // Stores the file path for the main quotation document
        allowNull: true
    },
    supportingDocuments: {
        type: DataTypes.JSON, // Stores an array of file paths for supporting documents
        allowNull: true
    },
    notes: {
        type: DataTypes.STRING,
        allowNull: true
    },

    lossAccessorId: {
        type: DataTypes.INTEGER, // Foreign key to the LossAccessor table
        allowNull: false,
        references: {
            model: 'Lossaccessors', // Ensure the correct table name (case-sensitive)
            key: 'id'
        },
        onDelete: 'CASCADE', // Optional: if the linked LossAccessor is deleted, also delete the Quotation
        onUpdate: 'CASCADE' // Optional: if the LossAccessor ID is updated, update the corresponding Quotation
    },
    companyId: {
        type: DataTypes.INTEGER, // Foreign key to the Company table
        allowNull: false,
        references: {
            model: 'Companies', // Ensure the correct table name (case-sensitive)
            key: 'id'
        },
        onDelete: 'CASCADE', // Optional: if the linked Company is deleted, also delete the Quotation
        onUpdate: 'CASCADE' // Optional: if the Company ID is updated, update the corresponding Quotation
    },
}, {
    tableName: 'Company_Quotations', // Make sure the table name matches the one in the database
    timestamps: true // Enable timestamps for createdAt and updatedAt
});

module.exports = Quotation;