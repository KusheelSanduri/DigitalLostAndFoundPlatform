import { Response } from "express";
import { AuthRequest } from "../middleware/AuthMiddleware";
import { Post } from "../models/Post";
import { categories } from "../utils/categories";
import { locations } from "../utils/location";
import { SuccessResponse } from "../utils/ApiResponse";
import { PostError } from "../utils/errors/PostErrors";
import { AuthError } from "../utils/errors/AuthError";

export class PostController {
	public static async createPost(
		req: AuthRequest,
		res: Response
	): Promise<void> {
		try {
			const { title, description, location, date, type, category } =
				req.body;

			if (
				!title ||
				!description ||
				!location ||
				!date ||
				!type ||
				!category
			) {
				res.status(400).json({ message: "Missing fields." });
				return;
			}

			console.log("Getting imageURL");

			const imageUrl = (req as any).file?.path ?? "null";

			console.log(imageUrl);

			const post = new Post({
				title,
				description,
				location,
				category,
				date,
				type,
				ownerId: req.user?.id,
				imageUrl,
			});

			await post.save();

			res.status(201).json(
				new SuccessResponse(
					"Post created successfully.",
					undefined,
					201
				)
			);
		} catch (error) {
			throw PostError.PostCreationFailed(error);
		}
	}

	public static async getPosts(
		req: AuthRequest,
		res: Response
	): Promise<void> {
		// Fetch all posts with pagination

		try {
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
			if (categoryFilter && categoryFilter !== "Any") {
				filter.category = categoryFilter;
			}
			if (locationFilter && locationFilter !== "Any") {
				filter.location = locationFilter;
			}

			const totalPosts = await Post.countDocuments(filter);
			const totalPages = Math.ceil(totalPosts / limit);

			const posts = await Post.find(filter)
				.lean()
				.sort({ createdAt: -1 })
				.skip(skip)
				.limit(limit);

			const resultPosts = posts.map((post) => ({
				...post,
				isOwner: post.ownerId.toString() === req.user?.id,
			}));
			// { posts, totalPages, currentPage: page }
			res.status(200).json(
				new SuccessResponse(
					"Posts fetched successfully.",
					{ posts: resultPosts, totalPages, currentPage: page },
					200
				)
			);
		} catch (error) {
			throw PostError.PostFetchingFailed(error);
		}
	}

	public static async deletePost(
		req: AuthRequest,
		res: Response
	): Promise<void> {
		try {
			const { postId } = req.params;
			const post = await Post.findById(postId);

			if (!post) {
				throw PostError.PostNotFound();
			}

			if (
				post.ownerId.toString() !== req.user?.id &&
				req.user?.role !== "admin"
			) {
				throw AuthError.Unauthorized();
			}

			await Post.findByIdAndDelete(postId);

			res.status(200).json(
				new SuccessResponse(
					"Posts deleted successfully.",
					undefined,
					200
				)
			);
		} catch (error) {
			throw PostError.PostDeletionFailed(error);
		}
	}

	public static async markClaimed(
		req: AuthRequest,
		res: Response
	): Promise<void> {
		try {
			const { postId } = req.params;
			const post = await Post.findById(postId);

			if (!post) {
				throw PostError.PostNotFound();
			}

			if (
				post.ownerId.toString() !== req.user?.id &&
				req.user?.role !== "admin"
			) {
				throw AuthError.Unauthorized();
			}

			await Post.findByIdAndUpdate(post._id, {
				$set: { status: "claimed" },
			});

			res.status(200).json(
				new SuccessResponse(
					"Posts updated successfully.",
					undefined,
					200
				)
			);
		} catch (error) {
			throw PostError.PostMarkClaimedFailed(error);
		}
	}

	public static async getCategories(
		req: AuthRequest,
		res: Response
	): Promise<void> {
		res.status(200).json(
			new SuccessResponse(
				"Categories fetched successfully.",
				{ categories },
				200
			)
		);
	}

	public static async getLocations(
		req: AuthRequest,
		res: Response
	): Promise<void> {
		res.status(200).json(
			new SuccessResponse(
				"Locations fetched successfully.",
				{ locations },
				200
			)
		);
	}
}
