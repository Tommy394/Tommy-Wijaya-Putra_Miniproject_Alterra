import React from "react";
import Button from "react-bootstrap/Button";
import { useNavigate, Link } from "react-router-dom";

import supabase from "../../utils/client";

const Main = () => {
	const navigate = useNavigate();

	const handleLogout = async () => {
		await supabase.auth.signOut();
		navigate("login");
	};

	return (
		<div>
			<p>Logged in!</p>
			<Button
				variant="primary"
				onClick={handleLogout}
			>
				Log Out
			</Button>
			<Link to="quiz-form">
				<Button>Add Quiz</Button>
			</Link>
		</div>
	);
};

export default Main;
