import React from "react";
import { useNavigate, useParams } from "react-router";
import { useRecoilState } from "recoil";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

import QuestionListItem from "./QuestionListItem";
import { quizzesAtom } from "../utils/recoil_state";
import {
	uploadImage,
	insertQuizzes,
	insertQuestions,
	insertOptions,
} from "../utils/database-operation";
import { useAuth } from "../utils/auth";

const QuestionList = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [quizzes, setQuizzes] = useRecoilState(quizzesAtom);
	const { user } = useAuth();
	const { register, handleSubmit } = useForm();

	const handleAddQuestion = () => {
		navigate("/quiz-form/");
	};

	const generateQuestionArray = async (quizId) => {
		const questionArr = await Promise.all(
			quizzes.map(async (quiz) => {
				const { image } = await uploadImage(quiz.image);

				return {
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

		quizzes.forEach((quiz, index) => {
			optionsArr.push(
				quiz.options.map((option) => {
					return {
						...option,
						question_id: questions[index].id,
					};
				})
			);
		});

		return optionsArr.flat();
	};

	const onSubmit = async (data) => {
		const { quizData } = await insertQuizzes(user.id, data.quizName);

		const questionsArr = await generateQuestionArray(quizData.id);
		const { questions } = await insertQuestions(questionsArr);

		console.log(questions);

		const optionsArr = generateOptionsArray(questions);
		const { options } = await insertOptions(optionsArr);

		setQuizzes([]);
		navigate("/");
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
				>
					Submit
				</Button>
			</Form>
			<Button onClick={handleAddQuestion}>Add Question</Button>
			<div className="quiz-list">
				{quizzes.map((quiz, index) => (
					<QuestionListItem
						key={quiz.id}
						quiz={quiz}
						index={index}
					/>
				))}
			</div>
		</>
	);
};

export default QuestionList;
