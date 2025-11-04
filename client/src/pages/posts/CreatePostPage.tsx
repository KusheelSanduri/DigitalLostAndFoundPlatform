import type React from "react";
import { useState } from "react";
import { Button } from "../../components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../../components/ui/select";
import { Alert, AlertDescription } from "../../components/ui/alert";
import { Search, ArrowLeft, Upload, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function CreatePostPage() {
	const [postType, setPostType] = useState<"lost" | "found" | "">("");
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		category: "",
		location: "",
		date: "",
		contactInfo: "",
	});
	const [images, setImages] = useState<string[]>([]);
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const categories = [
		"Electronics",
		"Personal Items",
		"Books",
		"Keys",
		"Clothing",
		"Documents",
		"Sports Equipment",
		"Other",
	];
	const locations = [
		"Central Library",
		"Basketball Court",
		"Mechanical Department",
		"Main Gate",
		"CSE Department",
		"Cafeteria",
		"Hostel",
		"Academic Block",
		"Other",
	];

	const handleInputChange = (field: string, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (files) {
			const newImages = Array.from(files).map((file) =>
				URL.createObjectURL(file)
			);
			setImages((prev) => [...prev, ...newImages].slice(0, 3)); // Max 3 images
		}
	};

	const removeImage = (index: number) => {
		setImages((prev) => prev.filter((_, i) => i !== index));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setIsLoading(true);

		// Validation
		if (!postType) {
			setError("Please select whether this is a lost or found item");
			setIsLoading(false);
			return;
		}

		if (!formData.title.trim()) {
			setError("Please provide a title for your post");
			setIsLoading(false);
			return;
		}

		if (!formData.description.trim()) {
			setError("Please provide a description");
			setIsLoading(false);
			return;
		}

		if (!formData.category) {
			setError("Please select a category");
			setIsLoading(false);
			return;
		}

		if (!formData.location) {
			setError("Please specify the location");
			setIsLoading(false);
			return;
		}

		if (!formData.date) {
			setError("Please specify the date");
			setIsLoading(false);
			return;
		}

		// Simulate post creation
		try {
			await new Promise((resolve) => setTimeout(resolve, 1500));
			// Redirect to posts page
			window.location.href = "/posts?message=Post created successfully";
		} catch {
			setError("Failed to create post. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-background">
			{/* Header */}
			<header className="border-b border-border bg-card/50 backdrop-blur-sm">
				<div className="container mx-auto px-4 py-4 flex items-center justify-between">
					<Link
						to="/posts"
						className="flex items-center gap-2"
					>
						<ArrowLeft className="w-4 h-4" />
						<span className="font-medium">Back to Posts</span>
					</Link>
					<Link
						to="/"
						className="flex items-center gap-2"
					>
						<div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
							<Search className="w-4 h-4 text-primary-foreground" />
						</div>
						<span className="font-bold text-xl text-foreground">
							NITC Lost & Found
						</span>
					</Link>
				</div>
			</header>

			<div className="container mx-auto px-4 py-8 max-w-2xl">
				<div className="text-center mb-8">
					<h1 className="text-3xl font-bold mb-2">Report an Item</h1>
					<p className="text-muted-foreground">
						Help the NITC community by reporting lost or found items
					</p>
				</div>

				<Card>
					<CardHeader>
						<CardTitle>Create New Post</CardTitle>
						<CardDescription>
							Provide detailed information to help others identify
							the item
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form
							onSubmit={handleSubmit}
							className="space-y-6"
						>
							{error && (
								<Alert variant="destructive">
									<AlertDescription>{error}</AlertDescription>
								</Alert>
							)}

							{/* Post Type Selection */}
							<div className="space-y-3">
								<Label>What are you reporting?</Label>
								<div className="flex gap-4">
									<Button
										type="button"
										variant={
											postType === "lost"
												? "default"
												: "outline"
										}
										onClick={() => setPostType("lost")}
										className="flex-1"
									>
										Lost Item
									</Button>
									<Button
										type="button"
										variant={
											postType === "found"
												? "default"
												: "outline"
										}
										onClick={() => setPostType("found")}
										className="flex-1"
									>
										Found Item
									</Button>
								</div>
							</div>

							{postType && (
								<>
									{/* Title */}
									<div className="space-y-2">
										<Label htmlFor="title">
											Title{" "}
											<span className="text-destructive">
												*
											</span>
										</Label>
										<Input
											id="title"
											placeholder={`e.g., ${
												postType === "lost"
													? "Lost iPhone 14 Pro"
													: "Found Water Bottle"
											}`}
											value={formData.title}
											onChange={(e) =>
												handleInputChange(
													"title",
													e.target.value
												)
											}
											className="bg-background"
										/>
									</div>

									{/* Description */}
									<div className="space-y-2">
										<Label htmlFor="description">
											Description{" "}
											<span className="text-destructive">
												*
											</span>
										</Label>
										<Textarea
											id="description"
											placeholder={`Provide detailed description including color, size, brand, distinctive features, etc.`}
											value={formData.description}
											onChange={(e) =>
												handleInputChange(
													"description",
													e.target.value
												)
											}
											rows={4}
											className="bg-background"
										/>
									</div>

									{/* Category and Location */}
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div className="space-y-2">
											<Label>
												Category{" "}
												<span className="text-destructive">
													*
												</span>
											</Label>
											<Select
												value={formData.category}
												onValueChange={(value) =>
													handleInputChange(
														"category",
														value
													)
												}
											>
												<SelectTrigger className="bg-background">
													<SelectValue placeholder="Select category" />
												</SelectTrigger>
												<SelectContent>
													{categories.map(
														(category) => (
															<SelectItem
																key={category}
																value={category}
															>
																{category}
															</SelectItem>
														)
													)}
												</SelectContent>
											</Select>
										</div>

										<div className="space-y-2">
											<Label>
												Location{" "}
												<span className="text-destructive">
													*
												</span>
											</Label>
											<Select
												value={formData.location}
												onValueChange={(value) =>
													handleInputChange(
														"location",
														value
													)
												}
											>
												<SelectTrigger className="bg-background">
													<SelectValue placeholder="Select location" />
												</SelectTrigger>
												<SelectContent>
													{locations.map(
														(location) => (
															<SelectItem
																key={location}
																value={location}
															>
																{location}
															</SelectItem>
														)
													)}
												</SelectContent>
											</Select>
										</div>
									</div>

									{/* Date */}
									<div className="space-y-2">
										<Label htmlFor="date">
											Date{" "}
											{postType === "lost"
												? "Lost"
												: "Found"}{" "}
											<span className="text-destructive">
												*
											</span>
										</Label>
										<Input
											id="date"
											type="date"
											value={formData.date}
											onChange={(e) =>
												handleInputChange(
													"date",
													e.target.value
												)
											}
											className="bg-background"
										/>
									</div>

									{/* Images */}
									<div className="space-y-3">
										<Label>Images (Optional)</Label>
										<div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
											<input
												type="file"
												accept="image/*"
												multiple
												onChange={handleImageUpload}
												className="hidden"
												id="image-upload"
											/>
											<label
												htmlFor="image-upload"
												className="cursor-pointer"
											>
												<Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
												<p className="text-sm text-muted-foreground">
													Click to upload images (Max
													3)
												</p>
											</label>
										</div>

										{images.length > 0 && (
											<div className="grid grid-cols-3 gap-4">
												{images.map((image, index) => (
													<div
														key={index}
														className="relative"
													>
														<img
															src={
																image ||
																"/placeholder.svg"
															}
															alt={`Upload ${
																index + 1
															}`}
															className="w-full h-24 object-cover rounded-lg"
														/>
														<Button
															type="button"
															variant="destructive"
															size="sm"
															className="absolute -top-2 -right-2 w-6 h-6 rounded-full p-0"
															onClick={() =>
																removeImage(
																	index
																)
															}
														>
															<X className="w-3 h-3" />
														</Button>
													</div>
												))}
											</div>
										)}
									</div>

									{/* Contact Information */}
									<div className="space-y-2">
										<Label htmlFor="contactInfo">
											Additional Contact Info (Optional)
										</Label>
										<Input
											id="contactInfo"
											placeholder="Phone number, room number, etc."
											value={formData.contactInfo}
											onChange={(e) =>
												handleInputChange(
													"contactInfo",
													e.target.value
												)
											}
											className="bg-background"
										/>
										<p className="text-xs text-muted-foreground">
											Your NITC email will be used as the
											primary contact method
										</p>
									</div>

									{/* Submit Button */}
									<div className="flex gap-4">
										<Button
											type="button"
											variant="outline"
											asChild
											className="flex-1 bg-transparent"
										>
											<Link to="/posts">Cancel</Link>
										</Button>
										<Button
											type="submit"
											disabled={isLoading}
											className="flex-1"
										>
											{isLoading
												? "Creating Post..."
												: "Create Post"}
										</Button>
									</div>
								</>
							)}
						</form>
					</CardContent>
				</Card>

				{/* Tips */}
				<Card className="mt-6">
					<CardHeader>
						<CardTitle className="text-lg">
							Tips for Better Results
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-3">
						<div className="flex items-start gap-3">
							<div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
							<p className="text-sm">
								Be as specific as possible in your description
							</p>
						</div>
						<div className="flex items-start gap-3">
							<div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
							<p className="text-sm">
								Include distinctive features, colors, and brands
							</p>
						</div>
						<div className="flex items-start gap-3">
							<div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
							<p className="text-sm">
								Upload clear photos if available
							</p>
						</div>
						<div className="flex items-start gap-3">
							<div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
							<p className="text-sm">
								Specify the exact location and time when
								possible
							</p>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
