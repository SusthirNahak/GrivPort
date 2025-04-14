import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import 'boxicons/css/boxicons.min.css';
import Modal from './Modal';

const Home = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [rejectId, setRejectId] = useState(null);

  const boxInfo = [
    { icon: 'bxs-calendar-check', value: '1020', label: 'New Order', color: 'blue' },
    { icon: 'bxs-group', value: '2834', label: 'Visitors', color: 'yellow' },
    { icon: 'bxs-dollar-circle', value: 'N$2543.00', label: 'Total Sales', color: 'orange' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/Admin/Data');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result.data || []);
      } catch (error) {
        setError('An error occurred: ' + error.message);
      }
    };
    fetchData();
  }, []);

  const handleActionAccept = async (id) => {
    try {
      const response = await fetch('http://localhost:5000/Admin/AcceptData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Update local state to reflect the accepted status
      setData((prevData) =>
        prevData.map((item) =>
          item.Application_Id === id ? { ...item, Application_Status: 'Accepted' } : item
        )
      );
    } catch (error) {
      setError('An error occurred: ' + error.message);
    }
  };

  const handleRejectOpenModal = (id) => {
    setRejectId(id);
    setIsRejectModalOpen(true);
  };

  const handleRejectSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/Admin/RejectData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: rejectId, reason: rejectReason }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Update local state to reflect the rejected status
      setData((prevData) =>
        prevData.map((item) =>
          item.Application_Id === rejectId ? { ...item, Application_Status: 'Rejected' } : item
        )
      );
      setIsRejectModalOpen(false);
      setRejectReason('');
      setRejectId(null);
    } catch (error) {
      setError('An error occurred: ' + error.message);
    }
  };

  const handleOpenModal = (id) => {
    const selectedData = data.find((singleData) => singleData.id === id);
    if (selectedData) {
      setModalData(selectedData);
      setIsModalOpen(true);
    }
  };

  const handleShare = (id) => {
    // Implement share logic, e.g., copy a URL to the clipboard
    console.log(`Share item with id: ${id}`);
    // Example: navigator.clipboard.write(`http://example.com/data/${id}`);
  };

  const toCapitalize = (str) => {
    return str
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <main className="p-6">
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
      <ul className="box-info grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {boxInfo.map((item, index) => (
          <li key={index} className="flex items-center p-4 bg-white shadow rounded">
            <i className={`bx ${item.icon} text-4xl text-${item.color}-500 mr-4`}></i>
            <span className="text">
              <h3>{item.value}</h3>
              <p>{item.label}</p>
            </span>
          </li>
        ))}
      </ul>
      <div className="table-data">
        <div className="order bg-white p-4 rounded shadow">
          <div className="head flex justify-between items-center mb-4">
            <h3>All Data</h3>
            <div>
              <i className="bx bx-search text-xl mr-2 cursor-pointer"></i>
              <i className="bx bx-filter text-xl cursor-pointer"></i>
            </div>
          </div>
          <table className="w-full text-left">
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
              {data.length > 0 ? (
                data.map((singleData, index) => (
                  <tr key={singleData.id} className="text-center text-sm">
                    <td>{singleData.id}</td>
                    <td>{singleData.Grievance}</td>
                    <td>{formatDate(singleData.created_at)}</td>
                    <td>
                      <span
                        className={`status ${singleData.Application_Status.toLowerCase()} px-2 py-1 rounded text-white`}
                      >
                        {toCapitalize(singleData.Application_Status)}
                      </span>
                    </td>
                    <td className="flex justify-center items-center space-x-3">
                      <button
                        onClick={() => handleOpenModal(singleData.id)}
                        className="text-blue-600 hover:underline"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleActionAccept(singleData.Application_Id)}
                        className="text-green-600 hover:underline"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleRejectOpenModal(singleData.Application_Id)}
                        className="text-red-600 hover:underline"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => handleShare(singleData.id)}
                        className="text-blue-600 hover:underline"
                      >
                        Share
                      </button>
                    </td>
                  </tr>
                ))
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

      {/* View Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} data={modalData} />

      {/* Reject Reason Modal */}
      {isRejectModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <form
            className="bg-white p-6 rounded shadow-lg w-full max-w-md space-y-4 relative"
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleRejectSubmit}
          >
            <button
              type="button"
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl"
              onClick={() => setIsRejectModalOpen(false)}
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold">
              Reason for Rejection <sup className="text-red-500">*</sup>
            </h2>
            <hr className="bg-gray-200" />
            <textarea
              id="reason"
              className="w-full p-2 border border-gray-300 rounded resize-none"
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
    </main>
  );
};

export default Home;