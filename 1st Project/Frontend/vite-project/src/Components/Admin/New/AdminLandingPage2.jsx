import React, { useState } from "react";
import { Navigate } from "react-router-dom";

function AdminSignIn({ onSignInSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/Admin/SignIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Sign-in failed");
        setShowPopup(true);
        setIsSuccess(false);
        return;
      }

    //   console.log("DATA: ", data);

      if (data.success) {
        setIsSuccess(true);
        sessionStorage.setItem("name", data.data);
        onSignInSuccess(true);
      }
    } catch (error) {
      setError("An error occurred: " + error.message);
      setShowPopup(true);
      setIsSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    setError("");
    if (isSuccess) {
      onSignInSuccess(true);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-lg font-medium text-black pb-3"
        >
          Email<sup className="text-red-500 text-lg">*</sup>
        </label>
        <div className="relative">
          <span className="absolute top-1/2 transform -translate-y-1/2 text-black text-lg border-r-1 px-2">
            <img
              width="24"
              height="24"
              src="https://img.icons8.com/sf-regular-filled/48/new-post.png"
              alt="new-post"
            />
          </span>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@example.com"
            className="w-full pl-13 py-2.5 border-1 border-black text-black rounded-lg text-lg bg-transparent transition duration-150 focus:outline-2 focus:outline-black focus:outline-offset-4"
            required
            disabled={isSubmitting}
          />
        </div>
      </div>

      <div className="mb-4">
        <label
          htmlFor="password"
          className="block text-lg font-medium text-black pb-3"
        >
          Password<sup className="text-red-500 text-lg">*</sup>
        </label>
        <div className="relative">
          <span className="absolute top-1/2 transform -translate-y-1/2 text-black text-lg border-r-1 px-2">
            <img
              width="24"
              height="24"
              src="https://img.icons8.com/sf-regular-filled/48/password.png"
              alt="password"
            />
          </span>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            className="w-full pl-13 py-2.5 border-1 border-black text-black rounded-lg text-lg bg-transparent transition duration-150 focus:outline-2 focus:outline-black focus:outline-offset-4"
            required
            disabled={isSubmitting}
          />
        </div>
      </div>

      <input
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-3 my-5 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition duration-200 cursor-pointer ${
          isSubmitting ? "opacity-50 cursor-not-allowed" : ""
        }`}
        value={isSubmitting ? "Submitting..." : "Sign In"}
      />

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-50 backdrop-brightness-50 backdrop-contrast-50 z-50">
          <div className="p-6 shadow-lg text-center bg-white rounded-3xl w-72 h-72 flex flex-col items-center justify-center">
            <svg
              className="w-16 h-16 mx-auto p-3 bg-red-100 rounded-full text-red-500 animate-bounce"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <h2 className="text-2xl font-semibold my-4">{error}</h2>
            <button
              onClick={handlePopupClose}
              className="mt-4 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </form>
  );
}

export default function AdminLandingPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <div className="md:flex h-[100vh] w-full bg-amber-100">
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

      {isAuthenticated ? (
        <Navigate to="/admin/home" replace />
      ) : (
        <div className="w-full h-[40%] flex flex-col justify-center px-10 md:w-[35%] md:h-full md:bg-[#f8f8f8]">
          <AdminSignIn onSignInSuccess={handleAuthSuccess} />
        </div>
      )}
    </div>
  );
}