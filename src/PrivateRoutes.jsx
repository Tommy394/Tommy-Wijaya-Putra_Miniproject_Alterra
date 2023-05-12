import React from "react";
import { useLocation, Outlet, Navigate } from "react-router-dom";

import { useAuth } from "./utils/auth";

const PrivateRoute = () => {
	const location = useLocation();
	const { session } = useAuth();

	if (session === undefined) {
		return <h1>Hi!</h1>; // or loading indicator/spinner/etc
	}

	return session ? (
		<Outlet />
	) : (
		<Navigate
			to="/login"
			replace
			state={{ from: location }}
		/>
	);
};

export default PrivateRoute;
