import { Route, Routes } from "react-router-dom";
import { LandingPage } from "./pages/landing/LandingPage";
import { LoginPage } from "./pages/auth/LoginPage";
import { RegisterPage } from "./pages/auth/RegisterPage";
import { ForgotPasswordPage } from "./pages/auth/ForgotPasswordPage";
import { ResendVerificationLinkPage } from "./pages/auth/ResendVerificationLinkPage";
import AllPostsPage from "./pages/posts/AllPostsPage";
import CreatePostPage from "./pages/posts/CreatePostPage";
import AdminDashboard from "./pages/admin/page";
import AdminDisputesPage from "./pages/admin/dispute";
import { VerifyEmailPage } from "./pages/auth/VerifyEmailPage";
import { ResetPasswordPage } from "./pages/auth/ResetPasswordPage";
import PostChatPage from "./pages/posts/PostChatPage";
import NoChatPage from "./pages/posts/NoChatPage";

function App ()
{
	return (
		<Routes>
			<Route
				path="/"
				element={ <LandingPage /> }
			/>
			<Route
				path="/login"
				element={ <LoginPage /> }
			/>
			<Route
				path="/register"
				element={ <RegisterPage /> }
			/>
			<Route
				path="/forgot-password"
				element={ <ForgotPasswordPage /> }
			/>
			<Route
				path="/resend-verification-link"
				element={ <ResendVerificationLinkPage /> }
			/>
			<Route
				path="/verify"
				element={ <VerifyEmailPage /> }
			/>
			<Route
				path="/reset"
				element={ <ResetPasswordPage /> }
			/>
			<Route
				path="/resend-verification-link"
				element={ <ResendVerificationLinkPage /> }
			/>
			<Route
				path="/verify"
				element={ <VerifyEmailPage /> }
			/>
			<Route
				path="/reset"
				element={ <ResetPasswordPage /> }
			/>
			<Route
				path="/resend-verification-link"
				element={ <ResendVerificationLinkPage /> }
			/>
			<Route
				path="/posts"
				element={ <AllPostsPage /> }
			/>
			<Route
				path="/posts/create"
				element={ <CreatePostPage /> }
			/>
			<Route
				path="/chat"
				element={ <NoChatPage /> }
			/>
			<Route
				path="/chat/:postId"
				element={ <PostChatPage /> }
			/>
			<Route
				path="/admin/dashboard"
				element={<AdminDashboard />}
			/>
			<Route
				path="/admin/disputes"
				element={<AdminDisputesPage />}
			/>
		</Routes>
	);
}
export default App;
