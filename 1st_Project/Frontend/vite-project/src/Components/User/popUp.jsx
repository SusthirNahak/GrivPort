import React, { useEffect } from "react";

const PopUp = ({ isOpen, setIsOpen, type }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setIsOpen(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, setIsOpen]);

  if (!isOpen) return null;


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-gray-900/50"
        onClick={() => setIsOpen(false)}
      />

      {/* Popup */}
      <div className="relative bg-white rounded-lg shadow-2xl max-w-md w-full p-6 animate-swal-pop">
        <div className={`mx-auto mb-4 flex items-center justify-center w-12 h-12 rounded-full ${type.success ? 'bg-green-100' : 'bg-red-100'}`}>
          <svg
            className={`w-6 h-6 ${type.success ? 'text-green-600' : 'text-red-600'}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d= {`${type.success ? "M5 13l4 4L19 7" : 'M6 18L18 6M6 6l12 12'}`}
            />
          </svg>
        </div>

        <h3 className="text-lg font-medium text-gray-900 text-center mb-6">
          {type.message}
        </h3>

        <button
          onClick={() => setIsOpen(false)}
          className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
        >
          OK
        </button>
      </div>

      <style jsx>{`
        @keyframes swal-pop {
          0% {
            transform: scale(0.8);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-swal-pop {
          animation: swal-pop 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default PopUp;
