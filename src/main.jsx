import React from "react";
import ReactDOM from "react-dom/client";
import {
	createBrowserRouter,
	RouterProvider,
	redirect,
} from "react-router-dom";
import { RecoilRoot } from "recoil";
import { Suspense } from "react";

import Login from "./pages/login/Login";
import Registration from "./pages/registration/Registration";
import Main from "./pages/main/Main";
import InputForm from "./components/InputForm";
import QuestionList from "./components/QuestionList";
import Quiz from "./components/Quiz";
import Loading from "./components/Loading";
import Layout from "./Layout";
import { AuthProvider } from "./utils/auth";
import supabase from "./utils/client";
import "./css/main.css";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				element: <Main />,
				index: true,
				loader: async () => {
					const {
						data: { session },
					} = await supabase.auth.getSession();
					if (!session) {
						return redirect("/login");
					}
					return null;
				},
			},
			{
				path: "quiz-form/",
				element: <InputForm />,
			},
			{
				path: "quiz-form/:id",
				element: <InputForm />,
			},
			{
				path: "/question-list",
				element: <QuestionList />,
			},
			{
				path: "/question-list/:id",
				element: <QuestionList />,
			},
			{
				path: "/play-quiz/:id",
				element: (
					<Suspense fallback={<Loading />}>
						<Quiz />
					</Suspense>
				),
			},
		],
	},
	{
		path: "/login",
		element: <Login />,
		loader: async () => {
			const {
				data: { session },
			} = await supabase.auth.getSession();
			if (session) {
				return redirect("/");
			}
			return null;
		},
	},
	{
		path: "/registration",
		element: <Registration />,
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RecoilRoot>
			<AuthProvider supabase={supabase}>
				<RouterProvider router={router} />
			</AuthProvider>
		</RecoilRoot>
	</React.StrictMode>
);
