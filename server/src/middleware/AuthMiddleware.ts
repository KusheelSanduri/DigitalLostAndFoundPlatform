// src/middleware/AuthMiddleware.ts
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET, JWTPayload } from "../services/AuthService";

export const authMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
): void => {

	if (req.path.startsWith("/auth") || req.path.startsWith("/public")) {
		return next();
	}

	const authHeader = req.headers.authorization;
	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		res.status(401).json({
			message: "Missing or Invalid Auth Token",
		});
		return;
	}

	const token = authHeader.split(" ")[1];

	try {
		const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
		(req as any).user = decoded;
		next();
	} catch {
		res.status(401).json({ message: "Invalid or expired token" });
	}
};
