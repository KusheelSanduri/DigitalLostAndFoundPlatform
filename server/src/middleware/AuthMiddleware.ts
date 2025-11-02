import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { envConfig } from "../config/envConfig";

export interface AuthRequest extends Request {
	user?: { id: string; email: string };
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
		};
		req.user = { id: payload.sub, email: payload.email };
		next();
	} catch {
		return res.status(401).json({ message: "Invalid or expired token" });
	}
}
