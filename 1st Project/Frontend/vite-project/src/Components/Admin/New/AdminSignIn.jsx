import React, { useState } from "react";

export default function AdminSignIn({ onSignInSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState(false);
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
      // Make the API call
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

      const data = await response.json(); // Assuming the API returns JSON

      // Check if the response is successful
      if (!response.ok) {
        setError(data.message || "Sign-in failed");
        setShowPopup(true);
        setIsSuccess(false);
        return;
      }

      console.log("DATA: ", data);

      // Handle success (e.g., API returns a token or user data)
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
    // Only navigate if login was successful
    if (isSuccess) {
      onSignInSuccess(true);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* <h1 className="font-bold text-5xl mb-10">Sign In</h1> */}

      {/* Email */}
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
            className="w-full pl-13 py-2.5 border-1 border-black text-black rounded-lg text-lg bg-transparent
              transition duration-150 focus:outline-2 focus:outline-black focus:outline-offset-4"
            required
            disabled={isSubmitting}
          />
        </div>
      </div>

      {/* Password */}
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
            className="w-full pl-13 py-2.5 border-1 border-black text-black rounded-lg text-lg bg-transparent
              transition duration-150 focus:outline-2 focus:outline-black focus:outline-offset-4"
            required
            disabled={isSubmitting}
          />
        </div>
      </div>

      {/* Submit Button */}
      <input
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-3 my-5 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition duration-200 cursor-pointer ${
          isSubmitting ? "opacity-50 cursor-not-allowed" : ""
        }`}
        value={isSubmitting ? "Submitting..." : "Sign In"}
      />

      {/* Switch to Sign Up */}
      {/* <p className="text-center">
        Don’t have an account?{" "}
        <button
          type="button"
          onClick={switchToSignUp}
          className="text-blue-600 hover:underline"
        >
          Sign Up
        </button>
      </p> */}

      {/* Success Popup */}
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
