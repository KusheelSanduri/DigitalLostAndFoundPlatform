import { Route, Routes } from "react-router-dom";
import { LandingPage } from "./pages/landing/LandingPage";
import { LoginPage } from "./pages/auth/LoginPage";
import { RegisterPage } from "./pages/auth/RegisterPage";
import { ForgotPasswordPage } from "./pages/auth/ForgotPasswordPage";
import { ResendVerificationLinkPage } from "./pages/auth/ResendVerificationLinkPage";
import AllPostsPage from "./pages/posts/AllPostsPage";

function App() {
	return (
		<Routes>
			<Route
				path="/"
				element={<LandingPage />}
			/>
			<Route
				path="/login"
				element={<LoginPage />}
			/>
			<Route
				path="/register"
				element={<RegisterPage />}
			/>
			<Route
				path="/forgot-password"
				element={<ForgotPasswordPage />}
			/>
			<Route
				path="/resend-verification-link"
				element={<ResendVerificationLinkPage />}
			/>
			<Route
				path="/posts"
				element={<AllPostsPage />}
			/>
		</Routes>
	);
}
export default App;
