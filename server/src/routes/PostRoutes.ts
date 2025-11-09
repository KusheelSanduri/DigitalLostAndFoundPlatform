import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { PostController } from "../controllers/PostController";

const router = Router(); // router.use(rateLimit);

router.get("/categories", PostController.getCategories);

router.get("/locations", PostController.getLocations);

/**
 * Get all posts
 * @route GET /posts
 */
router.get("/:page", PostController.getPosts);

/**
 * Create a new lost item post
 * @route POST /posts
 */
router.post("/", PostController.createPost);

/** Delete a post by ID
 * @route DELETE /posts/:postId
 * Restricted to post owner or admin
 */
router.delete("/:postId", PostController.deletePost);

export { router as PostRouter };
