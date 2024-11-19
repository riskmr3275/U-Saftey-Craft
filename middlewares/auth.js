const jwt = require("jsonwebtoken")
require("dotenv").config();
const OTP = require("../models/Otp")
// auth
exports.auth =(req, res, next) => {
    try {
        // Extract Token
        const token = req.cookies.token || req.body.token || req.header("authorization")?.replace("Bearer ", "");
        // if token is missing
        console.log("token is in auth::",token);
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token is Missing"
            });
        }
        // verify the token
        console.log("Going to do decode");
        try {
            const decode =   jwt.verify(token, process.env.JWT_SECRET)//decode conatin payload
            console.log(decode);
            req.user = decode
            next();
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "token is invalid",
                error:error.message
            });
        }
        
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "something went wrong while validating the token"
        })
    }
}

// ++++++++++++++++++++++++++++isStudent+++++++++++++++++++++++++++++++++++++++++++


exports.isEmployee = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Employee") {
            return res.status(401).json({
                success: false,
                message: "This is protected route for Employee only"
            });
        }
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Employee role cannot verified please try again"
        });
    }
}

// +++++++++++++++++=IsInstructor+++++++++++++++++++++++++++++++

exports.isEmployer = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Employer") {
            return res.status(401).json({
                success: false,
                message: "This is protected route for Employer only"
            });
        }
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Employer role cannot verified please try again"
        });
    }
}

// ++++++++++++++++++isAdmin++++++++++++++++++


exports.isAdmin = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Admin") {
            return res.status(401).json({
                success: false,
                message: "This is protected route for Admin only"
            });
        }
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Admin role cannot verified please try again"
        });
    }
}




 
const verifyOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    // Check if email and otp are provided
    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });
    }

    // Find the most recent OTP entry for the given email
    const recentOtp = await OTP.findOne({ email }).sort({ createdAt: -1 });

    if (!recentOtp) {
      // OTP not found
      return res.status(400).json({
        success: false,
        message: "OTP not found",
      });
    }

    // Validate the OTP
    if (otp !== recentOtp.otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // Proceed to the next middleware or controller
    next();
  } catch (error) {
    // Handle unexpected errors
    console.error("Error in OTP verification middleware:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = verifyOtp;


// Middleware in Node.js is a function that processes requests and responses in the middle
//  of the request-response cycle. It can modify the request and response objects, end the
//   request-response cycle, or call the next middleware function in the stack. Middleware
//   functions are essential for tasks such as handling authentication, logging, parsing request bodies, and more.