import React, { useState, useEffect } from "react";
import SignIn from "../Components/User/SignIn";
import VerifyOTP from "../Components/User/VerifyOtp";

export default function Landing() {
  const [showVerifyOTP, setShowVerifyOTP] = useState(false); // State to toggle between SignIn and VerifyOTP

  // Callback to switch to VerifyOTP after successful SignIn
  const handleSignInSuccess = () => {
    setShowVerifyOTP(true);
  };

  useEffect(() => {
    // Set the document title
    document.title = 'Landing Page/Sign IN';
  }, []);

  return (
    <div className="h-screen flex flex-col">
      {/* Upper Half */}
      <div className="relative h-[50%] bg-amber-100 overflow-hidden flex justify-center">
        <div className="p-4 text-center relative z-10">
          <div className="mx-auto mb-0 flex justify-center items-center bg-amber-100">
            <img
              src="https://static.vecteezy.com/system/resources/previews/036/139/726/non_2x/hand-drawn-namaste-gesture-vector.jpg"
              alt="Namaste gesture"
              className="h-w-16 w-16 mix-blend-color-burn hue-rotate-0 saturate-[50] brightness-100"
            />
          </div>
          <h2 className="text-4xl text-orange-700 font-semibold py-2">
            Welcome to
          </h2>
          <h1 className="text-xl font-bold text-gray-800 pb-5 capitalize">
            Grievance Management Portal
          </h1>
          <p className="text-sm text-gray-600 font-normal">
            For Public Complaints Handling
          </p>
        </div>
      </div>

      <div className="border-2 border-red-900 h-[4px] z-10"></div>

      {/* Lower Half with Background and Curve */}
      <div className="flex-1 overflow-hidden z-10 h-[50%]">
        {/* SVG Clip Path */}
        <svg width="0" height="0">
          <defs>
            <clipPath id="curve-clip" clipPathUnits="objectBoundingBox">
              <path d="M0,0.4 C0.25,0.5,0.75,0.3,1,0.4 L1,1 L0,1 Z" />
            </clipPath>
          </defs>
        </svg>

        {/* Background Image Covering Only the Lower Half */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D')",
            filter: "brightness(0.5)",
            clipPath: "url(#curve-clip)",
            WebkitClipPath: "url(#curve-clip)",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        ></div>

        {/* Conditionally render SignIn or VerifyOTP */}
        <div className="absolute bottom-6 left-0 w-full px-6 z-20">
          {!showVerifyOTP ? (
            <SignIn onSignInSuccess={handleSignInSuccess} />
          ) : (
            <VerifyOTP />
          )}

          <div className="mt-4 text-center">
            <p className="text-md font-normal text-white">
              By signing in, you agree to our{" "}
              <span className="cursor-pointer hover:underline">
                Terms of Service
              </span>{" "}
              and{" "}
              <span className="cursor-pointer hover:underline">
                Privacy Policy
              </span>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}