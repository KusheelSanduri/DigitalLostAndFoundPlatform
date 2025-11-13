import axiosClient from "./axiosClient";

export const disputeApi = {
	createDispute: (postId: string, reason: string, description: string) =>
		axiosClient.post("/api/disputes", {postId, reason, description}),
	getAll: () => axiosClient.get("/api/disputes"),
	updateStatus: (id: string, status: "pending" | "resolved") =>
		axiosClient.patch(`/api/disputes/${id}/status`, {status}),
};
