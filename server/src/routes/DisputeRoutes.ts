import { Router } from "express";
import DisputeService from "../services/DisputeService";
import { AuthRequest } from "../middleware/AuthMiddleware";
import { Response } from "express";
import mongoose, { Types } from "mongoose";

const router = Router();

// Get all disputes (admin)
router.get("/", async (req: AuthRequest, res: Response) => {
	try {
		const disputes = await DisputeService.getAllDisputes();
		res.json(disputes);
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
});

// userId: Types.ObjectId;
// postId: Types.ObjectId;
// reason: string;
// description: string;
// status: "pending" | "resolved";
// adminRemarks: string;
// createdAt: Date;
// resolvedAt: Date;

router.post("/", async (req: AuthRequest, res: Response) => {
	try {
		const { postId, reason, description } = req.body;
		const userId = req.user?.id;

		if (!postId || !reason || !description) {
			res.status(400).json({ message: "Missing Fields." });
		}

		if (!userId) {
			res.status(401).json({ message: "Unauthorized." });
		}

		await DisputeService.createDispute(
			new mongoose.Types.ObjectId(userId),
			new mongoose.Types.ObjectId(postId),
			reason,
			description
		);
		res.status(201).json({ message: "Dispute created successfully." });
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
});

// Update dispute status (admin)
router.patch("/:id/status", async (req: AuthRequest, res: Response) => {
	try {
		const { id } = req.params;
		const { status } = req.body;
		const updated = await DisputeService.updateDisputeStatus(
			new Types.ObjectId(id),
			status
		);
		res.json(updated);
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
});

export default router;
