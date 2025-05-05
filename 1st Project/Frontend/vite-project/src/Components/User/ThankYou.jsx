import React, { useEffect, useState } from "react";

const ThankYou = ({ onClose, message }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 ${
          isVisible ? "opacity-50" : "opacity-0"
        }`}
        onClick={onClose}
      ></div>

      {/* Thank You Message */}
      <div
        className={`relative bg-white rounded-lg p-8 shadow-2xl transform transition-all duration-300 ${
          isVisible
            ? "scale-100 opacity-100 translate-y-0"
            : "scale-95 opacity-0 translate-y-4"
        }`}
      >
        <div className="text-center">
          <div className="mb-4">
            {/* Success Checkmark Icon */}
            <svg
              className={`w-16 h-16 mx-auto ${
                message.success ? "text-green-500" : "text-red-500"
              } animate-bounce`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={`${
                  message.success
                    ? "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    : "M6 18L18 6M6 6l12 12"
                }`}
              />
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {message.success ? "Thank You!" : "Sorry!"}
          </h2>

          <p className="text-gray-600 mb-6">{message.message} </p>
          
          {message.success && (
            <p className="text-gray-600 mb-6">
              Your application id is:{" "}
              <span className="font-bold text-xl">{message.applicationId}</span>
            </p>
          )}

          <button
            onClick={onClose}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full transition-colors duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
