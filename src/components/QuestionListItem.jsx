import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

import {
	answersAtom,
	isEditingQuestionAtom,
	questionsAtom,
} from "../utils/recoil_state";
import Modal from "./Modal";
import InputForm from "./InputForm";

const QuestionListItem = ({ quiz, index, previewAnswers = false, ...prop }) => {
	const setQuestions = useSetRecoilState(questionsAtom);
	const setIsEditingQuestion = useSetRecoilState(isEditingQuestionAtom);
	const answers = useRecoilValue(answersAtom);

	const [show, setShow] = useState(false);

	console.log(quiz);

	const handleEdit = () => {
		setIsEditingQuestion(true);
		setShow(true);
	};

	const handleClose = () => {
		setIsEditingQuestion(false);
		setShow(false);
	};

	const handleDelete = () => {
		if (window.confirm("Are you sure you want to delete this question?")) {
			setQuestions((prev) => {
				const newQuizzes = [...prev];
				newQuizzes.splice(index, 1);
				return newQuizzes;
			});
		}
	};

	return (
		<>
			<Card
				style={{ width: "18rem" }}
				{...prop}
			>
				<Card.Body className="d-flex flex-column justify-content-center text-left">
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
						<p>{quiz.question ? quiz.question : quiz.content}</p>
						<hr />
						<h6>Options</h6>
						<ul>
							{quiz.options.map((option, i) => {
								return (
									<li
										className={option.is_correct ? "correct_answer" : ""}
										key={i}
									>
										{option.content}
										{previewAnswers && answers[index]?.id === option.id ? (
											<span className="text-muted ms-1">(Your Answer)</span>
										) : (
											""
										)}
									</li>
								);
							})}
						</ul>
					</div>
					{!previewAnswers && (
						<div className="card__icons">
							<Button
								variant="primary"
								onClick={handleEdit}
							>
								<FontAwesomeIcon
									icon={faPenToSquare}
									style={{ color: "#ffffff" }}
								/>
							</Button>
							<Button
								variant="primary"
								onClick={handleDelete}
							>
								<FontAwesomeIcon
									icon={faTrash}
									style={{ color: "#ffffff" }}
								/>
							</Button>
						</div>
					)}
				</Card.Body>
			</Card>
			<Modal
				show={show}
				handleClose={handleClose}
				fullscreen={true}
				title="Edit Question"
			>
				<InputForm
					quiz={quiz}
					index={index}
					handleClose={handleClose}
				/>
			</Modal>
		</>
	);
};

export default QuestionListItem;
