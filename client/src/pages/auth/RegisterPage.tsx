import {useEffect, useState, useTransition} from "react";
import {Link, useNavigate} from "react-router-dom";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "../../components/ui/card";
import {Label} from "@radix-ui/react-label";
import {EyeOff, Eye} from "lucide-react";
import {Button} from "../../components/ui/button";
import {Input} from "../../components/ui/input";
import {Checkbox} from "../../components/ui/checkbox";
import {Navbar} from "../../components/common/Navbar";
import {useAuth} from "../../auth/useAuth";
import {toast} from "sonner";

export function RegisterPage() {
	const navigate = useNavigate();
	const {register, user} = useAuth();
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [agreedToTerms, setAgreedToTerms] = useState(false);
	const [isPending, startTransition] = useTransition();
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	useEffect(() => {
		if (user) {
			navigate("/posts");
		}
	}, [navigate, user]);

	const handleInputChange = (field: string, value: string) => {
		setFormData((prev) => ({...prev, [field]: value}));
	};

	const submit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!formData.email.endsWith("@nitc.ac.in")) {
			toast.error("Please use a valid NITC email address");
			return;
		}

		if (formData.password !== formData.confirmPassword) {
			toast.error("Passwords do not match");
			return;
		}

		if (formData.password.length < 8) {
			toast.error("Password must be at least 8 characters long");
			return;
		}

		if (!agreedToTerms) {
			toast.error("You must agree to the Terms of Service and Privacy Policy");
			return;
		}

		try {
			await register(
				formData.firstName.trim() + " " + formData.lastName.trim(),
				formData.email,
				formData.password
			);
			toast.success("Account created successfully! Please check your mail and verify your email address.");

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			toast.error(err.response.data.message || "Registration failed. Please try again.");
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
			<div className="min-h-screen bg-background flex items-center justify-center p-4">
				<div className="w-full max-w-lg">
					<Card>
						<CardHeader className="text-center">
							<CardTitle>Create Account to get started</CardTitle>
							<CardDescription>
								<div className="mt-2 bg-muted/50 rounded-lg p-4">
									<div className="flex items-start gap-3">
										<div>
											<h4 className="font-medium text-sm mb-1">NITC Community Only</h4>
											<p className="text-xs text-muted-foreground">
												Please use your official NITC email address to register.
											</p>
										</div>
									</div>
								</div>
							</CardDescription>
						</CardHeader>
						<CardContent>
							<form onSubmit={handleSubmit} className="space-y-4">
								<div className="grid grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label htmlFor="firstName">First Name</Label>
										<Input
											id="firstName"
											placeholder="John"
											value={formData.firstName}
											onChange={(e) => handleInputChange("firstName", e.target.value)}
											required
											className="bg-background"
										/>
									</div>
									<div className="space-y-2">
										<Label htmlFor="lastName">Last Name</Label>
										<Input
											id="lastName"
											placeholder="Doe"
											value={formData.lastName}
											onChange={(e) => handleInputChange("lastName", e.target.value)}
											required
											className="bg-background"
										/>
									</div>
								</div>

								<div className="space-y-2">
									<Label htmlFor="email">NITC Email</Label>
									<Input
										id="email"
										type="email"
										placeholder="your.name@nitc.ac.in"
										value={formData.email}
										onChange={(e) => handleInputChange("email", e.target.value)}
										required
										className="bg-background"
									/>
								</div>

								<div className="grid grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label htmlFor="password">Password</Label>
										<div className="relative">
											<Input
												id="password"
												type={showPassword ? "text" : "password"}
												placeholder="Create a strong password"
												value={formData.password}
												onChange={(e) => handleInputChange("password", e.target.value)}
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

									<div className="space-y-2">
										<Label htmlFor="confirmPassword">Confirm Password</Label>
										<div className="relative">
											<Input
												id="confirmPassword"
												type={showConfirmPassword ? "text" : "password"}
												placeholder="Confirm your password"
												value={formData.confirmPassword}
												onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
												required
												className="bg-background pr-10"
											/>
											<Button
												type="button"
												variant="ghost"
												size="sm"
												className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
												onClick={() => setShowConfirmPassword(!showConfirmPassword)}
											>
												{showConfirmPassword ? (
													<EyeOff className="w-4 h-4" />
												) : (
													<Eye className="w-4 h-4" />
												)}
											</Button>
										</div>
									</div>
								</div>

								<div className="flex items-center space-x-2">
									<Checkbox
										id="terms"
										checked={agreedToTerms}
										onCheckedChange={(checked) => {
											setAgreedToTerms(checked.valueOf() == true);
										}}
									/>
									<Label htmlFor="terms" className="text-sm">
										I agree to the{" "}
										<Link to="/terms" className="text-primary hover:underline">
											Terms of Service
										</Link>{" "}
										and{" "}
										<Link to="/privacy" className="text-primary hover:underline">
											Privacy Policy
										</Link>
									</Label>
								</div>

								<Button type="submit" className="w-full" disabled={isPending}>
									{isPending ? "Creating Account..." : "Create Account"}
								</Button>
							</form>

							<div className="mt-6 text-center">
								<p className="text-sm text-muted-foreground">
									Already have an account?{" "}
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
