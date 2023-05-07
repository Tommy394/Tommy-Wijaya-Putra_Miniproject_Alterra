import React from "react";
import Button from "react-bootstrap/Button";
import { useNavigate, Link } from "react-router-dom";
import { Suspense } from "react";

import supabase from "../../utils/client";
import QuizList from "../../components/QuizList";

import { useAuth } from "../../utils/auth";

const Main = () => {
	const navigate = useNavigate();
	const { user } = useAuth();

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
			<Suspense fallback={<div>Loading...</div>}>
				<QuizList userId={user?.id} />
			</Suspense>
		</div>
	);
};

export default Main;
