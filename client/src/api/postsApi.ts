import axiosClient from "./axiosClient";

export const postsApi = {
	create: (
		title: string,
		description: string,
		location: string,
		category: string,
		date: Date,
		type: string,
		keywords: string,
		image: File | null
	) => {
		const formData = new FormData();
		formData.append("title", title);
		formData.append("description", description);
		formData.append("location", location);
		formData.append("category", category);
		formData.append("date", date.toISOString());
		formData.append("type", type);
		formData.append("keywords", keywords);

		if (image) formData.append("image", image);

		return axiosClient.post("/api/posts", formData, {headers: {"Content-Type": "multipart/form-data"}});
	},

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
	markClaimedPost: (postId: string) => axiosClient.patch(`/api/posts/claimed/${postId}`),

	getCategories: () => axiosClient.get("/api/posts/categories"),

	getLocations: () => axiosClient.get("/api/posts/locations"),
};
