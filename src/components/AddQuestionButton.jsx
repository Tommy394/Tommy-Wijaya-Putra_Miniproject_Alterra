import React, { useRef } from "react";
import { Button } from "react-bootstrap";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import { isFormEditingAtom, quizzesAtom } from "../utils/recoil_state";
import { useNavigate } from "react-router";
import { toBase64, getId } from "../utils/helpers";

const AddQuestionButton = ({ reset, getValues, location, ...props }) => {
	const setQuizzes = useSetRecoilState(quizzesAtom);
	const navigate = useNavigate();

	const handleAddQuestion = async () => {
		const formData = getValues();

		if (formData.image instanceof File) {
			formData.image = await toBase64(formData.image);
		}

		if (location.state) {
			setQuizzes((prev) => {
				const newQuizzes = [...prev];
				newQuizzes[location.state.index] = formData;
				return newQuizzes;
			});

			navigate("/question-list");
		} else {
			setQuizzes((prev) => [...prev, { ...formData, id: getId() }]);

			navigate("/question-list");
		}
	};

	return (
		<Button
			variant="primary"
			onClick={handleAddQuestion}
			{...props}
		>
			{props.children}
		</Button>
	);
};

export default AddQuestionButton;
