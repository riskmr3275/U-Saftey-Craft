const express = require("express")
const router = express.Router()
const { auth, isInstructor } = require("../middlewares/auth")
const {
    getAllModules,
    completeModule
} = require("../controllers/Module")

const {auth,isEmployee,isEmployer} = require("../middlewares/auth")
 

//Upoad Identity by the Employee
router.get("/getAllModules", auth,isEmployee, getAllModules)
// Verify Identity by the Employer
router.put("/completeModule", auth, isEmployer,completeModule)
 
module.exports = router