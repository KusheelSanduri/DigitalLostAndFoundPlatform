// src/controllers/AuthController.ts
import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";

export class AuthController {
	static async register(req: Request, res: Response): Promise<void> {
		try {
			const result = await AuthService.registerUser(req.body);
			res.status(201).json(result);
		} catch (error: any) {
			res.status(400).json({ message: error.message });
		}
	}

	static async login(req: Request, res: Response): Promise<void> {
		try {
			const { email, password } = req.body;
			const result = await AuthService.loginUser(email, password);
			res.status(200).json(result);
		} catch (error: any) {
			res.status(400).json({ message: error.message });
		}
	}
		
	static async me(req: Request, res: Response): Promise<void> {
		try {
			const result = await AuthService.me(req);
			res.status(200).json(result);
		} catch (error: any) {
			res.status(400).json({ message: error.message });
		}
	}
}
