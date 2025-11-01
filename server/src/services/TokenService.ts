import crypto from "crypto";
import jwt from "jsonwebtoken";
import { IUser } from "../models/User";

/**
 * TokenService is responsible for creating and signing tokens used in
 * authentication and account verification workflows.
 *
 * This includes:
 * - Random token generation (for reset/verification links)
 * - JWT signing for authenticated sessions
 */
export class TokenService {
	private static readonly JWT_SECRET = process.env.JWT_SECRET!;

	public static generateRandomToken(): string {
		return crypto.randomBytes(32).toString("hex");
	}

	public static signJwt(user: IUser): string {
		return jwt.sign({ sub: user._id, email: user.email }, this.JWT_SECRET, {
			expiresIn: "7d",
		});
	}
}
