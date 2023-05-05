import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router";

const QuizListItem = ({ quiz, index }) => {
	const navigate = useNavigate();

	const handleEdit = () => {
		navigate(`/quiz-form/${index}`);
	};

	return (
		<Card style={{ width: "18rem" }}>
			<Card.Body>
				<Card.Title>No. {index + 1}</Card.Title>
				<div>
					<h6>Question:</h6>
					{quiz.image && (
						<img
							src={quiz.image}
							alt=""
							style={{ width: "100px" }}
						/>
					)}
					<p>{quiz.question}</p>
					<hr />
					<h6>Options</h6>
					<ul>
						{quiz.options.map((option, index) => (
							<li
								className={option.is_correct ? "correct_answer" : ""}
								key={index}
							>
								{option.content}
							</li>
						))}
					</ul>
				</div>
				<Button
					variant="success"
					onClick={handleEdit}
				>
					Edit
				</Button>
				<Button variant="danger">Delete</Button>
			</Card.Body>
		</Card>
	);
};

export default QuizListItem;
