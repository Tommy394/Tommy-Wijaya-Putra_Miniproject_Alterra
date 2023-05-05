import supabase from "./client";

export const insertQuizzes = async (userId) => {
	const { data: quizzes, error: quizzesError } = await supabase
		.from("quizzes")
		.insert([{ host_id: userId }])
		.select()
		.single();

	return { quizzes, quizzesError };
};

export const insertQuestions = async (quizId, content, imagePath) => {
	const { data: questions, error: questionsError } = await supabase
		.from("questions")
		.insert([{ content, quiz_id: quizId, image: imagePath }])
		.select();

	return { questions, questionsError };
};

export const insertOptions = async (questionId, arr) => {
	const options = arr.map((element) => {
		return { ...element, question_id: questionId };
	});

	console.log(options);

	const { data: option, error: optionError } = await supabase
		.from("options")
		.insert(options)
		.select();

	return { option, optionError };
};

export const uploadImage = async (file) => {
	const { data: image, error: imageError } = await supabase.storage
		.from("image")
		.upload(`image/${file.name}`, file, {
			cacheControl: "3600",
			upsert: true,
		});

	if (imageError) {
		console.log(imageError);
	}

	return { image, imageError };
};
