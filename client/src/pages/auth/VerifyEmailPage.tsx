import { useState } from "react";
import { Navbar } from "../../components/common/Navbar";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "../../components/ui/button";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "../../components/ui/card";
import { authApi } from "../../api/authApi";

export function VerifyEmailPage() {
	const [isLoading, setIsLoading] = useState(false);
	const [searchParams] = useSearchParams();
	const email = searchParams.get("email");
	const token = searchParams.get("token");

	if (!email || !token) {
		return <div>Invalid verification link.</div>;
	}

	const verifyEmail = async (e: React.FormEvent) => {
		try {
			e.preventDefault();
			setIsLoading(true);
			await authApi.verifyEmail(email, token);
			alert("Email Verified Successfully! You can now log in.");
		} catch {
			alert("Email verification failed. Please try again.");
		} finally {
			setIsLoading(false);
		}
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
								Enter your NITC email address and we'll send you
								a reset link
							</CardDescription>
						</CardHeader>
						<CardContent>
							<form
								onSubmit={verifyEmail}
								className="space-y-4"
							>
								<Button
									type="submit"
									className="w-full"
									disabled={isLoading}
								>
									{isLoading
										? "Verifying..."
										: "Verify Email"}
								</Button>
							</form>

							<div className="mt-6 text-center">
								<p className="text-sm text-muted-foreground">
									Already verified?{" "}
									<Link
										to="/login"
										className="text-primary hover:underline font-medium"
									>
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
