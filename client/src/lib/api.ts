// API configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const api = {
  baseUrl: API_BASE_URL,

  // Chat room endpoints
  async createRoom(itemId?: string) {
    const response = await fetch(`${API_BASE_URL}/api/chat/rooms`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ itemId }),
    });
    if (!response.ok) {
      throw new Error("Failed to create room");
    }
    return response.json();
  },

  async getRoomByItem(itemId: string) {
    const response = await fetch(
      `${API_BASE_URL}/api/chat/rooms/item/${itemId}`
    );
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error("Failed to get room");
    }
    return response.json();
  },

  // Message endpoints
  async getMessages(roomId: string) {
    const response = await fetch(`${API_BASE_URL}/api/chat/${roomId}/messages`);
    if (!response.ok) {
      throw new Error("Failed to fetch messages");
    }
    return response.json();
  },

  async createMessage(
    roomId: string,
    senderName: string,
    text: string,
    senderId?: string
  ) {
    const response = await fetch(
      `${API_BASE_URL}/api/chat/${roomId}/messages`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ senderName, text, senderId }),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to send message");
    }
    return response.json();
  },
};
