// load all the env variables from the .env file and make them typwe-safe
import dotenv from "dotenv";
dotenv.config();

export const envConfig = {
	PORT: process.env.PORT! || 5000,
	MONGO_URI: process.env.MONGO_URI!,
	JWT_SECRET: process.env.JWT_SECRET!,
	ORGANIZATION_DOMAIN: process.env.ORGANIZATION_DOMAIN!,
	FRONTEND_URL: process.env.FRONTEND_URL!,

	// SMTP Variables
	EMAIL_HOST: process.env.EMAIL_HOST!,
	EMAIL_PORT: Number(process.env.EMAIL_PORT!),
	EMAIL_SECURE: process.env.EMAIL_SECURE === "true",
	EMAIL_USER: process.env.EMAIL_USER!,
	EMAIL_PASS: process.env.EMAIL_PASS!,
	EMAIL_FROM: process.env.EMAIL_FROM!,
	// Cloudinary Variables
	CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME!,
	CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY!,
	CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET!,
};
