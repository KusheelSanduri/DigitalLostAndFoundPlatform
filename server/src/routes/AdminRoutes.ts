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

        const totalUsersPromise = User.countDocuments();
        const activePostsPromise = Post.countDocuments();
        const totalDisputesPromise = Dispute.countDocuments();
        const pendingDisputesPromise = Dispute.countDocuments({ status: "pending" });
        const resolvedDisputesPromise = Dispute.countDocuments({ status: "resolved" });

        const [
            totalUsers,
            activePosts,
            totalDisputes,
            pendingDisputes,
            resolvedDisputes,
        ] = await Promise.all([
            totalUsersPromise,
            activePostsPromise,
            totalDisputesPromise,
            pendingDisputesPromise,
            resolvedDisputesPromise,
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