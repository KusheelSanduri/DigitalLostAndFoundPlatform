export class SuccessResponse<T> {
	success: true;
	statusCode: number;
	message: string;
	data?: T;

	constructor(message: string, data?: T, statusCode: number = 200) {
		this.success = true;
		this.statusCode = statusCode;
		this.message = message;
		this.data = data;
	}
}

export class ErrorResponse {
	success: false;
	statusCode: number;
	message: string;
	errorCode?: string;
	details?: any;

	constructor(
		message: string,
		statusCode: number = 400,
		errorCode?: string,
		details?: any
	) {
		this.success = false;
		this.statusCode = statusCode;
		this.message = message;
		this.errorCode = errorCode;
		this.details = details;
	}
}
