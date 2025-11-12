import { AppError } from "./AppError";
import { ErrorCodes } from "../ErrorCodes";

export class AuthError extends AppError {
	constructor(
		message: string,
		statusCode: number = 401,
		errorCode: ErrorCodes = ErrorCodes.UNAUTHORIZED,
		details?: any
	) {
		super(message, statusCode, errorCode, details);
		this.name = "AuthError";
	}

	static InvalidToken(details?: any) {
		return new AuthError(
			"Invalid authentication token",
			401,
			ErrorCodes.INVALID_TOKEN,
			details
		);
	}

	static ExpiredToken(details?: any) {
		return new AuthError(
			"Authentication token has expired",
			401,
			ErrorCodes.TOKEN_EXPIRED,
			details
		);
	}

	static InvalidVerificationToken(details?: any) {
		return new AuthError(
			"Invalid or Expired verification token",
			401,
			ErrorCodes.VERIFICATION_TOKEN_EXPIRED,
			details
		);
	}

	static InvalidResetToken(details?: any) {
		return new AuthError(
			"Invalid or Expired reset token",
			401,
			ErrorCodes.RESET_TOKEN_EXPIRED,
			details
		);
	}

	static Unauthorized(details?: any) {
		return new AuthError(
			"You are not authorized to perform this action",
			401,
			ErrorCodes.UNAUTHORIZED,
			details
		);
	}

	static Forbidden(details?: any) {
		return new AuthError(
			"You do not have permission to access this resource",
			403,
			ErrorCodes.FORBIDDEN,
			details
		);
	}

	static InvalidCredentials(details?: any) {
		return new AuthError(
			"Invalid credentials provided",
			401,
			ErrorCodes.INVALID_CREDENTIALS,
			details
		);
	}

	static AccountNotVerified(details?: any) {
		return new AuthError(
			"Account is not verified",
			403,
			ErrorCodes.ACCOUNT_NOT_VERIFIED,
			details
		);
	}

	static ResendVerificationLinkFailure(details?: any) {
		return new AuthError(
			"Failed to resend verification link",
			500,
			ErrorCodes.RESEND_VERIFICATION_LINK_FAILURE,
			details
		);
	}

	static OrganizationEmailMismatch(details?: any) {
		return new AuthError(
			"You need to use your institute email to register",
			400,
			ErrorCodes.ORGANIZATION_DOMAIN_MISMATCH,
			details
		);
	}

	static UserExists(details?: any) {
		return new AuthError(
			"User already exists",
			400,
			ErrorCodes.USER_ALREADY_EXISTS,
			details
		);
	}

	static UserNotFound(details?: any) {
		return new AuthError(
			"User not found",
			404,
			ErrorCodes.USER_NOT_FOUND,
			details
		);
	}

	static RegistrationUnsuccessful(details?: any) {
		return new AuthError(
			"Registration was unsuccessful",
			400,
			ErrorCodes.REGISTRATION_UNSUCESSFUL,
			details
		);
	}
}
