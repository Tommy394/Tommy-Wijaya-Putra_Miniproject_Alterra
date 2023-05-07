import { atom, selectorFamily } from "recoil";
import { selectQuizzesByUserId } from "./database-operation";

const localStorageEffect =
	(key) =>
	({ setSelf, onSet }) => {
		const savedValue = localStorage.getItem(key);
		if (savedValue != null) {
			setSelf(JSON.parse(savedValue));
		}

		onSet((newValue, _, isReset) => {
			isReset
				? localStorage.removeItem(key)
				: localStorage.setItem(key, JSON.stringify(newValue));
		});
	};

export const questionsAtom = atom({
	key: "questions",
	default: [],
	effects: [localStorageEffect("Questions")],
});

export const quizzesRequestIdAtom = atom({
	key: "quizzesRequestId",
	default: 0,
});

export const quizzesSelector = selectorFamily({
	key: "quizzes",
	get:
		(userId) =>
		async ({ get }) => {
			get(quizzesRequestIdAtom);
			if (!userId) {
				return { quizzes: null, quizzesError: null };
			}
			console.log(userId);
			const { quizzes, quizzesError } = await selectQuizzesByUserId(userId);

			return { quizzes, quizzesError };
		},
});

export const isEditingQuestionAtom = atom({
	key: "isEditingQuestion",
	default: false,
});

export const isEditingQuizAtom = atom({
	key: "isEditingQuiz",
	default: false,
});
