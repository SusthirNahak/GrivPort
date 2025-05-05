import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Cookies from 'js-cookie';

export default function SelectGreivance() {
  const options = [
    { value: "pothole_main", text: "Pothole on Main Street" },
    {
      value: "damaged_sign_central",
      text: "Damaged Road Sign at Central Avenue",
    },
    {
      value: "signal_oak_junction",
      text: "Traffic Signal Out of Order at Oak Junction",
    },
    { value: "flooding_elm", text: "Flooding on Elm Road After Heavy Rain" },
    {
      value: "cracked_pavement_school",
      text: "Cracked Pavement Near School Zone",
    },
    { value: "speed_bump_pine", text: "Unmarked Speed Bump on Pine Lane" },
    {
      value: "construction_traffic_river",
      text: "Construction Site Causing Traffic Blockage on River Road",
    },
    { value: "street_light_maple", text: "Street Light Out on Maple Avenue" },
    { value: "poor_surface_park", text: "Poor Road Surface at Park Drive" },
    {
      value: "dangerous_intersection_5th",
      text: "Dangerous Intersection at 5th and Highways",
    },
  ];

  const [selectGreivance, setSelectGreivance] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    try {
      document.title = "Select Grievance";

      const isLoggedIn = sessionStorage.getItem("setSessionPhoneNumber");

      if (
        !isLoggedIn ||
        isLoggedIn === "null" ||
        isLoggedIn === "" ||
        typeof isLoggedIn === "undefined"
      ) {
        navigate(Cookies.get("currentLocation"), { replace: true });
        return;
      }
    } catch (error) {
      console.error("Error in useEffect:", error);
    }
  }, [navigate]);

  const handleSelectChange = (e) => {
    try {
      const selectedValue = e.target.value;
      const selectedOption = options.find((opt) => opt.value === selectedValue);;
      setSelectGreivance(selectedValue);
    } catch (error) {
      console.error("Error in handleSelectChange:", error);
    }
  };

  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      if (selectGreivance) {
        navigate("/grievanceform", {
          state: { grievanceSelectedValue: selectGreivance },
        });
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error);
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
      <div className="relative h-[40vh] flex flex-col justify-end pb-5">
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

        <form
          onSubmit={handleSubmit}
          className="col-span-12 md:col-span-3 px-4"
        >
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

        <div className="mt-4 mx-4 text-center">
          <p className="text-md font-normal text-black">
            By signing in, you agree to our{" "}
            <span className="cursor-pointer text-blue-600 hover:underline">
              Terms of Service
            </span>{" "}
            and{" "}
            <span className="cursor-pointer text-blue-600 hover:underline">
              Privacy Policy
            </span>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
