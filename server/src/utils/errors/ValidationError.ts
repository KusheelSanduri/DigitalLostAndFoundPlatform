import { AppError } from "./AppError";
import { ErrorCodes } from "../ErrorCodes";

export class ValidationError extends AppError {
	constructor(message: string, details?: any) {
		super(message, 400, ErrorCodes.VALIDATION_ERROR, details);
		this.name = "ValidationError";
	}

	static MissingFields(details?: any) {
		return new ValidationError("Missing required fields", details);
	}

	static InvalidEmailFormat(details?: any) {
		return new ValidationError(
			"Email Missing or Invalid Email Format",
			details
		);
	}
}
