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

    getPosts: (page: number, query?: string) => axiosClient.get(`/api/posts/${page}${query ? `?q=${query}` : ""}`),

    deletePost: (postId: string) => axiosClient.delete(`/api/posts/${postId}`),
};
