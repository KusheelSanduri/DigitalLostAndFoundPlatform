import React, { useEffect, useState } from "react";
import { type User } from "../auth/Auth";
import { AuthContext, type AuthContextType } from "./AuthContext";
import axiosClient from "../api/axiosClient";
import { authApi } from "../api/authApi";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const [token, setToken] = useState<string | null>(
		localStorage.getItem("token")
	);
	const [loading, setLoading] = useState<boolean>(true);

	// Attach/Detach token to axios instance when the token changes/deleted
	useEffect(() => {
		if (token) {
			axiosClient.defaults.headers.common[
				"Authorization"
			] = `Bearer ${token}`;
			localStorage.setItem("token", token);
		} else {
			delete axiosClient.defaults.headers.common["Authorization"];
			localStorage.removeItem("token");
		}
	}, [token]);

	// Fetch user info from /api/me endpoint here
	useEffect(() => {
		async function fetchUser() {
			try {
				if (token) {
					const res = await axiosClient.get("/api/me");
					setUser(res.data);
				}
			} catch {
				setToken(null);
			} finally {
				setLoading(false);
			}
		}
		fetchUser();
	}, [token]);

	const login = async (email: string, password: string) => {
		const res = await authApi.login(email, password);
		setToken(res.data.token);
		setUser(res.data.user);
	};

	const register = async (name: string, email: string, password: string) => {
		await authApi.register(name, email, password);
	};

	const logout = () => {
		setToken(null);
		setUser(null);
	};

	const refreshUser = async () => {
		if (!token) return;
		try {
			const res = await axiosClient.get("/api/me");
			setUser(res.data);
		} catch {
			logout();
		}
	};

	const value: AuthContextType = {
		user,
		token,
		loading,
		login,
		register,
		logout,
		refreshUser,
	};

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
};
