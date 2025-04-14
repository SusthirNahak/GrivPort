const twilio = require("twilio");
const crypto = require("crypto");
const express = require("express");
const router = express.Router();

// Your Twilio account SID and Auth token (Get these from your Twilio Console)
// const accountSid = "AC3f6df0bd9356855f8069e30e659fdf86"; // Replace with your account SID
// const authToken = "5b085aa0fb0cc2aa7ea7a87157a8792a"; // Replace with your Auth token
// const client = new twilio(accountSid, authToken);

let storedOTP = null;

// Generate a secure 4-digit OTP using crypto
const generateOtp = () => {
  // Generates a random 4-digit OTP
  const otp = crypto.randomInt(1000, 10000); // Random number between 1000 and 9999
  storedOTP = otp;
  // console.log("Generated OTP:", otp);
  // console.log("Stored OTP:", storedOTP);
  return otp;
};

// Endpoint to send OTP
router.post("/sendOTP", (req, res) => {
  // console.log(req.body);
  
  const { toPhoneNumber } = req.body;

  // function sendOTP(toPhoneNumber) {
  if (!toPhoneNumber) {
    return res
      .status(400)
      .json({ success: false, error: "Phone number is required" });
  }

  const otp = generateOtp(); // Generate the OTP

  try {
    // client.messages.create({
    //   body: `Your OTP is: ${otp}`, // Customize the OTP message
    //   to: toPhoneNumber, // The phone number you want to send OTP to
    //   from: "+19566921338", // Your Twilio phone number
    // });

    console.log("OTP sent successfully:", otp);
    res.status(200).json({ success: true, message: "OTP Sent Successfully" });
  } catch (error) {
    console.error("Error sending OTP:", error.message);
    res.status(500).json({
      success: false,
      error: "Failed to Send OTP",
      details: error.message,
    });
  }
});

module.exports = { router, getStoredOTP: () => storedOTP };

// sendOTP("+919348020443");
