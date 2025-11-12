import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { TokenService } from "../services/TokenService";
import { NodeMailerEmailService } from "../services/NodeMailerEmailService";
import { AuthRequest } from "../middleware/AuthMiddleware";
import { envConfig } from "../config/envConfig";
import { SuccessResponse } from "../utils/ApiResponse";
import { ValidationError } from "../utils/errors/ValidationError";
import { AuthError } from "../utils/errors/AuthError";
import mongoose from "mongoose";

export class AuthController {
	private static ORG_DOMAIN = envConfig.ORGANIZATION_DOMAIN;

	public static async register(req: Request, res: Response): Promise<void> {
		const { name, email, password } = req.body;

		if (!name || !email || !password) {
			throw ValidationError.MissingFields(
				"Name, email, and password are required"
			);
		}

		const domain = email.split("@")[1];

		if (AuthController.ORG_DOMAIN && domain !== AuthController.ORG_DOMAIN) {
			throw AuthError.OrganizationEmailMismatch();
		}

		if (await UserService.findByEmail(email)) {
			throw AuthError.UserExists();
		}

		const session = await mongoose.startSession();
		session.startTransaction();

		try {
			const user = await UserService.createUser(name, email, password);
			const token = TokenService.generateRandomToken();
			await UserService.setVerifyToken(user, token);
			await NodeMailerEmailService.sendVerificationEmail(email, token);
			await session.commitTransaction();

			res.status(201).json(
				new SuccessResponse(
					"Registered successful. Check your email to verify account.",
					undefined,
					201
				)
			);
		} catch (err) {
			await session.abortTransaction();
			throw AuthError.RegistrationUnsuccessful({ error: err });
		} finally {
			session.endSession();
		}
	}

	public static async resendVerificationLink(
		req: Request,
		res: Response
	): Promise<void> {
		const { email } = req.body;

		if (
			!email ||
			RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).test(
				email
			) == false
		) {
			res.status(400).json({ message: "Missing Fields." });
			throw ValidationError.InvalidEmailFormat();
		}

		const user = await UserService.findByEmail(email);

		if (!user || user.isVerified) {
			res.json(
				new SuccessResponse(
					"If account exists, verification link sent",
					undefined,
					200
				)
			);
			return;
		}

		const session = await mongoose.startSession();
		session.startTransaction();

		try {
			const token = TokenService.generateRandomToken();
			await UserService.setVerifyToken(user, token);
			await NodeMailerEmailService.sendVerificationEmail(email, token);

			res.status(200).json(
				new SuccessResponse(
					"If account exists, verification link sent.",
					undefined,
					200
				)
			);
		} catch (err) {
			await session.abortTransaction();
			throw AuthError.ResendVerificationLinkFailure({ error: err });
		} finally {
			session.endSession();
		}
	}

	public static async login(req: Request, res: Response): Promise<void> {
		const { email, password } = req.body;

		if (!email || !password) {
			throw ValidationError.MissingFields(
				"Email and password are required."
			);
		}

		const user = await UserService.findByEmail(email);

		if (!user) {
			throw AuthError.InvalidCredentials();
		}

		if (!user.isVerified) {
			throw AuthError.AccountNotVerified();
		}
		const valid = await UserService.validatePassword(user, password);

		if (!valid) {
			throw AuthError.InvalidCredentials();
		}

		const token = TokenService.signJwt(user);

		res.status(200).json(
			new SuccessResponse("Login Successful.", { token }, 200)
		);
	}

	public static async verify(req: Request, res: Response): Promise<void> {
		const { email, token } = req.query as { email: string; token: string };

		if (!email || !token) {
			throw ValidationError.MissingFields(
				"Email and token are required."
			);
		}

		const user = await UserService.verifyUserEmail(email, token);

		if (!user) {
			throw AuthError.InvalidVerificationToken();
		}

		res.status(200).json(
			new SuccessResponse(
				"Email verification successful.",
				undefined,
				200
			)
		);
	}

	public static async forgot(req: Request, res: Response) {
		const { email } = req.body;

		if (!email) {
			throw ValidationError.MissingFields();
		}

		const user = await UserService.findByEmail(email);

		if (!user) {
			res.status(200).json(
				new SuccessResponse(
					"If account exists, reset password link sent.",
					undefined,
					200
				)
			);
			return;
		}

		const session = await mongoose.startSession();
		session.startTransaction();

		try {
			const token = TokenService.generateRandomToken();
			await UserService.setResetToken(user, token);
			await NodeMailerEmailService.sendResetEmail(email, token);

			res.status(200).json(
				new SuccessResponse(
					"If account exists, reset password link sent.",
					undefined,
					200
				)
			);
		} catch (err) {
			await session.abortTransaction();
			throw AuthError.ResendVerificationLinkFailure({ error: err });
		} finally {
			session.endSession();
		}
	}

	public static async reset(req: Request, res: Response) {
		const { email, token, password } = req.body;

		if (!email || !token || !password) {
			throw ValidationError.MissingFields();
		}

		const user = await UserService.resetPassword(email, token, password);

		if (!user) {
			throw AuthError.InvalidResetToken();
		}

		new SuccessResponse(
			"Password Reset successful. You can now log in with your new password.",
			undefined,
			201
		);
	}

	public static async me(req: AuthRequest, res: Response): Promise<void> {
		try {
			const data = {
				id: req.user?.id,
				email: req.user?.email,
				name: "Placeholder name",
			};
			res.status(200).json(
				new SuccessResponse("Profile fetch successful.", data, 200)
			);
		} catch (error: any) {
			throw AuthError.Unauthorized({ error });
		}
	}
}
