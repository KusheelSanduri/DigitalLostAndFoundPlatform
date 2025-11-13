import { Request, Response, NextFunction } from "express";
import { ErrorResponse } from "../utils/ApiResponse";
import { AppError } from "../utils/errors/AppError";
import { AuthError } from "../utils/errors/AuthError";

export const errorHandler = (
	err: any,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let statusCode = err.statusCode || 500;
	let message = err.message || "Internal Server Error";
	let errorCode = err.errorCode || "SERVER_ERROR";
	let details = err.details || null;

	console.error("🔥 Error:", err);
	
	if (err instanceof AppError) {
		console.log(
			"Error is being handled: ",
			err.name,
			err.message,
			err.details
		);

		const errorResponse = new ErrorResponse(
			message,
			statusCode,
			errorCode,
			details
		);
		res.status(statusCode).json(errorResponse);
		return;
	}

	const genericError = new ErrorResponse(
		"Something went wrong, please try again later.",
		500,
		"INTERNAL_ERROR",
		process.env.NODE_ENV === "development" ? err : undefined
	);

	res.status(500).json(genericError);
};
