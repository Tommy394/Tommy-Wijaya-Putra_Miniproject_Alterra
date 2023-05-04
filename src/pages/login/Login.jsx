import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

import supabase from "../../utils/client";
import { useAuth } from "../../utils/auth";

const Login = () => {
	const navigate = useNavigate();
	const emailRef = useRef(null);
	const passwordRef = useRef(null);

	const { session, user } = useAuth();
	console.log(session);
	console.log(user);

	const handleLogin = async (event) => {
		event.preventDefault();
		const { error } = await supabase.auth.signInWithPassword({
			email: emailRef.current.value,
			password: passwordRef.current.value,
		});

		if (!error) {
			navigate("/");
		}
	};

	return (
		<>
			<Form onSubmit={handleLogin}>
				<Form.Group
					className="mb-3"
					controlId="email"
				>
					<Form.Label>Email address</Form.Label>
					<Form.Control
						type="email"
						placeholder="Enter email"
						ref={emailRef}
					/>
					<Form.Text className="text-muted">
						We&apos;ll never share your email with anyone else.
					</Form.Text>
				</Form.Group>

				<Form.Group
					className="mb-3"
					controlId="password"
				>
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Password"
						autoComplete="current-password"
						ref={passwordRef}
					/>
				</Form.Group>
				<Button
					variant="primary"
					type="submit"
				>
					Submit
				</Button>
			</Form>
			<Button
				variant="primary"
				onClick={() => navigate("/registration")}
			>
				To Register
			</Button>
		</>
	);
};

export default Login;
