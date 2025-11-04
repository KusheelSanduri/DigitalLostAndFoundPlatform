import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { TokenService } from "../services/TokenService";
import { NodeMailerEmailService } from "../services/NodeMailerEmailService";
import { AuthRequest } from "../middleware/AuthMiddleware";
import { User } from "../models/User";
import { envConfig } from "../config/envConfig";

export class AuthController {
	private static ORG_DOMAIN = envConfig.ORGANIZATION_DOMAIN;

	public static async register(req: Request, res: Response): Promise<void> {
		const { name, email, password } = req.body;

		if (!name || !email || !password) {
			res.status(400).json({ message: "Missing fields." });
			return;
		}

		const domain = email.split("@")[1];

		if (AuthController.ORG_DOMAIN && domain !== AuthController.ORG_DOMAIN) {
			res.status(400).json({ message: "Organization email required" });
			return;
		}

		if (await UserService.findByEmail(email)) {
			res.status(400).json({ message: "User already exists" });
			return;
		}

		const user = await UserService.createUser(name, email, password);
		const token = TokenService.generateRandomToken();
		await UserService.setVerifyToken(user, token);
		await NodeMailerEmailService.sendVerificationEmail(email, token);
		res.json({
			message:
				"Registered. Check your email and click on the verification link to verify account.",
		});
	}

	public static async resendVerificationLink(
		req: Request,
		res: Response
	): Promise<void> {
		const { email } = req.body;

		if (!email) {
			res.status(400).json({ message: "Missing Fields." });
			return;
		}

		const user = await UserService.findByEmail(email);

		if (!user || user.isVerified) {
			throw new Error("If account exists, verification link sent");
		}
		const token = TokenService.generateRandomToken();
		await UserService.setVerifyToken(user, token);
		await NodeMailerEmailService.sendVerificationEmail(email, token);
		res.json({
			message: "If account exists, verification link sent",
		});
	}

	public static async login(req: Request, res: Response): Promise<void> {
		const { email, password } = req.body;

		if (!email || !password) {
			res.status(400).json({ message: "Missing fields." });
			return;
		}

		const user = await UserService.findByEmail(email);

		if (!user) {
			res.status(400).json({ message: "Invalid credentials" });
			return;
		}

		if (!user.isVerified) {
			res.status(403).json({
				message:
					"Email not verified. Please Verify your email before logging in",
			});
			return;
		}

		const valid = await UserService.validatePassword(user, password);
		if (!valid) {
			res.status(400).json({ message: "Invalid credentials" });
			return;
		}

		const token = TokenService.signJwt(user);
		res.json({ token });
	}

	public static async verify(req: Request, res: Response): Promise<void> {
		const { email, token } = req.query as { email: string; token: string };
		if (!email || !token) {
			res.status(400).send("Missing email or token");
			return;
		}

		const user = await UserService.verifyUserEmail(email, token);

		if (!user) {
			res.status(400).send("Invalid or expired token");
			return;
		}

		res.send("Email verified. You can log in now.");
	}

	public static async forgot(req: Request, res: Response) {
		const { email } = req.body;

		if (!email) {
			res.status(400).json({ message: "Email is required" });
			return;
		}

		const user = await UserService.findByEmail(email);
		if (!user) {
			res.json({ message: "If account exists, reset link sent" });
			return;
		}
		const token = TokenService.generateRandomToken();
		await UserService.setResetToken(user, token);
		await NodeMailerEmailService.sendResetEmail(email, token);
		res.json({ message: "If account exists, reset link sent" });
	}

	public static async reset(req: Request, res: Response) {
		const { email, token, password } = req.body;

		if (!email || !token || !password) {
			res.status(400).json({ message: "Missing fields" });
			return;
		}

		const user = await UserService.resetPassword(email, token, password);
		if (!user) {
			res.status(400).json({ message: "Invalid or expired token" });
			return;
		}
		res.json({ message: "Password reset successful" });
	}

	public static async me(req: AuthRequest, res: Response): Promise<void> {
		try {
			res.json({ id: req.user?.id, email: req.user?.email });
		} catch (error: any) {
			res.status(400).json({ message: error.message });
		}
	}
}
