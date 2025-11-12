import {useEffect, useTransition} from "react";
import {Navbar} from "../../components/common/Navbar";
import {Button} from "../../components/ui/button";
import {Card, CardHeader, CardTitle, CardDescription, CardContent} from "../../components/ui/card";
import {Input} from "../../components/ui/input";
import {authApi} from "../../api/authApi";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useAuth} from "../../auth/useAuth";
import {toast} from "sonner";

export function ResendVerificationLinkPage() {
	const state = useLocation().state;
	const [isPending, startTransition] = useTransition();
	const navigate = useNavigate();
	const {user} = useAuth();

	// if already logged in, redirect to items page
	useEffect(() => {
		if (user) {
			navigate("/posts");
		}
	}, [navigate, user]);

	if (!state || !state.email) {
		return <p>Something went wrong...</p>;
	}

	const submit = async (e: React.FormEvent) => {
		try {
			e.preventDefault();
			await authApi.resendVerificationLink(state.email);
			toast.success("Verification link sent. Please Check your inbox.");
		} catch {
			toast.error("Failed to send verification link. Please try again.");
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
							<CardTitle>Your Email is not Verified</CardTitle>
							<CardDescription>
								Kindly check your mailbox for verification email. If you want us to resend the
								verification link, click the button below.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<form onSubmit={handleSubmit} className="space-y-4">
								<div className="space-y-2">
									<Input
										id="email"
										type="email"
										placeholder="your.name@nitc.ac.in"
										value={state.email}
										disabled
										required
										className="bg-gray-200"
									/>
								</div>

								<Button type="submit" className="w-full" disabled={isPending}>
									{isPending ? "Sending Verification Link..." : "Resend Verification Link"}
								</Button>
							</form>
							<div className="mt-6 text-center">
								<p className="text-sm text-muted-foreground">
									Want to go back to login?{" "}
									<Link to="/login" className="text-primary hover:underline font-medium">
										Click here
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
