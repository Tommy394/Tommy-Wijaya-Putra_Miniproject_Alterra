import React from "react";
import Form from "react-bootstrap/Form";
import { Controller } from "react-hook-form";

const FileInput = ({ register, control, setValue }) => {
	return (
		<Form.Group
			controlId="formFile"
			className="mb-3"
		>
			<Form.Label>Image</Form.Label>
			<Controller
				name="image"
				control={control}
				valu
				render={({ field: { onChange, onBlur, ref } }) => (
					<Form.Control
						type="file"
						onChange={(e) => {
							onChange(e.target.files[0]);
						}}
						onBlur={onBlur}
						ref={ref}
					/>
				)}
			/>
		</Form.Group>
	);
};

export default FileInput;
