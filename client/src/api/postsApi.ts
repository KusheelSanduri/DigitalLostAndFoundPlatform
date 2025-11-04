import axiosClient from "./axiosClient";

export const postsApi = {
	create: (
		tile: string,
		description: string,
		location: string,
		date: Date,
		type: string,
		keywords: string[]
	) =>
		axiosClient.post("/api/posts", {
			tile,
			description,
			location,
			date,
			type,
			keywords,
		}),

	getPosts: (page: number, sq?: string, cat?: string, loc?: string) => {
		let endpointURL = `/api/posts/${page}`;
		const isFilterPresent = sq || cat || loc;
		if (isFilterPresent) {
			endpointURL += "?";
		}

		if (sq) {
			endpointURL += `search=${sq}&`;
		}

		if (cat) {
			endpointURL += `category=${cat}&`;
		}

		if (loc) {
			endpointURL += `location=${loc}&`;
		}
		return axiosClient.get(`${endpointURL}`);
	},

	deletePost: (postId: string) => axiosClient.delete(`/api/posts/${postId}`),

	getCategories: () => axiosClient.get("/api/posts/categories"),

	getLocations: () => axiosClient.get("/api/posts/locations"),
};
