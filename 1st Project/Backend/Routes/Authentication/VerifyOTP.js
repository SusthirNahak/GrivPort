
const express = require("express");
const router = express.Router();

const { getStoredOTP } = require("./SendOTP");

router.post("/verifyOTP", (req, res) => {
  const userOTP = req.body.otpString;
  const storedOTP = getStoredOTP();
  
  if (!userOTP) {
    return res.status(400).json({ success: false, error: "OTP is required" });
  }

  if (!storedOTP) {
    return res
      .status(400)
      .json({ success: false, error: "No OTP generated yet" });
  }


  if (Number(userOTP) === Number(storedOTP)) {
    res
      .status(200)
      .json({ success: true, message: "OTP Verified Successfully" });
  } else {
    res.status(400).json({ success: false, message: "Invalid OTP" });
  }
});

module.exports = router;
