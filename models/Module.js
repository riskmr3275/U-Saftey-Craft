const mongoose = require("mongoose");

const ModuleSchema = new mongoose.Schema({
  title: {
    type: String, required: true
  },
  description: {
    type: String, required: true
  },
  content: {
    type: String,
    required: true
  }, // Link to e-learning content
  quizzes: [{
    question: String,
    options: [String],
    answer: String
  }], // Optional quizzes
  createdAt: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model("Module", ModuleSchema);
