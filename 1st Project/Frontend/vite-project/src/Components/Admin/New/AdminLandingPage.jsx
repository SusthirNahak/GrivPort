import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import AdminSignIn from "./AdminSignIn";
// import AdminSignUp from "./AdminSignUp";

export default function AdminLandingPage() {
  // const [isSignUp, setIsSignUp] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    // console.log("Authentication successful, redirecting or updating UI...");
  };

  return (
    <div className="md:flex h-[100vh] w-full bg-amber-100">
      {/* Upper Half */}
      <div className="w-full h-[60%] flex flex-col justify-center items-center md:w-[65%] md:h-full">
        <div className="mx-auto mb-0">
          <img
            src="https://static.vecteezy.com/system/resources/previews/036/139/726/non_2x/hand-drawn-namaste-gesture-vector.jpg"
            alt="Namaste gesture"
            className="h-48 w-48 mix-blend-color-burn hue-rotate-0 saturate-[50] brightness-100"
          />
        </div>
        <h2 className="text-5xl text-orange-700 font-semibold py-2 md:text-6xl">
          Welcome to
        </h2>
        <h1 className="text-xl font-bold text-gray-800 pb-4 capitalize md:text-3xl">
          Grievance Management Portal
        </h1>
        <p className="text-md text-gray-600 font-normal md:text-xl">
          For Public Complaints Handling
        </p>
      </div>

      {/* Right Side */}
      {isAuthenticated ? (
       <Navigate to="/admin/home" replace />
      ) : (
        // isSignUp ? (
        //   <AdminSignUp
        //     onSignUpSuccess={handleAuthSuccess}
        //     switchToSignIn={() => setIsSignUp(false)}
        //   />
        // ) :
        <div className="w-full h-[40%] flex flex-col justify-center px-10 md:w-[35%] md:h-full md:bg-[#f8f8f8]">
          <AdminSignIn
            onSignInSuccess={handleAuthSuccess}
            // switchToSignUp={() => setIsSignUp(true)}
          />
        </div>
      )}
    </div>
  );
}
