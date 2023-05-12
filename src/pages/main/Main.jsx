import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useNavigate } from "react-router-dom";
import { Suspense } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

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

	const handleShow = () => setShow(true);

	const handleClose = () => setShow(false);

	const onSubmit = (data) => {
		navigate(`/play-quiz/${data.quizId}`);
	};

	return (
		<div>
			<Container className="row m-auto mt-5 align-items-center justify-content-between">
				<Form
					onSubmit={handleSubmit(onSubmit)}
					className="row col-8 justify-content-start"
				>
					<FloatingLabel
						controlId="quizId"
						label="Type Quiz ID to play"
						className="col-6 ps-1"
					>
						<Form.Control
							type="text"
							placeholder="Quiz ID"
							{...register("quizId")}
							className="form__play-quiz ps-3"
						/>
					</FloatingLabel>
					<Button
						variant="primary"
						type="submit"
						className="col-3"
					>
						Play
					</Button>
				</Form>
				<Button
					onClick={handleShow}
					className="text-white bg-gradient gradient col-2"
				>
					<FontAwesomeIcon
						icon={faPlus}
						className="me-1"
					/>{" "}
					Create Quiz
				</Button>
			</Container>

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
