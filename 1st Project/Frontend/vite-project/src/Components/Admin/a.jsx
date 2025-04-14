import { useEffect, useCallback, useState } from "react";

const Modal = ({ isOpen, onClose, data }) => {
  const [selectedFile, setSelectedFile] = useState(null); // Store the file URL to display
  const [fileContent, setFileContent] = useState(null); // Store the fetched file content
  const [error, setError] = useState(null); // Handle fetch errors

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        setSelectedFile(null); // Clear file view on Escape
        setFileContent(null);
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Fetch file from backend
  const fetchFileFromBackend = async (fileUrl) => {
    try {
      setError(null);
      // Replace with your actual backend API endpoint
      const response = await fetch(`http://localhost:5000/api/files?file=${encodeURIComponent(fileUrl)}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/octet-stream", // Adjust based on your backend
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch file from backend");
      }

      const blob = await response.blob(); // Get file as a Blob
      const fileExtension = fileUrl.split(".").pop().toLowerCase();
      const objectUrl = URL.createObjectURL(blob); // Create a local URL for the Blob
      setFileContent({ url: objectUrl, extension: fileExtension });
    } catch (e) {
      console.error("Error fetching file:", e);
      setError("Unable to load file from backend");
    }
  };

  const renderAttachments = useCallback((fileNames) => {
    if (!fileNames) return null;

    let files;
    try {
      files = typeof fileNames === "string" ? JSON.parse(fileNames) : fileNames;
      if (!Array.isArray(files)) throw new Error("File names must be an array");
    } catch (e) {
      console.error("Error parsing fileNames:", e);
      return <span className="text-red-500">Error loading attachments</span>;
    }

    return files.map((file, index) => {
      const fileExtension = file.split(".").pop().toLowerCase();
      const fileName = file.split("/").pop().split("?")[0];

      const handleOpenFile = () => {
        setSelectedFile(file); // Set the file to fetch
        fetchFileFromBackend(file); // Fetch file from backend
      };

      return (
        <button
          key={index}
          onClick={handleOpenFile}
          className="text-blue-600 hover:underline focus:outline-none mr-2 px-2 py-1 bg-blue-100 rounded"
          title={`Open ${fileName}`}
        >
          {fileName} ({fileExtension})
        </button>
      );
    });
  }, []);

  // Render file content (embedded FileViewer logic)
  const renderFileContent = () => {
    if (error) return <p className="text-red-500">{error}</p>;
    if (!fileContent) return <p className="text-gray-500">Loading file...</p>;

    const { url, extension } = fileContent;

    switch (extension) {
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
        return (
          <div className="w-full">
            <img
              src={url}
              alt={`Attachment`}
              className="w-full h-auto max-h-[60vh] object-contain rounded-md"
              onError={() => setError("Failed to load image")}
            />
          </div>
        );
      case "mp4":
      case "webm":
      case "ogg":
        return (
          <div className="w-full">
            <video
              controls
              className="w-full h-auto max-h-[60vh] rounded-md"
              onError={() => setError("Failed to load video")}
            >
              <source src={url} type={`video/${extension}`} />
              Your browser does not support the video tag.
            </video>
          </div>
        );
      case "mp3":
        return (
          <div className="w-full">
            <audio
              controls
              className="w-full max-w-md rounded-md"
              onError={() => setError("Failed to load audio")}
            >
              <source src={url} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        );
      case "pdf":
        return (
          <div className="w-full">
            <iframe
              src={`${url}#toolbar=0`}
              title={`PDF Viewer`}
              className="w-full h-[60vh] rounded-md border"
              onError={() => setError("Failed to load PDF")}
            />
          </div>
        );
      default:
        return <p className="text-gray-500">Unsupported file type: {extension}</p>;
    }
  };

  const fieldsToDisplay = [
    { label: "Name", key: "Name" },
    { label: "Email", key: "Email" },
    { label: "Address", key: "Address" },
    { label: "Message", key: "Message" },
    {
      label: "Attachments",
      key: "File_Names",
      render: (value) => renderAttachments(value),
    },
  ];

  if (!isOpen || !data) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 overflow-y-auto mt-6"
    >
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-xl w-full m-4 transform transition-all">
          <div className="flex items-center justify-between p-4 border-b">
            <h3
              id="modal-title"
              className="text-md font-semibold text-black dark:text-white"
            >
              {data.Grievance || "Grievance Details"}
            </h3>
            <button
              onClick={() => {
                setSelectedFile(null); // Clear file view
                setFileContent(null);
                onClose();
              }}
              aria-label="Close modal"
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
          <div className="p-4">
            <div className="space-y-6">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-200">
                      Field
                    </th>
                    <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-200">
                      Value
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {fieldsToDisplay.map((field) => (
                    <tr key={field.key}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                        {field.label}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                        {field.render
                          ? field.render(data[field.key])
                          : data[field.key] || "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Display file content when a file is selected */}
            {selectedFile && (
              <div className="mt-4 p-4 border-t">
                <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-2">
                  Viewing: {selectedFile.split("/").pop()}
                </h4>
                {renderFileContent()}
                <button
                  onClick={() => {
                    setSelectedFile(null);
                    setFileContent(null);
                  }}
                  className="mt-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none"
                >
                  Close File
                </button>
              </div>
            )}
          </div>
          {!selectedFile && (
            <div className="flex justify-end p-4 border-t">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;