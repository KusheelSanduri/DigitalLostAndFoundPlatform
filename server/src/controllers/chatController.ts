import { Request, Response } from "express";
import { getStorageService } from "../services/storageFactory";
import { ChatRoom, Message } from "../models";


export const createMessage = async (req:Request, res:Response) => {
  try {
    const { roomId } = req.params; 
    const { senderName, text, senderId } = req.body;

    if (!text || !senderName) {
      return res.status(400).json({ success: false, message: "Missing text or senderName" });
    }

    let room = await ChatRoom.findOne({ itemId: roomId });
    if (!room) {
      room = await ChatRoom.create({ itemId: roomId });
    }

    const message = await Message.create({
      roomId: room._id, 
      senderId,
      senderName,
      text,
    });

    return res.status(201).json({ success: true, message });
  } catch (err) {
    console.error("Error saving message:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getMessages = async (req:Request, res:Response) => {
  try {
    const { roomId } = req.params; // postId

    const room = await ChatRoom.findOne({ itemId: roomId });
    if (!room) {
      return res.status(404).json({ success: false, message: "Room not found" });
    }

    const messages = await Message.find({ roomId: room._id })
      .sort({ createdAt: 1 }) 
      .lean();

    return res.json(messages);
  } catch (err) {
    console.error("Error fetching messages:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const createRoom = async (req: Request, res: Response) => {
  const { itemId } = req.body;
  try {
    const storage = getStorageService();
    const room = await storage.createRoom(itemId);
    return res.status(201).json(room);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};


export const getRoomByItem = async (req:Request, res:Response) => {
  try {
    const { itemId } = req.params;
    const room = await ChatRoom.findOne({ itemId });

    if (!room) {
      return res.status(404).json({ success: false, message: "Room not found" });
    }

    return res.json({ success: true, room });
  } catch (err) {
    console.error("Error getting room:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};