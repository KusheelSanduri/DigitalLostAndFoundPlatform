import mongoose, { Schema } from "mongoose";

export interface IChatRoom extends Document {
	postId: string;
	createdAt: Date;
}

const ChatRoomSchema: Schema<IChatRoom> = new Schema(
	{
		postId: { type: String, required: true, index: true },
	},
	{ timestamps: { createdAt: "createdAt" } }
);

export const ChatRoom = mongoose.model("ChatRoom", ChatRoomSchema);
