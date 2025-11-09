export class AppError extends Error {
	statusCode: number;
	errorCode?: string;
	details?: any;

	constructor(
		message: string,
		statusCode: number = 400,
		errorCode?: string,
		details?: any
	) {
		super(message);
		this.statusCode = statusCode;
		this.errorCode = errorCode;
		this.details = details;
		Error.captureStackTrace(this, this.constructor);
	}
}
