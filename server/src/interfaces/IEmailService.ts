export interface EmailServiceConfig {
	host: string;
	port: number;
	secure: boolean;
	auth: {
		user: string;
		pass: string;
	};
	fromEmail: string;
	frontendUrl: string;
}

export interface IEmailService {
	/**
	 * Sends an verification link to the specified email address.
	 * @param email - Recipient's email address.
	 * @param token - Verification token to include in the URL.
	 */
	sendVerificationEmail(email: string, token: string): Promise<void>;

	/**
	 * Sends a reset password link to the specified email address.
	 * @param email - Recipient's email address.
	 * @param token - Reset token to include in the URL.
	 */
	sendResetEmail(email: string, token: string): Promise<void>;
}
