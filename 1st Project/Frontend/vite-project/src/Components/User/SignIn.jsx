import React, { useState, useEffect } from "react";

import PopUp from "./popUp";

const apiKey = import.meta.env.VITE_API_KEY;

export default function SignIn({ onSignInSuccess }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  useEffect(() => {
  }, [popupMessage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!phoneNumber.match(/^[6-9]{1}[0-9]{9}$/)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    if (phoneNumber && !isSubmitted) {
      setIsSubmitting(true);
      const countryCode = "+91";
      const fullPhoneNumber = countryCode + phoneNumber;

      try {
        const response = await fetch(`${apiKey}/sendOTP`, {

          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ toPhoneNumber: fullPhoneNumber }),
        });

        const data = await response.json();
        setIsSubmitting(false);
        setShowPopup(true);
        if (data.success) {
          setIsSubmitted(true);
          setPopupMessage(data);
        } else {
          setPopupMessage(data);
        }
      } catch (error) {
        setIsSubmitting(false);
        setShowPopup(true);
        setPopupMessage(
          "An error occurred while sending OTP. Please try again."
        );
        console.error("Fetch error:", error);
      }
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    if (isSubmitted) {
      onSignInSuccess(phoneNumber);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="relative mb-6">
        <input
          type="text"
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder=" "
          maxLength="10"
          pattern="[6-9]{1}[0-9]{9}"
          required
          className="peer w-full border border-gray-400 rounded-md px-6 py-3 text-sm placeholder-transparent focus:outline-2 focus:outline-black focus:outline-offset-4 focus:border-black"
        />

        <label
          htmlFor="phoneNumber"
          className="absolute left-[20%] -top-3.5 transform -translate-x-1/2 px-2 text-sm transition-all duration-300 ease-in-out bg-[#f5e790] peer-placeholder-shown:top-2 peer-placeholder-shown:left-20 peer-placeholder-shown:transform-none peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-4 peer-focus:left-[20%] peer-focus:-translate-x-1/2 peer-focus:text-sm peer-focus:text-black text-black rounded-lg leading-1.5"
        >
          Phone Number <sup className="text-red-500 text-lg">*</sup>
        </label>

      </div>

      <button
        type="submit"
        disabled={isSubmitting || isSubmitted}
        className={`w-full py-3 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition duration-200 cursor-pointer ${isSubmitting || isSubmitted ? "opacity-50 cursor-not-allowed" : ""
          }`}
      >

        {isSubmitting ? "..." : "Get OTP"}
      </button>

      <PopUp
        isOpen={showPopup}
        setIsOpen={handlePopupClose}
        type={popupMessage}
      />
    </form>
  );
}


