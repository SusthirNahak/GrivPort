import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PopUp from "./popUp";
// import GrievanceForm from "./GrievanceForm";

const VerifyOTP = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isValid, setIsValid] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [triggerAnimation, setTriggerAnimation] = useState(false);
  const [error, setError] = useState(null);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [data, setData] = useState({});
  // const [isVerified, setIsVerified] = useState(false);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Set the document title
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

    // console.log("OTP: ", otp.join(""));

    let otpString = otp.join("");

    try {
      const response = await fetch("http://localhost:5000/verifyOTP", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otpString }),
      });

      const data = await response.json();

      // console.log("DATA FROM BACKEND VERIFY OTP: ", data);

      // const safeData = JSON.stringify(data, (key, value) =>
      //   value === data ? undefined : value
      // );
      // console.log("DATA FROM BACKEND VERIFY OTP: ", safeData);

      setData(data);

      if (data.success) {
        setTimeout(() => {
          // setIsVerified(true);
          navigate("/home");
          // alert("sucessful navigation");
          setOtp(["", "", "", ""]);
          inputRefs.current[0]?.focus();
        }, 1000); // Wait for green animation to complete
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
      // if (!isValid) {
      //   setOtp(["", "", "", ""]); // Reset OTP on wrong entry
      //   inputRefs.current[0]?.focus();
      // }
    }, 1000);
  };

  const handleResend = async () => {
    if (resendCooldown > 0) return;
    setResendCooldown(10);
    setError(null);

    try {
      await fetch("http://localhost:5000/resendOTP", {
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

  // If OTP is verified, render SelectGrievance instead of the OTP form
  // if (isVerified) {
  //   return <GrievanceForm />;
  // }

  return (
    <div className="flex flex-col items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <div className="my-7 space-x-2 flex justify-center">
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
              className={`w-12 h-12 text-center text-2xl border-2 rounded-md text-black
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

        <button
          type="submit"
          className={`w-full px-4 py-2 text-black rounded-lg font-semibold bg-green-600
            active:outline-2 active:outline-green-800 active:outline-offset-3 
            hover:bg-green-700 transition-all duration-150 cursor-pointer
            ${!isButtonEnabled && "opacity-50 cursor-not-allowed"}`}
          disabled={!isButtonEnabled}
        >
          Verify
        </button>
      </form>

      <div className="mt-4">
        <button
          type="button"
          onClick={handleResend}
          disabled={resendCooldown > 0}
          className={`text-black hover:underline cursor-pointer ${
            resendCooldown > 0 ? "opacity-50" : "hover:underline"
          }`}
        >
          {resendCooldown > 0
            ? `Resend OTP (${resendCooldown}s)`
            : "Resend OTP"}
        </button>
      </div>

      <PopUp isOpen={showPopup} setIsOpen={handlePopupClose} type={data} />

      <style jsx>{`
        @keyframes borderGreen {
          0% {
            border-color: black;
            border-width: 2px;
          }
          25% {
            border-left-color: #10b981;
            border-width: 2px;
          }
          50% {
            border-top-color: #10b981;
            border-width: 2px;
          }
          75% {
            border-right-color: #10b981;
            border-width: 2px;
          }
          100% {
            border-color: #10b981;
            border-width: 2px;
          }
        }

        @keyframes borderRed {
          0% {
            border-color: black;
            border-width: 2px;
          }
          25% {
            border-left-color: #ef4444;
            border-width: 2px;
          }
          50% {
            border-top-color: #ef4444;
            border-width: 2px;
          }
          75% {
            border-right-color: #ef4444;
            border-width: 2px;
          }
          100% {
            border-color: #ef4444;
            border-width: 2px;
          }
        }

        .animate-border-green {
          animation: borderGreen 1s ease-in-out forwards;
        }

        .animate-border-red {
          animation: borderRed 1s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
};

export default VerifyOTP;
