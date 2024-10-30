import { ThemeProvider } from "@/components/theme-provider";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from "react-router-dom";
import { Toaster } from "sonner";
import { AuthProvider } from "@/AuthContext";
import { Home } from "@/pages/home";
import { Header } from "@/components/header/header";
import { Dashboard } from "@/pages/dashboard";
import { ProtectedRoute } from "@/ProtectedRoute";

export function App() {
	return (
		<AuthProvider>
			<ThemeProvider>
				<div className="flex justify-center items-center h-[100vh]">
					<Header />
					<Router>
						<Routes>
							<Route path="/" element={<Navigate to="/home" />}></Route>
							<Route path="/home" element={<Home />}></Route>
							<Route
								path="/dashboard"
								element={<ProtectedRoute element={<Dashboard />} />}
							></Route>
						</Routes>
					</Router>
				</div>
				<Toaster />
			</ThemeProvider>
		</AuthProvider>
	);
}
