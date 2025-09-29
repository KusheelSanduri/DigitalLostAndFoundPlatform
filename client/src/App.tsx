import { Route, Routes } from "react-router-dom";
import { LandingPage } from "./pages/landing/LandingPage";
import { LoginPage } from "./pages/auth/LoginPage";
import { RegisterPage } from "./pages/auth/RegisterPage";
import { ForgotPasswordPage } from "./pages/auth/ForgotPasswordPage";

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
		</Routes>
	);
}
export default App;
