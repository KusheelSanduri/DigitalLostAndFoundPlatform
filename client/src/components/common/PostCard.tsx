/* eslint-disable @typescript-eslint/no-unused-vars */
// {
//         "_id": "6907087107732e3646b7d8eb",
//         "title": "Found Blue Umbrella in Library",
//         "description": "Picked up a blue umbrella left on the second floor of the library near the study desks.",
//         "location": "Central Library, NIT Calicut",
//         "date": "2025-11-01T10:45:00.000Z",
//         "keywords": [],
//         "type": "found",
//         "ownerId": "69068860283630366475ef7c",
//         "createdAt": "2025-11-02T07:29:53.747Z",
//         "__v": 0
//     }

import { MapPin, Calendar, MessageCircle } from "lucide-react";
import { Badge } from "../ui/badge";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "../ui/card";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

export type PostCardProps = {
	post: {
		_id: string;
		title: string;
		description: string;
		location: string;
		date: string;
		keywords?: string[];
		type: "lost" | "found";
		ownerId: string;
		createdAt: string;
	};
};

export function PostCard({ post }: PostCardProps) {
	const {
		_id,
		title,
		description,
		location,
		date,
		keywords,
		type,
		ownerId,
		createdAt,
	} = post;

	const imageUrl =
		"https://m.media-amazon.com/images/I/71qa1cXgV6L._AC_UF1000,1000_QL80_.jpg";

	const status: "claimed" | "unclaimed" = "unclaimed"; // Placeholder for post status
	return (
		<Card
			key={_id}
			className={`hover:shadow-lg transition-shadow py-0`}
		>
			<>
				<div className="relative">
					<img
						src={imageUrl}
						alt={title}
						className="w-full h-48 object-cover rounded-t-lg"
					/>
					<Badge
						variant={type === "lost" ? "destructive" : "default"}
						className="absolute top-2 left-2"
					>
						{type === "lost" ? "Lost" : "Found"}
					</Badge>

					{
						// if staus is claimed, show claimed badge
						<Badge
							variant="outline"
							className="absolute top-2 right-2 bg-background"
						>
							Claimed
						</Badge>
					}
				</div>
				<CardHeader className="pb-2">
					<CardTitle className="text-lg line-clamp-1">
						{title}
					</CardTitle>
					<CardDescription className="line-clamp-2">
						{description}
					</CardDescription>
				</CardHeader>
				<CardContent className="pt-0">
					<div className="space-y-2 mb-4">
						<div className="flex items-center gap-2 text-sm text-muted-foreground">
							<MapPin className="w-3 h-3" />
							{location}
						</div>
						<div className="flex items-center gap-2 text-sm text-muted-foreground">
							<Calendar className="w-3 h-3" />
							{new Date(date).toLocaleDateString()}
						</div>
					</div>
					<div className="flex items-center justify-between pb-6">
						<div className="flex items-center gap-4 text-sm text-muted-foreground">
							<Link to={`/comments/${_id}`}>
								<Button
									size="sm"
									variant="outline"
									className="p-1"
								>
									<MessageCircle className="w-4 h-4" />
									Comments
								</Button>
							</Link>
							{/* <div className="flex items-center gap-1 border-2 px-2 py-1 rounded-md border-muted-foreground cursor-pointer"></div> */}
						</div>
					</div>
				</CardContent>
			</>
		</Card>
	);
}
