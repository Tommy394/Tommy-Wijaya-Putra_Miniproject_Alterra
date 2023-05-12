import { atom, selector, selectorFamily } from "recoil";
import { selectQuizById, selectQuizzesByUserId } from "./database-operation";

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
			const { quizzes, quizzesError } = await selectQuizzesByUserId(userId);

			return { quizzes, quizzesError };
		},
});

export const playQuizzesSelector = selectorFamily({
	key: "playQuizzes",
	get:
		(quizId) =>
		async ({ get }) => {
			if (!quizId) {
				return { quiz: null, quizError: null };
			}
			get(quizzesRequestIdAtom);
			const { quiz, quizError } = await selectQuizById(quizId);

			return { quiz, quizError };
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

export const currentQuestionAtom = atom({
	key: "currentQuestion",
	default: 0,
});

export const showResultSelector = selectorFamily({
	key: "showResult",
	get:
		(questionLength) =>
		async ({ get }) => {
			const currentQuestion = get(currentQuestionAtom);

			return currentQuestion >= questionLength - 1;
		},
});

export const isQuizStartedAtom = atom({
	key: "isQuizStarted",
	default: false,
});

export const answersAtom = atom({
	key: "answers",
	default: [],
});

export const previewQuestionsAtom = atom({
	key: "previewQuestions",
	default: [],
});
