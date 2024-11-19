const mongoose = require("mongoose");
const AnalyticsSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    moduleId: { type: mongoose.Schema.Types.ObjectId, ref: "Module" },
    vrScenarioId: { type: mongoose.Schema.Types.ObjectId, ref: "VRScenario" },
    feedback: { type: String },
    improvementSuggestions: [{ type: String }],
    createdAt: { type: Date, default: Date.now },
  });
  
  module.exports = mongoose.model("Analytics", AnalyticsSchema);
  