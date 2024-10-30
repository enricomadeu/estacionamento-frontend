import { useEffect, useState } from "react";
import { useAuth } from "@/AuthContext";
import { CargoEnum } from "@/api/cargo/enums/cargo.enum";
import { getEstacionamentos } from "@/api/estacionamento/estacionamento.service";
import { getFuncionariosEstacionamento } from "@/api/funcionario/funcionario.service";
import { FuncionarioResponse } from "@/api/funcionario/responses/funcionario.response";
import { EstacionamentoResponse } from "@/api/estacionamento/responses/estacionamento.response";
import { getCargos } from "@/api/cargo/cargo.service";
import { CargoResponse } from "@/api/cargo/responses/cargo.response";
import { EstacionamentosListagem } from "@/components/estacionamentos-listagem/estacionamentos-listagem";
import { FuncionariosListagem } from "@/components/funcionarios-listagem/funcionarios-listagem";
import { CaretLeftIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { EstacionamentoForm } from "@/components/estacionamento-form/estacionamento-form";
import { FuncionarioForm } from "@/components/funcionario-form/funcionario-form";
import { EntradaSaidaListagem } from "@/components/entrada-saida-listagem/entrada-saida-listagem";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
	const { funcionario } = useAuth();
	const navigate = useNavigate();
	const [cargos, setCargos] = useState<CargoResponse[]>([]);
	const [estacionamentos, setEstacionamentos] = useState<
		EstacionamentoResponse[]
	>([]);
	const [estacionamentoSelecionado, setEstacionamentoSelecionado] =
		useState<EstacionamentoResponse>();
	const [funcionarios, setFuncionarios] = useState<FuncionarioResponse[]>([]);

	useEffect(() => {
		if (!funcionario) {
			navigate("/home");
			return;
		}
		switch (funcionario?.cargo.id) {
			case CargoEnum.Gerente:
				setEstacionamentoSelecionado(funcionario.estacionamento);
				buscarFuncionarios(funcionario.estacionamento.id);
				break;
			case CargoEnum.Atendente:
				setEstacionamentoSelecionado(funcionario.estacionamento);
				break;
			case CargoEnum.Administrador:
				buscarEstacionamentos();
				break;
			default:
				break;
		}
		buscarCargos();
	}, []);

	const buscarEstacionamentos = async () => {
		try {
			const estacionamentosResponse = await getEstacionamentos();
			setEstacionamentos(estacionamentosResponse.data);
		} catch {
			toast.error("Erro ao buscar estacionamentos");
		}
	};

	const buscarFuncionarios = async (id: number) => {
		try {
			const funcionariosResponse = await getFuncionariosEstacionamento(
				String(id)
			);
			setFuncionarios(funcionariosResponse.data);
		} catch {
			toast.error("Erro ao buscar funcionarios");
		}
	};

	const buscarCargos = async () => {
		try {
			const cargosResponse = await getCargos();
			setCargos(cargosResponse.data);
		} catch {
			toast.error("Erro ao buscar cargos");
		}
	};

	const handleEstacionamentoSelecionado = (id: number) => {
		setEstacionamentoSelecionado(estacionamentos.find((e) => e.id === id));
		buscarFuncionarios(id);
	};

	const verificarAdministradorOuGerente = () => {
		return (
			funcionario?.cargo.id === CargoEnum.Administrador ||
			funcionario?.cargo.id === CargoEnum.Gerente
		);
	};

	return (
		<div className="flex-1 space-y-6 w-full h-screen p-8 mt-[7rem]">
			<div className="flex justify-between">
				<h2 className="text-3xl tracking-tight">
					<span className="font-bold">Dashboard</span>
				</h2>
				{funcionario?.cargo.id !== CargoEnum.Atendente && (
					<>
						{estacionamentoSelecionado ? (
							<FuncionarioForm
								estacionamentoId={estacionamentoSelecionado.id}
								cargos={cargos}
								onBuscarFuncionarios={() =>
									buscarFuncionarios(estacionamentoSelecionado.id)
								}
							/>
						) : (
							<EstacionamentoForm
								onBuscarEstacionamentos={buscarEstacionamentos}
							/>
						)}
					</>
				)}
			</div>
			{estacionamentoSelecionado && (
				<div className="flex items-center gap-2">
					<span>{estacionamentoSelecionado.nome}</span>
					<EstacionamentoForm
						estacionamento={estacionamentoSelecionado}
						onBuscarEstacionamentos={buscarEstacionamentos}
					/>
				</div>
			)}
			{estacionamentoSelecionado && (
				<div className="flex space-x-2">
					{funcionario?.cargo.id === CargoEnum.Administrador && (
						<Button
							variant="outline"
							size="icon"
							onClick={() => setEstacionamentoSelecionado(undefined)}
						>
							<CaretLeftIcon />
						</Button>
					)}
					<Tabs
						className="w-full"
						defaultValue={
							verificarAdministradorOuGerente() ? "funcionarios" : "historico"
						}
					>
						<TabsList
							className={`grid w-full ${
								verificarAdministradorOuGerente()
									? "grid-cols-2"
									: "grid-cols-1"
							}`}
						>
							{verificarAdministradorOuGerente() && (
								<TabsTrigger value="funcionarios">Funcionários</TabsTrigger>
							)}
							<TabsTrigger value="historico">Histórico</TabsTrigger>
						</TabsList>
						<TabsContent value="funcionarios">
							<FuncionariosListagem
								funcionarios={funcionarios}
								estacionamentoId={estacionamentoSelecionado.id}
								cargos={cargos}
								onBuscarFuncionarios={() =>
									buscarFuncionarios(estacionamentoSelecionado.id)
								}
							></FuncionariosListagem>
						</TabsContent>
						<TabsContent value="historico">
							<EntradaSaidaListagem
								estacionamentoId={estacionamentoSelecionado.id}
							/>
						</TabsContent>
					</Tabs>
				</div>
			)}
			{funcionario?.cargo.id === CargoEnum.Administrador &&
				!estacionamentoSelecionado && (
					<EstacionamentosListagem
						estacionamentos={estacionamentos}
						onEstacionamentoSelecionado={handleEstacionamentoSelecionado}
						onBuscarEstacionamentos={buscarEstacionamentos}
					/>
				)}
		</div>
	);
};
