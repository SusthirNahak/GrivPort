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
  const [shareModalData, setShareModalData] = useState(false);
  const [shareData, setShareData] = useState(null);
  const [handleShare, setHandleShare] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [rejectId, setRejectId] = useState(null);
  const [series, setSeries] = useState(null);
  const [actionStatus, setActionStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/Admin/ChartData')
      .then((response) => response.json())
      .then((data) => {
        if (!data.data || !Array.isArray(data.data) || data.data.length === 0) {
          console.error("Invalid data structure:", data);
          return;
        }

        const counts = data.data[0];
        const completed = counts.completed || 0;
        const rejected = counts.rejected || 0;
        const pending = counts.pending || 0;
        const process = counts.process || 0;
        const ticketRaised = counts["ticket raised"] || 0;
        const total = completed + rejected + pending + process + ticketRaised;

        const chartData = [total, completed, rejected, pending, process, ticketRaised];
        setSeries(chartData);
      })
      .catch((error) => {
        console.error('Error fetching chart data:', error);
      });
  }, []);

  console.log("SERIES: ", series);

  const boxInfo = series ? [
    {
      icon: 'bx bx-list-plus',
      value: series[0],
      label: 'Total Applications',
      color: 'blue',
    },
    {
      icon: 'bx bx-check-square',
      value: series[1],
      label: 'Completed',
      color: 'green',
    },
    {
      icon: 'bx bx-x-circle',
      value: series[2],
      label: 'Rejected',
      color: 'red',
    },
    {
      icon: 'bx bx-time-five',
      value: series[3],
      label: 'Pending',
      color: 'yellow',
    },
    {
      icon: 'bx bx-cog',
      value: series[4],
      label: 'In Process',
      color: 'purple',
    },
    {
      icon: 'bx bx-error-circle',
      value: series[5],
      label: 'Ticket Raised',
      color: 'orange',
    },
  ] : [];

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
      if (response.ok && handleShare) {
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

  console.log("SHARE DATA: ", shareData);


  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");

  const handleShareSubmit = async (e) => {
    e.preventDefault();
    alert(`Your Data shared to ${department || 'Not selected'} Department with Email ${email}\n`);
    // You can add logic here to reset form or close modal if needed
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/ShareDepartmentData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, department, shareData }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Network response was not ok");
      }

      console.log("response: ", data);


      if (data.success) {
        
        alert(`Send to data ${department} department sucessfully!!!`);
        setEmail("");
        setDepartment('');
        setShareModalData(false);
      }
    } catch (error) {
      setError("An error occurred: " + error.message);
    }finally{
      setLoading(false);
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
            <li><Link to="">Dashboard</Link></li>
            <li><i className="bx bx-chevron-right"></i></li>
            <li><Link to="/admin/home" className="active">Home</Link></li>
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
                          {reviewMessageNull ? <button
                            onClick={() => {
                              setShareData(singleData);
                              setShareModalData(true);
                            }}
                            className="cursor-pointer"
                          >
                            <i className="bx bx-share bx-flip-horizontal bx-xs"></i>
                          </button> : " --"}

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

      {shareModalData && (
        <div
          className="fixed flex items-center justify-center inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => { setShareModalData(false), setEmail(''), setDepartment('') }}
        >
          <form
            className="bg-white p-6 rounded shadow-lg w-full max-w-md space-y-4 relative dark-mode"
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleShareSubmit}
          >
            <button
              onClick={() => { setShareModalData(false), setEmail(''), setDepartment('') }}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-300 text-2xl"
              type="button"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h2 className="text-xl font-semibold">Select The Department Where You Share</h2>
            <hr className="bg-gray-200" />

            <label htmlFor="department">Department <sup className="text-red-500">*</sup></label>
            <select
              id="department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full p-2 border border-gray-200 rounded resize-none focus:outline-1 mt-2"
            >
              <option value="" disabled>-- Select --</option>
              <option value="health">Health</option>
              <option value="road">Road</option>
            </select>

            <label htmlFor="email">Email <sup className="text-red-500">*</sup></label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-200 rounded resize-none focus:outline-1 mt-2"
              placeholder='John@example.com'
            />

            <hr className="bg-gray-200" />
            <div className="flex justify-between space-x-4">
              <button
                type="submit"
                className="mx-auto bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition w-[40%]"
              >
                {loading ? (
                  <>
                  <div className='flex'>
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z"
                      ></path>
                    </svg>
                    Processing...
                    </div>
                  </>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </form>
        </div>
      )
      }

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