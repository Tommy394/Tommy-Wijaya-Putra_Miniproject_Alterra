import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { Suspense } from "react";

import supabase from "../../utils/client";
import QuizList from "../../components/QuizList";
import ModalInputForm from "../../components/ModalInputForm";

import { useAuth } from "../../utils/auth";

const Main = () => {
	const navigate = useNavigate();
	const { user } = useAuth();
	const [show, setShow] = useState(false);

	const handleLogout = async () => {
		await supabase.auth.signOut();
		navigate("login");
	};

	const handleShow = () => setShow(true);

	const handleClose = () => setShow(false);

	return (
		<div>
			<p>Logged in!</p>
			<Button
				variant="primary"
				onClick={handleLogout}
			>
				Log Out
			</Button>
			<Button onClick={handleShow}>Add Quiz</Button>
			<Suspense fallback={<div>Loading...</div>}>
				<QuizList userId={user?.id} />
			</Suspense>
			<ModalInputForm
				show={show}
				handleClose={handleClose}
			/>
		</div>
	);
};

export default Main;
