import React, { useState } from "react";
import { Link } from "react-router-dom";

// export default function SignUp() {
//   const [phoneError, setPhoneError] = useState(false);
//   const [phoneErrorMessage, setPhoneErrorMessage] = useState("");

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     if (!validateInputs()) {
//       return;
//     }

//     const data = new FormData(event.currentTarget);
//     console.log({
//       Phone: data.get("phoneNumber"),
//     });
//   };

//   const validateInputs = () => {
//     const phoneNumber = document.getElementById("phoneNumber");
//     let isValid = true;
//     const phoneNumberRegex = /^[6789]\d{9}$/;

//     if (!phoneNumber.value || !phoneNumberRegex.test(phoneNumber.value)) {
//       setPhoneError(true);
//       setPhoneErrorMessage("Please enter a valid Phone Number");
//       isValid = false;
//     } else {
//       setPhoneError(false);
//       setPhoneErrorMessage("");
//     }

//     return isValid;
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-300">
//       <div className="max-w-sm w-full bg-white p-8 rounded-lg shadow-lg">
//         <h1 className="text-4xl font-semibold text-center mb-6">Sign Up</h1>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label
//               htmlFor="phoneNumber"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Phone Number<sup className="text-red-500">*</sup>
//             </label>

//             <div className="relative">
//               <span className="absolute top-1/2 transform -translate-y-1/2 text-gray-500 text-sm border-r-1 px-2">
//                 +91
//               </span>
//               <input
//                 type="tel"
//                 id="phoneNumber"
//                 name="phoneNumber"
//                 onChange={(e) => setPhoneNumber(e.target.value)}
//                 placeholder="9876543210"
//                 className={`${
//                   phoneError ? "border-red-500" : "border-gray-300"
//                 } w-full pl-12 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-150`}
//                 maxLength="10"
//                 pattern="[0-9]{10}"
//                 required
//                 />
//                 {/* value={phoneNumber} */}
//             </div>
//             {phoneError && (
//               <p className="text-red-500 text-sm">{phoneErrorMessage}</p>
//             )}
//           </div>
//           <button
//             type="submit"
//             className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200 cursor-pointer"
//           >
//             Sign Up
//           </button>
//         </form>
//         <div className="mt-4 text-center">
//           <p className="text-sm text-gray-600">
//             By signing in, you agree to our{" "}
//             <span className="text-teal-600 cursor-pointer">
//               Terms of Service
//             </span>{" "}
//             and{" "}
//             <span className="text-teal-600 cursor-pointer">Privacy Policy</span>
//             .
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// This for submiting types 

export default function SignUp()  {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (phoneNumber) {
      setIsSubmitting(true);
      // Simulate a network request (this can be replaced with an actual API call)
      setTimeout(() => {
        alert(`Phone number ${phoneNumber} submitted successfully!`);
        setIsSubmitting(false);
      }, 2000);
    } else {
      alert("Please enter a valid phone number.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-teal-400 to-blue-500">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-xs">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Sign In
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-gray-600 font-medium mb-2"
            >
              Phone Number
            </label>
            <div className="relative">
              <span className="absolute top-1/2 transform -translate-y-1/2 text-gray-500 text-sm border-r-1 px-2">
                +91
              </span>
              <input
                type="tel"
                id="phone"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="9876543210"
                className="w-full pl-12 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-150"
                maxLength="10"
                pattern="[0-9]{10}"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 px-4 bg-teal-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Submitting..." : "Sign In"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            By signing in, you agree to our{" "}
            <span className="text-teal-600 cursor-pointer">
              Terms of Service
            </span>{" "}
            and{" "}
            <span className="text-teal-600 cursor-pointer">Privacy Policy</span>
            .
          </p>
        </div>
      </div>
    </div>
  );
};


// import React, {useState} from 'react'

// export default function SignIn() {

  // const [phoneNumber, setPhoneNumber] = useState("");
  // const [isSubmitting, setIsSubmitting] = useState(false);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (phoneNumber) {
  //     setIsSubmitting(true);
  //     // Simulate a network request (this can be replaced with an actual API call)
  //     setTimeout(() => {
  //       alert(`Phone number ${phoneNumber} submitted successfully!`);
  //       setIsSubmitting(false);
  //     }, 2000);
  //   } else {
  //     alert("Please enter a valid phone number.");
  //   }
  // };
  // return (
  //   <div className="h-screen flex flex-col">
  //     {/* Upper Half */}
  //     <div className="relative h-[50%] bg-amber-100 overflow-hidden flex justify-center items-center">
  //       <div className="p-6 text-center relative z-10">
  //         <div className=" mx-auto mb-2 flex justify-center items-center"><img src="https://static.vecteezy.com/system/resources/previews/036/139/726/non_2x/hand-drawn-namaste-gesture-vector.jpg" alt="" className="h-12 w-12 blend-color-burn"/></div>
  //         <h2 className="text-4xl text-orange-700 font-semibold py-2">
  //           Welcome to
  //         </h2>
  //         <h1 className="text-xl font-bold text-gray-800 pb-5 capitalize">
  //           Grievance Management Portal
  //         </h1>
  //         <p className="text-sm text-gray-600 mt-1 font-normal">
  //           For Public Complaints Handling
  //         </p>
  //       </div>
  //     </div>

  //       <div className="border-2 border-red-900 h-[4px] z-10"></div>


  //     {/* Lower Half with Background and Curve */}
  //     <div className="flex-1 overflow-hidden z-10 h-[50%]">
  //       {/* SVG Clip Path */}
  //       <svg width="0" height="0">
  //         <defs>
  //           <clipPath id="curve-clip" clipPathUnits="objectBoundingBox">
  //             <path d="M0,0.4 C0.25,0.5,0.75,0.3,1,0.4 L1,1 L0,1 Z" />
  //           </clipPath>
  //         </defs>
  //       </svg>

  //       {/* Background Image Covering Only the Lower Half */}
  //       <div
  //         className="absolute inset-0 w-full h-full bg-cover bg-center"
  //         style={{
  //           backgroundImage:
  //             "url('https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D')",
  //           filter: "brightness(0.5)",
  //           clipPath: "url(#curve-clip)",
  //           WebkitClipPath: "url(#curve-clip)",
  //           backgroundSize: "cover", // Cover the whole lower half
  //           backgroundRepeat: "no-repeat",
  //         }}
  //       ></div>

  //       {/* Buttons */}
  //       <div className="absolute bottom-6 left-0 w-full px-6 z-20">
  //       <form onSubmit={handleSubmit}>
  //         <div className="mb-4">
  //           <label
  //             htmlFor="phoneNumber"
  //             className="block text-sm font-medium text-white pb-3"
  //           >
  //             Phone Number<sup className="text-red-500">*</sup>
  //           </label>

  //           <div className="relative">
  //             <span className="absolute top-1/2 transform -translate-y-1/2 text-white text-sm border-r-1 px-2">
  //               +91
  //             </span>
  //             <input
  //               type="tel"
  //               id="phoneNumber"
  //               name="phoneNumber"
  //               onChange={(e) => setPhoneNumber(e.target.value)}
  //               placeholder="93******78"
  //               className={`w-full pl-12 pr-3 py-2.5 border-1 border-white text-white rounded-lg text-sm bg-transparent
  //                 transition duration-150 focus:outline-2 focus:outline-black focus:outline-offset-3`}
  //               maxLength="10"
  //               pattern="[0-9]{10}"
  //               required
  //             />
  //             {/* value={phoneNumber} */}
  //           </div>
  //         </div>

  //         <button
  //           type="submit"
  //           disabled={isSubmitting}
  //           className={`w-full py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200 cursor-pointer ${
  //             isSubmitting ? "opacity-50 cursor-not-allowed" : ""
  //           }`}
  //         >
  //           {isSubmitting ? "Submitting..." : "Sign In"}
  //         </button>
  //       </form>
  //       {/* className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200 cursor-pointer" */}
  //         <div className="mt-4 text-center">
  //           <p className="text-md font-normal text-white">
  //             By signing in, you agree to our{" "}
  //             <span className="cursor-pointer hover:underline">
  //               Terms of Service
  //             </span>{" "}
  //             and{" "}
  //             <span className="cursor-pointer hover:underline">
  //               Privacy Policy
  //             </span>
  //             .
  //           </p>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
// }


// import React, { useState } from "react";

// export default function SignIn() {
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (phoneNumber) {
//       setIsSubmitting(true);
//       setTimeout(() => {
//         alert(`Phone number ${phoneNumber} submitted successfully!`);
//         setIsSubmitting(false);
//       }, 2000);
//     } else {
//       alert("Please enter a valid phone number.");
//     }
//   };

//   return (
//     <div className="h-screen flex flex-col overflow-hidden bg-white"> {/* Set a default background */}
//       {/* Upper Half */}
//       <div className="relative h-[50%] bg-amber-100 flex justify-center items-center">
//         <div className="p-6 text-center relative z-10">
//           <div className="mx-auto mb-2 flex justify-center items-center">
//             <img
//               src="https://static.vecteezy.com/system/resources/previews/036/139/726/non_2x/hand-drawn-namaste-gesture-vector.jpg"
//               alt="Logo"
//               className="h-12 w-12 blend-color-burn"
//             />
//           </div>
//           <h2 className="text-4xl text-orange-700 font-semibold py-2">
//             Welcome to
//           </h2>
//           <h1 className="text-xl font-bold text-gray-800 pb-5 capitalize">
//             Grievance Management Portal
//           </h1>
//           <p className="text-sm text-gray-600 mt-1 font-normal">
//             For Public Complaints Handling
//           </p>
//         </div>
//       </div>

//       {/* Lower Half */}
//       <div className="relative h-[50%] flex-1 overflow-hidden"> {/* Use flex-1 to fill remaining space */}
//         {/* SVG Clip Path */}
//         <svg width="0" height="0">
//           <defs>
//             <clipPath id="curve-clip" clipPathUnits="objectBoundingBox">
//               <path d="M0,0.4 C0.25,0.5,0.75,0.3,1,0.4 L1,1 L0,1 Z" />
//             </clipPath>
//           </defs>
//         </svg>

//         {/* Background Image */}
//         <div
//           className="absolute inset-0 w-full h-full bg-cover bg-center"
//           style={{
//             backgroundImage:
//               "url('https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D')",
//             filter: "brightness(0.5)",
//             clipPath: "url(#curve-clip)",
//             WebkitClipPath: "url(#curve-clip)",
//             backgroundSize: "cover",
//             backgroundRepeat: "no-repeat",
//             zIndex: 0, // Ensure background is below the form
//           }}
//         ></div>

//         {/* Form */}
//         <div
//           className="absolute bottom-6 left-0 w-full px-6 z-10" // Ensure form is above background
//         >
//           <form onSubmit={handleSubmit}>
//             <div className="mb-4">
//               <label
//                 htmlFor="phoneNumber"
//                 className="block text-sm font-medium text-white pb-3"
//               >
//                 Phone Number<sup className="text-red-500">*</sup>
//               </label>
//               <div className="relative">
//                 <span className="absolute top-1/2 transform -translate-y-1/2 text-white text-sm border-r-1 px-2">
//                   +91
//                 </span>
//                 <input
//                   type="tel"
//                   id="phoneNumber"
//                   name="phoneNumber"
//                   onChange={(e) => setPhoneNumber(e.target.value)}
//                   placeholder="93******78"
//                   className="w-full pl-12 pr-3 py-2.5 border-1 border-white text-white rounded-lg text-sm bg-transparent transition duration-150 focus:outline-2 focus:outline-black focus:outline-offset-3"
//                   maxLength="10"
//                   pattern="[0-9]{10}"
//                   required
//                 />
//               </div>
//             </div>

//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className={`w-full py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200 cursor-pointer ${
//                 isSubmitting ? "opacity-50 cursor-not-allowed" : ""
//               }`}
//             >
//               {isSubmitting ? "Submitting..." : "Sign In"}
//             </button>
//           </form>

//           <div className="mt-4 text-center">
//             <p className="text-md font-normal text-white">
//               By signing in, you agree to our{" "}
//               <span className="cursor-pointer hover:underline">
//                 Terms of Service
//               </span>{" "}
//               and{" "}
//               <span className="cursor-pointer hover:underline">
//                 Privacy Policy
//               </span>
//               .
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
