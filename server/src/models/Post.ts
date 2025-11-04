import { model, Schema, Document } from "mongoose";

export interface IPost extends Document {
	title: string;
	description: string;
	location: string;
	date: Date;
	type: "lost" | "found";
	ownerId: Schema.Types.ObjectId;
	keywords?: string[];
	createdAt: Date;
}

const postSchema = new Schema<IPost>({
	title: { type: String, required: true },
	description: { type: String, required: true },
	location: { type: String, required: true },
	date: { type: Date, required: true },
	keywords: { type: [String], default: [] },
	type: { type: String, enum: ["lost", "found"], required: true },
	ownerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
	createdAt: { type: Date, default: Date.now },
});

export const Post = model<IPost>("Post", postSchema);
