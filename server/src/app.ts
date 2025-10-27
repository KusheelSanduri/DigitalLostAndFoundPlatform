import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { AuthRouter } from "./routes/AuthRoutes";
import { authMiddleware } from "./middleware/AuthMiddleware";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(authMiddleware);

app.use("/auth", AuthRouter);

export default app;
