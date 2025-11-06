import mongoose, { Schema, Document, Model } from "mongoose";

export interface IMessage extends Document {
  roomId: string;
  senderId?: string;
  senderName: string;
  text: string;
  createdAt: Date;
}

const MessageSchema: Schema<IMessage> = new Schema(
  {
    roomId: { type: String, required: true, index: true },
    senderId: { type: String },
    senderName: { type: String, required: true },
    text: { type: String, required: true },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: false } }
);

export const Message: Model<IMessage> = mongoose.model<IMessage>(
  "Message",
  MessageSchema
);

export interface IChatRoom extends Document {
  itemId?: string; // optional tie to an item
  createdAt: Date;
}

const ChatRoomSchema: Schema<IChatRoom> = new Schema(
  {
    itemId: { type: String, required: false, index: true },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: false } }
);

export const ChatRoom: Model<IChatRoom> = mongoose.model<IChatRoom>(
  "ChatRoom",
  ChatRoomSchema
);
