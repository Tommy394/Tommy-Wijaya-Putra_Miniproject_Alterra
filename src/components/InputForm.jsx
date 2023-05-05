import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFieldArray, useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";

import QuestionTextBox from "./QuestionTextBox";
import Options from "./Options";
import OptionTextBox from "./OptionTextBox";
import AddQuestionButton from "./AddQuestionButton";
import FileInput from "./FileInput";
import { useAuth } from "../utils/auth";
import {
	insertQuestions,
	insertOptions,
	insertQuizzes,
	uploadImage,
} from "../utils/database-operation";
import { useParams } from "react-router";
import { quizzesAtom } from "../utils/recoil_state";

const InputForm = () => {
	const { index } = useParams;
	const quizzes = useRecoilValue(quizzesAtom);
	console.log("render");

	if (index) {
		console.log(quizzes[index]);
	}

	const { register, handleSubmit, control, setValue, watch, reset, getValues } =
		useForm({
			defaultValues: {
				question: "",
				image: null,
				options: Array(4).fill({ content: "", is_correct: false }),
			},
		});
	const { fields, append, remove } = useFieldArray({
		name: "options",
		control,
	});
	const { user } = useAuth();

	const onSubmit = async (data) => {
		console.log(data);

		const { quizzes, quizzesError } = await insertQuizzes(user.id);

		const { image, imageError } = await uploadImage(data.image);

		const { questions, questionsError } = await insertQuestions(
			quizzes.id,
			data.question,
			image.path
		);

		const { option, optionError } = await insertOptions(
			questions[0].id,
			data.options
		);

		if (optionError) {
			console.log(optionError);
		}
	};

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<AddQuestionButton
				reset={reset}
				type="button"
				getValues={getValues}
			>
				Add Question
			</AddQuestionButton>
			<QuestionTextBox register={register} />
			<FileInput
				register={register}
				control={control}
				setValue={setValue}
			/>
			<Options>
				{fields.map((field, index) => (
					<OptionTextBox
						key={field.id}
						index={index}
						register={register}
						remove={remove}
						control={control}
						watch={watch}
						setValue={setValue}
					/>
				))}
			</Options>
			<Button
				type="button"
				onClick={() => append({ content: "" })}
			>
				Add option
			</Button>
			<Button
				variant="primary"
				type="submit"
			>
				Submit
			</Button>
		</Form>
	);
};

export default InputForm;
