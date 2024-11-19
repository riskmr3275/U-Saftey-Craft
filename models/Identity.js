const mongoose = require("mongoose");
const IdentitySchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    idType: {
        type: String,
        required: true
    }, 
    // e.g., Passport, Driver's License
    idFront: {
        type: String,
        required: true
    }, 
    idBack: {
        type: String,
        required: true
    }, 
    // File URL
    certifications: [{
        type: String
    }], // Array of certification file URLs
    status: {
        type: String,
        enum: ["pending", "approved", "rejected"], default: "pending"
    },
    verifiedAt: {
        type: Date
    },
});

module.exports = mongoose.model("Identity", IdentitySchema);
