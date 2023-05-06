import React from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { Controller } from "react-hook-form";

const OptionTextBox = ({ register, index, remove, control, setValue }) => {
	const handleCheckboxChange = (e, index) => {
		const isCorrectDOM = document.getElementsByClassName("is-correct");
		const isCorrectDOMArr = [...isCorrectDOM];
		isCorrectDOMArr.forEach((checkbox, i) => {
			if (i !== index) {
				checkbox.checked = false;
				setValue(`options.${i}.is_correct`, false);
			}
		});
	};

	return (
		<InputGroup className="mb-3">
			<Controller
				control={control}
				name={`options.${index}.is_correct`}
				defaultValue={false}
				render={({ field }) => (
					<InputGroup.Checkbox
						className="is-correct"
						aria-label="Radio button for following text input"
						checked={field.value}
						{...field}
						onChange={(e) => {
							field.onChange(e);
							handleCheckboxChange(e, index);
						}}
					/>
				)}
			/>
			<Controller
				control={control}
				name={`options.${index}.content`}
				render={({ field }) => (
					<Form.Control
						placeholder={`Options ${index + 1}`}
						aria-label="options"
						aria-describedby="options"
						{...field}
					/>
				)}
			/>
			<Button
				variant="outline-danger"
				id="button-addon2"
				type="Button"
				onClick={() => remove(index)}
			>
				Delete
			</Button>
		</InputGroup>
	);
};

export default OptionTextBox;
