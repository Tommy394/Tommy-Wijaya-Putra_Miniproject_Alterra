import React from "react";
import { createContext, useEffect, useMemo, useState, useContext } from "react";
import { EVENTS, VIEWS } from "../constants";

const AuthContext = createContext();

export const AuthProvider = ({ children, supabase, ...props }) => {
	const [user, setUser] = useState(null);
	const [session, setSession] = useState(null);
	const [view, setView] = useState(null);

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
			setUser(session?.user ?? null);
		});

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((event, currentSession) => {
			setSession(currentSession);
			setUser(currentSession?.user ?? null);

			switch (event) {
				case EVENTS.SIGNED_OUT:
				case EVENTS.USER_UPDATED:
					setView(VIEWS.SIGN_IN);
					break;
				default:
			}
		});

		return () => {
			subscription?.unsubscribe();
		};
	}, []);

	const value = useMemo(() => {
		return {
			session,
			user,
			view,
			logOut: () => supabase.auth.signOut(),
		};
	}, [session, user, view, supabase]);

	return (
		<AuthContext.Provider
			value={value}
			{...props}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
