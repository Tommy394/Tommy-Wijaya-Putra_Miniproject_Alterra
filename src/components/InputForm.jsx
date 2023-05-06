import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFieldArray, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import { useRecoilState } from "recoil";

import QuestionTextBox from "./QuestionTextBox";
import Options from "./Options";
import OptionTextBox from "./OptionTextBox";
import AddQuestionButton from "./AddQuestionButton";
import FileInput from "./FileInput";
import { toBase64, getId } from "../utils/helpers";
import { quizzesAtom } from "../utils/recoil_state";

const InputForm = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const [quizzes, setQuizzes] = useRecoilState(quizzesAtom);

	let initialFormValue = {
		question: "",
		image: null,
		options: Array(4).fill({ content: "", is_correct: false }),
	};

	if (location.state) {
		initialFormValue = location.state.quiz;
	}

	const { register, handleSubmit, control, setValue, reset, getValues } =
		useForm({
			defaultValues: initialFormValue,
		});
	const { fields, append, remove } = useFieldArray({
		name: "options",
		control,
	});

	const onSubmit = async (data) => {
		if (data.image instanceof File) {
			data.image = await toBase64(data.image);
		}

		if (location.state) {
			setQuizzes((prev) => {
				const newQuizzes = [...prev];
				newQuizzes[location.state.index] = data;
				return newQuizzes;
			});

			navigate("/question-list");
		} else {
			setQuizzes((prev) => [...prev, { ...data, id: getId() }]);

			navigate("/question-list");
		}
	};

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			{/* <AddQuestionButton
				reset={reset}
				type="submit"
				getValues={getValues}
				location={location}
			>
				Save
			</AddQuestionButton> */}
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
				Save
			</Button>
		</Form>
	);
};

export default InputForm;
