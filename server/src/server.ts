import app from "./app";
import mongoose from "mongoose";
import "./config/envConfig";

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI!;

mongoose
	.connect(MONGO_URI)
	.then(() => {
		console.log("✅ Database Connected");
		app.listen(PORT, () =>
			console.log(`✅ Server running on port ${PORT}`)
		);
	})
	.catch((err) => console.error(err));
