const Identity = require("../models/Identity");

// Upload Identity Documents
exports.uploadIdentity = async (req, res) => {
    const userId = req.user.id;
    const { idType } = req.body;
    const { idFront, idBack, certifications } = req.files || {};

    // Validate required fields
    if (!idType || !idFront || !idBack || !certifications) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Upload files to Cloudinary
        const idFrontUrl = await uploadImageToCloudinary(idFront[0], process.env.FOLDER_NAME, 1000, 1000);
        const idBackUrl = await uploadImageToCloudinary(idBack[0], process.env.FOLDER_NAME, 1000, 1000);
        const certificationsUrls = await Promise.all(
            certifications.map(file => uploadImageToCloudinary(file, process.env.FOLDER_NAME, 1000, 1000))
        );

        // Save identity data to the database
        const identity = new Identity({ 
            userId, 
            idType, 
            idFront: idFrontUrl, 
            idBack: idBackUrl, 
            certifications: certificationsUrls 
        });
        await identity.save();

        res.status(201).json({ message: "Identity uploaded successfully", identityId: identity._id });
    } catch (error) {
        res.status(500).json({ message: "Identity upload failed", error: error.message });
    }
};

// Verify Identity
exports.verifyIdentity = async (req, res) => {
    const { userId } = req.params;
    try {
        const identity = await Identity.findOne({ userId });
        if (!identity) return res.status(404).json({ message: "Identity not found" });

        identity.status = "approved";
        identity.verifiedAt = new Date();
        await identity.save();

        res.status(200).json({ message: "Identity verified successfully" });
    } catch (error) {
        res.status(500).json({ message: "Identity verification failed", error: error.message });
    }
};
