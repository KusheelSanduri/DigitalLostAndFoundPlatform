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
	private readonly jwtSecret: string;

	constructor(jwtSecret: string) {
		if (!jwtSecret) {
			throw new Error("JWT secret key must be provided.");
		}
		this.jwtSecret = jwtSecret;
	}

	public generateRandomToken(): string {
		return crypto.randomBytes(32).toString("hex");
	}

	public signJwt(user: IUser): string {
		return jwt.sign({ sub: user._id, email: user.email }, this.jwtSecret, {
			expiresIn: "7d",
		});
	}
}
