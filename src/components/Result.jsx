import React from "react";
import { useRecoilValue } from "recoil";
import { Suspense } from "react";

import { answersAtom, showResultSelector } from "../utils/recoil_state";
import PreviewAnswers from "./PreviewAnswers";
import Loading from "./Loading";
import Confetti from "./Confetti";

const Result = ({ quizLength }) => {
	const answer = useRecoilValue(answersAtom);
	const showResult = useRecoilValue(showResultSelector(quizLength));

	const numOfCorrectAnswers = answer.filter((ans) => ans.is_correct).length;
	const score = Math.trunc((numOfCorrectAnswers / quizLength) * 100);

	return (
		<div className="mt-5">
			{showResult ? (
				<>
					<h1 className="text-center">Congratulations!!!</h1>
					<h5 className="text-muted text-center">You have finished the Quiz</h5>
				</>
			) : (
				<h1 className="text-center">Time&apos;s Up</h1>
			)}
			<p className="text-center mt-5">Your score is</p>
			<p className="text-center fs-1 mb-3">{score}%</p>
			<button
				className="btn btn-primary mb-3 d-block mx-auto"
				type="button"
				data-bs-toggle="collapse"
				data-bs-target="#collapseExample"
				aria-expanded="false"
				aria-controls="collapseExample"
			>
				Preview Answers
			</button>
			<div
				className="collapse"
				id="collapseExample"
			>
				<div className="card card-body">
					<Suspense fallback={<Loading />}>
						<PreviewAnswers />
					</Suspense>
				</div>
			</div>
			{score >= 70 && <Confetti />}
		</div>
	);
};

export default Result;
