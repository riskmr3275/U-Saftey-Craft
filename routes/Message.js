const express = require("express")
const router = express.Router()
const { auth, isInstructor } = require("../middlewares/auth")
const {
    sendMessage,
} = require("../controllers/Message")

const {auth,isEmployee,isEmployer} = require("../middlewares/auth")
 

//Upoad Identity by the Employee
router.get("/sendMessage", auth,isEmployee, sendMessage)
 
 
module.exports = router