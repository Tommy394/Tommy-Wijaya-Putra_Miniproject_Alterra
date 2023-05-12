import { uploadImage } from "./database-operation";
import { MINUTE_IN_MILLISECONDS, SECOND_IN_MILLISECONDS } from "../constants";

export const toBase64 = (file) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});

export const renameObjectKey = (o, oldKey, newKey) => {
	if (oldKey !== newKey) {
		Object.defineProperty(
			o,
			newKey,
			Object.getOwnPropertyDescriptor(o, oldKey)
		);
		delete o[oldKey];
	}
};

export const generateQuestionArray = async (quizId, questionsState) => {
	const questionArr = await Promise.all(
		questionsState.map(async (quiz) => {
			const { image } = await uploadImage(quiz.image);

			return {
				id: quiz.id,
				content: quiz.question,
				image: image?.path,
				quiz_id: quizId,
			};
		})
	);

	return questionArr;
};

export const generateOptionsArray = (questions, questionsState) => {
	let optionsArr = [];

	questionsState.forEach((question, index) => {
		optionsArr.push(
			question.options.map((option) => {
				return {
					...option,
					id: option.id ? option.id : null,
					question_id: questions[index].id,
				};
			})
		);
	});

	return optionsArr.flat();
};

export const convertMinutesAndSecondsToMilliseconds = (minutes, seconds) => {
	return minutes * MINUTE_IN_MILLISECONDS + seconds * SECOND_IN_MILLISECONDS;
};

export const convertMillisecondsToMinutesAndSeconds = (milliseconds) => {
	const minutes = Math.floor(milliseconds / MINUTE_IN_MILLISECONDS);
	const seconds = Math.floor(
		(milliseconds - minutes * MINUTE_IN_MILLISECONDS) / SECOND_IN_MILLISECONDS
	);

	return { minutes, seconds };
};
