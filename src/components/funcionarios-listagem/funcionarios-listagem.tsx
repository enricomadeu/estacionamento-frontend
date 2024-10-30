import { FuncionarioResponse } from "@/api/funcionario/responses/funcionario.response";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { FuncionarioForm } from "../funcionario-form/funcionario-form";
import { CargoResponse } from "@/api/cargo/responses/cargo.response";

interface FuncionariosListagemProps {
	funcionarios: FuncionarioResponse[];
	estacionamentoId: number;
	cargos: CargoResponse[];
	onBuscarFuncionarios: () => void;
}

export const FuncionariosListagem = (props: FuncionariosListagemProps) => {
	const { funcionarios, estacionamentoId, cargos, onBuscarFuncionarios } =
		props;

	return (
		<Table className="w-full">
			{funcionarios.length === 0 && (
				<TableCaption>
					Nenhum funcionário cadastrado neste estacionamento
				</TableCaption>
			)}
			<TableHeader>
				<TableRow>
					<TableHead>ID</TableHead>
					<TableHead>Nome</TableHead>
					<TableHead className="cellphone:hidden tablet:table-cell">
						Cargo
					</TableHead>
					<TableHead className="cellphone:hidden tablet:table-cell">
						Status
					</TableHead>
					<TableHead>Editar</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{funcionarios.map((funcionario) => (
					<TableRow key={funcionario.id}>
						<TableCell>{funcionario.id}</TableCell>
						<TableCell>{funcionario.nome}</TableCell>
						<TableCell className="cellphone:hidden tablet:table-cell">
							{funcionario.cargo.descricao}
						</TableCell>
						<TableCell className="cellphone:hidden tablet:table-cell">
							{funcionario.ativo ? (
								<Badge variant="default">Ativo</Badge>
							) : (
								<Badge variant="destructive">Inativo</Badge>
							)}
						</TableCell>
						<TableCell>
							<FuncionarioForm
								key={funcionario.id}
								estacionamentoId={estacionamentoId}
								funcionario={funcionario}
								cargos={cargos}
								onBuscarFuncionarios={onBuscarFuncionarios}
							/>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};
