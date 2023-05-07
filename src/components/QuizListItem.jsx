import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";

import { isEditingQuizAtom } from "../utils/recoil_state";

const QuizListItem = ({ quiz }) => {
	const navigate = useNavigate();
	const setIsEiditingQuiz = useSetRecoilState(isEditingQuizAtom);

	const handleQuizClick = () => {
		setIsEiditingQuiz(true);

		navigate(`/question-list/${quiz.id}`);
	};

	return (
		<>
			<Col>
				<Card
					style={{ width: "18rem" }}
					onClick={handleQuizClick}
				>
					<Card.Body>
						<Card.Title>{quiz.name}</Card.Title>
						<Card.Subtitle className="mb-2 text-muted">{quiz.id}</Card.Subtitle>
						<Card.Text>Some quick ex content.</Card.Text>
					</Card.Body>
				</Card>
			</Col>
		</>
	);
};

export default QuizListItem;
