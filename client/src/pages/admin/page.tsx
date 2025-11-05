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
	Shield,
	Flag,
	Users,
	FileText,
	BarChart3,
	Settings,
	Search,
	ArrowRight,
	AlertTriangle,
	CheckCircle,
	Clock,
	TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
	// Mock stats data
	const stats = {
		totalUsers: 1247,
		activePosts: 89,
		totalDisputes: 12,
		pendingDisputes: 5,
		resolvedDisputes: 7,
		postsToday: 15,
		usersToday: 23,
		disputesToday: 2,
	};

	return (
		<div className="min-h-screen bg-background">
			{/* Header */}
			<header className="border-b border-border bg-card/50 backdrop-blur-sm">
				<div className="container mx-auto px-4 py-4 flex items-center justify-between">
					<div className="flex items-center gap-2">
						<Shield className="w-6 h-6 text-primary" />
						<h1 className="text-2xl font-bold">Admin Dashboard</h1>
					</div>
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

			<div className="container mx-auto px-4 py-8">
				{/* Welcome Section */}
				<div className="mb-8">
					<h2 className="text-3xl font-bold mb-2">
						Welcome back, Admin
					</h2>
					<p className="text-muted-foreground">
						Manage the NITC Lost & Found platform, monitor disputes,
						and oversee community activities.
					</p>
				</div>

				{/* Quick Stats */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
					<Card>
						<CardContent className="p-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-sm font-medium text-muted-foreground">
										Total Users
									</p>
									<p className="text-2xl font-bold">
										{stats.totalUsers}
									</p>
									<p className="text-xs text-green-600 flex items-center gap-1 mt-1">
										<TrendingUp className="w-3 h-3" />+
										{stats.usersToday} today
									</p>
								</div>
								<Users className="w-8 h-8 text-primary" />
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardContent className="p-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-sm font-medium text-muted-foreground">
										Active Posts
									</p>
									<p className="text-2xl font-bold">
										{stats.activePosts}
									</p>
									<p className="text-xs text-green-600 flex items-center gap-1 mt-1">
										<TrendingUp className="w-3 h-3" />+
										{stats.postsToday} today
									</p>
								</div>
								<FileText className="w-8 h-8 text-primary" />
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardContent className="p-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-sm font-medium text-muted-foreground">
										Total Disputes
									</p>
									<p className="text-2xl font-bold">
										{stats.totalDisputes}
									</p>
									<p className="text-xs text-yellow-600 flex items-center gap-1 mt-1">
										<AlertTriangle className="w-3 h-3" />+
										{stats.disputesToday} today
									</p>
								</div>
								<Flag className="w-8 h-8 text-destructive" />
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardContent className="p-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-sm font-medium text-muted-foreground">
										Pending Disputes
									</p>
									<p className="text-2xl font-bold text-yellow-600">
										{stats.pendingDisputes}
									</p>
									<p className="text-xs text-muted-foreground mt-1">
										{stats.resolvedDisputes} resolved
									</p>
								</div>
								<Clock className="w-8 h-8 text-yellow-600" />
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Quick Actions */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
					<Card className="hover:shadow-lg transition-shadow">
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Flag className="w-5 h-5 text-destructive" />
								Dispute Management
							</CardTitle>
							<CardDescription>
								Review and resolve user disputes, manage
								reported content, and maintain platform safety.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-3 mb-4">
								<div className="flex items-center justify-between">
									<span className="text-sm">
										Pending Reviews
									</span>
									<Badge variant="secondary">
										{stats.pendingDisputes}
									</Badge>
								</div>
								<div className="flex items-center justify-between">
									<span className="text-sm">
										Resolved Today
									</span>
									<Badge variant="outline">3</Badge>
								</div>
								<div className="flex items-center justify-between">
									<span className="text-sm">
										High Priority
									</span>
									<Badge variant="destructive">2</Badge>
								</div>
							</div>
							<Button
								asChild
								className="w-full"
							>
								<Link to="/admin/disputes">
									View All Disputes
									<ArrowRight className="w-4 h-4 ml-2" />
								</Link>
							</Button>
						</CardContent>
					</Card>

					<Card className="hover:shadow-lg transition-shadow">
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Users className="w-5 h-5 text-primary" />
								User Management
							</CardTitle>
							<CardDescription>
								Manage user accounts, monitor activity, and
								handle account-related issues.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-3 mb-4">
								<div className="flex items-center justify-between">
									<span className="text-sm">
										Active Users
									</span>
									<Badge variant="secondary">1,247</Badge>
								</div>
								<div className="flex items-center justify-between">
									<span className="text-sm">
										New Registrations
									</span>
									<Badge variant="outline">23</Badge>
								</div>
								<div className="flex items-center justify-between">
									<span className="text-sm">
										Suspended Accounts
									</span>
									<Badge variant="destructive">5</Badge>
								</div>
							</div>
							<Button
								variant="outline"
								className="w-full bg-transparent"
							>
								Manage Users
								<ArrowRight className="w-4 h-4 ml-2" />
							</Button>
						</CardContent>
					</Card>
				</div>

				{/* Additional Admin Tools */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					<Card className="hover:shadow-md transition-shadow">
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<FileText className="w-5 h-5" />
								Content Moderation
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-sm text-muted-foreground mb-4">
								Review flagged posts, manage content quality,
								and enforce community guidelines.
							</p>
							<Button
								variant="outline"
								size="sm"
								className="w-full bg-transparent"
							>
								Review Content
							</Button>
						</CardContent>
					</Card>

					<Card className="hover:shadow-md transition-shadow">
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<BarChart3 className="w-5 h-5" />
								Analytics
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-sm text-muted-foreground mb-4">
								View platform statistics, user engagement
								metrics, and success rates.
							</p>
							<Button
								variant="outline"
								size="sm"
								className="w-full bg-transparent"
							>
								View Analytics
							</Button>
						</CardContent>
					</Card>

					<Card className="hover:shadow-md transition-shadow">
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Settings className="w-5 h-5" />
								System Settings
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-sm text-muted-foreground mb-4">
								Configure platform settings, manage categories,
								and update system preferences.
							</p>
							<Button
								variant="outline"
								size="sm"
								className="w-full bg-transparent"
							>
								Manage Settings
							</Button>
						</CardContent>
					</Card>
				</div>

				{/* Recent Activity */}
				<Card className="mt-8">
					<CardHeader>
						<CardTitle>Recent Activity</CardTitle>
						<CardDescription>
							Latest platform activities and important events
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
								<AlertTriangle className="w-4 h-4 text-yellow-600" />
								<div className="flex-1">
									<p className="text-sm font-medium">
										New dispute reported
									</p>
									<p className="text-xs text-muted-foreground">
										Fraudulent claim on iPhone post - 2
										minutes ago
									</p>
								</div>
								<Badge variant="secondary">High Priority</Badge>
							</div>
							<div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
								<CheckCircle className="w-4 h-4 text-green-600" />
								<div className="flex-1">
									<p className="text-sm font-medium">
										Dispute resolved
									</p>
									<p className="text-xs text-muted-foreground">
										Wallet dispute marked as resolved - 1
										hour ago
									</p>
								</div>
								<Badge variant="outline">Resolved</Badge>
							</div>
							<div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
								<Users className="w-4 h-4 text-blue-600" />
								<div className="flex-1">
									<p className="text-sm font-medium">
										New user registered
									</p>
									<p className="text-xs text-muted-foreground">
										student@nitc.ac.in joined the platform -
										3 hours ago
									</p>
								</div>
								<Badge variant="outline">New User</Badge>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
