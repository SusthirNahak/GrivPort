import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import image from '../../assets/mainbg.jpg';

const apiKey = import.meta.env.VITE_API_KEY;


export default function AdminLandingPage() {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [error, setError] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            alert("Please fill in all fields.");
            return;
        }

        setIsSubmitting(true);
        setError("");

        try {
                const response = await fetch(`${apiKey}/Admin/SignIn`, {

                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Sign-in failed");
                setShowPopup(true);
                setIsSuccess(false);
                return;
            }

            console.log("DATA: ", data);

            if (data.success) {
                setIsSuccess(true);
                if (!Cookies.get("Name")) {
                    Cookies.set("Name", data.data);
                }
                setIsAuthenticated(true);
            }
        } catch (error) {
            setError("An error occurred: " + error.message);
            setShowPopup(true);
            setIsSuccess(false);
        } finally {
            setIsSubmitting(false);
        }
    };


    if (isAuthenticated) {
        return <Navigate to="/admin/home" replace />;
    }

    return (
        <div className="md:flex h-[100vh] w-full overflow-hidden flex-col items-end" style={{
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
        }}>
            <div
                className="w-full px-10 md:w-[35%] md:bg-transparent h-full flex flex-col justify-evenly"
            >
                {/* Left Side - Welcome Section */}
                <div className="w-full flex flex-col items-center">
                    <div className="mb-0 flex justify-center items-center">
                        <img
                            src="https://static.vecteezy.com/system/resources/previews/036/139/726/non_2x/hand-drawn-namaste-gesture-vector.jpg"
                            alt="Namaste gesture"
                            className="h-30 w-30 mix-blend-color-burn hue-rotate-0 saturate-[50] brightness-100"
                        />
                    </div>
                    <h2 className="text-5xl text-orange-700 font-semibold py-3 md:py-0 md:text-4xl">
                        Welcome to
                    </h2>
                    <h1 className="text-xl font-bold text-blue-500 py-2 capitalize md:text-2xl">
                        Grievance Management Portal
                    </h1>
                    <p className="text-md text-gray-600 font-normal md:text-xl">
                        For Public Complaints Handling
                    </p>
                </div>

                {/* Right Side - Auth Section */}
                <div className="w-full px-10">
                    <form onSubmit={handleSubmit}>

                        <div className="relative mb-6">
                            <input
                                type="text"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder=" "
                                required
                                className="peer w-full border border-gray-400 rounded-md px-6 py-3 text-sm placeholder-transparent focus:outline-2 focus:outline-black focus:outline-offset-4 focus:border-black"
                            />

                            <label
                                htmlFor="email"
                                className="absolute left-[20%] -top-3.5 transform -translate-x-1/2 px-2 text-sm transition-all duration-300 ease-in-out bg-[#f5e790] peer-placeholder-shown:top-2 peer-placeholder-shown:left-12 peer-placeholder-shown:transform-none peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-4 peer-focus:left-[20%] peer-focus:-translate-x-1/2 peer-focus:text-sm peer-focus:text-black text-black rounded-lg leading-1.5"
                            >
                                Email <sup className="text-red-500 text-lg">*</sup>
                            </label>

                        </div>
                        <div className="relative mb-6">
                            <input
                                type="text"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder=" "
                                required
                                className="peer w-full border border-gray-400 rounded-md px-6 py-3 text-sm placeholder-transparent focus:outline-2 focus:outline-black focus:outline-offset-4 focus:border-black"
                            />

                            <label
                                htmlFor="password"
                                className="absolute left-[20%] -top-3.5 transform -translate-x-1/2 px-2 text-sm transition-all duration-300 ease-in-out bg-[#f5e790] peer-placeholder-shown:top-2 peer-placeholder-shown:left-15 peer-placeholder-shown:transform-none peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-4 peer-focus:left-[20%] peer-focus:-translate-x-1/2 peer-focus:text-sm peer-focus:text-black text-black rounded-lg leading-1.5"
                            >
                                Password <sup className="text-red-500 text-lg">*</sup>
                            </label>

                        </div>

                        {/* Button Section */}

                        <input
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full py-3 mb-4 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition duration-200 cursor-pointer ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                            value={isSubmitting ? "Submitting..." : "Sign In"}
                        />

                        <p className="text-center">
                            <button type="button" className="text-blue-600 hover:underline">
                                Forget Password
                            </button>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}