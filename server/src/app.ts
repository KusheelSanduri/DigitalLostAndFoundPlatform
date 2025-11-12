import express from "express";
import cors from "cors";
import { AuthRouter } from "./routes/AuthRoutes";
import { AuthRequest, requireAuth } from "./middleware/AuthMiddleware";
import { AuthController } from "./controllers/AuthController";
import { envConfig } from "./config/envConfig";
import { PostRouter } from "./routes/PostRoutes";
import DisputeRoutes from "./routes/DisputeRoutes";
import chatRouter from "../src/routes/chat";
import AdminRoutes from "./routes/ChatRoutes";
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
app.use("/api/admin", requireAuth, AdminRoutes);
app.use("/api/disputes", requireAuth, DisputeRoutes);

app.get("/api/auth/me", requireAuth, (req: AuthRequest, res) => {
	AuthController.me(req, res);
});

app.use(errorHandler);

export default app;
