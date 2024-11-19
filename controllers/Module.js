const Module = require("../models/Module");
const TrainingProgress = require("../models/TrainingProgress");

// Get All Modules
exports.getAllModules = async (req, res) => {
  try {
    const modules = await Module.find();
    res.status(200).json(modules);
  } catch (error) {
    res.status(500).json({ message: "Error fetching modules", error });
  }
};

// Complete a Module
exports.completeModule = async (req, res) => {
    const userId=req.user.id;
  const { moduleId, answers } = req.body;

  try {
    const module = await Module.findById(moduleId);
    if (!module) return res.status(404).json({ message: "Module not found" });

    const progress = await TrainingProgress.findOneAndUpdate(
      { userId, moduleId },
      { progress: 100, status: "completed" },
      { new: true, upsert: true }
    );

    res.status(200).json({ message: "Module completed", progress });
  } catch (error) {
    res.status(500).json({ message: "Error completing module", error });
  }
};
