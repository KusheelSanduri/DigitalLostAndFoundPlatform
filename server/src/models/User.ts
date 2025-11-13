import { model, Schema, Document } from "mongoose";

export interface IUser extends Document {
	name: string;
	email: string;
	passwordHash: string;
	isVerified: boolean;
	role: string;
	username: string;
	verifyTokenHash?: string;
	verifyTokenExpires?: Date;
	resetTokenHash?: string;
	resetTokenExpires?: Date;
	createdAt: Date;
}

const userSchema = new Schema<IUser>({
	name: { type: String, required: true },
	username: { type: String, required: true },
	email: { type: String, required: true, unique: true, lowercase: true },
	passwordHash: { type: String, required: true },
	isVerified: { type: Boolean, default: false },
	role: { type: String, enum: ["user", "admin"], default: "user" },
	verifyTokenHash: String,
	verifyTokenExpires: Date,
	resetTokenHash: String,
	resetTokenExpires: Date,
	createdAt: { type: Date, default: Date.now },
});

export const User = model<IUser>("User", userSchema);
