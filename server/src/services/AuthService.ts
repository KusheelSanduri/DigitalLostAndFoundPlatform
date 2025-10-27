import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { IUser, User } from "../models/User";
import { Schema } from "mongoose";

export const JWT_SECRET = "lost&found-secret-key";

type UserRegisterData = Omit<IUser, "createdAt" | "updatedAt" | "isVerified">;

export type JWTPayload = {
	id: Schema.Types.ObjectId;
	email: string;
	role: string;
};

export class AuthService {
	static async registerUser(data: UserRegisterData) {
		try {
			const { name, email, password, role } = data;
			const existingUser = await User.findOne({ email });

			if (existingUser) {
				throw new Error("User already exists");
			}

			if (!/@nitc\.ac\.in$/.test(email)) {
				throw new Error("Registration restricted to NITC email");
			}
				
			const hashedPassword = await bcrypt.hash(password, 10);

			const newUser = await User.create({
				name,
				email,
				password: hashedPassword,
				role: role || "user",
				isVerified: false,
			});

			const payload: JWTPayload = {
				id: newUser._id,
				email: newUser.email,
				role: newUser.role,
			};

			const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });

			return { user: newUser, token };
		} catch (error: any) {
			throw new Error(error.message);
		}
	}

	static async loginUser(email: string, password: string) {
		try {

			const user = await User.findOne({ email });
			
			if (!user) {
				throw new Error("Invalid credentials");
			}

			const isValid = await bcrypt.compare(password, user.password);

			if (!isValid) {
				throw new Error("Invalid credentials");
			}

			const payload: JWTPayload = {
				id: user._id,
				email: user.email,
				role: user.role,
			};
			
			const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
			return { token, user };
		} catch (error: any) {
			throw new Error(error.message);
		}
	}
}
