import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { AuthRouter } from "./routes/AuthRoutes";
import { AuthRequest, requireAuth } from "./middleware/AuthMiddleware";
import { AuthController } from "./controllers/AuthController";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", AuthRouter);

app.get("/api/me", requireAuth, (req: AuthRequest, res) => {
	AuthController.me(req, res);
});

export default app;