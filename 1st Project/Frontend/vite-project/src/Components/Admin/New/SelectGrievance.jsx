import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SelectGreivance() {
  const options = [
    { value: "1", text: "Option 1" },
    { value: "2", text: "Option 2" },
    { value: "3", text: "Option 3" },
  ];

  const [selectGreivance, setSelectGreivance] = useState("");
  const navigate = useNavigate();

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    setSelectGreivance(selectedValue);
    console.log("Selected Value:", selectedValue);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); 
    if (selectGreivance) { 
      // alert("Button Clicked"); 
      navigate("/grievanceform");
    }
  };

  return (
    <div className="flex flex-col h-[100vh] relative">
      {/* Upper Half */}
      <div className="h-[60vh] relative">
        <div
          className="absolute inset-0 w-full bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D')",
            filter: "brightness(0.5)",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            height: "inherit",
          }}
        ></div>
      </div>

      {/* Lower Half */}
      <div className="relative h-[40vh] flex flex-col justify-end pb-5 bg-white">
        {/* SVG Curve */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-[-5vh] w-full"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          style={{
            width: "100%",
            height: "100px",
            transform: "translateY(-50%)",
          }}
        >
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,160C240,100,480,80,720,120C960,160,1200,200,1440,180L1440,320L0,320Z"
          ></path>
        </svg>

        <form onSubmit={handleSubmit} className="col-span-12 md:col-span-3 px-4">
          <label
            htmlFor="selectGreivance"
            className="font-medium text-md text-gray-700"
          >
            Select Your Grievance <sup className="text-red-500">*</sup>
          </label>
          <select
            name="selectGreivance"
            id="selectGreivance"
            value={selectGreivance}
            onChange={handleSelectChange}
            className="w-full my-3 sm:my-1 p-3 border-b focus:outline-none focus:border-b-2 focus:border-blue-500"
            required
          >
            <option value="" disabled>
              --- Select ---
            </option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            ))}
          </select>
          <input
            type="submit"
            className="w-full py-3 mt-3 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition duration-200 cursor-pointer"
            value="Select"
          />
        </form>

        <div className="mt-4 text-center">
          <p className="text-md font-normal text-black">
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
  );
} 