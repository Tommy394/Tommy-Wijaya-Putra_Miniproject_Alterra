import React from "react";
import { useRecoilValue } from "recoil";
import Row from "react-bootstrap/Row";

import QuizListItem from "./QuizListItem";
import { quizzesSelector } from "../utils/recoil_state";

const QuizList = ({ userId }) => {
	const { quizzes } = useRecoilValue(quizzesSelector(userId));

	return (
		<div>
			<h1>Your Quiz</h1>
			<Row
				xs={2}
				md={4}
				className="g-1"
			>
				{quizzes.map((quiz) => (
					<QuizListItem
						quiz={quiz}
						key={quiz.id}
					/>
				))}
			</Row>
		</div>
	);
};
export default QuizList;
