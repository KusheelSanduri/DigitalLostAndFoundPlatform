import {useEffect, useState, useTransition} from "react";
import {Navbar} from "../../components/common/Navbar";
import {Link, useNavigate} from "react-router-dom";
import {Label} from "@radix-ui/react-label";
import {Button} from "../../components/ui/button";
import {Card, CardHeader, CardTitle, CardDescription, CardContent} from "../../components/ui/card";
import {Input} from "../../components/ui/input";
import {authApi} from "../../api/authApi";
import {useAuth} from "../../auth/useAuth";
import {toast} from "sonner";

export function ForgotPasswordPage() {
	const {user} = useAuth();
	const [email, setEmail] = useState("");
	const [isPending, startTransition] = useTransition();
	const navigate = useNavigate();

	useEffect(() => {
		if (user) {
			navigate("/posts");
		}
	}, [navigate, user]);

	const submit = async (e: React.FormEvent) => {
		try {
			e.preventDefault();
			await authApi.forgotPassword(email);
			toast.success("Reset link sent! Check your mailbox.");
		} catch {
			toast.error("Failed to send reset link. Please try again.");
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		startTransition(async () => {
			await submit(e);
		});
	};

	return (
		<>
			<Navbar />
			<div className="min-h-[calc(100vh-70px)] bg-background flex items-center justify-center p-4">
				<div className="w-full max-w-md">
					<Card>
						<CardHeader className="text-center">
							<CardTitle>Forgot Password?</CardTitle>
							<CardDescription>
								Enter your NITC email address and we'll send you a reset link
							</CardDescription>
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

								<Button type="submit" className="w-full" disabled={isPending}>
									{isPending ? "Sending Reset Link..." : "Send Reset Link"}
								</Button>
							</form>

							<div className="mt-6 text-center">
								<p className="text-sm text-muted-foreground">
									Remember your password?{" "}
									<Link to="/login" className="text-primary hover:underline font-medium">
										Sign in here
									</Link>
								</p>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</>
	);
}
