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
	ArrowRight,
	Clock,
} from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import { adminStatsApi } from "../../api/adminStatsApi";
import { useAuth } from "../../auth/useAuth";
import { Navbar } from "../../components/common/Navbar";

export default function AdminDashboard() {
	const { user } = useAuth();
	const isAdmin = user?.role === "admin";

	const [Stats, setStats] = useState({
		totalUsers: 0,
		activePosts: 0,
		totalDisputes: 0,
		pendingDisputes: 0,
		resolvedDisputes: 0,
	});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (isAdmin) {
			adminStatsApi
				.getStats()
				.then((res) => setStats(res.data))
				.catch((err) => console.error("Failed to load stats:", err))
				.finally(() => setLoading(false));
		}
	}, [isAdmin]);

	// 🔒 Redirect non-admin users
	if (!isAdmin) {
		return <Navigate to="/posts" replace />;
	}

	return (
		<div className="min-h-screen bg-background">
			{/* Header */}
			<Navbar/>

			<div className="container mx-auto py-8 px-12">
				{/* Welcome Section */}
				<div className="mb-8">
					<h2 className="text-3xl font-bold mb-2">Welcome back, Admin</h2>
					<p className="text-muted-foreground">
						Manage the platform, monitor and resolve disputes.
					</p>
				</div>

				{/* Quick Stats */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
					{/* Total Users */}
					<Card>
						<CardContent className="p-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-sm font-medium text-muted-foreground">
										Total Users
									</p>
									<p className="text-2xl font-bold">
										{loading ? "..." : Stats.totalUsers}
									</p>
								</div>
								<Users className="w-8 h-8 text-primary" />
							</div>
						</CardContent>
					</Card>

					{/* Active Posts */}
					<Card>
						<CardContent className="p-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-sm font-medium text-muted-foreground">
										Active Posts
									</p>
									<p className="text-2xl font-bold">
										{loading ? "..." : Stats.activePosts}
									</p>
								</div>
								<FileText className="w-8 h-8 text-primary" />
							</div>
						</CardContent>
					</Card>

					{/* Total Disputes */}
					<Card>
						<CardContent className="p-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-sm font-medium text-muted-foreground">
										Total Disputes
									</p>
									<p className="text-2xl font-bold">
										{loading ? "..." : Stats.totalDisputes}
									</p>
								</div>
								<Flag className="w-8 h-8 text-destructive" />
							</div>
						</CardContent>
					</Card>

					{/* Pending Disputes */}
					<Card>
						<CardContent className="p-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-sm font-medium text-muted-foreground">
										Pending Disputes
									</p>
									<p className="text-2xl font-bold text-yellow-600">
										{loading ? "..." : Stats.pendingDisputes}
									</p>
									<p className="text-xs text-muted-foreground mt-1">
										{loading ? "..." : Stats.resolvedDisputes} resolved
									</p>
								</div>
								<Clock className="w-8 h-8 text-yellow-600" />
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Dispute Management */}
				<div className="mb-8">
					<Card className="hover:shadow-lg transition-shadow w-full">
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Flag className="w-5 h-5 text-destructive" />
								Dispute Management
							</CardTitle>
							<CardDescription>
								Review and resolve user disputes, manage reported content, and
								maintain platform safety.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-3 mb-4">
								<div className="flex items-center justify-between">
									<span className="text-sm">Pending Reviews</span>
									<Badge variant="secondary">
										{loading ? "..." : Stats.pendingDisputes}
									</Badge>
								</div>
								<div className="flex items-center justify-between">
									<span className="text-sm">Resolved</span>
									<Badge variant="outline">
										{loading ? "..." : Stats.resolvedDisputes}
									</Badge>
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
	);
}
