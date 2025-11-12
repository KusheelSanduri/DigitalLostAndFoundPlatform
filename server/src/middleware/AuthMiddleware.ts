import jwt from "jsonwebtoken";
import { envConfig } from "../config/envConfig";
import { AuthError } from "../utils/errors/AuthError";
import { Request, Response, NextFunction } from "express";

export interface AuthRequest extends Request {
	user?: { id: string; email: string; role?: string; isAdmin: boolean };
}

export function requireAuth(
	req: AuthRequest,
	res: Response,
	next: NextFunction
) {
	const authHeader = req.headers.authorization;
	const token = authHeader?.startsWith("Bearer ")
		? authHeader.slice(7)
		: undefined;
	if (!token) return res.status(401).json({ message: "No token" });
	try {
		const payload = jwt.verify(token, envConfig.JWT_SECRET as string) as {
			sub: string;
			email: string;
			role: string;
		};
		req.user = {
			id: payload.sub,
			email: payload.email,
			role: payload.role,
			isAdmin: payload.role.toLowerCase() == "admin",
		};
		next();
	} catch (err: any) {
		if (err.name === "TokenExpiredError") throw AuthError.ExpiredToken(err);
		if (err.name === "JsonWebTokenError") throw AuthError.InvalidToken(err);
		throw AuthError.Unauthorized(err);
	}
}
