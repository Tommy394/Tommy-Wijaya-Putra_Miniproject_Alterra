import React from "react";
import { useNavigate, useParams } from "react-router";
import { useRecoilValue } from "recoil";
import { Button } from "react-bootstrap";

import QuizListItem from "../components/QuizListItem";
import { quizzesAtom } from "../utils/recoil_state";

const QuizList = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const quizzes = useRecoilValue(quizzesAtom);

	const handleAddQuestion = () => {
		navigate("/quiz-form/");
	};

	return (
		<>
			<Button onClick={handleAddQuestion}>Add Question</Button>
			<div className="quiz-list">
				{quizzes.map((quiz, index) => (
					<QuizListItem
						key={quiz.id}
						quiz={quiz}
						index={index}
					/>
				))}
			</div>
		</>
	);
};

export default QuizList;
