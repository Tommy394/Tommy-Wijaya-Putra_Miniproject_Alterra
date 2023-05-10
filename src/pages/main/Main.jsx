import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useNavigate } from "react-router-dom";
import { Suspense } from "react";

import supabase from "../../utils/client";
import QuizList from "../../components/QuizList";
import Modal from "../../components/Modal";
import InputForm from "../../components/InputForm";

import { useAuth } from "../../utils/auth";
import { useForm } from "react-hook-form";

const Main = () => {
	const navigate = useNavigate();
	const { user } = useAuth();
	const [show, setShow] = useState(false);
	const { register, handleSubmit } = useForm();

	const handleLogout = async () => {
		await supabase.auth.signOut();
		navigate("login");
	};

	const handleShow = () => setShow(true);

	const handleClose = () => setShow(false);

	const onSubmit = (data) => {
		navigate(`/play-quiz/${data.quizId}`);
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
			<Button onClick={handleShow}>Add Quiz</Button>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<FloatingLabel
					controlId="quizId"
					label="Type Quiz ID to play"
					className="mb-3"
				>
					<Form.Control
						type="text"
						placeholder="Quiz ID"
						{...register("quizId")}
					/>
				</FloatingLabel>
				<Button
					variant="primary"
					type="submit"
				>
					Play
				</Button>
			</Form>

			<Suspense fallback={<div>Loading...</div>}>
				<QuizList userId={user?.id} />
			</Suspense>
			<Modal
				show={show}
				handleClose={handleClose}
				title="Add Question"
				fullscreen={true}
			>
				<InputForm handleClose={handleClose} />
			</Modal>
		</div>
	);
};

export default Main;
