import React from "react";
import Modal from "react-bootstrap/Modal";

import InputForm from "./InputForm";

const ModalInputForm = ({ show, handleClose, quiz, index }) => {
	return (
		<Modal
			show={show}
			onHide={handleClose}
			fullscreen={true}
		>
			<Modal.Header closeButton>
				<Modal.Title>Quiz Form</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<InputForm
					quiz={quiz}
					index={index}
					handleClose={handleClose}
				/>
			</Modal.Body>
		</Modal>
	);
};

export default ModalInputForm;
