const express = require("express")
const router = express.Router()
const { auth, isInstructor } = require("../middlewares/auth")
const {
    getAllVRScenarios,
    repeatScenario
} = require("../controllers/VRScenario")

const {auth,isEmployee,isEmployer} = require("../middlewares/auth")
 

//Upoad Identity by the Employee
router.post("/getAllVRScenarios", auth,isEmployee, getAllVRScenarios)
// Verify Identity by the Employer
router.put("/repeatScenario", auth, isEmployer,repeatScenario)
 
module.exports = router