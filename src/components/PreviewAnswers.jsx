import React from "react";
import { useRecoilValue } from "recoil";
import { useParams } from "react-router-dom";

import { playQuizzesSelector } from "../utils/recoil_state";
import QuestionListItem from "./QuestionListItem";

const PreviewAnswers = () => {
	const { id } = useParams();
	const { quiz } = useRecoilValue(playQuizzesSelector(id));

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
