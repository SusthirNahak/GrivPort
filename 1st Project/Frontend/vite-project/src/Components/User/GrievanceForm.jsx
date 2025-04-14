import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import { useDropzone } from "react-dropzone";
import Cookies from 'js-cookie';

// import { useLocation } from "react-router-dom";
import ThankYou from "./ThankYou";

export default function GrievanceForm() {
  const [grievances, setGrievances] = useState([]);
  const [grievanceSelect, setGrievanceSelect] = useState("");

  const [name, setName] = useState("");

  const [states, setStates] = useState([]);
  const [stateSelect, setStateSelect] = useState("");

  const [districts, setDistricts] = useState([]);
  const [districtSelect, setDistrictSelect] = useState("");

  const [blocks, setBlocks] = useState([]);
  const [blockSelect, setBlockSelect] = useState("");

  const [gp, setGPs] = useState([]);
  const [gpSelect, setGPSelect] = useState("");

  const [villages, setVillages] = useState([]);
  const [villageSelect, setVillageSelect] = useState("");

  const [address, setAddress] = useState("");

  const [gender, setGender] = useState("");

  const [disability, setDisability] = useState("");

  const [email, setEmail] = useState("");

  const [message, setMessage] = useState("");

  const [files, setFiles] = useState([]);
  const [previewFile, setPreviewFile] = useState(null);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const [data, setData] = useState(false);

  const navigate = useNavigate();

  // const location = useLocation();
  // const { grievanceSelectedValue } = location.state || {};

  // console.log("grievanceSelectedValue: ", grievanceSelectedValue);

  useEffect(() => {
    !Cookies.get('setPhoneNumber') ? navigate('/landingpage') : navigate('/grievanceform');
  }, [navigate]);

  // Fetch Grievances
  useEffect(() => {
    const fetchGrievances = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:5000/grievances");
        if (!response.ok) throw new Error("Failed to fetch Grievances");
        const data = await response.json();
        // console.log("GRIVEANCES: ", data.sort());

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
      setLoading(true);
      try {
        const response = await fetch("http://localhost:5000/states");
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
    if (stateSelect) {
      const fetchDistricts = async () => {
        setLoading(true);
        try {
          const response = await fetch(
            `http://localhost:5000/districts?stateName=${stateSelect}`
          );
          if (!response.ok) throw new Error("Failed to fetch districts");
          const data = await response.json();
          const districtData = data[0]?.districts || [];
          setDistricts(districtData.sort());
          setDistrictSelect("");
          setBlocks([]);
          setBlockSelect("");
          setGPs([]);
          setGPSelect("");
          setVillages([]);
          setVillageSelect("");
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
  }, [stateSelect]);

  // Fetch Blocks
  useEffect(() => {
    if (districtSelect) {
      const fetchBlocks = async () => {
        setLoading(true);
        try {
          const response = await fetch(
            `http://localhost:5000/blocks?districtName=${districtSelect}`
          );
          if (!response.ok) throw new Error("Failed to fetch blocks");
          const data = await response.json();
          const blockData = data[0]?.blocks || [];
          setBlocks(blockData.sort());
          setBlockSelect("");
          setGPs([]);
          setGPSelect("");
          setVillages([]);
          setVillageSelect("");
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
  }, [districtSelect]);

  // Fetch GPs
  useEffect(() => {
    if (blockSelect) {
      const fetchGPs = async () => {
        setLoading(true);
        try {
          const response = await fetch(
            `http://localhost:5000/GPs?stateName=${stateSelect}&districtName=${districtSelect}&blockName=${blockSelect}`
          );
          if (!response.ok) throw new Error("Failed to fetch GPs");
          const data = await response.json();
          const gpData = data?.gram_panchayats || [];
          setGPs(gpData);
          setGPSelect("");
          setVillages([]);
          setVillageSelect("");
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
  }, [blockSelect]);

  // Fetch Villages
  useEffect(() => {
    if (gpSelect) {
      const fetchVillages = async () => {
        setLoading(true);
        try {
          const response = await fetch(
            `http://localhost:5000/villages?stateName=${stateSelect}&districtName=${districtSelect}&blockName=${blockSelect}&gpName=${gpSelect}`
          );
          if (!response.ok) throw new Error("Failed to fetch villages");
          const data = await response.json();
          const villageData = data?.villages || [];
          setVillages(villageData);
          setVillageSelect("");
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
  }, [gpSelect]);

  // File
  const maxSize = 1024 * 1024 * 1024; // 1GB in bytes

  const onDrop = useCallback((acceptedFiles) => {
    const validFiles = acceptedFiles.filter((file) => file.size <= maxSize);
    setFiles((prevFiles) => [...prevFiles, ...validFiles]);
  }, []);

  const onDropRejected = useCallback((rejectedFiles) => {
    rejectedFiles.forEach((file) => {
      if (file.size > maxSize) {
        alert(`File too large: ${file.name}. Max size is 1GB.`);
      }
    });
  }, []);

  const removeFile = (fileName) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    onDropRejected,
    maxSize,
    multiple: true,
  });

  const renderFilePreview = (file) => {
    const fileType = file.type.split("/")[0];

    if (fileType === "image") {
      return (
        <img
          src={URL.createObjectURL(file)}
          alt="Preview"
          className="file-thumbnail"
        />
      );
    }
    if (fileType === "video") {
      return (
        <video src={URL.createObjectURL(file)} className="file-thumbnail" />
      );
    }
    if (fileType === "audio") {
      return <span>🎵</span>;
    }
    if (file.type === "application/pdf") {
      return <span>📄</span>;
    }
    return <span>📄</span>;
  };

  const renderFullScreenPreview = (file) => {
    const fileType = file.type.split("/")[0];
    const url = URL.createObjectURL(file);

    if (fileType === "image") {
      return <img src={url} alt="Full Preview" className="fullscreen-media" />;
    }
    if (fileType === "video") {
      return <video src={url} controls autoPlay className="fullscreen-media" />;
    }
    if (fileType === "audio") {
      return <audio src={url} controls autoPlay className="fullscreen-audio" />;
    }
    if (file.type === "application/pdf") {
      return <iframe src={url} className="fullscreen-pdf" title={file.name} />;
    }
    return (
      <div className="fullscreen-text">
        <p>File preview not available</p>
        <a
          href={url}
          download={file.name}
          target="_blank"
          rel="noopener noreferrer"
        >
          Download: {file.name}
        </a>
      </div>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("Files", file);
    });

    // Append other form fields
    formData.append("Grievance", grievances[grievanceSelect]);
    formData.append("Phone_Number", Cookies.get("setPhoneNumber"));
    formData.append("Name", name);
    formData.append("State", stateSelect);
    formData.append("District", districtSelect);
    formData.append("Block", blockSelect);
    formData.append("GP", gpSelect);
    formData.append("Village", villageSelect);
    formData.append("Address", address);
    formData.append("Gender", gender);
    formData.append("Disability", disability);
    formData.append("Email", email);
    formData.append("Message", message);

    console.log("Before formData:", formData);

    console.log("Submitting formData:");
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`); // Log FormData contents
    }

    try {
      const response = await fetch("http://localhost:5000/userFormData", {
        method: "POST",
        body: formData,
      });

      // console.log("RESPONSE: ", response);

      if (!response.ok)
        throw new Error(
          `Failed to input data in the tables: ${response.statusText}`
        );

      const data = await response.json();

      console.log("RESPONSE DATA: ", data);

      if (!data.success) {
        setIsSubmitted(true);
        setData(data);
      }
      setIsSubmitted(true);
      setData(data);

      // setName("");
      // setGrievanceSelect("");
      // setStateSelect("");
      // setDistrictSelect("");
      // setBlockSelect("");
      // setGPSelect("");
      // setVillageSelect("");
      // setAddress("");
      // setGender("");
      // setDisability("");
      // setEmail("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    // <div className="bg-amber-50">
    <div className="mx-auto sm:w-3/4 mt-2 px-6">
      <h1 className="font-bold text-4xl my-5">Enter Location Details</h1>
      <hr className="w-full" />
      {loading && <p className="text-blue-500">Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-12 gap-y-1 sm:gap-y-10 gap-x-4 mt-8"
      >
        {/* Select Grievance  */}
        <div className="col-span-12 md:col-span-3 mt-5 sm:mt-0">
          <label
            htmlFor="greivance"
            className="font-medium text-md text-gray-700"
          >
            Select Your Grievance <sup className="text-red-500">*</sup>
          </label>
          <select
            name="grievance"
            id="grievance"
            value={grievanceSelect}
            onChange={(e) => setGrievanceSelect(e.target.value)}
            className="w-full mt-2 p-3 border-b border-gray-300 
               focus:outline-none focus:ring-0.9 focus:ring-black focus:border-black
               hover:border-gray-400 transition-all duration-200 ease-in-out resize-none
               placeholder-gray-400"
            required
          >
            <option value="" disabled>
              --- Select ---
            </option>
            {grievances.map((option, index) => (
              <option key={index} value={index}>
                {option}
              </option>
            ))}
          </select>
        </div>
        {/* Name */}
        <div className="col-span-12 md:col-span-3 mt-5 sm:mt-0">
          <label htmlFor="name" className="font-medium text-md text-gray-700">
            Name<sup className="text-red-500">*</sup>
          </label>
          <input
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="John Doe"
            className="w-full mt-2 p-3 border-b border-gray-300 
               focus:outline-none focus:ring-0.9 focus:ring-black focus:border-black
               hover:border-gray-400 transition-all duration-200 ease-in-out resize-none
               placeholder-gray-400"
            required
          />
          {/* disabled={!grievanceSelect} */}
        </div>
        {/* State */}
        <div className="col-span-12 md:col-span-3 mt-5 sm:mt-0">
          <label htmlFor="state" className="font-medium text-md text-gray-700">
            State<sup className="text-red-500">*</sup>
          </label>
          <select
            name="state"
            id="state"
            value={stateSelect}
            onChange={(e) => setStateSelect(e.target.value)}
            className="w-full mt-2 p-3 border-b border-gray-300 
               focus:outline-none focus:ring-0.9 focus:ring-black focus:border-black
               hover:border-gray-400 transition-all duration-200 ease-in-out resize-none
               placeholder-gray-400"
            required
            disabled={loading}
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
            onChange={(e) => setDistrictSelect(e.target.value)}
            className="w-full mt-2 p-3 border-b border-gray-300 
               focus:outline-none focus:ring-0.9 focus:ring-black focus:border-black
               hover:border-gray-400 transition-all duration-200 ease-in-out resize-none
               placeholder-gray-400"
            required
            disabled={loading || districts.length === 0}
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
        </div>
        {/* Block / ULB */}
        <div className="col-span-12 md:col-span-3 mt-5 sm:mt-0">
          <label htmlFor="block" className="font-medium text-md text-gray-700">
            Block / ULB <sup className="text-red-500">*</sup>
          </label>
          <select
            name="block"
            id="block"
            value={blockSelect}
            onChange={(e) => setBlockSelect(e.target.value)}
            className="w-full mt-2 p-3 border-b border-gray-300 
               focus:outline-none focus:ring-0.9 focus:ring-black focus:border-black
               hover:border-gray-400 transition-all duration-200 ease-in-out resize-none
               placeholder-gray-400"
            required
            disabled={loading || blocks.length === 0}
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
        </div>
        {/* GP */}
        <div className="col-span-12 md:col-span-3 mt-5 sm:mt-0">
          <label htmlFor="gp" className="font-medium text-md text-gray-700">
            GP <sup className="text-red-500">*</sup>
          </label>
          <select
            name="gp"
            id="gp"
            value={gpSelect}
            onChange={(e) => setGPSelect(e.target.value)}
            className="w-full mt-2 p-3 border-b border-gray-300 
               focus:outline-none focus:ring-0.9 focus:ring-black focus:border-black
               hover:border-gray-400 transition-all duration-200 ease-in-out resize-none
               placeholder-gray-400"
            required
            disabled={loading || gp.length === 0}
          >
            <option value="" disabled>
              --- Select ---
            </option>
            {gp.map((option, index) => (
              <option key={index} value={option.gram_panchayat_name}>
                {option.gram_panchayat_name}
              </option>
            ))}
          </select>
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
            value={villageSelect}
            onChange={(e) => setVillageSelect(e.target.value)}
            className="w-full mt-2 p-3 border-b border-gray-300 
               focus:outline-none focus:ring-0.9 focus:ring-black focus:border-black
               hover:border-gray-400 transition-all duration-200 ease-in-out resize-none
               placeholder-gray-400"
            required
            disabled={loading || villages.length === 0}
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
        {/* Address */}
        <div className="col-span-12 md:col-span-3 mt-5 sm:mt-0">
          <label
            htmlFor="address"
            className="font-medium text-md text-gray-700"
          >
            Address <sup className="text-red-500">*</sup>
          </label>
          <textarea
            name="address"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full mt-2 p-3 border-b border-gray-300 
               focus:outline-none focus:ring-0.9 focus:ring-black focus:border-black
               hover:border-gray-400 transition-all duration-200 ease-in-out
               placeholder-gray-400 resize-none"
            required
            placeholder="Enter your address..."
            rows="1"
          />
        </div>
        {/* Gender */}
        <div className="col-span-12 md:col-span-3 mt-5 sm:mt-0">
          <label htmlFor="gender" className="font-medium text-md text-gray-700">
            Gender<sup className="text-red-500">*</sup>
          </label>
          <select
            name="gender"
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full mt-2 p-3 border-b border-gray-300 
               focus:outline-none focus:ring-0.9 focus:ring-black focus:border-black
               hover:border-gray-400 transition-all duration-200 ease-in-out resize-none
               placeholder-gray-400"
            required
          >
            <option value="" disabled>
              --- Select ---
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </select>
        </div>
        {/* Disability Type */}
        <div className="col-span-12 md:col-span-3 mt-5 sm:mt-0">
          <label
            htmlFor="disability"
            className="font-medium text-md text-gray-700"
          >
            Disability Type <sup className="text-red-500">*</sup>
          </label>
          <select
            name="disability"
            id="disability"
            value={disability}
            onChange={(e) => setDisability(e.target.value)}
            className="w-full mt-2 p-3 border-b border-gray-300 
               focus:outline-none focus:ring-0.9 focus:ring-black focus:border-black
               hover:border-gray-400 transition-all duration-200 ease-in-out resize-none
               placeholder-gray-400"
            required
          >
            <option value="" disabled>
              --- Select ---
            </option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        {/* Email */}
        <div className="col-span-12 md:col-span-3 mt-5 sm:mt-0">
          <label htmlFor="email" className="font-medium text-md text-gray-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="example@email.com"
            className="w-full mt-2 p-3 border-b border-gray-300 
               focus:outline-none focus:ring-0.9 focus:ring-black focus:border-black
               hover:border-gray-400 transition-all duration-200 ease-in-out resize-none
               placeholder-gray-400"
          />
        </div>
        {/* Message */}
        <div className="col-span-12 mt-5 sm:mt-0">
          <label
            htmlFor="disability"
            className="block text-md font-medium text-gray-700 mb-1.5"
          >
            Message
          </label>
          <textarea
            name="message"
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg 
               focus:outline-none focus:ring-0.7 focus:ring-black focus:border-black
               hover:border-gray-400 transition-all duration-200 ease-in-out resize-none
               placeholder-gray-400"
            placeholder="Any suggestions or describe your grievances..."
            rows="4"
          ></textarea>
        </div>

        {/* Any Type Of File */}
        <div className="col-span-12">
          <div className="app-container">
            <div {...getRootProps({ className: "dropzone" })}>
              <input {...getInputProps()} />
              <p>
                Drag & drop files here, or click to select files (Max size 1GB)
              </p>
            </div>
            <div className="uploaded-files">
              <h3 className="font-semibold text-lg mb-2">Uploaded Files:</h3>
              {files.length > 0 ? (
                <div className="files-container">
                  {files.map((file, index) => (
                    <div key={index} className="file-item">
                      <div className="file-info">
                        {renderFilePreview(file)}
                        <span
                          className="file-name"
                          onClick={() => setPreviewFile(file)}
                        >
                          {file.name}
                        </span>
                        <button
                          className="remove-btn"
                          onClick={() => removeFile(file.name)}
                        >
                          X
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No files uploaded yet.</p>
              )}
            </div>
            {previewFile && (
              <div className="fullscreen-preview">
                <button
                  className="close-btn"
                  onClick={() => setPreviewFile(null)}
                >
                  ✕
                </button>
                {renderFullScreenPreview(previewFile)}
              </div>
            )}
          </div>
        </div>

        <p className="text-red-500 font-medium col-span-12">
          Please provide your email address to receive important updates and
          communications (optional).
        </p>
        {/* Submit */}
        <input
          type="submit"
          className="block col-span-12 w-full py-3 my-6 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200 cursor-pointer active:outline-1 active:outline-offset-3 active:outline-green-600"
          value="Submit"
          disabled={loading}
        />
      </form>
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
        .app-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 30px;
          width: 100%;
          // border: 2px solid red;
        }

        .dropzone {
          border: 2px dashed #cccccc;
          padding: 20px;
          text-align: center;
          cursor: pointer;
          width: 100%;
          margin-bottom: 5px;
        }

        .dropzone:hover {
          background-color: #f0f0f0;
        }

        .uploaded-files {
          margin-top: 20px;
          width: 100%;
        }

        .files-container {
          // border: 2px solid red;
          padding: 10px;
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          justify-content: start;
          min-height: 80px;
        }

        .file-item {
          width: 150px;
          height: 50px;
          border: 1px solid gray;
          border-radius: 10px;
          background-color: white;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .file-info {
          display: flex;
          align-items: center;
          width: 100%;
          height: 100%;
        }

        .file-thumbnail {
          width: 40px;
          height: 40px;
          margin: 0 10px;
          object-fit: cover;
        }

        .file-name {
          flex: 1;
          text-align: start;
          font-size: 14px;
          color: blue;
          cursor: pointer;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .file-name:hover {
          text-decoration: underline;
        }

        .remove-btn {
          background: none;
          border: none;
          color: red;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          padding: 0 12px;
        }

        .remove-btn:hover {
          color: darkred;
        }

        .fullscreen-preview {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: rgba(0, 0, 0, 0.9);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .fullscreen-media {
          max-width: 90%;
          max-height: 90%;
          object-fit: contain;
        }

        .fullscreen-pdf {
          width: 90%;
          height: 90%;
          border: none;
        }

        .fullscreen-audio {
          width: 50%;
        }

        .fullscreen-text {
          color: white;
          text-align: center;
        }

        .close-btn {
          position: absolute;
          top: 20px;
          right: 25px;
          background: white;
          border: none;
          font-size: 24px;
          cursor: pointer;
          padding: 5px 12px;
          border-radius: 50%;
        }

        .close-btn:hover {
          background: #ddd;
        }

        @media (max-width: 600px) {
          .file-item {
            width: 100%;
            margin: 0 5px;
          }

          .dropzone {
            width: 90%;
          }

          .uploaded-files {
            width: 95%;
          }
        }
      `}</style>
    </div>
    // </div>
  );
}
