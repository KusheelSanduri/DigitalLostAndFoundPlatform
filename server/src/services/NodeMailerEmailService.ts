import nodemailer from "nodemailer";
import { EmailServiceConfig, IEmailService } from "../interfaces/IEmailService";

export class NodeMailerEmailService {
	private static config: EmailServiceConfig = {
		host: process.env.EMAIL_HOST!,
		port: Number(process.env.EMAIL_PORT!),
		secure: process.env.EMAIL_SECURE === "true",
		auth: {
			user: process.env.EMAIL_USER!,
			pass: process.env.EMAIL_PASS!,
		},
		fromEmail: process.env.EMAIL_FROM!,
		frontendUrl: process.env.FRONTEND_URL!,
	};

	private static createTransport() {
		return nodemailer.createTransport({
			host: this.config.host,
			port: this.config.port,
			secure: this.config.secure,
			auth: {
				user: this.config.auth.user,
				pass: this.config.auth.pass,
			},
		});
	}

	public static async sendVerificationEmail(
		email: string,
		token: string
	): Promise<void> {
		const url = `${
			this.config.frontendUrl
		}/verify?token=${token}&email=${encodeURIComponent(email)}`;
		const transporter = this.createTransport();

		await transporter.sendMail({
			from: this.config.fromEmail,
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
			this.config.frontendUrl
		}/reset?token=${token}&email=${encodeURIComponent(email)}`;
		const transporter = this.createTransport();

		await transporter.sendMail({
			from: this.config.fromEmail,
			to: email,
			subject: "Reset your password",
			text: `Reset link: ${url}`,
		});
	}
}
