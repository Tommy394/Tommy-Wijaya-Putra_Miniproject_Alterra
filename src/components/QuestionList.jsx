import React from "react";
import { useNavigate, useParams } from "react-router";
import { useRecoilState } from "recoil";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

import QuestionListItem from "./QuestionListItem";
import { questionsAtom } from "../utils/recoil_state";
import {
	uploadImage,
	insertQuizzes,
	insertQuestions,
	insertOptions,
} from "../utils/database-operation";
import { useAuth } from "../utils/auth";
import useRefectQuizzes from "../hooks/useRefecthQuizzes";

const QuestionList = () => {
	const navigate = useNavigate();
	const [questionsState, setQuestions] = useRecoilState(questionsAtom);
	const { user } = useAuth();
	const { register, handleSubmit } = useForm();
	const refetch = useRefectQuizzes();

	const handleAddQuestion = () => {
		navigate("/quiz-form/");
	};

	const generateQuestionArray = async (quizId) => {
		const questionArr = await Promise.all(
			questionsState.map(async (quiz) => {
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

		questionsState.forEach((question, index) => {
			optionsArr.push(
				question.options.map((option) => {
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

		const optionsArr = generateOptionsArray(questions);
		const { options } = await insertOptions(optionsArr);

		setQuestions([]);
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
		</>
	);
};

export default QuestionList;
