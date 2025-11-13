import mongoose, { Schema, Document } from "mongoose";

export interface IMessage extends Document {
	roomId: string;
	senderId: string;
	senderName: string;
	text: string;
	createdAt: Date;
}

const messageSchema: Schema<IMessage> = new Schema(
	{
		roomId: { type: String, required: true, index: true },
		senderId: { type: String },
		senderName: { type: String, required: true },
		text: { type: String, required: true },
	},
	{ timestamps: { createdAt: "createdAt" } }
);

export const Message = mongoose.model<IMessage>("Message", messageSchema);
