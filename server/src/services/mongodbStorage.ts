import {
  Message as MongooseMessage,
  ChatRoom as MongooseChatRoom,
} from "../models/Chat";
import { IChatRoom, IMessage, IStorageService } from "./storage.interface";

/**
 * MongoDB storage implementation
 * Uses Mongoose models for persistence
 */
export class MongoDBStorageService implements IStorageService {
  async createMessage(
    roomId: string,
    senderId: string | undefined,
    senderName: string,
    text: string
  ): Promise<IMessage> {
    // Ensure room exists
    let room = await MongooseChatRoom.findById(roomId);
    if (!room) {
      try {
        room = await MongooseChatRoom.create({ _id: roomId });
      } catch (e) {
        // If creating with provided id fails, create a new room
        room = await MongooseChatRoom.create({});
      }
    }

    const resolvedRoomId = room && room._id ? String(room._id) : String(roomId);
    const mongooseMessage = await MongooseMessage.create({
      roomId: resolvedRoomId,
      senderId,
      senderName,
      text,
    });

    return this.mongooseMessageToInterface(
      mongooseMessage.toObject ? mongooseMessage.toObject() : mongooseMessage
    );
  }

  async getMessages(roomId: string, limit: number = 100): Promise<IMessage[]> {
    const messages = await MongooseMessage.find({ roomId })
      .sort({ createdAt: 1 })
      .limit(limit)
      .lean();

    return messages.map((msg) => this.mongooseMessageToInterface(msg));
  }

  async createRoom(itemId?: string): Promise<IChatRoom> {
    const room = await MongooseChatRoom.create({ itemId });
    return this.mongooseRoomToInterface(room.toObject ? room.toObject() : room);
  }

  async getRoomById(roomId: string): Promise<IChatRoom | null> {
    const room = await MongooseChatRoom.findById(roomId).lean();
    return room ? this.mongooseRoomToInterface(room) : null;
  }

  async getRoomByItemId(itemId: string): Promise<IChatRoom | null> {
    const room = await MongooseChatRoom.findOne({ itemId }).lean();
    return room ? this.mongooseRoomToInterface(room) : null;
  }

  private mongooseMessageToInterface(msg: any): IMessage {
    return {
      _id: String(msg._id || msg.id),
      roomId: msg.roomId,
      senderId: msg.senderId,
      senderName: msg.senderName,
      text: msg.text,
      createdAt: msg.createdAt || new Date(),
    };
  }

  private mongooseRoomToInterface(room: any): IChatRoom {
    return {
      _id: String(room._id || room.id),
      itemId: room.itemId,
      createdAt: room.createdAt || new Date(),
    };
  }
}
