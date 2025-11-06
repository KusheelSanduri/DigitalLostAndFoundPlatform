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
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";

export function ResetPasswordPage() {
	const [isLoading, setIsLoading] = useState(false);
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const [searchParams] = useSearchParams();
	const email = searchParams.get("email");
	const token = searchParams.get("token");

	if (!email || !token) {
		return <div>Invalid verification link.</div>;
	}

	const resetPassword = async (e: React.FormEvent) => {
		try {
			e.preventDefault();
			setIsLoading(true);
			if (password !== confirmPassword) {
				alert("Passwords do not match.");
				return;
			}
			await authApi.resetPassword(email, token, password);
			alert("Password Reset Successfully! You can now log in.");
		} catch {
			alert("Password reset failed. Please try again.");
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
								onSubmit={resetPassword}
								className="space-y-4"
							>
								<div className="space-y-2">
									<Label htmlFor="password-input">
										Enter New Password
									</Label>
									<Input
										id="password-input"
										type="password"
										placeholder="Password"
										value={password}
										onChange={(e) =>
											setPassword(e.target.value)
										}
										required
										className="bg-background"
									/>
								</div>

								<div className="space-y-2">
									<Label htmlFor="confirm-password-input">
										Confirm Password
									</Label>
									<Input
										id="confirm-password-input"
										type="password"
										placeholder="Repeat Password"
										value={confirmPassword}
										onChange={(e) =>
											setConfirmPassword(e.target.value)
										}
										required
										className="bg-background"
									/>
								</div>
								<Button
									type="submit"
									className="w-full"
									disabled={isLoading}
								>
									{isLoading
										? "Resetting Password..."
										: "Reset Password"}
								</Button>
							</form>

							<div className="mt-6 text-center">
								<p className="text-sm text-muted-foreground">
									Remember Your Password?{" "}
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
