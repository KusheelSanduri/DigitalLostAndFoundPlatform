import { Response, Router } from "express";
import { User } from "../models/User";
import { Post } from "../models/Post";
import { Dispute } from "../models/Dispute";
import { AuthRequest } from "../middleware/AuthMiddleware";
import { AuthError } from "../utils/errors/AuthError";

const router = Router();

router.get("/stats", async (req: AuthRequest, res: Response) => {
	try {
		if (req.user?.role !== "admin") {
			throw AuthError.Unauthorized();
		}

		const [
			totalUsers,
			activePosts,
			totalDisputes,
			pendingDisputes,
			resolvedDisputes,
		] = await Promise.all([
			User.countDocuments(),
			Post.countDocuments(),
			Dispute.countDocuments(),
			Dispute.countDocuments({ status: "pending" }),
			Dispute.countDocuments({ status: "resolved" }),
		]);

		res.json({
			totalUsers,
			activePosts,
			totalDisputes,
			pendingDisputes,
			resolvedDisputes,
		});
	} catch (e) {
		console.error(e);
		res.status(500).json({ message: "Failed to fetch stats" });
	}
});

export { router as AdminRouter };
