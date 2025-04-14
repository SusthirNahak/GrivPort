import React, { useState, useEffect } from "react";

export default function GreivanceForm() {
  const [nameError, setNameError] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState("");

  const [stateError, setStateError] = useState(false);
  const [stateErrorMessage, setStateErrorMessage] = useState("");
  const [stateSelect, setStateSelect] = useState("");
  
  const [districtError, setDistrictError] = useState(false);
  const [districtErrorMessage, setDistrictErrorMessage] = useState("");
  const [districtSelect, setDistrictSelect] = useState("");

  const [blockError, setBlockError] = useState(false);
  const [blockErrorMessage, setBlockErrorMessage] = useState("");

  const [gpError, setGPError] = useState(false);
  const [gpErrorMessage, setGPErrorMessage] = useState("");

  const [villageError, setVillageError] = useState(false);
  const [villageErrorMessage, setVillageErrorMessage] = useState("");

  const [gender, setGender] = useState("");
  const [genderError, setGenderError] = useState(false);
  const [genderErrorMessage, setGenderErrorMessage] = useState("");

  const [disibilityError, setDisibilityError] = useState(false);
  const [disibilityErrorMessage, setDisibilityErrorMessage] = useState("");

  const [error, setError] = useState(null);

  // Title
  useEffect(() => {
    document.title = "Greivance Form";
  }, []);

  // States Fetch
  const [states, setStates] = useState([]);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await fetch("http://localhost:5000/states");
        if (!response.ok) {
          throw new Error("Failed to fetch states");
        }
        const data = await response.json();
        data.sort((a, b) => a.state_name.localeCompare(b.state_name));
        setStates(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchStates();
  }, []);

  // District Fetch
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    if (stateSelect) {
      console.log("1st ok");
      
      const fetchDistricts = async () => {
        try {
          console.log("2 ok");
          console.log("stateSelect: ", stateSelect);

          const response = await fetch(
            `http://localhost:5000/districts?stateName=${stateSelect}`
          );
          if (!response.ok) {
            console.log("3rd not ok");
            alert("Failed to fetch districts");
          }
          console.log("4th ok");

          let data = await response.json();
          data.sort((a, b) => a.state_name.localeCompare(b.state_name));
          setDistricts(data);
          console.log("DATA: ", data);
          
        } catch (err) {
          setError(err.message);
        }
      };
      fetchDistricts();
    } else {
      setDistricts([]);
      
    }
  }, [stateSelect]);

  console.log("DISTRICT: ", districts);
  

  const options = [
    {
      value: "1",
      text: "Option 1",
    },
    {
      value: "2",
      text: "Option 2",
    },
    {
      value: "3",
      text: "Option 3",
    },
  ];

  const handleStateChange = (e) => {
    const selectedValue = e.target.value;
    setStateSelect(selectedValue);
    console.log("Selected Value:", selectedValue);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const validateInputs = () => {
    const name = document.getElementById("name");
    const state = document.getElementById("state");
    const district = document.getElementById("district");
    const block = document.getElementById("block");
    const gp = document.getElementById("gp");
    const village = document.getElementById("village");
    const gender = document.getElementById("gender");
    const disibility = document.getElementById("disibility");

    let isValid = true;

    // Name
    if (!name.value) {
      setNameError(true);
      setNameErrorMessage("Please enter valid Name");
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage("");
    }

    // State
    if (!state.value) {
      setStateError(true);
      setStateErrorMessage("Please choose State");
      isValid = false;
    } else {
      setStateError(false);
      setStateErrorMessage("");
    }

    // District
    if (!district.value) {
      setDistrictError(true);
      setDistrictErrorMessage("Please choose District");
      isValid = false;
    } else {
      setDistrictError(false);
      setDistrictErrorMessage("");
    }

    // Block
    if (!block.value) {
      setBlockError(true);
      setBlockErrorMessage("Please choose Block");
      isValid = false;
    } else {
      setBlockError(false);
      setBlockErrorMessage("");
    }

    // GP
    if (!gp.value) {
      setGPError(true);
      setGPErrorMessage("Please choose GP");
      isValid = false;
    } else {
      setGPError(false);
      setGPErrorMessage("");
    }

    // Village
    if (!village.value) {
      setVillageError(true);
      setVillageErrorMessage("Please choose Village");
      isValid = false;
    } else {
      setVillageError(false);
      setVillageErrorMessage("");
    }

    // Gender
    if (!gender.value) {
      setGenderError(true);
      setGenderErrorMessage("Please choose Gender");
      isValid = false;
    } else {
      setGenderError(false);
      setGenderErrorMessage("");
    }

    // Dissibility
    if (!disibility.value) {
      setDisibilityError(true);
      setDisibilityErrorMessage("Please choose Gender");
      isValid = false;
    } else {
      setDisibilityError(false);
      setDisibilityErrorMessage("");
    }

    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateInputs()) {
      return;
    }

    const data = new FormData(event.currentTarget);
    console.log({
      Name: data.get("name"),
      State: data.get("state"),
      Gender: data.get("gender"),
    });
  };

  return (
    <>
      <div className="mx-auto sm:w-3/4 mt-2 px-4">
        <h1 className="font-bold text-4xl my-5">Enter Location Details</h1>
        <hr className="w-full" />
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-12 gap-y-1 sm:gap-y-10 gap-x-4 mt-8"
        >
          {/* Name */}
          <div className="col-span-12 md:col-span-3 mt-5 sm:mt-0">
            <label htmlFor="name" className="font-medium text-md text-gray-700">
              Name<sup className="text-red-500">*</sup>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Jone Doe"
              className={`w-full mt-2 p-3 border-b ${
                nameError ? "border-b-red-500" : "border-b-gray-700"
              } focus:outline-none focus:border-b-2 focus:border-blue-500`}
              required
            />
            {nameError && (
              <p className="text-red-500 text-sm">{nameErrorMessage}</p>
            )}
          </div>

          {/* State */}
          <div className="col-span-12 md:col-span-3 mt-5 sm:mt-0">
            <label
              htmlFor="state"
              className="font-medium text-md text-gray-700"
            >
              State<sup className="text-red-500">*</sup>
            </label>
            <select
              name="state"
              id="state"
              value={stateSelect}
              onChange={handleStateChange}
              className="w-full mt-2 p-3 border-b focus:outline-none focus:border-b-2 focus:border-blue-500"
              required
            >
              <option value="" disabled>
                --- Select ---
              </option>
              {states.map((option, index) => (
                <option key={index} value={option.state_name}>
                  {option.state_name}
                </option>
              ))}
            </select>
            {stateError && (
              <p className="text-red-500 text-sm">{stateErrorMessage}</p>
            )}
          </div>

          {/* District */}
          <div className="col-span-12 md:col-span-3 mt-5 sm:mt-0">
            <label
              htmlFor="district"
              className="font-medium text-md text-gray-700"
            >
              District<sup className="text-red-500">*</sup>
            </label>
            <select
              name="district"
              id="district"
              value={districtSelect}
              onChange={handleStateChange}
              className="w-full mt-2 p-3 border-b focus:outline-none focus:border-b-2 focus:border-blue-500"
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
            {districtError && (
              <p className="text-red-500 text-sm">{districtErrorMessage}</p>
            )}
          </div>

          {/* Block / ULB */}
          <div className="col-span-12 md:col-span-3 mt-5 sm:mt-0">
            <label
              htmlFor="block"
              className="font-medium text-md text-gray-700"
            >
              Block / ULB <sup className="text-red-500">*</sup>
            </label>
            <select
              name="block"
              id="block"
              value={stateSelect}
              onChange={handleStateChange}
              className="w-full mt-2 p-3 border-b focus:outline-none focus:border-b-2 focus:border-blue-500"
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
            {blockError && (
              <p className="text-red-500 text-sm">{blockErrorMessage}</p>
            )}
          </div>

          {/* GP */}
          <div className="col-span-12 md:col-span-3 mt-5 sm:mt-0">
            <label htmlFor="gp" className="font-medium text-md text-gray-700">
              GP <sup className="text-red-500">*</sup>
            </label>
            <select
              name="gp"
              id="gp"
              value={stateSelect}
              onChange={handleStateChange}
              className="w-full mt-2 p-3 border-b focus:outline-none focus:border-b-2 focus:border-blue-500"
              required
            >
              <option value="" disabled>
                --- Select ---
              </option>
              {states.map((option) => (
                <option key={option.state_code} value={option.state_code}>
                  {option.state_name}
                </option>
              ))}
            </select>
            {gpError && (
              <p className="text-red-500 text-sm">{gpErrorMessage}</p>
            )}
          </div>

          {/* Village */}
          <div className="col-span-12 md:col-span-3 mt-5 sm:mt-0">
            <label
              htmlFor="village"
              className="font-medium text-md text-gray-700"
            >
              Village <sup className="text-red-500">*</sup>
            </label>
            <select
              name="village"
              id="village"
              value={stateSelect}
              onChange={handleStateChange}
              className="w-full mt-2 p-3 border-b focus:outline-none focus:border-b-2 focus:border-blue-500"
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
            {villageError && (
              <p className="text-red-500 text-sm">{villageErrorMessage}</p>
            )}
          </div>

          {/* Address */}
          <div className="col-span-12 md:col-span-3 mt-5 sm:mt-0">
            <label
              htmlFor="address"
              className="font-medium text-md text-gray-700"
            >
              Address <sup className="text-red-500">*</sup>
            </label>
            <textarea
              name="address" // Fixed typo
              id="address" // Fixed typo
              value={stateSelect}
              onChange={handleStateChange}
              className="w-full mt-2 p-3 border-b focus:outline-none focus:border-b-2 focus:border-blue-500 resize-none"
              required
              placeholder="Enter your Address ..."
              rows="1"
            />
            {villageError && (
              <p className="text-red-500 text-sm">{villageErrorMessage}</p>
            )}
          </div>

          {/* Gender */}
          <div className="col-span-12 md:col-span-3 mt-5 sm:mt-0">
            <label
              htmlFor="gender"
              className="font-medium text-md text-gray-700"
            >
              Gender<sup className="text-red-500">*</sup>
            </label>
            <select
              name="gender"
              id="gender"
              value={gender}
              onChange={handleGenderChange}
              className="w-full mt-2 p-3 border-b focus:outline-none focus:border-b-2 focus:border-blue-500"
              required
            >
              <option value="" disabled>
                --- Select ---
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
            {genderError && (
              <p className="text-red-500 text-sm">{genderErrorMessage}</p>
            )}
          </div>

          {/* Disability Type */}
          <div className="col-span-12 md:col-span-3 mt-5 sm:mt-0">
            <label
              htmlFor="disibility"
              className="font-medium text-md text-gray-700"
            >
              Disability Type <sup className="text-red-500">*</sup>
            </label>
            <select
              name="disibility"
              id="disibility"
              value={stateSelect}
              onChange={handleStateChange}
              className="w-full mt-2 p-3 border-b focus:outline-none focus:border-b-2 focus:border-blue-500"
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
            {disibilityError && (
              <p className="text-red-500 text-sm">{disibilityErrorMessage}</p>
            )}
          </div>

          {/* Email */}
          <div className="col-span-12 md:col-span-3 mt-5 sm:mt-0">
            <label
              htmlFor="email"
              className="font-medium text-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Jone Doe"
              className="w-full mt-2 p-3 border-b focus:outline-none focus:border-b-2 focus:border-blue-500"
              required
            />
          </div>

          <p className="text-red-500 font-medium col-span-12">
            Please provide your email address to receive important updates and
            communications.
          </p>

          {/* Submit */}
          <input
            type="submit"
            className="block col-span-12 w-[20%] py-3 my-6 sm:my-0 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200 cursor-pointer"
            value="Submit"
          />
        </form>
      </div>
    </>
  );
}
