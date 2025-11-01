import nodemailer from "nodemailer";
import { EmailServiceConfig, IEmailService } from "../interfaces/IEmailService";

export class NodeMailerEmailService implements IEmailService {
	private config: EmailServiceConfig;

	constructor(config: EmailServiceConfig) {
		this.config = config;
	}

	private createTransport() {
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

	public async sendVerificationEmail(
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

	public async sendResetEmail(email: string, token: string): Promise<void> {
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
