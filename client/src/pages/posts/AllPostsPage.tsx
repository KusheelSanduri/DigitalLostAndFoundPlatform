import {Search} from "lucide-react";
import {useEffect, useState} from "react";
import {Input} from "../../components/ui/input";
import {Button} from "../../components/ui/button";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../../components/ui/select";
import {Navbar} from "../../components/common/Navbar";
import {PostCard, type PostCardProps} from "../../components/common/PostCard";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "../../components/ui/pagination";
import {useAuth} from "../../auth/useAuth";
import {useNavigate} from "react-router-dom";
import {postsApi} from "../../api/postsApi";
import {toast} from "sonner";

export default function AllPostsPage() {
	const {user} = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (!user) {
			navigate("/login");
		}
	}, [navigate, user]);

	// Pagination State
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);

	// Filter States
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("Any");
	const [selectedLocation, setSelectedLocation] = useState("Any");

	// Categories and location state
	const [categories, setCategories] = useState<string[]>([]);
	const [locations, setLocations] = useState<string[]>([]);

	// Posts State
	const [posts, setPosts] = useState<PostCardProps["post"][]>([]);

	const fetchOnMount = async () => {
		await postsApi.getPosts(1).then((response) => {
			console.log("Fetched posts:", response.data.data.posts);
			setPosts(response.data.data.posts);
			setCurrentPage(response.data.data.currentPage);
			setTotalPages(response.data.data.totalPages);
		});

		await postsApi.getLocations().then((locRes) => {
			setLocations(locRes.data.data.locations);
		});

		await postsApi.getCategories().then((catRes) => {
			setCategories(catRes.data.data.categories);
		});
	};

	// Fetch posts, categories, locations from API when component mounts
	useEffect(() => {
		fetchOnMount();
	}, []);

	useEffect(() => {
		postsApi.getPosts(currentPage, searchQuery, selectedCategory, selectedLocation).then((response) => {
			console.log("Fetched posts with query:", response.data.data.posts);
			setPosts(response.data.data.posts);
			setCurrentPage(response.data.data.currentPage);
			setTotalPages(response.data.data.totalPages);
		});
	}, [searchQuery, currentPage, selectedCategory, selectedLocation]);

	const handleDeletePost = async (id: string) => {
		try {
			await postsApi.deletePost(id);
			toast.success("Post Deleted.");
			postsApi.getPosts(currentPage, searchQuery, selectedCategory, selectedLocation).then((response) => {
				setPosts(response.data.data.posts);
				setCurrentPage(response.data.data.currentPage);
				setTotalPages(response.data.data.totalPages);
			});
		} catch {
			toast.error("Post Deletion Failed. Something went wrong.");
		}
	};

	const handleMarkClaimedPost = async (id: string) => {
		try {
			await postsApi.markClaimedPost(id);
			toast.success("Post marked as claimed.");
			postsApi.getPosts(currentPage, searchQuery, selectedCategory, selectedLocation).then((response) => {
				setPosts(response.data.data.posts);
				setCurrentPage(response.data.data.currentPage);
				setTotalPages(response.data.data.totalPages);
			});
		} catch {
			toast.error("Post marking as claimed Failed. Something went wrong.");
		}
	};

	return (
		<div className="min-h-screen bg-background">
			<Navbar />
			<div className="container mx-auto px-4 py-8">
				{/* Search and Filters */}
				<div className="mb-8">
					<div className="flex flex-col lg:flex-row gap-4 mb-6">
						<div className="flex-1 relative">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
							<Input
								placeholder="Search for lost or found items..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="pl-10 bg-background"
							/>
						</div>
						<div className="flex gap-2">
							<Select value={selectedCategory} onValueChange={setSelectedCategory}>
								<SelectTrigger className="w-[180px] bg-background">
									<SelectValue placeholder="Category" />
								</SelectTrigger>
								<SelectContent>
									{categories.map((category) => (
										<SelectItem key={category} value={category}>
											{category === "all" ? "All Categories" : category}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<Select value={selectedLocation} onValueChange={setSelectedLocation}>
								<SelectTrigger className="w-[180px] bg-background">
									<SelectValue placeholder="Location" />
								</SelectTrigger>
								<SelectContent>
									{locations.map((location) => (
										<SelectItem key={location} value={location}>
											{location === "all" ? "All Locations" : location}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					</div>
				</div>

				{/* Posts Grid/List */}
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
					{posts.map((post) => (
						<PostCard
							key={post._id}
							post={post}
							deleteFn={handleDeletePost}
							markClaimedFn={handleMarkClaimedPost}
						/>
					))}
				</div>

				{posts.length === 0 && (
					<div className="text-center py-12">
						<div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
							<Search className="w-8 h-8 text-muted-foreground" />
						</div>
						<h3 className="text-lg font-semibold mb-2">No items found</h3>
						<p className="text-muted-foreground mb-4">
							Try adjusting your search criteria or browse all items.
						</p>
						<Button
							onClick={() => {
								setSearchQuery("");
								setSelectedCategory("Any");
								setSelectedLocation("Any");
								setCurrentPage(1);
							}}
						>
							Clear Filters
						</Button>
					</div>
				)}
			</div>

			<Pagination>
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious
							href="#"
							size="sm"
							onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
							aria-disabled={currentPage === 1}
						/>
					</PaginationItem>

					{Array.from({length: totalPages}, (_, i) => (
						<PaginationItem key={i}>
							<PaginationLink
								size="sm"
								isActive={i + 1 === currentPage}
								onClick={() => setCurrentPage(i + 1)}
							>
								{i + 1}
							</PaginationLink>
						</PaginationItem>
					))}

					<PaginationItem>
						<PaginationNext
							size="sm"
							href="#"
							onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
							aria-disabled={currentPage === totalPages}
						/>
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</div>
	);
}
