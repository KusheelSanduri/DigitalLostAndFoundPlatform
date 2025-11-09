import express from "express";
import cors from "cors";
import { AuthRouter } from "./routes/AuthRoutes";
import { AuthRequest, requireAuth } from "./middleware/AuthMiddleware";
import { AuthController } from "./controllers/AuthController";
import { envConfig } from "./config/envConfig";
import { PostRouter } from "./routes/PostRoutes";
import chatRouter from "../src/routes/chat";
import { errorHandler } from "./middleware/ErrorHandler";

const app = express();
app.use(
	cors({
		origin: envConfig.FRONTEND_URL || "http://localhost:5173",
		credentials: true,
	})
);
app.use(express.json());

app.use("/api/auth", AuthRouter);
app.use("/api/chat", chatRouter);
app.use("/api/posts", requireAuth, PostRouter);

app.get("/api/auth/me", requireAuth, (req: AuthRequest, res) => {
	AuthController.me(req, res);
});

app.use(errorHandler);

export default app;
