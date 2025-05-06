import React, { useState, useEffect } from "react";
import SignIn from "./SignIn";
import VerifyOTP from "./VerifyOTP";
import image from '../../assets/mainbg.jpg'

export default function LandingPage() {
  const [showVerifyOTP, setShowVerifyOTP] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleSignInSuccess = (number) => {
    setPhoneNumber(number);
    setShowVerifyOTP(true);
  };

  useEffect(() => {
    document.title = "Landing Page/Sign IN";
  }, []);

  return (
    <>
      <div
        className="md:flex h-[100vh] w-full overflow-hidden flex-col items-end background[]"
        style={{
          backgroundImage: isLargeScreen ? `url(${image})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}

      >
        <div
          className="px-10 md:w-[35%] md:bg-transparent h-full flex flex-col justify-evenly "
        >
          <div
            className="flex flex-col justify-center"
          >
            {/* Upper Half
            <div className="w-full flex flex-col items-center">
              <div className="mb-0 flex justify-center items-center">
                <img
                  src="https://static.vecteezy.com/system/resources/previews/036/139/726/non_2x/hand-drawn-namaste-gesture-vector.jpg"
                  alt="Namaste gesture"
                  className="h-30 w-30 mix-blend-color-burn hue-rotate-0 saturate-[50] brightness-100"
                />
              </div>
              <h2 className="text-5xl text-orange-700 font-semibold py-3 md:py-0 md:text-4xl">
                Welcome to
              </h2>
              <h1 className="text-xl font-bold text-blue-500 py-2 capitalize md:text-2xl">
                Grievance Management Portal
              </h1>
              <p className="text-md text-gray-600 font-normal md:text-xl">
                For Public Complaints Handling
              </p>
            </div> */}

            {/* Lower Half */}
            <div className="">
              {!showVerifyOTP ? (
                <SignIn onSignInSuccess={handleSignInSuccess} />
              ) : (
                <VerifyOTP phoneNumber={phoneNumber} />
              )}
            </div>

          </div>
        </div>
      </div>
    </>
  );
}