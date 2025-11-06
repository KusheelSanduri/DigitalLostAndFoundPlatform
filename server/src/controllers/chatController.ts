import { Request, Response } from "express";
import { getStorageService } from "../services/storageFactory";

export const createMessage = async (req: Request, res: Response) => {
  const { roomId } = req.params;
  const { senderId, senderName, text } = req.body;
  if (!text || !senderName) {
    return res.status(400).json({ error: "Missing senderName or text" });
  }

  try {
    const storage = getStorageService();
    const message = await storage.createMessage(
      roomId,
      senderId,
      senderName,
      text
    );
    return res.status(201).json(message);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};

export const getMessages = async (req: Request, res: Response) => {
  const { roomId } = req.params;
  try {
    const storage = getStorageService();
    const messages = await storage.getMessages(roomId, 100);
    return res.json(messages);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
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

export const getRoomByItem = async (req: Request, res: Response) => {
  const { itemId } = req.params;
  try {
    const storage = getStorageService();
    const room = await storage.getRoomByItemId(itemId);
    if (!room) return res.status(404).json({ error: "Room not found" });
    return res.json(room);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};