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


    if (isAuthenticated || Cookies.get("Name")) {
        return <Navigate to="/admin/home" replace />;
    }

    return (
        <div
            className="h-screen w-full flex items-center justify-end px-6"
            style={{
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            {/* Floating Form Card */}
            <div className="w-full md:w-[35%] bg-white bg-opacity-90 p-8 rounded-xl shadow-2xl">
                <form onSubmit={handleSubmit}>
                    <h1 className="text-2xl font-bold my-6">Log In</h1>

                    <div className="mb-6">
                        <label htmlFor="email" className="block mb-2 text-md font-semibold text-gray-700">
                            Email <sup className="text-red-500 text-lg">*</sup>
                        </label>
                        <input
                            type="text"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Jone@Doe.John"
                            required
                            className="w-full border border-gray-400 rounded-md px-4 py-3 text-sm focus:outline-2 focus:outline-black focus:outline-offset-4 focus:border-black"
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="password" className="block mb-2 text-md font-semibold text-gray-700">
                            Password <sup className="text-red-500 text-lg">*</sup>
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="********"
                            required
                            className="w-full border border-gray-400 rounded-md px-4 py-3 text-sm focus:outline-2 focus:outline-black focus:outline-offset-4 focus:border-black"
                        />
                    </div>

                    <input
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-3 mb-4 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition duration-200 cursor-pointer ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                        value={isSubmitting ? "Submitting..." : "Sign In"}
                    />

                    <p className="text-center">
                        <button type="button" className="text-blue-600 hover:underline">
                            Forget Password ?
                        </button>
                    </p>
                </form>

            </div>
        </div>
    );
}