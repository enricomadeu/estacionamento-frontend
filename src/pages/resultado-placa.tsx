import { useEffect, useState } from "react";
import { EntradaSaidaResponse } from "@/api/entradaSaida/responses/entradaSaida.response";
import { getEntradasSaidasPlaca } from "@/api/entradaSaida/entradaSaida.service";
import { EntradaSaidaListagem } from "@/components/entrada-saida-listagem/entrada-saida-listagem";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CaretLeftIcon } from "@radix-ui/react-icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MensalidadeResponse } from "@/api/mensalidade/responses/mensalidade.response";
import { getMensalidadesPlaca } from "@/api/mensalidade/mensalidade.service";
import { MensalidadeListagem } from "@/components/mensalidade-listagem/mensalidade-listagem";

export const ResultadoPlaca = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const params = new URLSearchParams(location.search);
	const placa = params.get("placa");
	const [entradasSaidas, setEntradasSaidas] = useState<EntradaSaidaResponse[]>(
		[]
	);
	const [mensalidades, setMensalidades] = useState<MensalidadeResponse[]>([]);

	useEffect(() => {
		if (placa) {
			buscarEntradasSaidas();
			buscarMensalidades();
		}
	}, [placa]);

	const buscarEntradasSaidas = async () => {
		const response = await getEntradasSaidasPlaca(placa!);
		setEntradasSaidas(response.data);
	};

	const buscarMensalidades = async () => {
		const response = await getMensalidadesPlaca(placa!);
		setMensalidades(response.data);
		console.log(response.data)
	};

	const onRetornaHome = () => {
		navigate("/home");
	};
	return (
		<div className="flex-1 space-y-6 w-full h-screen p-8 mt-[7rem]">
			<div className="flex justify-between">
				<h2 className="text-3xl tracking-tight">
					<span className="font-bold">Resultado da placa: {placa}</span>
				</h2>
			</div>
			<div className="flex space-x-2">
				<Button variant="outline" size="icon" onClick={onRetornaHome}>
					<CaretLeftIcon />
				</Button>
				<Tabs className="w-full" defaultValue="historico">
					<TabsList className="grid w-full grid-cols-2">
						<TabsTrigger accessKey="historico" value="historico">
							Histórico
						</TabsTrigger>
						<TabsTrigger value="mensalidades">Mensalidades</TabsTrigger>
					</TabsList>
					<TabsContent accessKey="mensalidades" value="historico">
						<EntradaSaidaListagem
							entradasSaidas={entradasSaidas}
							onBuscarEntradasSaidas={buscarEntradasSaidas}
						/>
					</TabsContent>
					<TabsContent value="mensalidades">
						<MensalidadeListagem
							mensalidades={mensalidades}
							onBuscarMensalidades={buscarMensalidades}
						/>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
};
