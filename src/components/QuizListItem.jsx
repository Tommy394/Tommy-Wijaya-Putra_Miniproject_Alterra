import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";

import { isEditingQuizAtom, quizzesRequestIdAtom } from "../utils/recoil_state";
import { deleteQuizById } from "../utils/database-operation";
import { set } from "react-hook-form";

const QuizListItem = ({ quiz }) => {
	const navigate = useNavigate();
	const setIsEiditingQuiz = useSetRecoilState(isEditingQuizAtom);
	const setQuizzesRequestId = useSetRecoilState(quizzesRequestIdAtom);

	const handleQuizClick = () => {
		setIsEiditingQuiz(true);

		navigate(`/question-list/${quiz.id}`);
	};

	const handleDeleteQuiz = async () => {
		if (window.confirm("Are you sure you want to delete this quiz?")) {
			const { deleteError } = await deleteQuizById(quiz.id);

			setQuizzesRequestId((prev) => prev + 1);
		}
	};

	return (
		<>
			<Col>
				<Card style={{ width: "18rem" }}>
					<Card.Body onClick={handleQuizClick}>
						<Card.Title>{quiz.name}</Card.Title>
						<Card.Subtitle className="mb-2 text-muted">{quiz.id}</Card.Subtitle>
						<Card.Text>Some quick ex content.</Card.Text>
					</Card.Body>
					<Button
						variant="danger"
						type="button"
						onClick={handleDeleteQuiz}
					>
						Delete
					</Button>
				</Card>
			</Col>
		</>
	);
};

export default QuizListItem;
