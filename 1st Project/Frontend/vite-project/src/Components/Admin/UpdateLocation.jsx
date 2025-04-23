import React, { useState, useEffect, useRef } from "react";
const apiKey = import.meta.env.VITE_API_KEY;


export default function UpdateLocation() {
    const [fetchData, setFetchData] = useState([]);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [addModal, setAddModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [selectedData, setSelectedData] = useState(null);

    const stateRef = useRef();
    const districtRef = useRef();
    const blockRef = useRef();
    const gpRef = useRef();
    const villageRef = useRef();

    // Fetch data from backend
    const fetchDataFromServer = async () => {
        try {
                const response = await fetch(`${apiKey}/Admin/UpdateLocation`, {

                method: "GET",
            });

            if (!response.ok) {
                const errorData = await response.text();
                console.error("Server error response:", errorData);
                throw new Error(`Failed: ${response.statusText}`);
            }

            const responseData = await response.json();

            if (responseData.success) {
                setFetchData(responseData.data);
            } else {
                setError(responseData.message || "Something went wrong.");
            }
        } catch (err) {
            setError(err.message);
        }
    };

    // Fetch data on component mount
    useEffect(() => {
        fetchDataFromServer();
    }, []);

    // Handle form submission (add, update, delete)
    const handleSubmit = async (e, isUpdate = false, isDelete = false, id = 0) => {
        e.preventDefault();
        setLoading(true);

        const payload = {};

        if (isUpdate) {
            payload.id = id;
            payload.state = stateRef.current.value,
            payload.district = districtRef.current.value,
            payload.block = blockRef.current.value,
            payload.gp = gpRef.current.value,
            payload.village = villageRef.current.value
        }else if (isDelete){
            payload.id = id;

        }else{
            payload.state = stateRef.current.value,
            payload.district = districtRef.current.value,
            payload.block = blockRef.current.value,
            payload.gp = gpRef.current.value,
            payload.village = villageRef.current.value
        }

        try {
                const response = await fetch(`${apiKey}/Admin/UpdateLocation`, {

                method: isDelete ? "DELETE" : isUpdate ? "PUT" : "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.text();
                console.error("Server error response:", errorData);
                throw new Error(`Failed: ${response.statusText}`);
            }

            const responseData = await response.json();

            if (responseData.success) {
                setError(null);
                setLoading(false);
                setIsSubmitted(true);
                setData(responseData);

                // Clear form
                stateRef.current.value = "";
                districtRef.current.value = "";
                blockRef.current.value = "";
                gpRef.current.value = "";
                villageRef.current.value = "";

                // Close modals
                if (isUpdate) {
                    setUpdateModal(false);
                } else if (!isDelete) {
                    setAddModal(false);
                }

                // Refetch data to update table
                await fetchDataFromServer();
            } else {
                setError(responseData.message || "Something went wrong.");
                setLoading(false);
            }
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    // Auto-close success/failure modal
    useEffect(() => {
        let timer;
        if (isSubmitted) {
            timer = setTimeout(() => {
                setIsSubmitted(false);
                window.location.reload()
            }, 5000);
        }
        return () => clearTimeout(timer);
    }, [isSubmitted]);

    return (
        <main className="p-6 space-y-10">
            {error && <p className="text-red-500">Error: {error}</p>}

            {/* Table */}
            <div className="table-data">
                <div className="order rounded shadow-md">
                    <div className="head mx-5">
                        <h3>All Datas</h3>
                        <i className="bx bx-search"></i>
                        <i className="bx bx-filter"></i>
                        <i
                            className="bx bx-list-plus bx-sm text-green-400 hover:text-green-600"
                            onClick={() => setAddModal(true)}
                        ></i>
                    </div>
                    <hr className="!bg-red-200 mx-4 mb-6" />
                    <table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>State</th>
                                <th>District</th>
                                <th>Block</th>
                                <th>Grama Panchayat</th>
                                <th>Village</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fetchData && fetchData.length > 0 ? (
                                fetchData.map((singleData) => (
                                    <tr key={singleData.id} className="text-center text-sm">
                                        <td>{singleData.id}</td>
                                        <td>{singleData.state}</td>
                                        <td>{singleData.district}</td>
                                        <td>{singleData.block}</td>
                                        <td>{singleData.gp}</td>
                                        <td>{singleData.village}</td>
                                        <td className="space-x-3 flex justify-center items-center">
                                            <button
                                                className="sm:px-2 cursor-pointer text-blue-400 hover:text-blue-600 text-sm hover:text-base transition-all"
                                                onClick={() => {
                                                    setSelectedData(singleData);
                                                    setUpdateModal(true);
                                                }}
                                            >
                                                <i className="bx bx-edit-alt bx-xs hover:text-blue-600"></i>
                                            </button>
                                            <button
                                                className="sm:px-2 cursor-pointer text-red-400 hover:text-red-600 text-sm hover:text-base"
                                                onClick={(e) => handleSubmit(e, false, true, singleData.id)}
                                            >
                                                <i className="bx bx-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center font-semibold text-2xl py-4">
                                        No Data Found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Success/Failure Modal */}
            {isSubmitted && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div
                        className={`fixed inset-0 bg-black transition-opacity duration-300 ${
                            isSubmitted ? "opacity-50" : "opacity-0"
                        }`}
                        onClick={() => setIsSubmitted(false)}
                    ></div>
                    <div
                        className={`relative bg-white rounded-lg p-8 shadow-2xl transform transition-all duration-300 ${
                            isSubmitted ? "scale-100 opacity-100 translate-y-0" : "scale-95 opacity-0 translate-y-4"
                        }`}
                    >
                        <div className="text-center">
                            <div className="mb-4">
                                <svg
                                    className={`w-16 h-16 mx-auto ${data?.success ? "text-green-500" : "text-red-500"} animate-bounce`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d={
                                            data?.success
                                                ? "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                                : "M6 18L18 6M6 6l12 12"
                                        }
                                    />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                {data?.success ? "Thank You!" : "Sorry!"}
                            </h2>
                            <p className="text-gray-600 mb-6">{data?.message}</p>
                            <button
                                onClick={() => {
                                    setIsSubmitted(false);
                                    setAddModal(false);
                                    setUpdateModal(false);
                                    window.location.reload();
                                }}
                                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full transition-colors duration-200"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Add Modal */}
            {addModal && (
                <div
                    className="fixed flex items-center justify-center inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300"
                    onClick={() => setAddModal(false)}
                >
                    <div
                        className="bg-white p-8 rounded-md shadow-md relative w-full md:w-3/4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setAddModal(false)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-300 text-2xl"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <form onSubmit={(e) => handleSubmit(e)} className="grid grid-cols-12 gap-y-1 sm:gap-y-10 gap-x-4 mt-8">
                            <div className="col-span-12 md:col-span-4 mt-5 sm:mt-0">
                                <label htmlFor="state" className="font-medium text-md text-gray-700">
                                    State<sup className="text-red-500">*</sup>
                                </label>
                                <input
                                    id="state"
                                    name="state"
                                    ref={stateRef}
                                    type="text"
                                    placeholder="E.g. Odisha"
                                    className="w-full mt-2 p-3 border-b border-gray-300 focus:outline-none focus:ring-0.9 focus:ring-black focus:border-black hover:border-gray-400 transition-all duration-200 ease-in-out resize-none placeholder-gray-400"
                                    required
                                />
                            </div>
                            <div className="col-span-12 md:col-span-4 mt-5 sm:mt-0">
                                <label htmlFor="district" className="font-medium text-md text-gray-700">
                                    District<sup className="text-red-500">*</sup>
                                </label>
                                <input
                                    id="district"
                                    name="district"
                                    ref={districtRef}
                                    type="text"
                                    placeholder="E.g. Khordha"
                                    className="w-full mt-2 p-3 border-b border-gray-300 focus:outline-none focus:ring-0.9 focus:ring-black focus:border-black hover:border-gray-400 transition-all duration-200 ease-in-out resize-none placeholder-gray-400"
                                    required
                                />
                            </div>
                            <div className="col-span-12 md:col-span-4 mt-5 sm:mt-0">
                                <label htmlFor="block" className="font-medium text-md text-gray-700">
                                    Block / ULB<sup className="text-red-500">*</sup>
                                </label>
                                <input
                                    id="block"
                                    name="block"
                                    ref={blockRef}
                                    type="text"
                                    placeholder="E.g. Bhubaneswar"
                                    className="w-full mt-2 p-3 border-b border-gray-300 focus:outline-none focus:ring-0.9 focus:ring-black focus:border-black hover:border-gray-400 transition-all duration-200 ease-in-out resize-none placeholder-gray-400"
                                    required
                                />
                            </div>
                            <div className="col-span-12 md:col-span-4 mt-5 sm:mt-0">
                                <label htmlFor="gp" className="font-medium text-md text-gray-700">
                                    Grama Panchayat<sup className="text-red-500">*</sup>
                                </label>
                                <input
                                    id="gp"
                                    name="gp"
                                    ref={gpRef}
                                    type="text"
                                    placeholder="E.g. Chandrasekharpur"
                                    className="w-full mt-2 p-3 border-b border-gray-300 focus:outline-none focus:ring-0.9 focus:ring-black focus:border-black hover:border-gray-400 transition-all duration-200 ease-in-out resize-none placeholder-gray-400"
                                    required
                                />
                            </div>
                            <div className="col-span-12 md:col-span-4 mt-5 sm:mt-0">
                                <label htmlFor="village" className="font-medium text-md text-gray-700">
                                    Village<sup className="text-red-500">*</sup>
                                </label>
                                <input
                                    id="village"
                                    name="village"
                                    ref={villageRef}
                                    type="text"
                                    placeholder="E.g. Patia"
                                    className="w-full mt-2 p-3 border-b border-gray-300 focus:outline-none focus:ring-0.9 focus:ring-black focus:border-black hover:border-gray-400 transition-all duration-200 ease-in-out resize-none placeholder-gray-400"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="col-span-12 w-full py-3 my-6 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200 cursor-pointer active:outline-1 active:outline-offset-3 active:outline-green-600 flex justify-center items-center gap-2"
                                disabled={loading}
                            >
                                {loading ? (
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
                                ) : (
                                    "Submit"
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Update Modal */}
            {updateModal && selectedData && (
                <div
                    className="fixed flex items-center justify-center inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300"
                    onClick={() => setUpdateModal(false)}
                >
                    <div
                        className="bg-white p-8 rounded-md shadow-md relative w-full md:w-3/4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setUpdateModal(false)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-300 text-2xl"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <form
                            onSubmit={(e) => handleSubmit(e, true, false, selectedData.id)}
                            className="grid grid-cols-12 gap-y-1 sm:gap-y-10 gap-x-4 mt-8"
                        >
                            <div className="col-span-12 md:col-span-4 mt-5 sm:mt-0">
                                <label htmlFor="state" className="font-medium text-md text-gray-700">
                                    State<sup className="text-red-500">*</sup>
                                </label>
                                <input
                                    id="state"
                                    name="state"
                                    ref={stateRef}
                                    defaultValue={selectedData.state}
                                    type="text"
                                    placeholder="E.g. Odisha"
                                    className="w-full mt-2 p-3 border-b border-gray-300 focus:outline-none focus:ring-0.9 focus:ring-black focus:border-black hover:border-gray-400 transition-all duration-200 ease-in-out resize-none placeholder-gray-400"
                                    required
                                />
                            </div>
                            <div className="col-span-12 md:col-span-4 mt-5 sm:mt-0">
                                <label htmlFor="district" className="font-medium text-md text-gray-700">
                                    District<sup className="text-red-500">*</sup>
                                </label>
                                <input
                                    id="district"
                                    name="district"
                                    ref={districtRef}
                                    defaultValue={selectedData.district}
                                    type="text"
                                    placeholder="E.g. Khordha"
                                    className="w-full mt-2 p-3 border-b border-gray-300 focus:outline-none focus:ring-0.9 focus:ring-black focus:border-black hover:border-gray-400 transition-all duration-200 ease-in-out resize-none placeholder-gray-400"
                                    required
                                />
                            </div>
                            <div className="col-span-12 md:col-span-4 mt-5 sm:mt-0">
                                <label htmlFor="block" className="font-medium text-md text-gray-700">
                                    Block / ULB<sup className="text-red-500">*</sup>
                                </label>
                                <input
                                    id="block"
                                    name="block"
                                    ref={blockRef}
                                    defaultValue={selectedData.block}
                                    type="text"
                                    placeholder="E.g. Bhubaneswar"
                                    className="w-full mt-2 p-3 border-b border-gray-300 focus:outline-none focus:ring-0.9 focus:ring-black focus:border-black hover:border-gray-400 transition-all duration-200 ease-in-out resize-none placeholder-gray-400"
                                    required
                                />
                            </div>
                            <div className="col-span-12 md:col-span-4 mt-5 sm:mt-0">
                                <label htmlFor="gp" className="font-medium text-md text-gray-700">
                                    Grama Panchayat<sup className="text-red-500">*</sup>
                                </label>
                                <input
                                    id="gp"
                                    name="gp"
                                    ref={gpRef}
                                    defaultValue={selectedData.gp}
                                    type="text"
                                    placeholder="E.g. Chandrasekharpur"
                                    className="w-full mt-2 p-3 border-b border-gray-300 focus:outline-none focus:ring-0.9 focus:ring-black focus:border-black hover:border-gray-400 transition-all duration-200 ease-in-out resize-none placeholder-gray-400"
                                    required
                                />
                            </div>
                            <div className="col-span-12 md:col-span-4 mt-5 sm:mt-0">
                                <label htmlFor="village" className="font-medium text-md text-gray-700">
                                    Village<sup className="text-red-500">*</sup>
                                </label>
                                <input
                                    id="village"
                                    name="village"
                                    ref={villageRef}
                                    defaultValue={selectedData.village}
                                    type="text"
                                    placeholder="E.g. Patia"
                                    className="w-full mt-2 p-3 border-b border-gray-300 focus:outline-none focus:ring-0.9 focus:ring-black focus:border-black hover:border-gray-400 transition-all duration-200 ease-in-out resize-none placeholder-gray-400"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="col-span-12 w-full py-3 my-6 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200 cursor-pointer active:outline-1 active:outline-offset-3 active:outline-green-600 flex justify-center items-center gap-2"
                                disabled={loading}
                            >
                                {loading ? (
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
                                ) : (
                                    "Update"
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </main>
    );
}