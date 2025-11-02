import nodemailer from "nodemailer";
import { EmailServiceConfig } from "../interfaces/IEmailService";
import { envConfig } from "../config/envConfig";

export class NodeMailerEmailService {
	private static config: EmailServiceConfig = {
		host: envConfig.EMAIL_HOST,
		port: Number(envConfig.EMAIL_PORT),
		secure: envConfig.EMAIL_SECURE,
		auth: {
			user: envConfig.EMAIL_USER,
			pass: envConfig.EMAIL_PASS,
		},
		fromEmail: envConfig.EMAIL_FROM,
		frontendUrl: envConfig.FRONTEND_URL,
	};

	private static createTransport() {
		console.log(
			"Creating transport with config:",
			NodeMailerEmailService.config
		);

		return nodemailer.createTransport({
			host: NodeMailerEmailService.config.host,
			port: NodeMailerEmailService.config.port || 465,
			secure: NodeMailerEmailService.config.secure,
			auth: {
				user: NodeMailerEmailService.config.auth.user,
				pass: NodeMailerEmailService.config.auth.pass,
			},
		});
	}

	public static async sendVerificationEmail(
		email: string,
		token: string
	): Promise<void> {
		const url = `${
			NodeMailerEmailService.config.frontendUrl
		}/verify?token=${token}&email=${encodeURIComponent(email)}`;
		const transporter = NodeMailerEmailService.createTransport();

		await transporter.sendMail({
			from: NodeMailerEmailService.config.fromEmail,
			to: email,
			subject: "LostAndFound - Verify your email",
			text: `Click to verify: ${url}`,
		});
	}

	public static async sendResetEmail(
		email: string,
		token: string
	): Promise<void> {
		const url = `${
			NodeMailerEmailService.config.frontendUrl
		}/reset?token=${token}&email=${encodeURIComponent(email)}`;
		const transporter = NodeMailerEmailService.createTransport();

		await transporter.sendMail({
			from: NodeMailerEmailService.config.fromEmail,
			to: email,
			subject: "Reset your password",
			text: `Reset link: ${url}`,
		});
	}
}
