import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PopUp from "./popUp";
import Cookies from 'js-cookie';

const apiKey = import.meta.env.VITE_API_KEY;


const VerifyOTP = ({ phoneNumber }) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isValid, setIsValid] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [triggerAnimation, setTriggerAnimation] = useState(false);
  const [error, setError] = useState(null);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [data, setData] = useState({});
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Landing Page/Verify OTP";
  }, []);

  useEffect(() => {
    inputRefs.current[0]?.focus();

    if (resendCooldown > 0) {
      const timer = setTimeout(
        () => setResendCooldown(resendCooldown - 1),
        1000
      );
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (value && !/^[0-9]$/.test(value)) return;
    if (value.length > 1) return;

    const newOtp = [...otp];
    const previousValue = newOtp[index];
    newOtp[index] = value;
    setOtp(newOtp);

    if (
      value &&
      !previousValue &&
      index < otp.length - 1 &&
      !newOtp[index + 1]
    ) {
      inputRefs.current[index + 1].focus();
    }

    const allFilled = newOtp.every((digit) => digit !== "");
    setIsValid(allFilled && newOtp.join(""));
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");
    if (paste.length === 4 && /^[0-9]{4}$/.test(paste)) {
      const newOtp = paste.split("");
      setOtp(newOtp);
      setIsValid(newOtp.join(""));
      inputRefs.current[3].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTriggerAnimation(true);
    setError(null);

    let otpString = otp.join("");

    try {
        const response = await fetch(`${apiKey}/verifyOTP`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otpString }),
      });

      const data = await response.json();
      setData(data);

      if (data.success) {
        setTimeout(() => {
          Cookies.set("setPhoneNumber", phoneNumber)
          navigate("/home");
          setOtp(["", "", "", ""]);
          inputRefs.current[0]?.focus();
        }, 1000);
      } else {
        setShowPopup(true);
        setIsValid(false);
      }
    } catch (error) {
      setShowPopup(true);
      setIsValid(false);
      console.error("Fetch error:", error);
    }

    setTimeout(() => {
      setTriggerAnimation(false);
    }, 1000);
  };

  const handleResend = async () => {
    if (resendCooldown > 0) return;
    setResendCooldown(10);
    setError(null);

    try {
        await fetch(`${apiKey}/resendOTP`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      setError("Failed to resend OTP");
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    setIsSubmitted(false);

    setOtp(["", "", "", ""]);
    inputRefs.current[0]?.focus();
  };

  const isButtonEnabled = otp.every((digit) => digit !== "");

  return (
<div className="min-h-screen flex items-center justify-center bg-transparent">
  <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm text-center space-y-6 mt-3 ">
    <form onSubmit={handleSubmit} className="pt-6">
      {/* OTP Inputs */}
      <div className="flex justify-center gap-3 mb-4">
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            value={digit}
            ref={(el) => (inputRefs.current[index] = el)}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={index === 0 ? handlePaste : undefined}
            className={`w-12 h-12 text-center text-2xl border-2 rounded-md text-black transition duration-150
              ${
                !isSubmitted
                  ? "border-black"
                  : isValid && triggerAnimation
                  ? "animate-border-green border-green-400"
                  : !isValid && triggerAnimation
                  ? "animate-border-red border-red-500"
                  : "border-black"
              }
              focus:outline-2 focus:outline-black focus:outline-offset-3`}
            aria-label={`OTP digit ${index + 1}`}
          />
        ))}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className={`w-full py-3 rounded-md font-semibold text-white transition duration-200
          ${
            !isButtonEnabled
              ? "bg-green-500 opacity-50 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-300"
          }`}
        disabled={!isButtonEnabled}
      >
        Verify
      </button>
    </form>

    {/* Resend Button */}
    <div className="">
      <button
        type="button"
        onClick={handleResend}
        disabled={resendCooldown > 0}
        className={`text-sm text-black font-medium ${
          resendCooldown > 0
            ? "opacity-50 cursor-not-allowed"
            : "hover:underline cursor-pointer"
        }`}
      >
        {resendCooldown > 0
          ? `Resend OTP (${resendCooldown}s)`
          : "Resend OTP"}
      </button>
    </div>

    {/* PopUp Component */}
    <PopUp isOpen={showPopup} setIsOpen={handlePopupClose} type={data} />

    {/* Animations */}
    <style jsx>{`
      @keyframes borderGreen {
        0% {
          border-color: black;
        }
        25% {
          border-left-color: #10b981;
        }
        50% {
          border-top-color: #10b981;
        }
        75% {
          border-right-color: #10b981;
        }
        100% {
          border-color: #10b981;
        }
      }

      @keyframes borderRed {
        0% {
          border-color: black;
        }
        25% {
          border-left-color: #ef4444;
        }
        50% {
          border-top-color: #ef4444;
        }
        75% {
          border-right-color: #ef4444;
        }
        100% {
          border-color: #ef4444;
        }
      }

      .animate-border-green {
        animation: borderGreen 0.8s ease-in-out forwards;
      }

      .animate-border-red {
        animation: borderRed 0.8s ease-in-out forwards;
      }
    `}</style>
  </div>
</div>

  );
};

export default VerifyOTP;
