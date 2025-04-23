import React, { useState, useEffect } from "react";

import Cookies from 'js-cookie';

import PopUp from "./popUp";

export default function SignIn({ onSignInSuccess }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  // Log popupMessage updates for debugging
  useEffect(() => {
    // console.log("Popup Message Updated: ", popupMessage);
  }, [popupMessage]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate phone number
    if (!phoneNumber.match(/^[6-9]{1}[0-9]{9}$/)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    if (phoneNumber && !isSubmitted) {
      setIsSubmitting(true);
      const countryCode = "+91";
      const fullPhoneNumber = countryCode + phoneNumber;

      try {
        // API call with async/await
        const response = await fetch("http://localhost:5000/sendOTP", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ toPhoneNumber: fullPhoneNumber }),
        });

        const data = await response.json();
        setIsSubmitting(false);
        // console.log("API Response:", data);
        setShowPopup(true);

        // console.log("DATA FROM BACKEND: ", data);

        // const safeData = JSON.stringify(data, (key, value) =>
        //   value === data ? undefined : value
        // );
        // console.log("DATA FROM BACKEND: ", safeData);

        if (data.success) {
          // console.log("DATA: ", data);
          setIsSubmitted(true);
          // console.log("true");
          setPopupMessage(data);
          // onSignInSuccess moved to handlePopupClose
          Cookies.set("setPhoneNumber", phoneNumber)
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

  // Handle popup close and trigger navigation only if submission was successful
  const handlePopupClose = () => {
    setShowPopup(false);
    if (isSubmitted) {
      onSignInSuccess(); // Navigate to VerifyOTP only after popup is closed
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4 w-full" >
        <label
          htmlFor="phoneNumber"
          className="block text-lg font-medium text-black pb-3 md:"
        >
          Phone Number<sup className="text-red-500 text-lg">*</sup>
        </label>

        <div className="relative">
          <span className="absolute top-1/2 transform -translate-y-1/2 text-black text-lg border-r-1 px-2">
            +91
          </span>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="81******78"
            className={`w-full pl-15 py-2.5 border-1 border-black text-black rounded-lg text-lg bg-transparent
              transition duration-150 focus:outline-2 focus:outline-black focus:outline-offset-4`}
            maxLength="10"
            pattern="[6-9]{1}[0-9]{9}"
            required
            disabled={isSubmitted}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting || isSubmitted}
        className={`w-full py-3 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition duration-200 cursor-pointer ${
          isSubmitting || isSubmitted ? "opacity-50 cursor-not-allowed" : ""
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


<div class="relative mb-6">
                            <input
                                type="text"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder=" "
                                required
                                class="peer w-full border border-gray-400 rounded-md px-6 py-3 text-sm placeholder-transparent focus:outline-2 focus:outline-black focus:outline-offset-4 focus:border-black"
                            />

                            <label
                                for="email"
                                class="absolute left-[20%] -top-3.5 transform -translate-x-1/2 px-2 text-sm transition-all duration-300 ease-in-out bg-[#f5e790] peer-placeholder-shown:top-2 peer-placeholder-shown:left-12 peer-placeholder-shown:transform-none peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-4 peer-focus:left-[20%] peer-focus:-translate-x-1/2 peer-focus:text-sm peer-focus:text-black text-black rounded-lg leading-1.5"
                            >
                                Email <sup class="text-red-500 text-lg">*</sup>
                            </label>

                        </div>