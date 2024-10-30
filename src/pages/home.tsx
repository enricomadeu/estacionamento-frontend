import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { useState } from "react";
import { FuncionarioLoginRequest } from "@/api/funcionario/requests/funcionarioLogin.request";
import { loginFuncionario } from "@/api/funcionario/funcionario.service";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/AuthContext";

export const Home = () => {
	const [placa, setPlaca] = useState("");
	const [nome, setNome] = useState("");
	const [senha, setSenha] = useState("");
	const { setFuncionario } = useAuth();
	const navigate = useNavigate();

	const onPlateSubmit = () => {
		console.log(placa);
	};

	const onLoginSubmit = async () => {
		try {
			const request = new FuncionarioLoginRequest({ nome, senha });
			const funcionario = await loginFuncionario(request);
			setFuncionario(funcionario.data);
			toast.success("Login realizado com sucesso!", {
				className: "bg-green-600 text-white",
			});
			navigate("/dashboard");
		} catch {
			toast.error("Credenciais inválidas!", {
				className: "bg-red-500 text-white",
			});
		}
	};

	return (
		<>
			<Tabs defaultValue="searchPlate" className="w-[80vw] max-w-[400px]">
				<TabsList className="grid w-full grid-cols-2">
					<TabsTrigger value="searchPlate">Buscar placa</TabsTrigger>
					<TabsTrigger value="login">Login</TabsTrigger>
				</TabsList>
				<TabsContent value="searchPlate">
					<Card>
						<CardHeader>
							<CardTitle>Buscar placa</CardTitle>
							<CardDescription>
								Entre com a placa do seu veículo para buscar as informações.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-2">
							<div className="space-y-1">
								<Label htmlFor="placa">Placa do veículo</Label>
								<Input
									id="placa"
									type="text"
									value={placa}
									onChange={(e) => setPlaca(e.target.value)}
									placeholder="Digite a placa"
								/>
							</div>
						</CardContent>
						<CardFooter>
							<Button onClick={onPlateSubmit}>Buscar</Button>
						</CardFooter>
					</Card>
				</TabsContent>
				<TabsContent value="login">
					<Card>
						<CardHeader>
							<CardTitle>Login</CardTitle>
							<CardDescription>
								Caso seja funcionário, entre com seu nome e senha para realizar
								o login.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-2">
							<div className="space-y-1">
								<Label htmlFor="nome">Nome</Label>
								<Input
									id="nome"
									type="text"
									value={nome}
									onChange={(e) => setNome(e.target.value)}
									placeholder="Digite o nome"
								/>
							</div>
							<div className="space-y-1">
								<Label htmlFor="senha">Senha</Label>
								<Input
									id="senha"
									type="password"
									value={senha}
									onChange={(e) => setSenha(e.target.value)}
									placeholder="Digite a senha"
								/>
							</div>
						</CardContent>
						<CardFooter>
							<Button onClick={onLoginSubmit}>Login</Button>
						</CardFooter>
					</Card>
				</TabsContent>
			</Tabs>
		</>
	);
};
