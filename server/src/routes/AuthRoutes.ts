import express from "express";
import { AuthController } from "../controllers/AuthController";

const router = express.Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);

export { router as AuthRouter };
