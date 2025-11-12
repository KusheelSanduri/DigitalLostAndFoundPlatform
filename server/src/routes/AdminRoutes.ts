import { Router } from "express";
import { User } from "../models/User";
import { Post } from "../models/Post";
import {Dispute} from "../models/Dispute";

const router = Router();

router.get("/admin/stats", async (req, res) => {
	try {
		const [totalUsers, activePosts, totalDisputes, pendingDisputes, resolvedDisputes] = await Promise.all([
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
		res.status(500).json({ message: "Failed to fetch stats" });
	}
});

export default router;