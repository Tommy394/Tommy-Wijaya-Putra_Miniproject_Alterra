import React from "react";
import { Button } from "react-bootstrap";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { quizzesAtom } from "../utils/recoil_state";
import { useNavigate } from "react-router";

const AddQuestionButton = ({ reset, getValues, ...props }) => {
	const setQuizzes = useSetRecoilState(quizzesAtom);
	const navigate = useNavigate();

	const toBase64 = (file) =>
		new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result);
			reader.onerror = (error) => reject(error);
		});

	const handleAddQuestion = async () => {
		const formData = getValues();

		if (formData.image) {
			formData.image = await toBase64(formData.image);
		}

		setQuizzes((prev) => [...prev, { ...formData, id: prev.length + 1 }]);

		navigate("/quiz-list");
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
