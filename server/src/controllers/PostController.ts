import { Response } from "express";
import { AuthRequest } from "../middleware/AuthMiddleware";
import { Post } from "../models/Post";
import { categories } from "../utils/categories";
import { locations } from "../utils/location";

export class PostController {
	public static async createPost(
		req: AuthRequest,
		res: Response
	): Promise<void> {
		const { title, description, location, date, type } = req.body;

		if (!title || !description || !location || !date || !type) {
			res.status(400).json({ message: "Missing fields." });
			return;
		}

		const post = new Post({
			title,
			description,
			location,
			date,
			type,
			ownerId: req.user?.id,
		});
		await post.save();
		res.status(201).json(post);
	}

	public static async getPosts(
		req: AuthRequest,
		res: Response
	): Promise<void> {
		// Fetch all posts with pagination
		const page = parseInt(req.params.page) || 1;
		const limit = 3;
		const skip = (page - 1) * limit;

		const searchQuery = req.query.search as string;
		const categoryFilter = req.query.category as string;
		const locationFilter = req.query.location as string;
		let filter: any = {};

		if (searchQuery) {
			filter.$or = [
				{
					title: { $regex: searchQuery, $options: "i" },
					description: { $regex: searchQuery, $options: "i" },
				},
			];
		}
		if (categoryFilter && categoryFilter !== "all") {
			filter.type = categoryFilter;
		}
		if (locationFilter && locationFilter !== "all") {
			filter.location = locationFilter;
		}

		const totalPosts = await Post.countDocuments(filter);
		const totalPages = Math.ceil(totalPosts / limit);

		const posts = await Post.find(filter)
			.sort({ createdAt: -1 })
			.skip(skip)
			.limit(limit);
		res.json({ posts, totalPages, currentPage: page });
	}

	public static async deletePost(
		req: AuthRequest,
		res: Response
	): Promise<void> {
		const { postId } = req.params;
		const post = await Post.findById(postId);

		if (!post) {
			res.status(404).json({ message: "Post not found." });
			return;
		}

		if (
			post.ownerId.toString() !== req.user?.id &&
			req.user?.role !== "admin"
		) {
			res.status(403).json({
				message: "Forbidden. You cannot delete this post.",
			});
			return;
		}

		await Post.findByIdAndDelete(postId);
		res.json({ message: "Post deleted successfully." });
	}

	public static async getCategories(
		req: AuthRequest,
		res: Response
	): Promise<void> {
		res.json(categories);
	}

	public static async getLocations(
		req: AuthRequest,
		res: Response
	): Promise<void> {
		res.json(locations);
	}
}
