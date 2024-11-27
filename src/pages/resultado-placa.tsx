import { useEffect, useState } from "react";
import { EntradaSaidaResponse } from "@/api/entradaSaida/responses/entradaSaida.response";
import { getEntradasSaidasPlaca } from "@/api/entradaSaida/entradaSaida.service";
import { EntradaSaidaListagem } from "@/components/entrada-saida-listagem/entrada-saida-listagem";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CaretLeftIcon } from "@radix-ui/react-icons";

export const ResultadoPlaca = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const params = new URLSearchParams(location.search);
	const placa = params.get("placa");
	const [entradasSaidas, setEntradasSaidas] = useState<EntradaSaidaResponse[]>(
		[]
	);

	useEffect(() => {
		if (placa) {
			buscarEntradasSaidas();
		}
	}, [placa]);

	const buscarEntradasSaidas = async () => {
		const response = await getEntradasSaidasPlaca(placa!);
		setEntradasSaidas(response.data);
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
				<div className="flex-col space-y-4 w-full">
					<EntradaSaidaListagem
						entradasSaidas={entradasSaidas}
						onBuscarEntradasSaidas={buscarEntradasSaidas}
					/>
				</div>
			</div>
		</div>
	);
};
