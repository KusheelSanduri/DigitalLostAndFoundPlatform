import express from "express";
import cors from "cors";
import { AuthRouter } from "./routes/AuthRoutes";
import { AuthRequest, requireAuth } from "./middleware/AuthMiddleware";
import { AuthController } from "./controllers/AuthController";
import { envConfig } from "./config/envConfig";
import { PostRouter } from "./routes/PostRoutes";
import DisputeRoutes from "./routes/DisputeRoutes";

const app = express();
app.use(
	cors({
		origin: envConfig.FRONTEND_URL || "http://localhost:5173",
		credentials: true,
	})
);
app.use(express.json());

app.use("/api/auth", AuthRouter);

app.use("/api/posts", requireAuth, PostRouter);
app.use("/api/disputes", requireAuth, DisputeRoutes);

app.get("/api/me", requireAuth, (req: AuthRequest, res) => {
	AuthController.me(req, res);
});

export default app;
