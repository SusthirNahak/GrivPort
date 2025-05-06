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
            <div className="min-h-screen flex items-center justify-center mt-4">
                <div className="relative bg-white p-6 rounded-xl shadow-md max-w-md w-full space-y-6">
                    {/* Phone Number Label and Input */}
                    <div>
                        <label htmlFor="phoneNumber" className="block text-lg font-semibold text-gray-800 mb-2">
                            Phone Number <sup className="text-red-500 text-base">*</sup>
                        </label>
                        <input
                            type="tel"
                            id="phoneNumber"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="98******67"
                            maxLength="10"
                            pattern="[6-9]{1}[0-9]{9}"
                            required
                            className="w-full border border-gray-300 rounded-lg px-5 py-3 text-base text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-black focus:outline-none transition duration-200"
                        />
                    </div>

                    {/* Agreement Checkbox */}
                    <div>
                        <div className="flex items-start gap-3">
                            <input
                                id="agreement"
                                type="checkbox"
                                className="mt-1 h-5 w-5 text-black border-gray-300 rounded focus:ring-black"
                                required
                            />
                            <label htmlFor="agreement" className="text-sm sm:text-base text-gray-700 font-medium text-justify">
                                By signing in, you agree to our{" "}
                                <span className="text-blue-700 hover:underline cursor-pointer">Terms of Service</span>{" "}
                                and{" "}
                                <span className="text-blue-700 hover:underline cursor-pointer">Privacy Policy</span>.
                            </label>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting || isSubmitted}
                        className={`w-full py-3 rounded-md font-semibold text-white transition duration-200 ${isSubmitting || isSubmitted
                                ? "bg-green-500 opacity-50 cursor-not-allowed"
                                : "bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-300"
                            }`}
                    >
                        {isSubmitting ? "..." : "Get OTP"}
                    </button>

                    {/* QR Code */}
                    <div className="flex justify-center items-center pt-4">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg"
                            alt="QR Code"
                            className="h-24 w-24 rounded-md border border-gray-300 shadow-sm"
                        />
                    </div>
                </div>
            </div>

            <PopUp
                isOpen={showPopup}
                setIsOpen={handlePopupClose}
                type={popupMessage}
            />
        </form>
    );
}


