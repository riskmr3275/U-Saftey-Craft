const Analytics = require("../models/Analytics");
const Feedback = require("../models/Feedback");

// Get Analytics for a User
exports.getAnalytics = async (req, res) => {
  const { userId } = req.params;

  try {
    const analytics = await Analytics.find({ userId });
    res.status(200).json(analytics);
  } catch (error) {
    res.status(500).json({ message: "Error fetching analytics", error });
  }
};

// Submit Feedback
exports.submitFeedback = async (req, res) => {
  const { userId, moduleId, vrScenarioId, comments, ratings } = req.body;

  try {
    const feedback = new Feedback({ userId, moduleId, vrScenarioId, comments, ratings });
    await feedback.save();

    res.status(201).json({ message: "Feedback submitted successfully", feedbackId: feedback._id });
  } catch (error) {
    res.status(500).json({ message: "Error submitting feedback", error });
  }
};
