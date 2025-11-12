import {MapPin, Calendar, MessageCircle, Tag, TrashIcon, Check} from "lucide-react";
import {Badge} from "../ui/badge";
import {Card, CardHeader, CardTitle, CardDescription, CardContent} from "../ui/card";
import {Button} from "../ui/button";
import {useNavigate} from "react-router-dom";

export type PostCardProps = {
	post: {
		_id: string;
		title: string;
		description: string;
		location: string;
		category: string;
		date: string;
		keywords?: string[];
		type: "lost" | "found";
		imageUrl: string;
		isOwner: boolean;
		ownerId: string;
		createdAt: string;
		status: "claimed" | "unclaimed";
	};
	deleteFn: (id: string) => void;
	markClaimedFn: (id: string) => void;
};

export function PostCard({post, deleteFn, markClaimedFn}: PostCardProps) {
	const {_id, title, description, location, date, type, imageUrl, category, isOwner, status} = post;

	const navigate = useNavigate();

	const altImageUrl = "https://placehold.co/600x400?text=No+Image";

	const handleClickComment = () => {
		navigate(`/chat/${_id}`);
	};

	return (
		<Card key={_id} className={`py-0 gap-3`}>
			<>
				<div className="relative">
					<img
						src={imageUrl && imageUrl != "null" ? imageUrl : altImageUrl}
						alt={title}
						className="w-full h-48 object-cover rounded-t-lg"
					/>

					<div className="absolute top-2 left-2 space-x-2">
						{/* Shows the type of the post */}
						<Badge variant={type === "lost" ? "destructive" : "default"}>
							{type === "lost" ? "Lost" : "Found"}
						</Badge>

						{/* if status is claimed, show claimed badge */}
						{status == "claimed" && (
							<Badge variant="outline" className="bg-background">
								Claimed
							</Badge>
						)}
					</div>

					{isOwner === true && (
						<div className="absolute top-2 right-2 space-x-2">
							<Button
								size="icon"
								variant="outline"
								disabled={status === "claimed"}
								title={status === "claimed" ? "Already Marked as Claimed" : "Mark as Claimed"}
								className={`${status == "claimed" ? "bg-green-400" : ""}`}
								onClick={() => {
									markClaimedFn(_id);
								}}
							>
								<Check className="w-4 h-4" />
							</Button>

							<Button
								size="icon"
								variant="destructive"
								title="Delete Post"
								onClick={() => {
									deleteFn(_id);
								}}
							>
								<TrashIcon className="w-4 h-4" />
							</Button>
						</div>
					)}
				</div>
				<CardHeader className="pb-2">
					<CardTitle className="text-lg line-clamp-1">{title}</CardTitle>
					<CardDescription className="line-clamp-2">{description}</CardDescription>
				</CardHeader>
				<CardContent className="pt-0">
					<div className="space-y-2 mb-4">
						<div className="flex items-center gap-2 text-sm text-muted-foreground">
							<MapPin className="w-3 h-3" />
							{location}
						</div>
						<div className="flex items-center gap-2 text-sm text-muted-foreground">
							<Tag className="w-3 h-3" />
							{category}
						</div>
						<div className="flex items-center gap-2 text-sm text-muted-foreground">
							<Calendar className="w-3 h-3" />
							{new Date(date).toLocaleDateString()}
						</div>
					</div>
					<div className="flex items-center justify-between pb-6">
						<div className="flex items-center gap-4 text-sm text-muted-foreground">
							<Button
								size="sm"
								variant="outline"
								className="p-1"
								onClick={handleClickComment}
								disabled={status === "claimed"}
							>
								<MessageCircle className="w-4 h-4" />
								{status === "claimed" ? "Already Claimed" : "Chat"}
							</Button>
							{/* <div className="flex items-center gap-1 border-2 px-2 py-1 rounded-md border-muted-foreground cursor-pointer"></div> */}
						</div>
					</div>
				</CardContent>
			</>
		</Card>
	);
}
