import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useRecoilValue, useSetRecoilState } from "recoil";

import QuestionTextBox from "./QuestionTextBox";
import Options from "./Options";
import OptionTextBox from "./OptionTextBox";
import FileInput from "./FileInput";
import { toBase64, getId } from "../utils/helpers";
import { v4 as uuidv4 } from "uuid";
import { isEditingQuestionAtom, questionsAtom } from "../utils/recoil_state";

const InputForm = ({ quiz, index, handleClose }) => {
	// const location = useLocation();
	// const { id } = useParams();
	const navigate = useNavigate();
	const isEditingQuestion = useRecoilValue(isEditingQuestionAtom);
	const setQuestions = useSetRecoilState(questionsAtom);

	let initialFormValue = {
		question: "",
		image: null,
		options: Array(4).fill({ content: "", is_correct: false }),
	};

	if (isEditingQuestion) {
		initialFormValue = quiz;
	}

	const { register, handleSubmit, control, setValue } = useForm({
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

		if (isEditingQuestion) {
			setQuestions((prev) => {
				const newQuizzes = [...prev];
				newQuizzes[index] = data;
				return newQuizzes;
			});

			handleClose();
		} else {
			setQuestions((prev) => [...prev, { ...data, id: uuidv4() }]);

			handleClose();
			navigate("question-list");
		}
	};

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
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
