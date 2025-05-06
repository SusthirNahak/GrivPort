import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import './Home.css';
import 'boxicons/css/boxicons.min.css';
import Modal from './Modal';
import FileViewer from './FileViewer';

const apiKey = import.meta.env.VITE_API_KEY;

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
    fetch(`${apiKey}/Admin/ChartData`)

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
        const response = await fetch(`${apiKey}/Admin/Data`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
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
  };

  const handleActionAccept = async (id) => {
    setActionStatus(id);
    try {
      const response = await fetch(`${apiKey}/Admin/AcceptData`, {

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

    try {
      const response = await fetch(`${apiKey}/Admin/RejectData`, {

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

  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [priority, setPriority] = useState("");
  const [recipientName, setRecipientName] = useState("");

  const handleShareSubmit = async (e) => {
    e.preventDefault();
    alert(`Your Data shared to ${department || 'Not selected'} Department with Email ${email} and ${priority}\n`);
    setLoading(true);
    try {
      const response = await fetch(`${apiKey}/ShareDepartmentData`, {

        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, department, priority, recipientName, shareData }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Network response was not ok");
      }

      if (data.success) {
        alert(`Send to data ${department} department sucessfully!!!`);
        handleActionAccept(shareData.Application_Id);
        setEmail("");
        setPriority("");
        setDepartment('');
        setShareModalData(false);
      }
    } catch (error) {
      setError("An error occurred: " + error.message);
    } finally {
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

  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);


  const itemsPerPage = 5;

  const getYears = () =>
    (data ?? []).map((item) => new Date(item.created_at).getFullYear())
      .filter((year, index, arr) => arr.indexOf(year) === index);


  const safeData = Array.isArray(data) ? data : [];
  const filteredData = safeData
    .filter((item) => {
      const matchesStatus = activeTab.toLowerCase() === "all" || item.Application_Status.toLowerCase() === activeTab.toLowerCase();
      const matchesSearch = item.Grievance.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesYear = selectedYear === "all" || new Date(item.created_at).getFullYear().toString() === selectedYear;
      return matchesStatus && matchesSearch && matchesYear;
    });

  const totalItems = filteredData.length;
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
          <div className="rounded-lg">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* Tab Buttons */}
              <div className="w-full md:w-auto flex space-x-1 bg-gray-100 py-2 rounded-md overflow-x-auto px-3">
                {["all", "process", "pending", "rejected", "resolved", "ticket-raised"].map((tab) => (
                  <button
                    key={tab}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${activeTab === tab ? "bg-white shadow-sm" : "hover:bg-gray-200"
                      }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                  </button>
                ))}
              </div>

              {/* Search + Filter */}
              <div className="w-full md:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="bx bx-search-alt-2 text-xl text-gray-400"></i>
                  </div>
                  <input
                    type="text"
                    placeholder="Search grievances..."
                    className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                {/* Year Filter */}
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="border px-4 py-2 rounded-md"
                >
                  <option value="all">All Years</option>
                  {getYears().map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <hr className="mx-4 my-6" />

          <div className="overflow-x-auto w-full">
            <table className="min-w-full border border-gray-200">
              <thead className="bg-gray-100 text-gray-700">
                <tr className="text-sm">
                  <th className="px-4 py-2">Sr No.</th>
                  <th className="px-4 py-2">SUBJECT</th>
                  <th className="px-4 py-2">SUBMITTED ON</th>
                  <th className="px-4 py-2">STATUS</th>
                  <th className="px-4 py-2">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData && paginatedData.length > 0 ? (
                  paginatedData.map((singleData, index) => {
                    const reviewMessageNull = isReviewMessageNull(singleData.Review_Message);

                    return (
                      <tr key={index} className="text-center text-sm border-t">
                        <td className="px-4 py-2">{singleData.id}</td>
                        <td className="px-4 py-2">{singleData.Grievance}</td>
                        <td className="px-4 py-2">{formatDate(singleData.created_at)}</td>
                        <td className="px-4 py-2">
                          <span className={`status ${singleData.Application_Status.toLowerCase()}`}>
                            {singleData.Application_Status.toLowerCase() === 'raised'
                              ? 'Ticket Raised'
                              : toCapitalize(singleData.Application_Status)}
                          </span>
                        </td>
                        <td className="px-4 py-2 space-x-2">
                          <button
                            onClick={() => {
                              handleAction('View');
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
                            className={`${reviewMessageNull ? 'text-red-600 hover:underline cursor-pointer' : 'text-gray-400 cursor-not-allowed'}`}
                          >
                            {reviewMessageNull ? 'Reject' : '--'}
                          </button>
                          <button className="cursor-pointer">
                            {reviewMessageNull ? (
                              <button
                                onClick={() => {
                                  setShareData(singleData);
                                  setShareModalData(true);
                                }}
                                className="text-green-600 hover:underline"
                              >
                                <i className="bx bx-share bx-flip-horizontal bx-xs"></i>
                              </button>
                            ) : (
                              '--'
                            )}
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td></td>
                    <td colSpan="5" className="text-center font-semibold text-2xl py-4">
                      No Data Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>


          <hr className="mx-4 my-6" />

          <div className="flex justify-between items-center w-full h-10">
            <p>
              Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}
            </p>
            <div className="flex space-x-4">
              <button
                className="border px-3 py-1 rounded disabled:opacity-50"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <button
                className="border px-3 py-1 rounded disabled:opacity-50"
                onClick={() =>
                  setCurrentPage((prev) => (prev * itemsPerPage < totalItems ? prev + 1 : prev))
                }
                disabled={currentPage * itemsPerPage >= totalItems}
              >
                Next
              </button>
            </div>
          </div>
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
          className="fixed flex items-center justify-center inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 mt-12"
          onClick={() => { setShareModalData(false), setRecipientName(''), setPriority(''), setEmail(''), setDepartment('') }}
        >
          <form
            className="bg-white p-6 rounded shadow-lg w-full max-w-md space-y-4 relative dark-mode"
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleShareSubmit}
          >
            <button
              onClick={() => { setShareModalData(false), setRecipientName(''), setPriority(''), setEmail(''), setDepartment('') }}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-300 text-2xl"
              type="button"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h2 className="text-xl font-semibold">Select The Department Where You Share</h2>
            <hr className="bg-gray-200" />

            <div className='flex flex-col md:flex-row md:justify-between md:items-center gap-4'>
              <div className="flex-1">

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
              </div>
              <div className="flex-1">
                <label htmlFor="priority">Priority <sup className="text-red-500">*</sup></label>
                <select
                  id="priority"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full p-2 border border-gray-200 rounded resize-none focus:outline-1 mt-2"
                >
                  <option value="" disabled>-- Select --</option>
                  <option value="low">Low</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                </select>
              </div>
            </div>

            <label htmlFor="email">Email <sup className="text-red-500">*</sup></label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-200 rounded resize-none focus:outline-1 mt-2"
              placeholder='John@example.com'
            />

            <label htmlFor="recipientName">Recipient Name <sup className="text-red-500">*</sup></label>
            <input
              type="recipientName"
              id="recipientName"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              className="w-full p-2 border border-gray-200 rounded resize-none focus:outline-1 mt-2"
              placeholder='John Doe'
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