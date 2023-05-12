import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare, faTrash } from "@fortawesome/free-solid-svg-icons";

import { isEditingQuizAtom, quizzesRequestIdAtom } from "../utils/recoil_state";
import { deleteQuizById } from "../utils/database-operation";

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
				<Card
					className="w-100 bg-primary px-3 py-2 rounded-3 position-relative"
					style={{ width: "18rem" }}
				>
					<Card.Body onClick={handleQuizClick}>
						<Card.Title>{quiz.name}</Card.Title>
						<Card.Subtitle className="mb-2 text-muted">
							Quiz ID: {quiz.id}
						</Card.Subtitle>
					</Card.Body>
					<div className="card__icons">
						<a
							href={`https://wa.me/?text=This%20user%20invites%20you%20to%20join%20and%20play%20the%20user%27s%20created%20quiz.%20Come%20and%20prove%20your%20knowledge.%20%0A%0Ahttps%3A%2F%2Fkuizly.vercel.app%2Fplay-quiz%2F${quiz.id}`}
							target="_blank"
							rel="noreferrer"
						>
							<Button
								variant="primary"
								type="button"
								// onClick={handleShareQuiz}
								className="card__share-icon"
							>
								<FontAwesomeIcon
									icon={faShare}
									style={{ color: "#ffffff" }}
								/>
							</Button>
						</a>
						<Button
							variant="primary"
							type="button"
							onClick={handleDeleteQuiz}
							className="card__delete-icon"
						>
							<FontAwesomeIcon
								icon={faTrash}
								style={{ color: "#ffffff" }}
							/>
						</Button>
					</div>
				</Card>
			</Col>
		</>
	);
};

export default QuizListItem;
