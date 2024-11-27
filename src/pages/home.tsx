import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
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
import { useEffect, useState } from "react";
import { FuncionarioLoginRequest } from "@/api/funcionario/requests/funcionarioLogin.request";
import { loginFuncionario } from "@/api/funcionario/funcionario.service";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/AuthContext";
import { getEntradasSaidasPlaca } from "@/api/entradaSaida/entradaSaida.service";

export const Home = () => {
	const [placa, setPlaca] = useState("");
	const [nome, setNome] = useState("");
	const [senha, setSenha] = useState("");
	const [loading, setLoading] = useState(false);
	const { setFuncionario } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (localStorage.getItem("funcionario")) {
			navigate("/dashboard");
		}
	}, []);

	const onPlateSubmit = async () => {
		setLoading(true);
		try {
			await getEntradasSaidasPlaca(placa);
			toast.success("Login realizado com sucesso!", {
				className: "bg-green-600 text-white",
			});
			navigate(`/placa?placa=${placa}`);
		} catch {
			toast.error("Placa não encontrada!", {
				className: "bg-red-500 text-white",
			});
		} finally {
			setLoading(false);
		}
	};

	const onLoginSubmit = async () => {
		setLoading(true);
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
		} finally {
			setLoading(false);
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
							<Button disabled={loading} onClick={onPlateSubmit}>
								{loading && <Loader2 className="animate-spin" />}
								Buscar
							</Button>
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
							<Button disabled={loading} onClick={onLoginSubmit}>
								{loading && <Loader2 className="animate-spin" />}
								Login
							</Button>
						</CardFooter>
					</Card>
				</TabsContent>
			</Tabs>
		</>
	);
};
