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
import { EntradaSaidaForm } from "@/components/entrada-saida-form/entrada-saida-form";
import { format } from "date-fns";

interface EntradaSaidaListagemProps {
	entradasSaidas: EntradaSaidaResponse[];
	onBuscarEntradasSaidas: () => void;
}

const calculaPagamento = (data_entrada: Date, valor_hora: number) => {
	const now = new Date();
	const diffInHours = Math.ceil(
		(now.getTime() - data_entrada.getTime()) / (1000 * 60 * 60)
	);
	const valor_a_pagar = valor_hora * diffInHours;

	return valor_a_pagar;
};

export const EntradaSaidaListagem = (props: EntradaSaidaListagemProps) => {
	const { entradasSaidas, onBuscarEntradasSaidas } = props;

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
					<TableHead className="cellphone:hidden tablet:table-cell">
						Entrada
					</TableHead>
					<TableHead className="cellphone:hidden tablet:table-cell">
						Saida
					</TableHead>
					<TableHead>Valor</TableHead>
					<TableHead>Pago</TableHead>
					<TableHead>Ações</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{entradasSaidas.map((entradaSaida) => (
					<TableRow key={entradaSaida.id}>
						<TableCell>{entradaSaida.id}</TableCell>
						<TableCell>{entradaSaida.placa}</TableCell>
						<TableCell className="cellphone:hidden tablet:table-cell">
							{format(entradaSaida.data_entrada, "dd/MM/yyyy - HH:mm")}
						</TableCell>
						<TableCell className="cellphone:hidden tablet:table-cell">
							{entradaSaida.data_saida
								? format(entradaSaida.data_saida, "dd/MM/yyyy - HH:mm")
								: "-"}
						</TableCell>
						<TableCell>
							{entradaSaida.valor_pago
								? entradaSaida.valor_pago.toLocaleString("pt-BR", {
										style: "currency",
										currency: "BRL",
								  })
								: calculaPagamento(
										new Date(entradaSaida.data_entrada),
										entradaSaida.estacionamento.valor_hora
								  ).toLocaleString("pt-BR", {
										style: "currency",
										currency: "BRL",
								  })}
						</TableCell>
						<TableCell>{entradaSaida.pago ? "Sim" : "Não"}</TableCell>
						<TableCell>
							<EntradaSaidaForm
								entradaSaida={entradaSaida}
								valor={
									entradaSaida.valor_pago
										? entradaSaida.valor_pago
										: calculaPagamento(
												new Date(entradaSaida.data_entrada),
												entradaSaida.estacionamento.valor_hora
										  )
								}
								buscarEntradasSaidas={onBuscarEntradasSaidas}
							/>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};
