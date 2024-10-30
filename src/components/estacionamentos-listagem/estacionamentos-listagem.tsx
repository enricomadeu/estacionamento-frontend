import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { EstacionamentoResponse } from "@/api/estacionamento/responses/estacionamento.response";
import { CaretRightIcon } from "@radix-ui/react-icons";
import { EstacionamentoForm } from "@/components/estacionamento-form/estacionamento-form";

interface EstacionamentosListagemProps {
	estacionamentos: EstacionamentoResponse[];
	onEstacionamentoSelecionado: (id: number) => void;
	onBuscarEstacionamentos: () => void;
}

export const EstacionamentosListagem = (
	props: EstacionamentosListagemProps
) => {
	const {
		estacionamentos,
		onEstacionamentoSelecionado,
		onBuscarEstacionamentos,
	} = props;

	return (
		<Table className="w-full">
			<TableHeader>
				<TableRow>
					<TableHead>ID</TableHead>
					<TableHead>Nome</TableHead>
					<TableHead className="cellphone:hidden tablet:table-cell">
						Endereço
					</TableHead>
					<TableHead className="cellphone:hidden tablet:table-cell">
						Telefone
					</TableHead>
					<TableHead className="cellphone:hidden tablet:table-cell">
						Vagas
					</TableHead>
					<TableHead className="cellphone:hidden tablet:table-cell">
						Valor Hora
					</TableHead>
					<TableHead>Editar</TableHead>
					<TableHead></TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{estacionamentos.map((estacionamento) => (
					<TableRow key={estacionamento.id}>
						<TableCell>{estacionamento.id}</TableCell>
						<TableCell>{estacionamento.nome}</TableCell>
						<TableCell className="cellphone:hidden tablet:table-cell">
							{estacionamento.endereco}
						</TableCell>
						<TableCell className="cellphone:hidden tablet:table-cell">
							{estacionamento.telefone}
						</TableCell>
						<TableCell className="cellphone:hidden tablet:table-cell">
							{estacionamento.vagas}
						</TableCell>
						<TableCell className="cellphone:hidden tablet:table-cell">
							{estacionamento.valor_hora.toLocaleString("pt-BR", {
								style: "currency",
								currency: "BRL",
							})}
						</TableCell>
						<TableCell>
							<EstacionamentoForm
								key={estacionamento.id}
								estacionamento={estacionamento}
								onBuscarEstacionamentos={onBuscarEstacionamentos}
							/>
						</TableCell>
						<TableCell>
							<Button
								variant="outline"
								size="icon"
								onClick={() => onEstacionamentoSelecionado(estacionamento.id)}
							>
								<CaretRightIcon />
							</Button>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};
