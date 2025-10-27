import app from "./app";
import mongoose, { Types } from "mongoose";
import { Notification } from "./models/Notification";
import { NotificationService } from "./services/NotificationService";

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI!;

mongoose.connect(MONGO_URI)
    .then(async () => {
        console.log("✅ MongoDB Connected");
        app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
    })
    .catch(err => console.error(err));