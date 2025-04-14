import React, { useState } from "react";

export default function AdminSignUp({ onSignUpSuccess, switchToSignIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);
    // Simulate an API call
    setTimeout(() => {
      const apiSuccess = true; // Replace with real API logic later
      setIsSubmitting(false);
      if (apiSuccess) {
        setShowPopup(true);
        alert(`Sign-up successful for ${email}!`);
      } else {
        alert("Sign-up failed. Please try again.");
      }
    }, 2000);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    onSignUpSuccess(); // Trigger the parent callback to update UI or redirect
  };

  return (
    <form onSubmit={handleSubmit} className="w-[80%]">
      <h1 className="font-bold text-5xl mb-10">Sign Up</h1>

      {/* Email */}
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-500 pb-3"
        >
          Email<sup className="text-red-500">*</sup>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="admin@example.com"
          className="w-full p-3 border-2 border-gray-500 rounded-lg text-sm bg-transparent"
          required
          disabled={isSubmitting}
        />
      </div>

      {/* Password */}
      <div className="mb-4">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-500 pb-3"
        >
          Password<sup className="text-red-500">*</sup>
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="********"
          className="w-full p-3 border-2 border-gray-500 rounded-lg text-sm bg-transparent"
          required
          disabled={isSubmitting}
        />
      </div>

      {/* Confirm Password */}
      <div className="mb-4">
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-gray-500 pb-3"
        >
          Confirm Password<sup className="text-red-500">*</sup>
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="********"
          className="w-full p-3 border-2 border-gray-500 rounded-lg text-sm bg-transparent"
          required
          disabled={isSubmitting}
        />
      </div>

      {/* Submit Button */}
      <input
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-3 my-5 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition duration-200 cursor-pointer ${
          isSubmitting ? "opacity-50 cursor-not-allowed" : ""
        }`}
        value={isSubmitting ? "Submitting..." : "Sign Up"}
      />

      {/* Switch to Sign In */}
      <p className="text-center">
        Already have an account?{" "}
        <button
          type="button"
          onClick={switchToSignIn}
          className="text-blue-600 hover:underline"
        >
          Sign In
        </button>
      </p>

      {/* Success Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Sign-Up Successful!</h2>
            <p>Welcome, {email}! Your account has been created.</p>
            <button
              onClick={handlePopupClose}
              className="mt-4 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </form>
  );
}