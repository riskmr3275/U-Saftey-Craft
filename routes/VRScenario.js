const express = require("express")
const router = express.Router()
const { auth, isInstructor } = require("../middlewares/auth")
const {
    uploadIdentity,
    verifyIdentity
} = require("../controllers/Identity")

const {auth,isEmployee,isEmployer} = require("../middlewares/auth")
 

//Upoad Identity by the Employee
router.post("/uploadIdentity", auth,isEmployee, uploadIdentity)
// Verify Identity by the Employer
router.put("/verifyIdentity", auth, isEmployer,verifyIdentity)
 
module.exports = router