import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import '../../App.css';

import GrievanceForm from "./GrievanceForm.jsx";
import LandingPage from "./LandingPage.jsx";

import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import MyGrievance from "./MyGrievance.jsx";
import AboutUs from "./AboutUs.jsx";
import Home from "./Home.jsx";

import { useEffect } from 'react';

export default function UserApp() {
	const location = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location]);

	return (
		<>
			<Navbar />

			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/home" element={<Home />} />
				<Route path="/landingpage" element={<LandingPage />} />
				<Route path="/mygrievance" element={<MyGrievance />} />
				<Route path="/about-us" element={<AboutUs />} />
				<Route path="/grievanceform" element={<GrievanceForm />} />
			</Routes>
			<Footer />
		</>
	);
}
