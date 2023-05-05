import React from "react";
import { Button } from "react-bootstrap";

const Card = ({ title, description, image }) => {
	return (
		<Card style={{ width: "18rem" }}>
			<Card.Body>
				<Card.Title>Card Title</Card.Title>
				<Card.Text>Some quick example text to build on</Card.Text>
				<Button variant="primary">Go somewhere</Button>
			</Card.Body>
		</Card>
	);
};

export default Card;
