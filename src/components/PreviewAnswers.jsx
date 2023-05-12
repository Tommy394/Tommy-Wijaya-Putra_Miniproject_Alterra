import React, { useEffect, useMemo, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useParams } from "react-router-dom";

import {
	previewQuestionsAtom,
	playQuizzesSelector,
	questionsAtom,
} from "../utils/recoil_state";
import QuestionListItem from "./QuestionListItem";
import { renameObjectKey } from "../utils/helpers";
import { downloadImage } from "../utils/database-operation";
import { toBase64 } from "../utils/helpers";
import useForceUpdate from "../hooks/useForceUpdates";

const PreviewAnswers = () => {
	const { id } = useParams();
	const { quiz } = useRecoilValue(playQuizzesSelector(id));
	const [previewQuestion, setPreviewQuestion] =
		useRecoilState(previewQuestionsAtom);

	// console.log(quiz);

	// let questions = [...quiz.questions];

	// useEffect(() => {
	// 	const getImages = async () => {
	// 		// let question = [];
	// 		for (let question of quiz.questions) {
	// 			if (question.image) {
	// 				const { image } = await downloadImage(question.image);
	// 				const base64 = await toBase64(image);
	// 				question = { ...question, image: base64 };
	// 			}
	// 		}
	// 		setPreviewQuestion(quiz.questions);
	// 	};
	// 	getImages();
	// }, [quiz.questions, setPreviewQuestion]);

	// console.log(previewQuestion);

	return (
		<div>
			<ul>
				{quiz.questions.map((question, index) => {
					return (
						<QuestionListItem
							key={question.id}
							quiz={question}
							index={index}
							previewAnswers={true}
							className="bg-primary"
						/>
					);
				})}
			</ul>
		</div>
	);
};

export default PreviewAnswers;
