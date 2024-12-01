const Quotation = require("../../models/company/Company_Quotation");
const LossAccessor = require("../../models/loss_Accessors/LossAccessor");

// Create a new quotation
const createQuotation = async(req, res) => {
    const {
        claimNumber,
        customerName,
        phoneNumber,
        vehiclePlate,
        damageDescription,
        deadlineDate,
        inspectionAddress,
        quotationValue,
        quotationDescription,

        notes,
        lossAccessorId,
    } = req.body;

    const companyId = req.company.id; // Assuming company ID is attached to the request (e.g., via middleware)
    // Get file paths for the quotation file and supporting documents from the request
    const quotationFile = req.files ? req.files.quotationFile[0].filename : null; // For a single file
    const supportingDocuments = req.files && req.files.supportingDocuments ? req.files.supportingDocuments.map(file => file.filename) : null; // For multiple files

    try {
        // Create a new quotation record
        const newQuotation = await Quotation.create({
            claimNumber,
            customerName,
            phoneNumber,
            vehiclePlate,
            damageDescription,
            deadlineDate,
            inspectionAddress,
            quotationValue,
            quotationDescription,
            quotationFile,
            supportingDocuments,
            notes,
            lossAccessorId, // Link to the LossAccessor
            companyId // Link to the Company
        });

        res.status(201).json({ message: "Quotation created successfully!", quotation: newQuotation });
    } catch (err) {
        console.error("Error creating quotation:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get all quotations for the company
const getQuotations = async(req, res) => {
    const companyId = req.company.id; // Get the company ID from the request (middleware)

    try {
        // Fetch all quotations for the company
        const quotations = await Quotation.findAll({
            where: { companyId },
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
        const lossAccessor = await LossAccessor.findOne({
            where: { id: quotation.lossAccessorId }, // Assuming `lossAccessorId` is a field in `Quotation`
        });

        res.status(200).json({
            ...quotation.toJSON(), // Convert quotation to JSON to merge data
            lossAccessor: lossAccessor || null, // Attach LossAccessor details, or null if not found
        });
    } catch (err) {
        console.error("Error fetching quotation:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};



module.exports = {
    createQuotation,
    getQuotations,
    getQuotationById
};