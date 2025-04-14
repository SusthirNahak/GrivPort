import React, { useState, useEffect } from "react";
import SignIn from "./SignIn";
import VerifyOTP from "./VerifyOtp";

export default function LandingPage() {
  const [showVerifyOTP, setShowVerifyOTP] = useState(false); // State to toggle between SignIn and VerifyOTP

  // Callback to switch to VerifyOTP after successful SignIn
  const handleSignInSuccess = () => {
    setShowVerifyOTP(true);
  };

  useEffect(() => {
    // Set the document title
    document.title = "Landing Page/Sign IN";
  }, []);

  return (
    <>
      <div className="md:flex h-[100vh] w-full bg-amber-100">
        {/* Upper Half */}
        <div className="w-full h-[60%] flex flex-col justify-center items-center md:w-[65%] md:h-full">
          <div className="mx-auto mb-0 flex justify-center items-center">
            <img
              src="https://static.vecteezy.com/system/resources/previews/036/139/726/non_2x/hand-drawn-namaste-gesture-vector.jpg"
              alt="Namaste gesture"
              className="h-56 w-56 mix-blend-color-burn hue-rotate-0 saturate-[50] brightness-100"
            />
          </div>
          <h2 className="text-5xl text-orange-700 font-semibold py-5 md:text-6xl">
            Welcome to
          </h2>
          <h1 className="text-xl font-bold text-gray-800 pb-4 capitalize md:text-3xl">
            Grievance Management Portal
          </h1>
          <p className="text-md text-gray-600 font-normal md:text-xl">
            For Public Complaints Handling
          </p>
        </div>

        {/* Lower Half */}
        <div
          className="w-full h-[40%] flex flex-col justify-center px-10 md:w-[35%] md:h-full md:bg-[#f8f8f8]"
          
        >
          {/* <div> */}
            {!showVerifyOTP ? (
              <SignIn onSignInSuccess={handleSignInSuccess} />
            ) : (
              <VerifyOTP />
            )}

            <div className="mt-5 text-center md:mt-10">
              <p className="text-lg font-md text-black">
                By signing in, you agree to our{" "}
                <span className="cursor-pointer text-blue-700 hover:underline">
                  Terms of Service
                </span>{" "}
                and{" "}
                <span className="cursor-pointer text-blue-700 hover:underline">
                  Privacy Policy
                </span>
                .
              </p>
            </div>
          {/* </div> */}
        </div>
      </div>
    </>
  );
}
