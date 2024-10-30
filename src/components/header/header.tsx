import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/components/modeToggle/mode-toggle";
import { useAuth } from "@/AuthContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const Header = () => {
	const { funcionario } = useAuth();
	const navigate = useNavigate();

	const onLogout = () => {
		localStorage.removeItem("funcionario");
		navigate("/home");
	};

	return (
		<div className="absolute top-0 w-full">
			<div className="flex m-3 items-center justify-between">
				<h1 className="text-center font-semibold">SCCAE-IA</h1>
				<div className="flex items-center gap-2">
					{funcionario && (
						<Button variant="outline" onClick={onLogout}>
							Logout
						</Button>
					)}
					<ModeToggle />
				</div>
			</div>
			<Separator />
		</div>
	);
};
