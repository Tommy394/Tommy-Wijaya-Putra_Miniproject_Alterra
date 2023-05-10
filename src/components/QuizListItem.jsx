import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useNavigate, useLocation } from "react-router-dom";
import { useSetRecoilState } from "recoil";

import { isEditingQuizAtom, quizzesRequestIdAtom } from "../utils/recoil_state";
import { deleteQuizById } from "../utils/database-operation";

const QuizListItem = ({ quiz }) => {
	const navigate = useNavigate();
	const location = useLocation();
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
					<a
						href={`https://wa.me/?text=This+user+invites+you+to+join+and+play+the+user%27s+created+quiz.+Come+and+prove+your+knowledge.+%0D%0A%0D%0Ahttp%3A%2F%2Flocalhost%3A5173%2Fplay-quiz%2F${quiz.id}`}
						target="_blank"
					>
						<Button
							variant="success"
							type="button"
							// onClick={handleShareQuiz}
						>
							Share
						</Button>
					</a>
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
