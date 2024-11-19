const mongoose = require("mongoose");

const VRScenarioSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    scenarioFile: { type: String, required: true }, // VR file or scenario data
    difficulty: { type: String, enum: ["easy", "medium", "hard"], required: true },
    repeatable: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
  });
  
  module.exports = mongoose.model("VRScenario", VRScenarioSchema);
  