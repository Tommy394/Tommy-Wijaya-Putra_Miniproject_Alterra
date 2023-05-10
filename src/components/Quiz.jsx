import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useRecoilState, useRecoilValue } from "recoil";
import Button from "react-bootstrap/Button";

import { playQuizzesSelector, quizScoreAtom } from "../utils/recoil_state";
import Question from "./Question";
import { currentQuestionAtom } from "../utils/recoil_state";
import Modal from "./Modal";
import CountdownTimer from "./CountdownTimer";

const Quiz = () => {
	const param = useParams();
	const navigate = useNavigate();
	const [currentQuestion, setCurrentQuestion] =
		useRecoilState(currentQuestionAtom);
	const [showModal, setShowModal] = useState(false);
	const [score, setScore] = useRecoilState(quizScoreAtom);

	const { quiz } = useRecoilValue(playQuizzesSelector(param.id));
	const questions = quiz.questions;

	// useEffect(() => {
	// 	if (currentQuestion === questions.length) {
	// 		setShowModal(true);

	// 		return;
	// 	}
	// }, [currentQuestion, questions.length]);

	const handleShowModal = () => {
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setShowModal(false);
	};

	const handleQuizFinish = () => {
		setCurrentQuestion(0);
		setScore(0);
		navigate("/");
	};

	return (
		<>
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
				Your score is {score} / {questions.length}
			</Modal>
		</>
	);
};

export default Quiz;
