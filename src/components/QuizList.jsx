import React from "react";
import { useRecoilValue } from "recoil";
import Row from "react-bootstrap/Row";
import { Container } from "react-bootstrap";

import QuizListItem from "./QuizListItem";
import { quizzesSelector } from "../utils/recoil_state";

const QuizList = ({ userId }) => {
	const { quizzes } = useRecoilValue(quizzesSelector(userId));

	return (
		<Container className="mt-5 m-auto bg-secondary py-5 px-5 rounded-5 mb-5">
			<h1>Your Quiz</h1>
			<Row
				xs={1}
				md={3}
				className="g-5 mt-2 justify-content-between"
			>
				{quizzes.map((quiz) => (
					<QuizListItem
						quiz={quiz}
						key={quiz.id}
					/>
				))}
			</Row>
		</Container>
	);
};
export default QuizList;
