import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import supabase from "../../utils/client";

const Registration = () => {
	const { register, handleSubmit } = useForm();
	const navigate = useNavigate();

	useEffect(() => {
		async function test() {
			console.log(await supabase.auth.getSession());
		}
		test();
	});

	const registration = async (email, password) => {
		const { data } = await supabase.auth.signUp({
			email,
			password,
		});
		console.log(data.acces);
	};

	const onSubmit = async (data) => {
		await registration(data.email, data.password);
		navigate("/");
	};

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			{console.log("render")}
			<Form.Group
				className="mb-3"
				controlId="emailRegistration"
			>
				<Form.Label>Email address</Form.Label>
				<Form.Control
					type="email"
					placeholder="Enter email"
					{...register("email")}
				/>
				<Form.Text className="text-muted">
					We&apos;ll never share your email with anyone else.
				</Form.Text>
			</Form.Group>

			<Form.Group
				className="mb-3"
				controlId="passwordRegistration"
			>
				<Form.Label>Password</Form.Label>
				<Form.Control
					type="password"
					placeholder="Password"
					autoComplete="new-password"
					{...register("password")}
				/>
			</Form.Group>
			<Button
				variant="primary"
				type="submit"
			>
				Submit
			</Button>
		</Form>
	);
};

export default Registration;
