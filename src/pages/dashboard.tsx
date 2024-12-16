import { BaseSyntheticEvent, useEffect, useState } from "react";
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
import { EntradaSaidaResponse } from "@/api/entradaSaida/responses/entradaSaida.response";
import { useNavigate } from "react-router-dom";
import { getEntradasSaidasEstacionamentos } from "@/api/entradaSaida/entradaSaida.service";
import { getMensalidadesEstacionamento } from "@/api/mensalidade/mensalidade.service";
import { MensalidadeResponse } from "@/api/mensalidade/responses/mensalidade.response";
import { MensalidadeForm } from "@/components/mensalidade-form/mensalidade-form";
import { MensalidadeListagem } from "@/components/mensalidade-listagem/mensalidade-listagem";

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
	const [entradasSaidas, setEntradasSaidas] = useState<EntradaSaidaResponse[]>(
		[]
	);
	const [mensalidades, setMensalidades] = useState<MensalidadeResponse[]>([]);
	const [activeTab, setActiveTab] = useState<string>(() => {
		return localStorage.getItem("activeTab") || "";
	});

	useEffect(() => {
		if (!funcionario) {
			navigate("/home");
			return;
		}
		const savedEstacionamento = localStorage.getItem(
			"estacionamentoSelecionado"
		);
		switch (funcionario?.cargo.id) {
			case CargoEnum.Gerente:
				setEstacionamentoSelecionado(funcionario.estacionamento);
				buscarFuncionarios(funcionario.estacionamento.id);
				buscarEntradasSaidas(funcionario.estacionamento.id);
				buscarMensalidades(funcionario.estacionamento.id);
				break;
			case CargoEnum.Atendente:
				setEstacionamentoSelecionado(funcionario.estacionamento);
				buscarEntradasSaidas(funcionario.estacionamento.id);
				buscarMensalidades(funcionario.estacionamento.id);
				break;
			case CargoEnum.Administrador:
				if (savedEstacionamento) {
					setEstacionamentoSelecionado(JSON.parse(savedEstacionamento));
					buscarFuncionarios(JSON.parse(savedEstacionamento).id);
					buscarEntradasSaidas(JSON.parse(savedEstacionamento).id);
					buscarMensalidades(JSON.parse(savedEstacionamento).id);
				}
				buscarEstacionamentos();
				break;
			default:
				break;
		}
		buscarCargos();
	}, [funcionario, navigate]);

	useEffect(() => {
		if (estacionamentoSelecionado) {
			localStorage.setItem(
				"estacionamentoSelecionado",
				JSON.stringify(estacionamentoSelecionado)
			);
		}
	}, [estacionamentoSelecionado]);

	useEffect(() => {
		localStorage.setItem("activeTab", activeTab);
	}, [activeTab]);

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

	const buscarEntradasSaidas = async (id: number) => {
		const response = await getEntradasSaidasEstacionamentos(id);
		setEntradasSaidas(response.data);
	};

	const buscarMensalidades = async (id: number) => {
		const response = await getMensalidadesEstacionamento(id);
		setMensalidades(response.data);
	};

	const handleEstacionamentoSelecionado = (id: number) => {
		setEstacionamentoSelecionado(estacionamentos.find((e) => e.id === id));
		buscarFuncionarios(id);
		buscarEntradasSaidas(id);
		buscarMensalidades(id);
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
				{!estacionamentoSelecionado && verificarAdministradorOuGerente() && (
					<EstacionamentoForm onBuscarEstacionamentos={buscarEstacionamentos} />
				)}
				{estacionamentoSelecionado &&
					verificarAdministradorOuGerente() &&
					activeTab === "funcionarios" && (
						<FuncionarioForm
							estacionamentoId={estacionamentoSelecionado.id}
							cargos={cargos}
							onBuscarFuncionarios={() =>
								buscarFuncionarios(estacionamentoSelecionado.id)
							}
						/>
					)}
				{estacionamentoSelecionado && activeTab === "mensalidades" && (
					<MensalidadeForm
						estacionamento={estacionamentoSelecionado}
						onBuscarMensalidades={buscarMensalidades}
					/>
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
							onClick={() => {
								localStorage.removeItem("estacionamentoSelecionado");
								setEstacionamentoSelecionado(undefined);
							}}
						>
							<CaretLeftIcon />
						</Button>
					)}
					<Tabs
						className="w-full"
						defaultValue={
							activeTab?.length > 0
								? activeTab
								: verificarAdministradorOuGerente()
								? "funcionarios"
								: "historico"
						}
						onClick={(value: BaseSyntheticEvent) =>
							setActiveTab(value.target.accessKey)
						}
					>
						<TabsList
							className={`grid w-full ${
								verificarAdministradorOuGerente()
									? estacionamentoSelecionado.valor_mensalidade
										? "grid-cols-3"
										: "grid-cols-2"
									: estacionamentoSelecionado.valor_mensalidade
									? "grid-cols-2"
									: "grid-cols-1"
							}`}
						>
							{verificarAdministradorOuGerente() && (
								<TabsTrigger accessKey="funcionarios" value="funcionarios">
									Funcionários
								</TabsTrigger>
							)}
							<TabsTrigger accessKey="historico" value="historico">
								Histórico
							</TabsTrigger>
							{estacionamentoSelecionado.valor_mensalidade && (
								<TabsTrigger accessKey="mensalidades" value="mensalidades">
									Mensalidades
								</TabsTrigger>
							)}
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
								entradasSaidas={entradasSaidas}
								onBuscarEntradasSaidas={() =>
									buscarEntradasSaidas(estacionamentoSelecionado.id)
								}
							/>
						</TabsContent>
						<TabsContent value="mensalidades">
							<MensalidadeListagem
								mensalidades={mensalidades}
								onBuscarMensalidades={() => {
									buscarMensalidades(estacionamentoSelecionado.id);
								}}
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
