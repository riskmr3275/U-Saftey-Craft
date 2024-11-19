const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    contactNumber:
    {
        type: Number,
        required: true,
        trim: true
    },
    role: {
        type: String,
        enum: ["Employee", "Employer", "Admin"],
        default: "Employee"
    },
    additionalDetails: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Profile"
    },
    token: {
        type: String,
        expires: 5 * 60 * 60 //5 hours in seconds
    },
    resetPasswordExpires: {
        type: Date
    },
    companyName: {
        type: String
    },
    employeeNumber: {
        type: String
    },
    photo: {
        type: String
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    verificationDate: {
        type: Date
    },
});

module.exports = mongoose.model("User", UserSchema);
