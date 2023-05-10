import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { useForm, Controller } from "react-hook-form";
import ToggleButton from "react-bootstrap/ToggleButton";
import { useRecoilValue, useSetRecoilState } from "recoil";

import {
	currentQuestionAtom,
	quizScoreAtom,
	showResultSelector,
} from "../utils/recoil_state";
import { downloadImage } from "../utils/database-operation";
import { toBase64 } from "../utils/helpers";

const Question = ({ question, handleShowModal, questionLength }) => {
	const setCurrentQuestion = useSetRecoilState(currentQuestionAtom);
	const showResult = useRecoilValue(showResultSelector(questionLength));
	const [imageBase64, setImageBase64] = useState(null);
	const setScore = useSetRecoilState(quizScoreAtom);
	const options = question.options;

	const { control, getValues, watch } = useForm({
		defaultValues: { options },
	});

	const handleOptionIsCorrect = () => {
		const targetOptionId = getValues("options.target");

		const targetOption = options.find((option) => {
			return option.id === targetOptionId;
		});

		if (targetOption.is_correct === true) {
			setScore((prev) => prev + 1);
		}
	};

	const handleNextQuestion = () => {
		handleOptionIsCorrect();

		if (showResult) {
			handleShowModal();
		} else {
			setCurrentQuestion((prev) => prev + 1);
		}
	};

	useEffect(() => {
		const getImage = async () => {
			if (question.image) {
				const { image } = await downloadImage(question.image);
				setImageBase64(await toBase64(image));
			}
		};
		getImage();
	}, [question]);

	return (
		<Card
			border="light"
			style={{ width: "40rem" }}
		>
			<Card.Header className="p-3">
				{question.image && (
					<img
						src={imageBase64}
						alt=""
						style={{ width: "80px" }}
					/>
				)}
				<h5>{question.content}</h5>
			</Card.Header>
			<Card.Body>
				<Row>
					<ButtonGroup className="row">
						{options.map((option, idx) => (
							<Controller
								control={control}
								name={`options.target`}
								key={option.id}
								render={({ field: { onChange, value } }) => (
									<ToggleButton
										type="radio"
										variant="outline-success"
										id={`radio-${idx}`}
										value={option.id}
										checked={value === option.id}
										onChange={(e) => onChange(e.target.value)}
										className="col-6 mr-2 mb-2"
									>
										{option.content}
									</ToggleButton>
								)}
							/>
						))}
					</ButtonGroup>
				</Row>
				<Button
					onClick={handleNextQuestion}
					disabled={watch("options.target") ? false : true}
				>
					Next
				</Button>
			</Card.Body>
		</Card>
	);
};

export default Question;
