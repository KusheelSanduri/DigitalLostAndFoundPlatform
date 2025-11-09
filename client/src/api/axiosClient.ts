import axios from "axios";

const axiosClient = axios.create({
	baseURL: import.meta.env.BACKEND_API_URL || "http://localhost:5000",
	withCredentials: true,
});

axiosClient.interceptors.request.use((config) => {
	const token = localStorage.getItem("token");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

axiosClient.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.status === 401) {
			console.warn("Unauthorized — redirecting to login...");
			localStorage.removeItem("token");
		}
		return Promise.reject(error);
	}
);

export default axiosClient;
