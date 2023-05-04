import React from "react";
import ReactDOM from "react-dom/client";
import {
	createBrowserRouter,
	RouterProvider,
	redirect,
} from "react-router-dom";

import Login from "./pages/login/Login";
import Registration from "./pages/registration/Registration";
import Main from "./pages/main/Main";
import { AuthProvider } from "./utils/auth";
import supabase from "./utils/client";

const router = createBrowserRouter([
	// {
	// 	path: "/",
	// 	element: <PrivateRoute />,
	// 	children: [{ element: <Main />, index: true }],
	// },
	{
		path: "/",
		element: <Main />,
		loader: async () => {
			const {
				data: { session },
			} = await supabase.auth.getSession();
			if (!session) {
				return redirect("login");
			}
			return null;
		},
	},
	{
		path: "login",
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
		path: "registration",
		element: <Registration />,
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<AuthProvider supabase={supabase}>
			<RouterProvider router={router} />
		</AuthProvider>
	</React.StrictMode>
);
