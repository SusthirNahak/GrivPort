import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import './Home.css';
import 'boxicons/css/boxicons.min.css';
import Modal from './Modal';
import FileViewer from './FileViewer';

const Home = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [rejectId, setRejectId] = useState(null);
  const [actionStatus, setActionStatus] = useState(null);

  const navigate = useNavigate();

  const boxInfo = [
    { icon: 'bxs-calendar-check', value: '1020', label: 'New Order', color: 'blue' },
    { icon: 'bxs-group', value: '2834', label: 'Visitors', color: 'yellow' },
    { icon: 'bxs-dollar-circle', value: 'N$2543.00', label: 'Total Sales', color: 'orange' },
  ];

  useEffect(() => {
    const userCookie = Cookies.get('Name'); 
    if (!userCookie) {
      navigate('/admin');
    }
  }, [navigate])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/Admin/Data");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("FETCH DATA: ", data);
        setData(data.data);
      } catch (error) {
        setError("An error occurred: " + error.message);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape" && isRejectModalOpen) {
        setIsRejectModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isRejectModalOpen]);

  const handleAction = (action) => {
    setActionStatus(action);
    console.log(`Action Id: ${action}`);
  };

  const handleActionAccept = async (id) => {
    setActionStatus(id);
    console.log(`Action taken Accepted: ${id}`);
    try {
      const response = await fetch("http://localhost:5000/Admin/AcceptData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      if (response.ok) {
        window.location.reload();

      }
    } catch (error) {
      setError("An error occurred: " + error.message);
    }
  };

  const handleRejectOpenModal = (id) => {
    setRejectId(id);
    setIsRejectModalOpen(true);
  };

  const handleOpenModal = (id) => {
    setModalData(data.find((singleData) => singleData.id === id));
    setIsModalOpen(true);
  };

  const closeRejectModal = () => {
    setIsRejectModalOpen(false);
    setRejectReason('');
  };

  const handleRejectSubmit = async (e) => {
    e.preventDefault();
    console.log("Reject submitted:", { id: rejectId, reason: rejectReason });

    try {
      const response = await fetch("http://localhost:5000/Admin/RejectData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: rejectId, reason: rejectReason }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Network response was not ok");
      }

      if (response.ok) window.location.reload();

      setIsRejectModalOpen(false);
      setRejectReason('');
      setRejectId(null);
    } catch (error) {
      setError("An error occurred: " + error.message);
    }
  };

  function toCapitalize(str) {
    return str
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const isReviewMessageNull = (reviewMessage) => reviewMessage === null || reviewMessage.toLowerCase() === "null";

  return (
    <main className="">
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="head-title">
        <div className="left">
          <h1>Dashboard</h1>
          <ul className="breadcrumb">
            <li><Link to="/">Dashboard</Link></li>
            <li><i className="bx bx-chevron-right"></i></li>
            <li><Link to="/" className="active">Home</Link></li>
          </ul>
        </div>
      </div>
      <ul className="box-info">
        {boxInfo.map((item, index) => (
          <li key={index} className="shadow-md rounded">
            <i className={`bx ${item.icon} text-4xl text-${item.color}-500 mr-0`}></i>
            <span className="text">
              <h3>{item.value}</h3>
              <p>{item.label}</p>
            </span>
          </li>
        ))}
      </ul>
      <div className="table-data">
        <div className="order rounded shadow-md">
          <div className="head">
            <h3>All Datas</h3>
            <i className="bx bx-search"></i>
            <i className="bx bx-filter"></i>
          </div>
          <hr className="!bg-red-200 mx-4 mb-6" />
          <table>
            <thead>
              <tr>
                <th>Sr No.</th>
                <th>Title</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data && data.length > 0 ? (
                data.map((singleData, index) => {
                  console.log(`Review_Message for ID ${singleData.id}:`, singleData.Review_Message);
                  const reviewMessageNull = isReviewMessageNull(singleData.Review_Message);
                  console.log(`Review_Message for ID ${singleData.id}:`, reviewMessageNull);

                  return (
                    <tr key={index} className="text-center text-sm">
                      <td>{singleData.id}</td>
                      <td>{singleData.Grievance}</td>
                      <td>{formatDate(singleData.created_at)}</td>
                      <td>
                        <span className={`status ${singleData.Application_Status.toLowerCase()}`}>
                          {singleData.Application_Status.toLowerCase() === 'raised' ? "Ticket Raised" : toCapitalize(singleData.Application_Status)}
                        </span>
                      </td>
                      <td className="space-x-3 space-y-2">
                        <button
                          onClick={() => {
                            handleAction("View");
                            handleOpenModal(singleData.id);
                          }}
                          className="text-blue-600 hover:underline sm:px-2 cursor-pointer"
                        >
                          View
                        </button>
                        <button
                          onClick={() => {
                            if (reviewMessageNull) {
                              handleRejectOpenModal(singleData.Application_Id);
                            }
                          }}
                          className={`${reviewMessageNull ? 'sm:px-2 text-red-600 hover:underline cursor-pointer' : ''}}`}
                        >
                          {reviewMessageNull ? 'Reject' : '--'}
                        </button>
                        <button
                          onClick={() => handleActionAccept(singleData.Application_Id)}
                          className={`${reviewMessageNull ? "text-green-600 hover:underline sm:px-2 cursor-pointer " : ''}`}
                        >
                          {reviewMessageNull ? <i className='bx bx-share bx-flip-horizontal bx-xs bx-fade-right-'></i> : " --"}

                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5" className="text-center font-semibold text-2xl py-4">
                    No Data Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          data={modalData}

        />
      )}
      <Routes>
        <Route path="/file-viewer" element={<FileViewer />} />
      </Routes>

      {isRejectModalOpen && (
        <div
          className="fixed flex items-center justify-center inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300"
          onClick={closeRejectModal}
        >
          <form
            className="bg-white p-6 rounded shadow-lg w-full max-w-md space-y-4 relative dark-mode"
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleRejectSubmit}
          >
            <button
              onClick={closeRejectModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-300 text-2xl"
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
            <h2 className="text-xl font-semibold">
              Reason for Rejection <sup className="text-red-500">*</sup>
            </h2>
            <hr className="bg-gray-200" />
            <textarea
              id="reason"
              className="w-full p-2 border border-gray-200 rounded resize-none focus:outline-1 focus:outline-gray-400"
              rows="4"
              placeholder="Enter reason..."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              required
            ></textarea>
            <hr className="bg-gray-200" />
            <div className="flex justify-between space-x-4">
              <button
                type="submit"
                className="mx-auto bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
      <style jsx>{`
        body.dark .dark-mode {
          background-color: var(--light);
          color: var(--dark);
        }
        body.dark .dark-mode:hover {
          background-color: var(--grey);
        }
      `}</style>
    </main>
  );
};

export default Home;