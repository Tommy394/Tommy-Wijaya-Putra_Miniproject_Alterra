import supabase from "./client";
import { v4 as uuidv4 } from "uuid";
import { nanoid } from "nanoid";
import { decode } from "base64-arraybuffer";

export const insertQuizzes = async (userId, name, id = null) => {
	const { data: quizData, error: quizDataError } = await supabase
		.from("quizzes")
		.upsert([{ host_id: userId, name, id: id ? id : nanoid(6) }])
		.select()
		.single();

	return { quizData, quizDataError };
};

export const insertQuestions = async (questionArr) => {
	const { data: questions, error: questionsError } = await supabase
		.from("questions")
		.upsert(questionArr)
		.select();

	if (questionsError) {
		console.log(questionsError);
	}

	return { questions, questionsError };
};

export const insertOptions = async (optionsArr) => {
	optionsArr.forEach((option) => {
		if (!option.id) {
			option.id = uuidv4();
		}
	});

	const { data: option, error: optionError } = await supabase
		.from("options")
		.upsert(optionsArr)
		.select();

	if (optionError) {
		console.log(optionError);
	}

	return { option, optionError };
};

export const deleteQuizById = async (quizId) => {
	const { error: deleteError } = await supabase
		.from("quizzes")
		.delete()
		.eq("id", quizId);

	if (deleteError) {
		console.log(deleteError);
	}

	return { deleteError };
};

export const uploadImage = async (base64) => {
	if (!base64) {
		return { image: null, imageError: null };
	}

	const encodedString = base64.replace(
		/^data:image\/(png|jpeg|jpg);base64,/,
		""
	);

	const { data: image, error: imageError } = await supabase.storage
		.from("image")
		.upload(`image/${uuidv4()}.png`, decode(encodedString), {
			contentType: "image/png",
			cacheControl: "3600",
			upsert: true,
		});

	if (imageError) {
		console.log(imageError);
	}

	return { image, imageError };
};

export const selectQuizById = async (quizId) => {
	const { data: quiz, error: quizError } = await supabase
		.from("quizzes")
		.select(
			"name, questions(content, id, image, options(content, is_correct, id))"
		)
		.eq("id", quizId)
		.single();

	if (quizError) {
		console.log(quizError);
	}

	return { quiz, quizError };
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

export const selectQuestionsAndOptionsByQuizId = async (quizId) => {
	const { data: questions, error: questionsError } = await supabase
		.from("questions")
		.select("*, options(*)")
		.eq("quiz_id", quizId);

	if (questionsError) {
		console.log(questionsError);
	}

	return { questions, questionsError };
};

export const downloadImage = async (path) => {
	const { data: image, error: imageError } = await supabase.storage
		.from("image")
		.download(path);

	if (imageError) {
		console.log(imageError);
	}

	return { image, imageError };
};
