import {Link, useNavigate} from "react-router-dom";
import {Navbar} from "../../components/common/Navbar";
import {Eye, EyeOff} from "lucide-react";
import {Button} from "../../components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "../../components/ui/card";
import {Input} from "../../components/ui/input";
import {Label} from "../../components/ui/label";
import {useEffect, useState, useTransition} from "react";
import {useAuth} from "../../auth/useAuth";
import {toast} from "sonner";

export function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [isPending, startTransition] = useTransition();

	const {login, user} = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (user) {
			navigate("/posts");
		}
	}, [navigate, user]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		startTransition(async () => {
			try {
				await login(email, password);
				toast.success("Logged in successfully");
				console.log("Sending to posts");
				navigate("/posts");

				// eslint-disable-next-line @typescript-eslint/no-explicit-any
			} catch (err: any) {
				toast.error(err.response.data.message || "Login failed. Something went wrong");
				if (err.response.data.errorCode == "ACCOUNT_NOT_VERIFIED") {
					navigate("/not-verified", {
						state: {
							email,
						},
					});
				}
			}
		});
	};

	return (
		<>
			<Navbar />
			<div className="min-h-[calc(100vh-70px)] bg-background flex items-center justify-center p-4">
				<div className="w-full max-w-md">
					<Card>
						<CardHeader className="text-center">
							<CardTitle>Sign In</CardTitle>
							<CardDescription>Enter your credentials to access your account</CardDescription>
						</CardHeader>
						<CardContent>
							<form onSubmit={handleSubmit} className="space-y-4">
								<div className="space-y-2">
									<Label htmlFor="email">NITC Email</Label>
									<Input
										id="email"
										type="email"
										placeholder="your.name@nitc.ac.in"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										required
										className="bg-background"
									/>
								</div>

								<div className="space-y-2">
									<Label htmlFor="password">Password</Label>
									<div className="relative">
										<Input
											id="password"
											type={showPassword ? "text" : "password"}
											placeholder="Enter your password"
											value={password}
											onChange={(e) => setPassword(e.target.value)}
											required
											className="bg-background pr-10"
										/>
										<Button
											type="button"
											variant="ghost"
											size="sm"
											className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
											onClick={() => setShowPassword(!showPassword)}
										>
											{showPassword ? (
												<EyeOff className="w-4 h-4" />
											) : (
												<Eye className="w-4 h-4" />
											)}
										</Button>
									</div>
								</div>

								<div className="flex items-center justify-between w-full">
									<Link
										to="/forgot-password"
										className="text-sm text-primary hover:underline hover:text-primary/80"
									>
										Forgot password?
									</Link>
								</div>

								<Button type="submit" className="w-full" disabled={isPending}>
									{isPending ? "Signing in..." : "Sign In"}
								</Button>
							</form>

							<div className="mt-6 text-center">
								<p className="text-sm text-muted-foreground">
									Don't have an account?{" "}
									<Link to="/register" className="text-primary hover:underline font-medium">
										Sign up here
									</Link>
								</p>
							</div>
						</CardContent>
					</Card>

					<div className="mt-6 text-center">
						<p className="text-xs text-muted-foreground">
							By signing in, you agree to our{" "}
							<Link to="/terms" className="hover:underline">
								Terms of Service
							</Link>{" "}
							and{" "}
							<Link to="/privacy" className="hover:underline">
								Privacy Policy
							</Link>
						</p>
					</div>
				</div>
			</div>
		</>
	);
}
