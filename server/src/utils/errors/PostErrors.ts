import { AppError } from "./AppError";
import { ErrorCodes } from "../ErrorCodes";

export class PostError extends AppError {
	constructor(
		message: string,
		statusCode: number = 400,
		errorCode: ErrorCodes,
		details?: any
	) {
		super(message, statusCode, errorCode, details);
		this.name = "PostError";
	}

	static PostNotFound(details?: any) {
		return new PostError(
			"Post not found.",
			404,
			ErrorCodes.ITEM_NOT_FOUND,
			details
		);
	}

	static PostCreationFailed(details?: any) {
		return new PostError(
			"Post Creation Failed. Something went wrong on our side.",
			500,
			ErrorCodes.INTERNAL_ERROR,
			details
		);
	}

	static PostFetchingFailed(details?: any) {
		return new PostError(
			"Posts fetching Failed. Something went wrong on our side.",
			500,
			ErrorCodes.INTERNAL_ERROR,
			details
		);
	}

	static PostDeletionFailed(details?: any) {
		return new PostError(
			"Posts deletion Failed. Something went wrong on our side.",
			500,
			ErrorCodes.INTERNAL_ERROR,
			details
		);
	}
}
