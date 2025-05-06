import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import ThankYou from "./ThankYou";

const apiKey = import.meta.env.VITE_API_KEY;

export default function GrievanceForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [grievances, setGrievances] = useState([]);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const [gps, setGPs] = useState([]);
  const [villages, setVillages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [data, setData] = useState(false);
  const [formData, setFormData] = useState({
    grievance: "",
    name: "",
    gender: "",
    email: "",
    address: "",
    state: "",
    district: "",
    block: "",
    gp: "",
    village: "",
    message: "",
    attachment: [],
  });

  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    if (!Cookies.get("setPhoneNumber")) {
      navigate("/landingpage");
    }
  }, [navigate]);

  // Fetch Grievances
  useEffect(() => {
    const fetchGrievances = async () => {
      setError(null);
      setLoading(true);
      try {
        const response = await fetch(`${apiKey}/grievances`);
        if (!response.ok) throw new Error("Failed to fetch Grievances");
        const data = await response.json();
        setGrievances(data.sort());
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchGrievances();
  }, []);

  // Fetch States
  useEffect(() => {
    const fetchStates = async () => {
      setError(null);
      setLoading(true);
      try {
        const response = await fetch(`${apiKey}/states`);
        if (!response.ok) throw new Error("Failed to fetch states");
        const data = await response.json();
        data.sort((a, b) => a.state_name.localeCompare(b.state_name));
        setStates(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStates();
  }, []);

  // Fetch Districts
  useEffect(() => {
    if (formData.state) {
      const fetchDistricts = async () => {
        setError(null);
        setLoading(true);
        try {
          const response = await fetch(`${apiKey}/districts?stateName=${formData.state}`);
          if (!response.ok) throw new Error("Failed to fetch districts");
          const data = await response.json();
          const districtData = data[0]?.districts || [];
          setDistricts(districtData.sort());
          setBlocks([]);
          setGPs([]);
          setVillages([]);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchDistricts();
    } else {
      setDistricts([]);
    }
  }, [formData.state]);


  // Fetch Blocks
  useEffect(() => {
    if (formData.district) {
      const fetchBlocks = async () => {
        setError(null);
        setLoading(true);
        try {

          const response = await fetch(`${apiKey}/blocks?districtName=${formData.district}`);

          if (!response.ok) throw new Error("Failed to fetch blocks");
          const data = await response.json();
          const blockData = data[0]?.blocks || [];
          setBlocks(blockData.sort());
          setGPs([]);
          setVillages([]);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchBlocks();
    } else {
      setBlocks([]);
    }
  }, [formData.district]);

  // Fetch GPs
  useEffect(() => {
    if (formData.block) {
      const fetchGPs = async () => {
        setError(null);
        setLoading(true);
        try {
          const response = await fetch(`${apiKey}/GPs?stateName=${formData.state}&districtName=${formData.district}&blockName=${formData.block}`);

          if (!response.ok) throw new Error("Failed to fetch GPs");
          const data = await response.json();
          const gpData = data?.gram_panchayats || [];
          setGPs(gpData);
          setVillages([]);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchGPs();
    } else {
      setGPs([]);
    }
  }, [formData.block]);

  // Fetch Villages
  useEffect(() => {
    if (formData.gp) {
      const fetchVillages = async () => {
        setError(null);
        setLoading(true);
        try {

          const response = await fetch(`${apiKey}/villages?stateName=${formData.state}&districtName=${formData.district}&blockName=${formData.block}&gpName=${formData.gp}`);

          if (!response.ok) throw new Error("Failed to fetch villages");
          const data = await response.json();
          const villageData = data?.villages || [];
          setVillages(villageData);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchVillages();
    } else {
      setVillages([]);
    }
  }, [formData.gp]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    setFormData((prev) => {
      const newData = { ...prev, [id]: value };
      if (id === "state") {
        newData.district = "";
        newData.block = "";
        newData.gp = "";
        newData.village = "";
      } else if (id === "district") {
        newData.block = "";
        newData.gp = "";
        newData.village = "";
      } else if (id === "block") {
        newData.gp = "";
        newData.village = "";
      } else if (id === "gp") {
        newData.village = "";
      }
      return newData;
    });
  };


  const onDrop = (acceptedFiles) => {
    setFormData((prev) => ({
      ...prev,
      attachment: [...prev.attachment, ...acceptedFiles],
    }));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
      'application/pdf': [],
      'application/msword': [],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [],
      'application/vnd.ms-excel': [],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': []
    },
    maxSize: 5 * 1024 * 1024,
    multiple: true,
    maxFiles: 3
  });


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend  = new FormData();
    formData.attachment.forEach((file) => {
      formDataToSend.append("Files", file);
    });
    
    formDataToSend .append("Grievance", formData.grievance);
    formDataToSend .append("Phone_Number", Cookies.get("setPhoneNumber"));
    formDataToSend .append("Name", formData.name);
    formDataToSend .append("State", formData.state);
    formDataToSend .append("District", formData.district);
    formDataToSend .append("Block", formData.block);
    formDataToSend .append("GP", formData.gp);
    formDataToSend .append("Village", formData.village);
    formDataToSend .append("Address", formData.address);
    formDataToSend .append("Gender", formData.gender);
    formDataToSend .append("Disability", null);
    formDataToSend .append("Email", formData.email);
    formDataToSend .append("Message", formData.message);

    try {
        const response = await fetch(`${apiKey}/userFormData`, {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok)
        throw new Error(
          `Failed to input data in the tables: ${response.statusText}`
        );

      const data = await response.json();

      if (!data.success) {
        setIsSubmitted(true);
        setData(data);
      }
      setIsSubmitted(true);
      setData(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const steps = [
    {
      label: "Grievance Selection",
      shortLabel: "Grievance",
      content: (
        <div className="form-section">
          <h3 className="form-section-title">Select Grievance</h3>
          <p className="form-section-description">Please select which type of issue you face</p>
          {loading && <p className="text-blue-500">Loading...</p>}
          {error && <p className="text-red-500">Error: {error}</p>}
          <hr className="form-section-divider" />
          <div className="form-wrapper">
            <label htmlFor="grievance" className="form-label">
              Select Grievance<sup className="required-asterisk">*</sup>
            </label>
            <select
              id="grievance"
              value={formData.grievance}
              onChange={handleInputChange}
              aria-required="true"
              required
              className="form-select"
            >
              <option value="" disabled>
                --- Select ---
              </option>
              {grievances.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {error && <p className="error-message">{error}</p>}
            {loading && <p>Loading grievances...</p>}
          </div>
        </div>
      ),
    },
    {
      label: "Personal Information",
      shortLabel: "Personal Information",
      content: (
        <div className="form-section">
          <h3 className="form-section-title">Enter Your Personal Details</h3>
          <p className="form-section-description">Provide the necessary details to register your grievance</p>
          {loading && <p className="text-blue-500">Loading...</p>}
          {error && <p className="text-red-500">Error: {error}</p>}
          <hr className="form-section-divider" />
          <div className="form-wrapper">
            {/* Name */}
            <label htmlFor="name" className="form-label">
              Full Name<sup className="required-asterisk">*</sup>
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Jon Doe"
              aria-required="true"
              required
              className="form-input"
            />

            {/* Gender */}
            <label htmlFor="gender" className="form-label">
              Gender<sup className="required-asterisk">*</sup>
            </label>
            <select
              id="gender"
              value={formData.gender}
              onChange={handleInputChange}
              aria-required="true"
              required
              className="form-select"
            >
              <option value="" disabled>
                --- Select ---
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>

            {/* Email */}
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}

              placeholder="JonDoe@example.com"
              aria-required="true"
              className="form-input"
            />

            {/* Address */}
            <label htmlFor="address" className="form-label">
              Address<sup className="required-asterisk">*</sup>
            </label>
            <textarea
              id="address"
              value={formData.address}
              onChange={handleInputChange}
              aria-required="true"
              required
              className="form-input"
              placeholder="Enter your address ..."
              rows="4"
            >
            </textarea>
            <p className="text-red-500 font-medium">
              Please provide your email address to receive important updates and
              communications (optional).
            </p>
          </div>
        </div>
      ),
    },
    {
      label: "Residential Information",
      shortLabel: "Residential Information",
      content: (
        <div className="form-section">
          <h3 className="form-section-title">Residential Information</h3>
          <p className="form-section-description">Provide the required details to specify your region and local jurisdiction</p>
          {loading && <p className="text-blue-500">Loading...</p>}
          {error && <p className="text-red-500">Error: {error}</p>}
          <hr className="form-section-divider" />
          <div className="form-wrapper">
            {/* State */}
            <label htmlFor="state" className="form-label">
              State<sup className="required-asterisk">*</sup>
            </label>
            <select
              id="state"
              value={formData.state}
              onChange={handleInputChange}
              aria-required="true"
              required
              className="form-select"
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

            {/* District */}
            <label htmlFor="district" className="form-label">
              District<sup className="required-asterisk">*</sup>
            </label>
            <select
              id="district"
              value={formData.district}
              onChange={handleInputChange}
              aria-required="true"
              required
              className="form-select"
            >
              <option value="" disabled>
                --- Select ---
              </option>
              {districts.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>

            {/* Blocks */}
            <label htmlFor="block" className="form-label">Blocks<sup className="required-asterisk">*</sup></label>
            <select
              id="block"
              value={formData.block}
              onChange={handleInputChange}
              className="form-select"
            >
              <option value="" disabled>
                --- Select ---
              </option>
              {blocks.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>

            {/* GPs */}
            <label htmlFor="gp" className="form-label">Grama Panchayatas<sup className="required-asterisk">*</sup></label>
            <select
              id="gp"
              value={formData.gp}
              onChange={handleInputChange}
              className="form-select"
            >
              <option value="" disabled>
                --- Select ---
              </option>
              {gps.map((option, index) => (
                <option key={index} value={option.gram_panchayat_name}>
                  {option.gram_panchayat_name}
                </option>
              ))}
            </select>

            {/* Villages */}
            <label htmlFor="village" className="form-label">Villages<sup className="required-asterisk">*</sup></label>
            <select
              id="village"
              value={formData.village}
              onChange={handleInputChange}
              className="form-select"
            >
              <option value="" disabled>
                --- Select ---
              </option>
              {villages.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      ),
    },
    {
      label: "Attachments",
      shortLabel: "Files",
      content: (
        <div className="form-section">
          <h3 className="form-section-title">Attachments & Suggestions</h3>
          <p className="form-section-description">Upload any supporting documents and give some suggestion to solve the issue (if any)</p>
          {loading && <p className="text-blue-500">Loading...</p>}
          {error && <p className="text-red-500">Error: {error}</p>}
          <hr className="form-section-divider" />
          <div className="form-wrapper">
            <p className="text-sm text-center text-red-500">
              ( Drag & drop files here, or click to select files (Max size 5MB))
            </p>
            <label htmlFor="attachment" className="form-label">
              Upload File
            </label>
            <div
              {...getRootProps()}
              className={`form-input-file border-2 p-4 text-center cursor-pointer ${isDragActive ? "bg-gray-100" : ""}`}
            >
              <input {...getInputProps()} id="attachment" />

              {formData.attachment && formData.attachment.length > 0 ? (
                <ul className="mt-2 text-left list-disc list-inside">
                  {formData.attachment.map((file, index) => (
                    <li key={index}>📎 {file.name}</li>
                  ))}
                </ul>
              ) : (
                <p>Drag and drop a file here, or click to select (PDF, image, etc.)</p>
              )}
            </div>



            {/* Message */}
            <label htmlFor="message" className="form-label">
              Message
            </label>
            <textarea
              id="message"
              value={formData.message}
              onChange={handleInputChange}
              aria-required="true"
              className="form-input resize-none"
              placeholder="Any suggestions or describe your grievances..."
              rows="4"
            >
            </textarea>
          </div>

        </div>
      ),
    },
    {
      label: "Submit",
      shortLabel: "Submit",
      content: (
        <div className="form-section">
          <h3 className="form-section-title">Review & Submit</h3>
          <p className="form-section-description">Review your grievance details before submission</p>
          {loading && <p className="text-blue-500">Loading...</p>}
          {error && <p className="text-red-500">Error: {error}</p>}
          <hr className="form-section-divider" />
          <div className="form-wrapper review-section">
            <p className="review-item">
              <strong>Grievance:</strong> {formData.grievance || "Not selected"}
            </p>
            <p className="review-item">
              <strong>Name:</strong>{" "}
              {formData.name || "Not provided"}
            </p>
            <p className="review-item">
              <strong>State:</strong>{" "}
              {formData.state || "Not provided"}
            </p>
            <p className="review-item">
              <strong>District:</strong>{" "}
              {formData.district || "Not selected"}
            </p>
            <p className="review-item">
              <strong>Block:</strong> {formData.block || "Not provided"}
            </p>
            <p className="review-item">
              <strong>Grama Panchayat:</strong> {formData.gp || "Not provided"}
            </p>
            <p className="review-item">
              <strong>Village:</strong> {formData.village || "Not provided"}
            </p>
            <div className="review-item">
              <strong>Attachments:</strong>{" "}
              {formData.attachment && formData.attachment.length > 0 ? (
                <ul className="list-disc ml-5">
                  {formData.attachment.map((file, index) => (
                    <li key={index}>📎 {file.name}</li>
                  ))}
                </ul>
              ) : (
                "No file uploaded"
              )}
            </div>

          </div>
        </div>
      ),
    },
  ];

  const handleNext = () => {
    if (currentStep === 1 && !formData.grievance) return;
    if (
      currentStep === 2 &&
      (!formData.name || !formData.gender || !formData.address)
    )
      return;
    if (currentStep === 3 && (!formData.state || !formData.district || !formData.block || !formData.gp || !formData.village)) return;
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <>

      <div
        className="flex justify-between items-center bg-cover bg-center bg-none md:bg-[url('https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D')]"
      >

        <div className="w-full sm:w-2/3 md:w-1/2 lg:w-2/3 xl:w-2/4 mx-auto md:mx-0 md:ml-auto">
          <div className="form-container">
            <h2 className="form-title">{t("Fill_The_Grievance_Form")}</h2>
            <nav className="progress-bar" aria-label="Form progress">
              {steps.map((step, index) => (
                <div key={index} className="step-container">
                  <div className="step-wrapper">
                    <div
                      className={`step ${index + 1 <= currentStep ? "active" : ""}`}
                      aria-current={index + 1 === currentStep ? "step" : undefined}
                    >
                      {index + 1}
                    </div>
                    <span className="step-label">{step.shortLabel || step.label}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`step-line ${index + 1 < currentStep ? "active-line" : ""}`}
                    ></div>
                  )}
                </div>
              ))}
            </nav>

            {steps[currentStep - 1].content}

            <div className="buttons">
              <button
                className="prev-btn grievance-button"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                aria-label="Previous step"
              >
                {"< Previous"}
              </button>
              <button
                className="next-btn grievance-button"
                onClick={currentStep === steps.length ? handleSubmit : handleNext}
                disabled={
                  (currentStep === 1 && !formData.grievance) ||
                  (currentStep === 2 &&
                    (!formData.name ||
                      !formData.gender ||
                      !formData.address)) ||
                  (currentStep === 3 && (!formData.state ||
                    !formData.district ||
                    !formData.block ||
                    !formData.gp ||
                    !formData.village))
                }
                aria-label={currentStep === steps.length ? "Submit form" : "Next step"}
              >
                {currentStep === steps.length ? "Submit" : "Next >"}
              </button>
            </div>
          </div>
        </div>
        {isSubmitted && (
          <ThankYou
            onClose={() => {
              setIsSubmitted(false);
              window.location.reload();
            }}
            message={data}
          />
        )}
        <style jsx>{`
        .form-container {
          max-width: 600px;
          margin: 90px auto 40px;
          padding: 20px;
          background-color: #fff;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          font-family: Arial, sans-serif;
        }

        .form-title {
          text-align: center;
          color: #333;
          font-size: 24px;
          margin-bottom: 10px;
          font-weight: bold;
        }

        .progress-bar {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 30px;
          position: relative;
          overflow: hidden;
        }

        .step-container {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          max-width: 100px;
          transition: transform 0.3s ease;
        }

        .step-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          z-index: 1;
        }

        .step {
          width: 32px;
          height: 32px;
          background-color: #ccc;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-weight: bold;
          margin-bottom: 8px;
          margin-top: 8px;
          transition: background-color 0.3s ease, transform 0.3s ease, opacity 0.3s ease;
          border: 1px solid #fff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .step.active {
          background-color: #28a745;
          transform: scale(1.15);
          opacity: 1;
        }

        .step:not(.active) {
          opacity: 0.8;
        }

        .step-container:has(.step:not(.active)) .step-line {
          opacity: 0.3;
        }

        .step-line {
          position: absolute;
          top: 23px;
          left: 50%;
          right: -50%;
          height: 2px;
          background-color: #ccc;
          transition: background-color 0.4s ease, width 0.4s ease;
          z-index: 0;
        }

        .step-line.active-line {
          background-color: #28a745;
          width: 100%;
        }

        .step-label {
          font-size: 12px;
          color: #666;
          text-align: center;
          width: 100%;
          line-height: 1.2;
          transition: opacity 0.3s ease, font-size 0.3s ease;
          margin-top: 5px;
          
        }

        .form-section {
          margin-bottom: 30px;
        }

        .form-section-title {
          font-size: 18px;
          color: #333;
          margin-bottom: 5px;
        }

        .form-section-description {
          color: #666;
          font-size: 14px;
          margin-bottom: 15px;
        }

        .form-section-divider {
          border: 0;
          border-top: 1px solid #eee;
          margin-bottom: 20px;
        }

        .form-label {
          display: block;
          font-size: 14px;
          color: #333;
          margin-bottom: 5px;
          font-weight: 600;
        }

        .form-input,
        .form-select {
          width: 100%;
          padding: 12px;
          margin-bottom: 15px;
          border: 1px solid #ccc;
          border-radius: 5px;
          font-size: 14px;
          color: #333;
          box-sizing: border-box;
        }

        .form-input::placeholder {
          color: #999;
        }

        .form-select {
          appearance: none;
          background: url('data:image/svg+xml;utf8,<svg fill="black" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/></svg>') no-repeat right 12px center;
          background-size: 14px;
        }

        .form-input-file {
          padding: 8px;
          width: 100%;
          margin-bottom: 15px;
          border: 2px dashed #ccc;
          border-radius: 5px;
          cursor: pointer;
        }

        .form-input-file:hover {
          border-color: #28a745;
        }

        .review-section .review-item {
          font-size: 14px;
          color: #333;
          margin-bottom: 10px;
        }

        .buttons {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
        }

        .grievance-button {
          flex: 1;
          padding: 12px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 14px;
          transition: background-color 0.3s ease, transform 0.1s ease;
        }

        .prev-btn {
          background-color: #fff;
          color: #28a745;
          border: 1px solid #28a745;
        }

        .prev-btn:disabled {
          color: #ccc;
          border-color: #ccc;
          cursor: not-allowed;
        }

        .next-btn {
          background-color: #28a745;
          color: #fff;
        }

        .next-btn:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }

        .prev-btn:hover:not(:disabled) {
          background-color: #f0f0f0;
          transform: translateY(-1px);
        }

        .next-btn:hover:not(:disabled) {
          background-color: #218838;
          transform: translateY(-1px);
        }

        .required-asterisk {
          color: #ff0000;
          font-size: 12px;
        }

        .error-message {
          color: #ff0000;
          font-size: 14px;
          margin-top: 10px;
        }

        @media (max-width: 900px) {
          .form-container {
            max-width: 90%;
            padding: 15px;
          }

          .form-title {
            font-size: 22px;
          }

          .step {
            width: 28px;
            height: 28px;
            font-size: 14px;
          }

          .step-label {
            font-size: 11px;
            width: 70px;
          }

          .step-line {
            top: 20px;
          }

          .grievance-button {
            padding: 10px 15px;
          }
        }

        @media (max-width: 600px) {
          .form-container {
            padding: 12px;
          }

          .form-title {
            font-size: 20px;
          }

          .form-section-title {
            font-size: 16px;
          }

          .progress-bar {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 8px;
            flex-wrap: nowrap;
            margin-bottom: 20px;
            padding: 0 12px;
            overflow: visible;
          }

          .step-container {
            flex: 0 0 auto;
            min-width: 50px;
            max-width: 50px;
            position: relative;
            transform: translateX(0);
          }

          .step {
            width: 30px;
            height: 30px;
            font-size: 12px;
            margin-bottom: 6px;
            opacity: 0.6;
          }

          .step.active {
            opacity: 1;
            transform: scale(1.2);
          }

          .step-line {
            top: 21px;
            height: 2px;
            opacity: 0.5;
          }

          .step-line.active-line {
            opacity: 1;
            width: 100%;
          }

          .step-label {
            font-size: 9px;
            width: 50px;
            opacity: 0.8;
            line-height: 1.1;
          }

          .form-input,
          .form-select {
            padding: 10px;
            font-size: 13px;
          }

          .grievance-button {
            padding: 10px 12px;
            font-size: 13px;
          }

          .buttons {
            gap: 8px;
          }
        }

        @media (max-width: 400px) {
          .form-container {
            padding: 10px;
          }

          .progress-bar {
            gap: 6px;
            padding: 0 8px;
          }

          .step-container {
            min-width: 40px;
            max-width: 40px;
          }

          .step {
            width: 26px;
            height: 26px;
            font-size: 10px;
          }

          .step-label {
            font-size: 8px;
            width: 40px;
            opacity: 0.7;
          }

          .step-line {
            top: 19.5px;
            height: 2px;
          }

          .form-title {
            font-size: 18px;
          }

          .form-section-title {
            font-size: 14px;
          }

          .form-section-description {
            font-size: 12px;
          }

          .form-input,
          .form-select {
            padding: 8px;
            font-size: 12px;
          }

          .grievance-button {
            padding: 8px 10px;
            font-size: 12px;
          }
        }

        .grievance-button:focus {
          outline: 2px solid #28a745;
          outline-offset: 2px;
        }

        .form-input:focus,
        .form-select:focus {
          outline: 2px solid #28a745;
          outline-offset: 1px;
        }

        .step[aria-current="step"] {
          outline: 2px solid #28a745;
          outline-offset: 2px;
        }

        @media (max-width: 264px) {
          .progress-bar {
            gap: 2px;
          }
          .step-container {
            min-width: 35px;
            max-width: 35px;
          }

          .step {
            width: 22px;
            height: 22px;
            font-size: 10px;
          }

          .step-line {
            top: 18px;
            height: 2px;
          }
        }
      `}</style>
      </div>
    </>
  );
}