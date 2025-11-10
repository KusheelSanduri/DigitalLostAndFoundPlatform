import app from "./app";
import mongoose from "mongoose";
import "./config/envConfig";
import { envConfig } from "./config/envConfig";
import cloudinary from "./config/coudinary";

const PORT = envConfig.PORT || 5000;
const MONGO_URI = envConfig.MONGO_URI;

console.log(
	envConfig.CLOUDINARY_API_KEY,
	envConfig.CLOUDINARY_API_SECRET,
	envConfig.CLOUDINARY_CLOUD_NAME
);

mongoose
	.connect(MONGO_URI)
	.then(async () => {
		console.log("✅ MongoDB Connected");
		app.listen(PORT, () =>
			console.log(`✅ Server running on port ${PORT}`)
		);
	})
	.catch((err) => console.error(err));
