import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import Modal from "../Modal";
import imagess from "./a.jpg";
import FileViewer from "../FileViewer";

import { Routes, Route } from "react-router-dom";

export default function Home2() {
  const [actionStatus, setActionStatus] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const handleAction = (action) => {
    setActionStatus(action);
    console.log(`Action taken: ${action}`);
  };

  // Sample data array
  // const items = [
  //   {
  //     id: 1,
  //     name: "John Doe",
  //     email: "john@example.com",
  //     message:
  //       "Hello World Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi quod ducimus cum illo ullam quo magni incidunt tempore facere, fugit, sequi veniam suscipit consequatur perspiciatis quidem vel nihil sed, unde ex laudantium! Dolor nesciunt ea quidem cupiditate iure rerum animi, aut voluptatibus dolorum perspiciatis temporibus, nulla vero nam aliquid. Fuga placeat, deleniti, cum aspernatur rerum blanditiis aut sint quae repellat similique, delectus laboriosam molestias consequuntur ex magni! Nisi exercitationem aliquid repudiandae. Nemo natus laboriosam nulla quidem voluptate at exercitationem repellat asperiores! Nostrum ex eveniet similique deserunt quis suscipit laborum dolorum eius quia exercitationem? Corrupti earum aperiam minus obcaecati, quibusdam nisi.HOOo",
  //     attachment: {
  //       url: imagess,
  //     },
  //   },
  //   {
  //     id: 2,
  //     name: "Jane Smith",
  //     email: "jane@example.com",
  //     message: "Hi there",
  //   },
  //   {
  //     id: 3,
  //     name: "Bob Johnson",
  //     email: "bob@example.com",
  //     message: "Greetings",
  //   },
  // ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make the API call
        const response = await fetch("http://localhost:5000/Admin/Data");

        // Check if the response is successful
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json(); // Assuming the API returns JSON

        console.log("FETCH DATA: ", data);
        setData(data.data);
      } catch (error) {
        setError("An error occurred: " + error.message);
      }
    };
    fetchData();
  }, []);

  const handleOpenModal = (id) => {
    setModalData(data.find(singleData => singleData.id === id));
    setIsModalOpen(true);
  };

  const handleShare = () => {
    console.log(items[0]);
  };

  console.log("OUTSIDE: ", data);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4 pt-30 sm:pt-24 ">
        <div className="w-full max-w-7xl mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Pending Actions
          </h2>
          <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-4 text-center text-xl font-semibold text-gray-700">
                    Sr No.
                  </th>
                  <th className="p-4 text-center text-xl font-semibold text-gray-700">
                    Title
                  </th>
                  <th className="py-4 text-center text-xl font-semibold text-gray-700">
                    Date
                  </th>
                  <th className="p-4 text-center text-xl font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="p-4 text-center text-xl font-semibold text-gray-700">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
              {data && data.map((singleData) => (
                  <tr className="border-b hover:bg-gray-50 text-xl" key={singleData.id}>
                    <td className="p-4 text-gray-600 text-center">
                      {singleData.id}
                    </td>
                    <td className="p-4 text-gray-600 text-center">
                      {singleData.Grievance}
                    </td>
                    <td className="p-4 text-gray-600 text-center">
                      {new Date(singleData.created_at).toISOString().slice(0, 19)}
                    </td>
                    <td className="p-4 text-gray-600 text-center">
                      {singleData.Application_Status}
                    </td>
                    <td className="p-4 flex justify-center items-center space-3">
                      <div className="">
                        <button
                          onClick={() => {
                            handleAction("View"), handleOpenModal(singleData.id);
                          }}
                          className="text-blue-600 hover:underline sm:px-2 cursor-pointer"
                        >
                          View
                        </button>
                        {/* Modal component */}
                        <Modal
                          isOpen={isModalOpen}
                          onClose={() => setIsModalOpen(false)}
                          data={modalData}
                        />
                        <Routes>
                          <Route path="/file-viewer" element={<FileViewer />} />
                        </Routes>

                        <button
                          onClick={() => handleAction("Accept")}
                          className="text-blue-600 hover:underline sm:px-2 cursor-pointer"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleAction("Reject")}
                          className="text-blue-600 hover:underline sm:px-2 cursor-pointer"
                        >
                          Reject
                        </button>
                        <button
                          onClick={handleShare}
                          className="text-blue-600 hover:underline sm:px-2 cursor-pointer"
                        >
                          Share
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
