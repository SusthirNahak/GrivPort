import React, { useState, useEffect } from "react";

import FileViewer from "./FileViewer";

const Modal = ({ isOpen, onClose, data }) => {

  const [selectedFile, setSelectedFile] = useState(null)

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const renderAttachments = (filePaths, fileTypes) => {
    if (!filePaths || !fileTypes) return null;

    try {
      const files = JSON.parse(filePaths);
      const types = JSON.parse(fileTypes);

      return files.map((file, index) => {
        console.log("FILE: ", file);
        console.log("TYPES: ", types);

        const urlWithoutParams = file.split("?")[0];
        const fileExtension = urlWithoutParams.split(".").pop().toLowerCase();
        const fileType = types[index];

        const handleOpenFile = () => {
          // window.open(`/file-review?file=${file}`, "_blank");
          // <FileViewer path={file} />
          setSelectedFile(file)
        };

        return (
          <button
            key={index}
            onClick={handleOpenFile}
            className="text-blue-600 hover:underline focus:outline-none mr-2 px-2 py-1 bg-blue-100 rounded"
          >
            {fileExtension}
          </button>
        );
      });
    } catch (e) {
      console.error("Error parsing file data:", e);
      return <span className="text-red-500">Error loading attachments</span>;
    }
  };

  const fieldsToDisplay = [
    { label: "Name", key: "Name" },
    { label: "Email", key: "Email" },
    { label: "Address", key: "Address" },
    { label: "Message", key: "Message" },
    {
      label: "Attachments",
      key: "File_Paths",
      render: (value) => renderAttachments(value, data.File_Paths)
    },
  ];

  console.log("FROM MODAL: ", data);


  return (
    <div className="fixed inset-0 z-50 overflow-y-auto mt-6">
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300"

        onClick={onClose}
      ></div>

      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-xl max-w-xl w-full m-4 transform transition-all dark-mode">
          <div className="flex items-center justify-between !p-4 border-b">
            <h3 className="text-md font-semibold dark-mode">{data.Grievance}</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="!p-4">
            {data && (
              <div className="space-y-6  " >
                {/* Table for basic data */}
                <div className="overflow-x-auto ">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="">
                      <tr >
                        <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider dark-mode">
                          Field
                        </th>
                        <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider dark-mode">
                          Value
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {fieldsToDisplay.map((field) => (
                        <tr key={field.key} className="dark-mode">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium" >
                            {field.label}
                          </td>
                          <td className="px-6 py-4 text-sm">
                            {field.render
                              ? field.render(data[field.key])
                              : data[field.key]}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
          {data.Application_Status.toLowerCase() !== 'rejected' && <div className="flex justify-end !p-4 border-t">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 !mr-3 hover:underline"
            >
              Reject
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 hover:underline"
            >
              Share
            </button>
          </div>
          }
        </div>
        {selectedFile && (
          <FileViewer
            path={selectedFile}
            onClose={() => setSelectedFile(null)}
          />
        )}
      </div>
      <style jsx>{`body.dark .dark-mode{
      background-color: var(--light);
      color: var(--dark);

      body.dark .dark-mode:hover{
      background-color: var(--grey);
      }
      
      }`}</style>

    </div>
  );
};

export default Modal;