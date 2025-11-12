import { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import {
	Flag,
	Users,
	FileText,
	Search,
	ArrowRight,
	Clock,
} from "lucide-react"
import {Link} from "react-router-dom"
import { adminStatsApi } from "../../api/adminStatsApi"

export default function AdminDashboard() {
	const [stats, setStats] = useState({
		totalUsers: 0,
		activePosts: 0,
		totalDisputes: 0,
		pendingDisputes: 0,
		resolvedDisputes: 0,
		postsToday: 0,
		usersToday: 0,
		disputesToday: 0,
	});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		adminStatsApi.getStats()
			.then(res => setStats(res.data))
			.finally(() => setLoading(false));
	}, []);

	return (
		<div className="min-h-screen bg-background">
			{/* Header */}
			<header className="border-b border-border bg-card/50 backdrop-blur-sm">
				<div className="container mx-auto px-4 py-4 flex items-center justify-between">
					<div className="flex items-center gap-2">
						<h1 className="text-2xl font-bold">Admin Dashboard</h1>
					</div>
					<Link to="/" className="flex items-center gap-2">
						<div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
							<Search className="w-4 h-4 text-primary-foreground" />
						</div>
						<span className="font-bold text-xl text-foreground">NITC Lost & Found</span>
					</Link>
				</div>
			</header>

			<div className="container mx-auto px-4 py-8">
				{/* Welcome Section */}
				<div className="mb-8">
					<h2 className="text-3xl font-bold mb-2">Welcome back, Admin</h2>
					<p className="text-muted-foreground">
						Manage the NITC Lost & Found platform, monitor disputes, and oversee community activities.
					</p>
				</div>

				{/* Quick Stats */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
					<Card>
						<CardContent className="p-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-sm font-medium text-muted-foreground">Total Users</p>
									<p className="text-2xl font-bold">{loading ? "..." : stats.totalUsers}</p>
									{/* <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
										<TrendingUp className="w-3 h-3" />+{stats.usersToday} today
									</p> */}
								</div>
								<Users className="w-8 h-8 text-primary" />
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardContent className="p-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-sm font-medium text-muted-foreground">Active Posts</p>
									<p className="text-2xl font-bold">{loading ? "..." : stats.activePosts}</p>
									{/* <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
										<TrendingUp className="w-3 h-3" />+{stats.postsToday} today
									</p> */}
								</div>
								<FileText className="w-8 h-8 text-primary" />
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardContent className="p-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-sm font-medium text-muted-foreground">Total Disputes</p>
									<p className="text-2xl font-bold">{loading ? "..." : stats.totalDisputes}</p>
									{/* <p className="text-xs text-yellow-600 flex items-center gap-1 mt-1">
										<AlertTriangle className="w-3 h-3" />+{stats.disputesToday} today
									</p> */}
								</div>
								<Flag className="w-8 h-8 text-destructive" />
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardContent className="p-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-sm font-medium text-muted-foreground">Pending Disputes</p>
									<p className="text-2xl font-bold text-yellow-600">{loading ? "..." : stats.pendingDisputes}</p>
									<p className="text-xs text-muted-foreground mt-1">{loading ? "..." : stats.resolvedDisputes} resolved</p>
								</div>
								<Clock className="w-8 h-8 text-yellow-600" />
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Quick Actions */}
				<div className="mb-8">
					<Card className="hover:shadow-lg transition-shadow w-full">
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Flag className="w-5 h-5 text-destructive" />
								Dispute Management
							</CardTitle>
							<CardDescription>
								Review and resolve user disputes, manage reported content, and maintain platform safety.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-3 mb-4">
								<div className="flex items-center justify-between">
									<span className="text-sm">Pending Reviews</span>
									<Badge variant="secondary">{loading ? "..." : stats.pendingDisputes}</Badge>
								</div>
								<div className="flex items-center justify-between">
									<span className="text-sm">Resolved</span>
									<Badge variant="outline">{loading ? "..." : stats.resolvedDisputes}</Badge>
								</div>
							</div>
							<Button asChild className="w-full">
								<Link to="/admin/disputes">
									View All Disputes
									<ArrowRight className="w-4 h-4 ml-2" />
								</Link>
							</Button>
						</CardContent>
					</Card>
				</div>

			</div>
		</div>
	)
}
