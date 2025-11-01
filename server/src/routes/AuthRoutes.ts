import { Router } from "express";
import { AuthController } from "../controllers/AuthController";

const router = Router();
// router.use(rateLimit);

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.get("/verify", AuthController.verify);
router.post("/forgot", AuthController.forgot);
router.post("/reset", AuthController.reset);

export { router as AuthRouter };
