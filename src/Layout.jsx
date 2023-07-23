import React from "react";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Outlet, useNavigate } from "react-router-dom";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useAuth } from "./utils/auth";
import kuizlyLogo from "./assets/kuizly-logo.svg";
import supabase from "./utils/client";

const Layout = () => {
	const { user } = useAuth();
	const navigate = useNavigate();

	const handleLogout = async () => {
		await supabase.auth.signOut();
		navigate("/login");
	};

	return (
		<>
			<Nav
				activeKey="/home"
				className="p-3"
			>
				<Nav.Item className="me-auto nav__logo">
					<Nav.Link href="/">
						<img
							src={kuizlyLogo}
							alt="Logo"
							width="180px"
						/>
					</Nav.Link>
				</Nav.Item>
				<NavDropdown
					title={user ? user.email : "User"}
					id="nav-dropdown"
					className="bg-gradient text-white rounded-5"
				>
					<NavDropdown.Item
						eventKey="4.1"
						className="row"
						as={"button"}
						onClick={handleLogout}
					>
						<FontAwesomeIcon
							className="col-3 align-self-start ps-0 pe-0"
							icon={faArrowRightFromBracket}
						/>
						<span className="col-1 ps-0 ms-0 fw-bold">Log Out</span>
					</NavDropdown.Item>
				</NavDropdown>
			</Nav>
			<Outlet />
		</>
	);
};

export default Layout;
