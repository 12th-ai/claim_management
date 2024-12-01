const Quotation = require("../../models/company/Company_Quotation");
const Company = require("../../models/Admin/Company");
const Accessor_Quotation = require('../../models/loss_Accessors/Quotation');
const LossAccessor = require('../../models/loss_Accessors/LossAccessor');



const createQuotation = async(req, res) => {
    try {
        // Extract text fields from the request body
        const {
            accidentDescription,
            courseOfAccident,
            policyInvestigation,
            thirdPartyAspect,
            policyLiability,
            survey,
            adequacySumInsured,
            conclusion,
            recommendation,
            incidentDetails,
            driverWitnessInfo,
            regulatoryCompliance,
            quotationId,

        } = req.body;

        console.log(req.body);

        const lossAccessorId = req.accessor.id;

        // Extract file arrays from `req.files`
        const supportingDocuments = req.files.supportingDocuments || [];

        const supportingImages = req.files.supportingImages || [];
        const salvageImages = req.files.salvageImages || [];

        // Parse the salvage rows from the request body
        const salvageRows = req.body.salvageRows.map((row) => JSON.parse(row));

        // Extract descriptions from the request body
        const supportingDocumentDescriptions = req.body.supportingDocumentDescriptions || [];
        const supportingImageDescriptions = req.body.supportingImageDescriptions || [];

        // Prepare supporting documents with descriptions
        const supportingDocumentsFiles = supportingDocuments.map((file, index) => ({
            filename: file.filename,
            description: supportingDocumentDescriptions[index] || '',
        }));

        // Prepare supporting images with descriptions
        const supportingImagesFiles = supportingImages.map((file, index) => ({
            filename: file.filename,
            description: supportingImageDescriptions[index] || '',
        }));

        // Separate salvage data into individual arrays
        const salvageItemNames = salvageRows.map((row) => row.itemName);
        const salvageUnitPrices = salvageRows.map((row) => row.unitPrice);
        const salvageQuantities = salvageRows.map((row) => row.quantity);
        const salvageActions = salvageRows.map((row) => row.action);
        const salvageAmounts = salvageRows.map((row) => row.salvageAmount);
        const salvageImagesArray = salvageImages.map((file) => file.filename);

        // Create a new quotation in the database
        const newQuotation = await Accessor_Quotation.create({
            accidentDescription,
            courseOfAccident,
            policyInvestigation,
            thirdPartyAspect,
            policyLiability,
            survey,
            adequacySumInsured,
            conclusion,
            recommendation,
            incidentDetails,
            driverWitnessInfo,
            regulatoryCompliance,
            supportingDocuments: supportingDocumentsFiles,
            supportingImages: supportingImagesFiles,
            salvageItemNames,
            salvageUnitPrices,
            salvageQuantities,
            salvageActions,
            salvageAmounts,
            salvageImages: salvageImagesArray,
            lossAccessorId,
            quotationId

        });

        res.status(201).json({
            message: 'Quotation created successfully!',
            quotation: newQuotation,
        });
    } catch (err) {
        console.error('Error creating quotation:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};


const Get_Quotation_Report = async(req, res) => {
    const { id } = req.params; // Get the quotation ID from the request parameters

    try {
        // Fetch the quotation
        const quotation = await Accessor_Quotation.findOne({
            where: { quotationId: id },
        });

        if (!quotation) {
            return res.status(404).json({ message: "Quotation not found" });
        }

        // Fetch the LossAccessor details using the lossAccessorId from the quotation
        const accessor = await LossAccessor.findOne({
            where: { id: quotation.lossAccessorId }, // Assuming `lossAccessorId` is a field in `Quotation`
        });

        // Fetch the LossAccessor details using the lossAccessorId from the quotation
        const company = await Company.findOne({
            where: { id: accessor.employee }, // Assuming `lossAccessorId` is a field in `Quotation`
        });

        const quotations = await Quotation.findOne({
            where: { id: quotation.quotationId },
        });


        res.status(200).json({

            ...quotation.toJSON(), // Convert quotation to JSON to merge data
            accessor: accessor || null, // Attach LossAccessor details, or null if not found
            company: company || null, // Attach LossAccessor details, or null if not found
            claim_data: quotations || null, // Attach LossAccessor details, or null if not found 
        });
    } catch (err) {
        console.error("Error fetching quotation:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};




// Get all quotations for the company
const getQuotations = async(req, res) => {
    const lossAccessorId = req.accessor.id; // Get the company ID from the request (middleware)

    try {
        // Fetch all quotations for the company
        const quotations = await Quotation.findAll({
            where: { lossAccessorId },
        });

        res.status(200).json(quotations);
    } catch (err) {
        console.error("Error fetching quotations:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getQuotationById = async(req, res) => {
    const { id } = req.params; // Get the quotation ID from the request parameters

    try {
        // Fetch the quotation
        const quotation = await Quotation.findOne({
            where: { id },
        });

        if (!quotation) {
            return res.status(404).json({ message: "Quotation not found" });
        }

        // Fetch the LossAccessor details using the lossAccessorId from the quotation
        const company = await Company.findOne({
            where: { id: quotation.companyId }, // Assuming `lossAccessorId` is a field in `Quotation`
        });

        res.status(200).json({
            ...quotation.toJSON(), // Convert quotation to JSON to merge data
            company: company || null, // Attach LossAccessor details, or null if not found
        });
    } catch (err) {
        console.error("Error fetching quotation:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    createQuotation,
    getQuotations,
    getQuotationById,
    Get_Quotation_Report
};