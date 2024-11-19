const express = require("express")
const router = express.Router()
const { auth, isInstructor } = require("../middlewares/auth")
const {
    getAnalytics,
    submitFeedback
} = require("../controllers/AnlyticsFeedback")

const {auth,isEmployee,isEmployer} = require("../middlewares/auth")
 

//Upoad Identity by the Employee
router.post("/getAnalytics", auth,isEmployee, getAnalytics)
// Verify Identity by the Employer
router.put("/submitFeedback", auth, isEmployer,submitFeedback)
 
module.exports = router