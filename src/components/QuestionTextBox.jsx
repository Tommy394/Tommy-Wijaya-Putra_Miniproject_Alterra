import React from "react";
import Form from "react-bootstrap/Form";

const QuestionTextBox = ({ register }) => {
	return (
		<Form.Group
			className="mb-3"
			controlId="question"
		>
			<Form.Label>Question</Form.Label>
			<Form.Control
				type="text"
				placeholder="Type your question here"
				autoFocus
				{...register("question")}
			/>
		</Form.Group>
	);
};

export default QuestionTextBox;
