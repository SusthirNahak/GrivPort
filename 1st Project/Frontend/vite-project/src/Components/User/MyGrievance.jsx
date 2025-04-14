import React, { useState, useEffect } from "react";
import 'boxicons/css/boxicons.min.css';
import Cookies from 'js-cookie';

export default function MyGrievance() {
    const [data, setData] = useState('');
    const [error, setError] = useState('');
    const [rejectedReason, setRejectedReason] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isRaiseTicketModalOpen, setIsRaiseTicketModalOpen] = useState(false); // [isOpen, applicationId]
    const [ticketRaiseReason, setTicketRaiseReason] = useState('');

    let cookiesData = Cookies.get("setPhoneNumber");

    useEffect(() => {
        const fetchSpecificUserAllData = async () => {
            try {
                const response = await fetch("http://localhost:5000/user/SpecificUserAllData", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ cookiesData }),
                });
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                const data = await response.json();

                if (response.ok) {
                    setData(data.data);
                }
            } catch (error) {
                setError("An error occurred: " + error.message);
            }
        };
        fetchSpecificUserAllData();
    }, []);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    function toCapitalize(str) {
        return str
            .split(' ')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    }

    const handleRaiseSubmit = async (e) => {
        e.preventDefault();
        const applicationId = isRaiseTicketModalOpen[1]; // Get Application_Id from the state
        console.log("Ticket Raise Reason: ", ticketRaiseReason);
        console.log("Application Id: ", applicationId);

        try {
            const response = await fetch("http://localhost:5000/user/TicketRaiseReason", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ticketRaiseReason,
                    Application_Id: applicationId // Include Application_Id in the request
                }),
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();

            if (response.ok) {
                window.location.reload();
                setIsRaiseTicketModalOpen(false);
                setTicketRaiseReason('');
            }
        } catch (error) {
            setError("An error occurred: " + error.message);
        }
    };

    console.log("DATA: ", data);


    return (
        <>
            <div className="table-data p-4">
                <div className="order rounded-lg shadow-md bg-white">
                    <div className="flex items-center justify-between p-4 mb-3">
                        <h3 className="text-lg font-semibold text-gray-800">All Data</h3>
                        <div className="space-x-2">
                            <i className="bx bx-search text-gray-600 cursor-pointer"></i>
                            <i className="bx bx-filter text-gray-600 cursor-pointer"></i>
                        </div>
                    </div>
                    <hr className="my-3 mx-10 border-gray-300" />
                    <div className="overflow-x-auto">
                        <table className="w-full table-auto">
                            <thead className="bg-gray-100 text-gray-700">
                                <tr>
                                    <th className="p-3 text-sm font-medium">Sr No.</th>
                                    <th className="p-3 text-sm font-medium">Title</th>
                                    <th className="p-3 text-sm font-medium">Date</th>
                                    <th className="p-3 text-sm font-medium">Status</th>
                                    <th className="p-3 text-sm font-medium">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data && data.length > 0 ? (
                                    data.map((singleData, index) => (
                                        <tr key={index} className="text-center text-sm border-b hover:bg-gray-50">
                                            <td className="p-3">{singleData.id}</td>
                                            <td className="p-3">{singleData.Grievance}</td>
                                            <td className="p-3">{formatDate(singleData.created_at)}</td>
                                            <td className="p-3">
                                                <span
                                                    className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${singleData.Application_Status.toLowerCase() === 'completed'
                                                        ? 'bg-green-100 text-green-800'
                                                        : singleData.Application_Status.toLowerCase() === 'rejected'
                                                            ? 'bg-red-100 text-red-800'
                                                            : singleData.Application_Status.toLowerCase() === 'process'
                                                                ? 'bg-yellow-100 text-yellow-800'
                                                                : singleData.Application_Status.toLowerCase() === 'pending'
                                                                    ? 'bg-orange-100 text-orange-800'
                                                                    : 'bg-gray-100 text-gray-800'
                                                        }`}
                                                >
                                                    {toCapitalize(singleData.Application_Status)}
                                                </span>
                                            </td>
                                            <td className="p-3 flex justify-center gap-3">
                                                {['process', 'pending', 'completed'].includes(singleData.Application_Status.toLowerCase()) ? (
                                                    <button className="mx-2">--</button>
                                                ) : (
                                                    <>
                                                        {singleData.Application_Status.toLowerCase() === 'rejected' ? (
                                                            <button
                                                                onClick={() => {
                                                                    setIsModalOpen(true);
                                                                    setRejectedReason(singleData.Review_Message);
                                                                }}
                                                                className="text-blue-600 hover:underline"
                                                            >
                                                                View
                                                            </button>
                                                        ) : (
                                                            <button className="mx-2">--</button>
                                                        )}
                                                        {(singleData.User_Ticket_Raise_Message === null || singleData.User_Ticket_Raise_Message.toLowerCase() === 'NULL' )
                                                        ? (<button
                                                            onClick={() => {
                                                                setIsRaiseTicketModalOpen([true, singleData.Application_Id]);
                                                            }}
                                                            className="text-blue-600 hover:underline"
                                                        >
                                                            Ticket Raise
                                                        </button>)
                                                            : <button className="mx-2">--</button>
                                                        }
                                                    </>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="p-6 text-center text-xl font-semibold text-gray-500">
                                            No Data Found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {isModalOpen && rejectedReason && (
                    <div
                        className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300"
                        onClick={(e) => {
                            if (e.target === e.currentTarget) setIsModalOpen(false);
                        }}
                    >
                        <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
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

                            <h2 className="text-xl font-semibold mb-4">
                                Reason for Rejection
                            </h2>

                            <div className="border border-gray-200 rounded">
                                <div
                                    className="w-full p-2 border-0 rounded"
                                    style={{ minHeight: "10rem" }}
                                >
                                    {rejectedReason}
                                </div>
                            </div>

                            <div className="mt-6 flex justify-center">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {isRaiseTicketModalOpen && isRaiseTicketModalOpen[0] && (
                    <div
                        className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300 px-5"
                        onClick={(e) => {
                            if (e.target === e.currentTarget) setIsRaiseTicketModalOpen(false);
                        }}
                    >
                        <div
                            className="bg-white p-6 rounded shadow-lg w-full max-w-md space-y-4 relative dark-mode"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setIsRaiseTicketModalOpen(false)}
                                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
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

                            <h2 className="text-xl font-semibold mb-4">
                                Raise a Ticket <sup className="text-red-500">*</sup>
                            </h2>

                            <form className="space-y-4" onSubmit={handleRaiseSubmit}>
                                <div>
                                    <textarea
                                        onChange={(e) => setTicketRaiseReason(e.target.value)}
                                        value={ticketRaiseReason}
                                        className="w-full px-4 py-1 resize-none border border-gray-200 rounded focus:outline-gray-300"
                                        placeholder="Please describe your issue or reason . . ."
                                        rows={6}
                                        required
                                    />
                                </div>

                                <div className="mt-6 flex justify-center space-x-4">
                                    <button
                                        type="submit"
                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}