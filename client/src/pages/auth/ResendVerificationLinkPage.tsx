import { useEffect, useState } from "react";
import { Navbar } from "../../components/common/Navbar";
import { Label } from "@radix-ui/react-label";
import { Button } from "../../components/ui/button";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { authApi } from "../../api/authApi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";

export function ResendVerificationLinkPage() {
	const [email, setEmail] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const { user } = useAuth();

	// if already logged in, redirect to items page
	useEffect(() => {
		if (user) {
			navigate("/items");
		}
	}, [navigate, user]);

	const handleSubmit = async (e: React.FormEvent) => {
		try {
			e.preventDefault();
			setIsLoading(true);
			await authApi.resendVerificationLink(email);
			alert("Verification link sent! Check your mailbox");
		} catch {
			alert("Failed to send verification link. Please try again.");
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
							<CardTitle>Verify your Email</CardTitle>
							<CardDescription>
								If you want us to resend the verification link,
								enter your email with which you registered
								below.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<form
								onSubmit={handleSubmit}
								className="space-y-4"
							>
								{/* {error && (
								<Alert variant="destructive">
									<AlertDescription>{error}</AlertDescription>
								</Alert>
							)} */}

								<div className="space-y-2">
									<Label htmlFor="email">NITC Email</Label>
									<Input
										id="email"
										type="email"
										placeholder="your.name@nitc.ac.in"
										value={email}
										onChange={(e) =>
											setEmail(e.target.value)
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
										? "Sending Verification Link..."
										: "Send Verification Link"}
								</Button>
							</form>
						</CardContent>
					</Card>
				</div>
			</div>
		</>
	);
}
