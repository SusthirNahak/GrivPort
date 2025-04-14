// console.log("verifyOTP.js loaded");

const express = require("express");
const router = express.Router();

const { getStoredOTP } = require("./SendOTP");

router.post("/verifyOTP", (req, res) => {
  const userOTP = req.body.otpString;
  const storedOTP = getStoredOTP();

  // console.log("WITHOUT STRINGIFY BODY: ", req.body);
  // console.log("BODY: ", JSON.stringify(req.body));
  // console.log("userOTP: ", userOTP);
  // console.log("Stored OTP: ", storedOTP);

  if (!userOTP) {
    return res.status(400).json({ success: false, error: "OTP is required" });
  }

  if (!storedOTP) {
    // console.log("Stored OTP in VerifyOTP.js: ", storedOTP);
    
    return res
      .status(400)
      .json({ success: false, error: "No OTP generated yet" });
  }

  // console.log("userOTP: ", userOTP);

  if (Number(userOTP) === Number(storedOTP)) {
    res
      .status(200)
      .json({ success: true, message: "OTP Verified Successfully" });
  } else {
    res.status(400).json({ success: false, message: "Invalid OTP" });
  }
});

module.exports = router;
