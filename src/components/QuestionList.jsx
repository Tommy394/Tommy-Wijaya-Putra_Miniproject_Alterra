import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router";
import { useRecoilState } from "recoil";
import { Button, Form, FloatingLabel } from "react-bootstrap";
import { set, useForm } from "react-hook-form";
import Container from "react-bootstrap/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import QuestionListItem from "./QuestionListItem";
import Modal from "./Modal";
import InputForm from "./InputForm";
import { isEditingQuizAtom, questionsAtom } from "../utils/recoil_state";
import {
	insertQuizzes,
	insertQuestions,
	insertOptions,
	downloadImage,
	selectQuizById,
} from "../utils/database-operation";
import { useAuth } from "../utils/auth";
import useRefectQuizzes from "../hooks/useRefecthQuizzes";
import {
	toBase64,
	renameObjectKey,
	generateQuestionArray,
	generateOptionsArray,
	convertMinutesAndSecondsToMilliseconds,
	convertMillisecondsToMinutesAndSeconds,
} from "../utils/helpers";

const QuestionList = () => {
	const { id } = useParams();
	const location = useLocation();
	const navigate = useNavigate();
	const [isEditingQuiz, setIsEditingQuiz] = useRecoilState(isEditingQuizAtom);
	const [questionsState, setQuestions] = useRecoilState(questionsAtom);
	const { user } = useAuth();
	const [show, setShow] = useState(false);
	const { register, handleSubmit, setValue } = useForm();
	const refetch = useRefectQuizzes();

	useEffect(() => {
		const getQuestionsandOptions = async () => {
			if (isEditingQuiz) {
				const { quiz } = await selectQuizById(id);

				for (const question of quiz.questions) {
					if (question.image) {
						const { image } = await downloadImage(question.image);
						question.image = await toBase64(image);
					}
					renameObjectKey(question, "content", "question");

					// Set Inputs Value
					setValue("quizName", quiz.name);
					const { minutes, seconds } = convertMillisecondsToMinutesAndSeconds(
						quiz.duration
					);
					setValue("minutes", minutes);
					setValue("seconds", seconds);
				}

				setQuestions(quiz.questions);
			}
		};
		getQuestionsandOptions();
	}, [id, setQuestions, location.state, isEditingQuiz, setValue]);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handleAddQuestion = () => {
		handleShow();
	};

	const onSubmit = async (data) => {
		const durationTimeStampMs = convertMinutesAndSecondsToMilliseconds(
			data.minutes,
			data.seconds
		);
		const { quizData } = await insertQuizzes(
			user.id,
			data.quizName,
			id,
			durationTimeStampMs
		);

		const questionsArr = await generateQuestionArray(
			quizData.id,
			questionsState
		);
		const { questions } = await insertQuestions(questionsArr);

		const optionsArr = generateOptionsArray(questions, questionsState);
		const { options } = await insertOptions(optionsArr);

		setQuestions([]);
		setIsEditingQuiz(false);
		navigate("/");
		refetch();
	};

	return (
		<Container className="row m-auto justify-content-center mt-5">
			<div className="col-4 me-4">
				<Form onSubmit={handleSubmit(onSubmit)}>
					<Form.Group
						className="mb-3"
						controlId="quizName"
					>
						<Form.Label>Quiz Name</Form.Label>
						<Form.Control
							type="text"
							placeholder="Insert your Quiz's Name"
							{...register("quizName")}
						/>
					</Form.Group>
					<p>Duration </p>
					<div className="row">
						<FloatingLabel
							controlId="minutes"
							label="Minutes"
							className="mb-3 col"
						>
							<Form.Control
								type="number"
								placeholder="name@example.com"
								{...register("minutes")}
							/>
						</FloatingLabel>
						<FloatingLabel
							controlId="seconds"
							label="Seconds"
							className="mb-3 col"
						>
							<Form.Control
								type="number"
								placeholder="name@example.com"
								{...register("seconds")}
							/>
						</FloatingLabel>
					</div>
					<div className="d-flex mt-3">
						<Button
							variant="primary"
							type="submit"
							className="me-2"
						>
							Submit
						</Button>
						<Button
							type="button"
							onClick={handleAddQuestion}
							className="bg-gradient"
						>
							<FontAwesomeIcon
								icon={faPlus}
								className="me-1"
							/>{" "}
							Add Question
						</Button>
					</div>
				</Form>
			</div>
			<div className="quiz-list col-7 row bg-secondary justify-content-center align-items-stretch px-2 py-5 rounded-4">
				{questionsState.map((quiz, index) => (
					<QuestionListItem
						key={quiz.id}
						quiz={quiz}
						index={index}
						className="mb-3 bg-primary col-6 rounded-4"
					/>
				))}
			</div>
			<Modal
				show={show}
				handleClose={handleClose}
				fullscreen={true}
				title="Add Question"
				centered={true}
			>
				<InputForm handleClose={handleClose} />
			</Modal>
		</Container>
	);
};

export default QuestionList;
