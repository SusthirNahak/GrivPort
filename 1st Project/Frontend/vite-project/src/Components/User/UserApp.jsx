import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import '../../App.css';

// import SelectGrievance from "./SelectGrievance.jsx";
import GrievanceForm from "./GrievanceForm.jsx";
import LandingPage from "./LandingPage.jsx";
// import VerifyOTP from "./VerifyOTP.jsx";
import Navbar from "./Navbar.jsx";
import MyGrievance from "./MyGrievance.jsx";

export default function UserApp() {
	const location = useLocation();
	const hideNavbar = location.pathname === '/' || location.pathname === '/landingpage';

	return (
		<>
			{/* Show Navbar on all pages except landing */}
			{!hideNavbar && <Navbar />}

			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/landingpage" element={<LandingPage />} />
				{/* <Route path="/verifyotp" element={<VerifyOTP />} /> */}
				<Route path="/mygrievance" element={<MyGrievance />} />
				<Route path="/grievanceform" element={<GrievanceForm />} />
			</Routes>
		</>
	);
}
