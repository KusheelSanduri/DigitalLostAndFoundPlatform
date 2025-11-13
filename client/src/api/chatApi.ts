import axiosClient from "./axiosClient";

export const chatApi = {
	createMessage: (roomId: string, text: string) => axiosClient.post(`/api/chat/${roomId}/messages`, {text}),
	getMessages: (roomId: string) => axiosClient.get(`/api/chat/${roomId}/messages?ts=${Date.now()}`),
	createRoom: (roomId: string) => axiosClient.post("/api/chat/rooms", {roomId}),
};
