const VRScenario = require("../models/VRScenario");

// Get All VR Scenarios
exports.getAllVRScenarios = async (req, res) => {
  try {
    const scenarios = await VRScenario.find();
    res.status(200).json(scenarios);
  } catch (error) {
    res.status(500).json({ message: "Error fetching VR scenarios", error });
  }
};

// Repeat a Scenario
exports.repeatScenario = async (req, res) => {
  const { userId, scenarioId } = req.body;

  try {
    const scenario = await VRScenario.findById(scenarioId);
    if (!scenario) return res.status(404).json({ message: "Scenario not found" });

    res.status(200).json({ message: "Scenario repeat initiated", scenario });
  } catch (error) {
    res.status(500).json({ message: "Error repeating scenario", error });
  }
};
