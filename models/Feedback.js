const mongoose = require("mongoose");
const FeedbackSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    moduleId: { type: mongoose.Schema.Types.ObjectId, ref: "Module" },
    vrScenarioId: { type: mongoose.Schema.Types.ObjectId, ref: "VRScenario" },
    comments: { type: String, required: true },
    ratings: { type: Number, min: 1, max: 5 },
    createdAt: { type: Date, default: Date.now },
  });
  
  module.exports = mongoose.model("Feedback", FeedbackSchema);
  