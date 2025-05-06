const twilio = require("twilio");
const crypto = require("crypto");
const express = require("express");
const router = express.Router();

require("dotenv").config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_ACCOUNT_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);

let storedOTP = null;

const generateOtp = () => {
  const otp = crypto.randomInt(1000, 10000);
  storedOTP = otp;
  return otp;
};

const getStoredOTP = () => storedOTP;

router.post("/sendOTP", (req, res) => {
  const { toPhoneNumber } = req.body;

  if (!toPhoneNumber) {
    return res
      .status(400)
      .json({ success: false, error: "Phone number is required" });
  }

  const otp = generateOtp();

  try {
    client.messages.create({
      body: `Your OTP is: ${otp}`,
      to: toPhoneNumber,
      from: process.env.TWILIO_ACCOUNT_FROM_PHONE_NUMBER,
    });

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

module.exports = { router, getStoredOTP };
