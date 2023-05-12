import React from "react";
import ModalBs from "react-bootstrap/Modal";

const Modal = ({
	show = true,
	handleClose = null,
	title,
	closeButton = true,
	modalFooter,
	...props
}) => {
	return (
		<ModalBs
			show={show}
			onHide={handleClose}
			{...props}
		>
			<ModalBs.Header closeButton={closeButton}>
				<ModalBs.Title>{title}</ModalBs.Title>
			</ModalBs.Header>
			<ModalBs.Body>
				{/* <InputForm
					quiz={quiz}
					index={index}
					handleClose={handleClose}
				/> */}
				{props.children}
				{modalFooter && <ModalBs.Footer>{modalFooter}</ModalBs.Footer>}
			</ModalBs.Body>
		</ModalBs>
	);
};

export default Modal;
