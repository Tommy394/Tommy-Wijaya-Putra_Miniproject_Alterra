import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router";
import { useRecoilState, useRecoilValue } from "recoil";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

import QuestionListItem from "./QuestionListItem";
import ModalInputForm from "./ModalInputForm";
import { isEditingQuizAtom, questionsAtom } from "../utils/recoil_state";
import {
	uploadImage,
	insertQuizzes,
	insertQuestions,
	insertOptions,
	downloadImage,
	selectQuizById,
} from "../utils/database-operation";
import { useAuth } from "../utils/auth";
import useRefectQuizzes from "../hooks/useRefecthQuizzes";
import { toBase64 } from "../utils/helpers";

const QuestionList = () => {
	const { id } = useParams();
	const [isEditingQuiz, setIsEditingQuiz] = useRecoilState(isEditingQuizAtom);
	const location = useLocation();
	const [questionsState, setQuestions] = useRecoilState(questionsAtom);
	const navigate = useNavigate();
	const { user } = useAuth();
	const [show, setShow] = useState(false);
	const { register, handleSubmit, setValue } = useForm();
	const refetch = useRefectQuizzes();

	console.log("render");

	const renameObjectKey = (o, oldKey, newKey) => {
		if (oldKey !== newKey) {
			Object.defineProperty(
				o,
				newKey,
				Object.getOwnPropertyDescriptor(o, oldKey)
			);
			delete o[oldKey];
		}
	};

	useEffect(() => {
		const getQuestionsandOptions = async () => {
			if (isEditingQuiz) {
				const { quiz } = await selectQuizById(id);

				for (const question of quiz.questions) {
					if (question.image) {
						const { image } = await downloadImage(question.image);
						question.image = await toBase64(image);
					}
					renameObjectKey(question, "content", "question");

					setValue("quizName", quiz.name);
				}

				setQuestions(quiz.questions);
			}
		};
		getQuestionsandOptions();
	}, [id, setQuestions, location.state, isEditingQuiz, setValue]);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handleAddQuestion = () => {
		handleShow();
	};

	const generateQuestionArray = async (quizId) => {
		console.log(questionsState);
		const questionArr = await Promise.all(
			questionsState.map(async (quiz) => {
				const { image } = await uploadImage(quiz.image);

				return {
					id: quiz.id,
					content: quiz.question,
					image: image?.path,
					quiz_id: quizId,
				};
			})
		);

		return questionArr;
	};

	const generateOptionsArray = (questions) => {
		let optionsArr = [];

		questionsState.forEach((question, index) => {
			optionsArr.push(
				question.options.map((option) => {
					return {
						...option,
						id: option.id ? option.id : null,
						question_id: questions[index].id,
					};
				})
			);
		});

		return optionsArr.flat();
	};

	const onSubmit = async (data) => {
		const { quizData } = await insertQuizzes(user.id, data.quizName, id);

		const questionsArr = await generateQuestionArray(quizData.id);
		const { questions } = await insertQuestions(questionsArr);

		console.log(questionsState);

		const optionsArr = generateOptionsArray(questions);
		const { options } = await insertOptions(optionsArr);

		console.log(options);

		setQuestions([]);
		setIsEditingQuiz(false);
		navigate("/");
		refetch();
	};

	return (
		<>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<Form.Group
					className="mb-3"
					controlId="quizName"
				>
					<Form.Label>Quiz Name</Form.Label>
					<Form.Control
						type="text"
						placeholder="Insert your Quiz's Name"
						{...register("quizName")}
					/>
				</Form.Group>
				<Button
					variant="primary"
					type="submit"
					s
				>
					Submit
				</Button>
			</Form>

			<Button onClick={handleAddQuestion}>Add Question</Button>
			<div className="quiz-list">
				{questionsState.map((quiz, index) => (
					<QuestionListItem
						key={quiz.id}
						quiz={quiz}
						index={index}
					/>
				))}
			</div>
			<ModalInputForm
				show={show}
				handleClose={handleClose}
			/>
		</>
	);
};

export default QuestionList;
