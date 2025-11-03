import axiosClient from "./axiosClient";

export const authApi = {
	register: (name: string, email: string, password: string) =>
		axiosClient.post("/api/auth/register", { name, email, password }),

	login: (email: string, password: string) =>
		axiosClient.post("/api/auth/login", { email, password }),

	verifyEmail: (email: string, token: string) =>
		axiosClient.get(`/api/auth/verify`, { params: { email, token } }),

	forgotPassword: (email: string) =>
		axiosClient.post("/api/auth/forgot", { email }),

	resetPassword: (email: string, token: string, newPassword: string) =>
		axiosClient.post("/api/auth/reset", { email, token, newPassword }),

	resendVerificationLink: (email: string) =>
		axiosClient.post("/api/auth/reverify", { email }),
};
