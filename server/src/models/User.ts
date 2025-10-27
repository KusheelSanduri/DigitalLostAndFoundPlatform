import mongoose, { model } from "mongoose";

export interface IUser extends Document {
	name: string;
	email: string;
	password: string;
	isVerified: boolean;
	role: string;
	createdAt: Date;
	updatedAt: Date;
}

const UserSchema = new mongoose.Schema<IUser>(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			match: /@nitc\.ac\.in$/,
		},
		password: { 
            type: String, 
            required: true 
        },
		isVerified: { 
            type: Boolean, 
            default: false 
        },
		role: { 
            type: String, 
            default: "USER" 
        },
	},
	{
		timestamps: true,
	}
);

export const User = mongoose.models.User || model<IUser>("User", UserSchema);
