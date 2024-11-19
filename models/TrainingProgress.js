
const mongoose = require("mongoose");
const TrainingProgressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  moduleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Module",
    required: true
  },
  progress: {
    type: Number,
    default: 0
  }, // Progress percentage (0-100)
  score: {
    type: Number
  }, // Quiz score, if applicable
  status: {
    type: String,
    enum: ["not started", "in progress", "completed"], default: "not started"
  },
  lastAccessedAt: {
    type: Date
  },
});

module.exports = mongoose.model("TrainingProgress", TrainingProgressSchema);
