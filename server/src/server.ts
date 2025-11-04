import app from "./app";
import mongoose from "mongoose";
import "./config/envConfig";
import { envConfig } from "./config/envConfig";

const PORT = envConfig.PORT || 5000;
const MONGO_URI = envConfig.MONGO_URI;

mongoose.connect(MONGO_URI)
    .then(async () => {
        console.log("✅ MongoDB Connected");
        app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
    })
    .catch(err => console.error(err));
