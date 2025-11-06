// Storage interface for abstracting data persistence
export interface IMessage {
  _id?: string;
  roomId: string;
  senderId?: string;
  senderName: string;
  text: string;
  createdAt: Date;
}

export interface IChatRoom {
  _id?: string;
  itemId?: string;
  createdAt: Date;
}

export interface IStorageService {
  // Message operations
  createMessage(
    roomId: string,
    senderId: string | undefined,
    senderName: string,
    text: string
  ): Promise<IMessage>;
  getMessages(roomId: string, limit?: number): Promise<IMessage[]>;

  // Room operations
  createRoom(itemId?: string): Promise<IChatRoom>;
  getRoomById(roomId: string): Promise<IChatRoom | null>;
  getRoomByItemId(itemId: string): Promise<IChatRoom | null>;
}
