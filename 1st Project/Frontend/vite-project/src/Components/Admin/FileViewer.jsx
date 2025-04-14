import React from "react";

const FileViewer = () => {
  // Get the file URL from the query parameter and decode it
  const urlParams = new URLSearchParams(window.location.search);
  const encodedFileUrl = urlParams.get("file");
  const fileUrl = encodedFileUrl ? decodeURIComponent(encodedFileUrl) : null;

  console.log("URL: ", fileUrl);
  

  const renderFile = (fileUrl) => {
    if (!fileUrl) return <p className="text-gray-500">No file provided.</p>;

    const urlWithoutParams = fileUrl.split("?")[0];
    const fileExtension = urlWithoutParams.split(".").pop().toLowerCase();

    switch (fileExtension) {
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
        return (
          <div className="w-full">
            <img
              src={fileUrl}
              alt="Attachment"
              className="w-full h-auto max-h-[80vh] object-contain rounded-md"
              onError={(e) => {
                console.error("Image failed to load:", fileUrl);
                e.target.src = "https://via.placeholder.com/400"; // Fallback image
              }}
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
              className="w-full h-auto max-h-[80vh] rounded-md"
              onError={(e) => {
                console.error("Video failed to load:", fileUrl);
                e.target.style.display = "none";
                e.target.parentElement.innerHTML =
                  '<p class="text-gray-500">Video failed to load.</p>';
              }}
            >
              <source src={fileUrl} type={`video/${fileExtension}`} />
              Your browser does not support the video tag.
            </video>
          </div>
        );
      case "mp3":
        return (
          <div className="w-full">
            <audio controls className="w-full max-w-md rounded-md">
              <source src={fileUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        );
      case "pdf":
        return (
          <div className="w-full">
            <iframe
              src={`${fileUrl}#toolbar=0`}
              title="PDF Viewer"
              className="w-full h-[80vh] rounded-md border"
            ></iframe>
          </div>
        );
      default:
        return (
          <p className="text-gray-500">
            Unsupported file type or no preview available.
          </p>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">
          File Viewer
        </h1>
        {renderFile(fileUrl)}
      </div>
    </div>
  );
};

export default FileViewer;