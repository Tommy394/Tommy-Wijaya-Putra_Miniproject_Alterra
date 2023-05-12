import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import Button from "react-bootstrap/Button";

import {
	answersAtom,
	playQuizzesSelector,
	previewQuestionsAtom,
} from "../utils/recoil_state";
import Question from "./Question";
import { currentQuestionAtom } from "../utils/recoil_state";
import Modal from "./Modal";
import Result from "./Result";
import CountdownTimer from "./CountdownTimer";
import { Container } from "react-bootstrap";

const Quiz = () => {
	const param = useParams();
	const navigate = useNavigate();
	const [currentQuestion, setCurrentQuestion] =
		useRecoilState(currentQuestionAtom);
	const [showModal, setShowModal] = useState(false);
	const setAnswers = useSetRecoilState(answersAtom);
	const setPreviewQuestion = useSetRecoilState(previewQuestionsAtom);
	// const [score, setScore] = useRecoilState(quizScoreAtom);

	const { quiz } = useRecoilValue(playQuizzesSelector(param.id));
	console.log(quiz);
	const questions = quiz.questions;

	console.log(currentQuestion);

	const handleShowModal = () => {
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setShowModal(false);
	};

	const handleQuizFinish = () => {
		setCurrentQuestion(0);
		setPreviewQuestion([]);
		setAnswers([]);
		navigate("/");
	};

	return (
		<Container className="mt-5">
			<div>
				<h1>Quiz Name: {quiz.name}</h1>
				{quiz.duration && (
					<CountdownTimer
						countdownTimeStampMs={quiz.duration}
						handleShowModal={handleShowModal}
						showModal={showModal}
					/>
				)}
				<Question
					question={questions[currentQuestion]}
					questionLength={questions.length}
					handleShowModal={handleShowModal}
				/>
			</div>
			<Modal
				show={showModal}
				title="Result"
				centered
				backdrop="static"
				closeButton={false}
				modalFooter={<Button onClick={handleQuizFinish}>Finish</Button>}
			>
				<Result quizLength={questions.length} />
			</Modal>
		</Container>
	);
};

export default Quiz;
