const { DataTypes } = require('sequelize');
const sequelize = require('../../config/config');

// Define the Quotation model
const Accessor_Quotations = sequelize.define('Accessor_Quotations', {
    accidentDescription: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    courseOfAccident: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    policyInvestigation: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    thirdPartyAspect: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    policyLiability: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    survey: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    adequacySumInsured: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    conclusion: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    recommendation: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    incidentDetails: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    driverWitnessInfo: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    regulatoryCompliance: {
        type: DataTypes.TEXT,
        allowNull: true,
    },

    // Supporting documents and images as JSON arrays
    supportingDocuments: {
        type: DataTypes.JSON, // Stores array of objects with {filename, description}
        allowNull: true,
    },
    supportingImages: {
        type: DataTypes.JSON, // Stores array of objects with {filename, description}
        allowNull: true,
    },

    // Salvage data as separate arrays
    salvageItemNames: {
        type: DataTypes.JSON, // Array of item names
        allowNull: true,
    },
    salvageUnitPrices: {
        type: DataTypes.JSON, // Array of unit prices
        allowNull: true,
    },
    salvageQuantities: {
        type: DataTypes.JSON, // Array of quantities
        allowNull: true,
    },
    salvageActions: {
        type: DataTypes.JSON, // Array of actions (e.g., 'replace', 'repair')
        allowNull: true,
    },
    salvageImages: {
        type: DataTypes.JSON, // Array of image filenames
        allowNull: true,
    },
    salvageAmounts: {
        type: DataTypes.JSON, // Array of salvage amounts
        allowNull: true,
    },
    quotationId: {
        type: DataTypes.STRING, // Array of salvage amounts
        allowNull: true,
    },
    lossAccessorId: {
        type: DataTypes.STRING, // Array of salvage amounts
        allowNull: true,
    },
}, {
    tableName: 'Accessor_Quotations', // Adjust table name if necessary
    timestamps: true,
});

module.exports = Accessor_Quotations;