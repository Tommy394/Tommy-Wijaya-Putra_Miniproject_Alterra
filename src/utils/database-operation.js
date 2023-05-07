import supabase from "./client";
import { v4 as uuidv4 } from "uuid";
import { nanoid } from "nanoid";

export const insertQuizzes = async (userId, name) => {
	const { data: quizData, error: quizDataError } = await supabase
		.from("quizzes")
		.insert([{ host_id: userId, name, id: nanoid(6) }])
		.select()
		.single();

	return { quizData, quizDataError };
};

export const insertQuestions = async (questionArr) => {
	const { data: questions, error: questionsError } = await supabase
		.from("questions")
		.insert(questionArr)
		.select();

	if (questionsError) {
		console.log(questionsError);
	}

	return { questions, questionsError };
};

export const insertOptions = async (optionsArr) => {
	const { data: option, error: optionError } = await supabase
		.from("options")
		.insert(optionsArr)
		.select();

	if (optionError) {
		console.log(optionError);
	}

	return { option, optionError };
};

export const uploadImage = async (base64) => {
	if (!base64) {
		return { image: null, imageError: null };
	}

	const { data: image, error: imageError } = await supabase.storage
		.from("image")
		.upload(`image/${uuidv4()}`, base64, {
			cacheControl: "3600",
			upsert: true,
		});

	if (imageError) {
		console.log(imageError);
	}

	return { image, imageError };
};

export const selectQuizzesByUserId = async (userId) => {
	const { data: quizzes, error: quizzesError } = await supabase
		.from("quizzes")
		.select("name, id")
		.eq("host_id", userId);

	if (quizzesError) {
		console.log(quizzesError);
	}

	return { quizzes, quizzesError };
};
