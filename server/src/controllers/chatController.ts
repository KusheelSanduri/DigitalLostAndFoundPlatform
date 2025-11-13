import { Request, Response } from "express";
import { ChatRoom } from "../models/ChatRoom";
import { Message } from "../models/Message";
import { AuthRequest } from "../middleware/AuthMiddleware";

export const createMessage = async (req: AuthRequest, res: Response) => {
	try {
		const { roomId } = req.params;
		const { text } = req.body;

		if (!text) {
			return res
				.status(400)
				.json({ success: false, message: "Missing text." });
		}

		let room = await ChatRoom.findOne({ postId: roomId });

		if (!room) {
			room = await ChatRoom.create({ postId: roomId });
		}

		const message = await Message.create({
			roomId: room._id,
			senderId: req.user?.id,
			senderName: req.user?.username,
			text,
		});
		return res.status(201).json({ success: true, message });
	} catch (err) {
		console.error("Error saving message:", err);
		return res
			.status(500)
			.json({ success: false, message: "Server error" });
	}
};

export const getMessages = async (req: AuthRequest, res: Response) => {
	try {
		const { roomId } = req.params; // postId

		const room = await ChatRoom.findOne({ postId: roomId });
		if (!room) {
			return res
				.status(404)
				.json({ success: false, message: "Room not found" });
		}

		const messages = await Message.find({ roomId: room._id })
			.select(["-senderId", "-__v"])
			.sort({ createdAt: 1 })
			.lean();

		return res.json(messages);
	} catch (err) {
		console.error("Error fetching messages:", err);
		return res
			.status(500)
			.json({ success: false, message: "Server error" });
	}
};

export const createRoom = async (req: AuthRequest, res: Response) => {
	const { roomId } = req.body;
	try {
		const room = await ChatRoom.create({ postId: roomId });
		return res.status(201).json(room);
	} catch (err) {
		console.error(err);
		return res.status(500).json({ error: "Server error" });
	}
};

export const getRoomByItem = async (req: Request, res: Response) => {
	try {
		const { itemId } = req.params;
		const room = await ChatRoom.findOne({ postId: itemId });

		if (!room) {
			return res
				.status(404)
				.json({ success: false, message: "Room not found" });
		}

		return res.json({ success: true, room });
	} catch (err) {
		console.error("Error getting room:", err);
		return res
			.status(500)
			.json({ success: false, message: "Server error" });
	}
};
