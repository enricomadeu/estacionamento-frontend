// ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
	const { funcionario } = useAuth();

	if (!funcionario) {
		// Redireciona para a página de login se o usuário não estiver autenticado
		return <Navigate to="/home" />;
	}

	return element;
};
