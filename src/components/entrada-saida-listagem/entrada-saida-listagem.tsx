import { useEffect, useState } from "react";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { EntradaSaidaResponse } from "@/api/entradaSaida/responses/entradaSaida.response";
import { getEntradasSaidasEstacionamentos } from "@/api/entradaSaida/entradaSaida.service";

interface EntradaSaidaListagemProps {
	estacionamentoId: number;
}

export const EntradaSaidaListagem = (props: EntradaSaidaListagemProps) => {
	const { estacionamentoId } = props;
	const [entradasSaidas, setEntradasSaidas] = useState<EntradaSaidaResponse[]>(
		[]
	);

	useEffect(() => {
		buscarEntradasSaidas();
	}, []);

	const buscarEntradasSaidas = async () => {
		const response = await getEntradasSaidasEstacionamentos(estacionamentoId);
		setEntradasSaidas(response.data);
	};

	return (
		<Table className="w-full">
			{entradasSaidas.length === 0 && (
				<TableCaption>
					Nenhuma entrada/saida cadastrada neste estacionamento
				</TableCaption>
			)}
			<TableHeader>
				<TableRow>
					<TableHead>ID</TableHead>
					<TableHead>Placa</TableHead>
					<TableHead>Entrada</TableHead>
					<TableHead>Saida</TableHead>
					<TableHead>Valor</TableHead>
					<TableHead>Pago</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{entradasSaidas.map((entradaSaida) => (
					<TableRow key={entradaSaida.id}>
						<TableCell>{entradaSaida.id}</TableCell>
						<TableCell>{entradaSaida.placa}</TableCell>
						<TableCell>{entradaSaida.dataEntrada.toDateString()}</TableCell>
						<TableCell>
							{entradaSaida.dataSaida?.toDateString() || "-"}
						</TableCell>
						<TableCell>{entradaSaida.valorPago}</TableCell>
						<TableCell>{entradaSaida.pago ? "Sim" : "Não"}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};
