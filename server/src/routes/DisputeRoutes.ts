import { Router } from "express";
import DisputeService from "../services/DisputeService";
import { AuthRequest } from "../middleware/AuthMiddleware";
import { Response } from "express";
import { Types } from "mongoose";

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

// Update dispute status (admin)
router.patch("/:id/status", async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updated = await DisputeService.updateDisputeStatus(new Types.ObjectId(id), status);
    res.json(updated);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
