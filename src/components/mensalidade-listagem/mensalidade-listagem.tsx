import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { MensalidadeResponse } from "@/api/mensalidade/responses/mensalidade.response";
import { MensalidadeForm } from "../mensalidade-form/mensalidade-form";

interface MensalidadeListagemProps {
	mensalidades: MensalidadeResponse[];
	onBuscarMensalidades: () => void;
}

export const MensalidadeListagem = (props: MensalidadeListagemProps) => {
	const { mensalidades, onBuscarMensalidades } = props;

	return (
		<Table className="w-full">
			{mensalidades.length === 0 && (
				<TableCaption>
					Nenhuma mensalidade cadastrada neste estacionamento
				</TableCaption>
			)}
			<TableHeader>
				<TableRow>
					<TableHead>ID</TableHead>
					<TableHead>Placa</TableHead>
					<TableHead className="cellphone:hidden tablet:table-cell">
						Estacionamento
					</TableHead>
					<TableHead className="cellphone:hidden tablet:table-cell">
						Pagamento
					</TableHead>
					<TableHead className="cellphone:hidden tablet:table-cell">
						Vencimento
					</TableHead>
					<TableHead>Valor</TableHead>
					<TableHead>Ações</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{mensalidades.map((mensalidade) => (
					<TableRow key={mensalidade.id}>
						<TableCell>{mensalidade.id}</TableCell>
						<TableCell>{mensalidade.placa}</TableCell>
						<TableCell className="cellphone:hidden tablet:table-cell">
							{mensalidade.estacionamento.nome}
						</TableCell>
						<TableCell className="cellphone:hidden tablet:table-cell">
							{format(mensalidade.data_pagamento, "dd/MM/yyyy")}
						</TableCell>
						<TableCell className="cellphone:hidden tablet:table-cell">
							{format(
								new Date(
									new Date(mensalidade.data_pagamento).setMonth(
										new Date(mensalidade.data_pagamento).getMonth() + 1
									)
								),
								"dd/MM/yyyy"
							)}
						</TableCell>
						<TableCell>
							{mensalidade.valor_pago.toLocaleString("pt-BR", {
								style: "currency",
								currency: "BRL",
							})}
						</TableCell>
						<TableCell>
							<MensalidadeForm
								estacionamento={mensalidade.estacionamento}
								mensalidade={mensalidade}
								onBuscarMensalidades={onBuscarMensalidades}
							/>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};
