import { IStorageService, IMessage, IChatRoom } from "./storage.interface";

/**
 * In-memory storage implementation
 * Data is stored in memory and will be lost when server restarts
 */
export class MemoryStorageService implements IStorageService {
  private messages: Map<string, IMessage[]> = new Map(); // roomId -> messages[]
  private rooms: Map<string, IChatRoom> = new Map(); // roomId -> room
  private itemToRoom: Map<string, string> = new Map(); // itemId -> roomId

  async createMessage(
    roomId: string,
    senderId: string | undefined,
    senderName: string,
    text: string
  ): Promise<IMessage> {
    // Ensure room exists
    await this.ensureRoomExists(roomId);

    const message: IMessage = {
      _id: this.generateId(),
      roomId,
      senderId,
      senderName,
      text,
      createdAt: new Date(),
    };

    if (!this.messages.has(roomId)) {
      this.messages.set(roomId, []);
    }
    this.messages.get(roomId)!.push(message);

    return message;
  }

  async getMessages(roomId: string, limit: number = 100): Promise<IMessage[]> {
    const messages = this.messages.get(roomId) || [];
    // Sort by createdAt and limit
    return messages
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
      .slice(0, limit);
  }

  async createRoom(itemId?: string): Promise<IChatRoom> {
    const roomId = this.generateId();
    const room: IChatRoom = {
      _id: roomId,
      itemId,
      createdAt: new Date(),
    };

    this.rooms.set(roomId, room);

    if (itemId) {
      this.itemToRoom.set(itemId, roomId);
    }

    return room;
  }

  async getRoomById(roomId: string): Promise<IChatRoom | null> {
    return this.rooms.get(roomId) || null;
  }

  async getRoomByItemId(itemId: string): Promise<IChatRoom | null> {
    const roomId = this.itemToRoom.get(itemId);
    if (!roomId) {
      return null;
    }
    return this.rooms.get(roomId) || null;
  }

  private async ensureRoomExists(roomId: string): Promise<void> {
    if (!this.rooms.has(roomId)) {
      const room: IChatRoom = {
        _id: roomId,
        createdAt: new Date(),
      };
      this.rooms.set(roomId, room);
    }
  }

  private generateId(): string {
    // Generate a simple ID (you could use uuid if preferred)
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}
