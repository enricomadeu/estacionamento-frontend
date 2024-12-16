import { useState } from "react";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { EstacionamentoResponse } from "@/api/estacionamento/responses/estacionamento.response";
import { EstacionamentoCreateRequest } from "@/api/estacionamento/requests/estacionamentoCreate.request";
import {
	createEstacionamento,
	updateEstacionamento,
} from "@/api/estacionamento/estacionamento.service";
import { Pencil2Icon, InfoCircledIcon } from "@radix-ui/react-icons";
import { useAuth } from "@/AuthContext";
import { CargoEnum } from "@/api/cargo/enums/cargo.enum";

interface EstacionamentoFormProps {
	estacionamento?: EstacionamentoResponse;
	onBuscarEstacionamentos: () => void;
}

export const EstacionamentoForm = (props: EstacionamentoFormProps) => {
	const { funcionario } = useAuth();
	const [estacionamento, setEstacionamento] =
		useState<EstacionamentoCreateRequest>({
			nome: props.estacionamento?.nome ?? "",
			endereco: props.estacionamento?.endereco ?? "",
			telefone: props.estacionamento?.telefone ?? "",
			vagas: props.estacionamento?.vagas ?? 10,
			valor_hora: props.estacionamento?.valor_hora ?? 10,
			valor_mensalidade: props.estacionamento?.valor_mensalidade
		});
	const { onBuscarEstacionamentos } = props;

	const onHandleSubmit = async () => {
		try {
			if (props.estacionamento?.id) {
				await updateEstacionamento(props.estacionamento.id, estacionamento);
				toast.success("Estacionamento atualizado com sucesso!", {
					className: "bg-green-600 text-white",
				});
				return;
			}
			await createEstacionamento(estacionamento);
			toast.success("Estacionamento criado com sucesso!", {
				className: "bg-green-600 text-white",
			});
		} catch {
			toast.error("Erro ao realizar operação.", {
				className: "bg-red-500 text-white",
			});
		} finally {
			onBuscarEstacionamentos();
		}
	};

	return (
		<Sheet>
			<SheetTrigger asChild>
				{props.estacionamento?.id ? (
					<Button variant="outline" size="icon">
						{funcionario?.cargo.id === CargoEnum.Atendente ? (
							<InfoCircledIcon />
						) : (
							<Pencil2Icon />
						)}
					</Button>
				) : (
					<Button>Novo estacionamento</Button>
				)}
			</SheetTrigger>
			<SheetContent className="tablet:w-[540px] cellphone:w-full">
				<SheetHeader>
					<SheetTitle>
						{props.estacionamento?.id
							? funcionario?.cargo.id === CargoEnum.Atendente
								? "Informações"
								: "Editar"
							: "Criar"}
					</SheetTitle>
					<SheetDescription>
						{props.estacionamento?.id
							? funcionario?.cargo.id === CargoEnum.Atendente
								? "Informações do"
								: "Editar"
							: "Criar um novo"}{" "}
						estacionamento
					</SheetDescription>
				</SheetHeader>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-2 items-center gap-4">
						<Label htmlFor="nome">Nome</Label>
						<Input
							id="nome"
							type="text"
							placeholder="Digite o nome"
							value={estacionamento.nome}
							onChange={(value) =>
								setEstacionamento({
									...estacionamento,
									nome: value.target.value,
								})
							}
							readOnly={funcionario?.cargo.id === CargoEnum.Atendente}
						/>
					</div>
					<div className="grid grid-cols-2 items-center gap-4">
						<Label htmlFor="endereco">Endereço</Label>
						<Input
							id="endereco"
							type="text"
							placeholder="Digite o endereço"
							value={estacionamento.endereco}
							onChange={(value) =>
								setEstacionamento({
									...estacionamento,
									endereco: value.target.value,
								})
							}
							readOnly={funcionario?.cargo.id === CargoEnum.Atendente}
						/>
					</div>
					<div className="grid grid-cols-2 items-center gap-4">
						<Label htmlFor="telefone">Telefone</Label>
						<Input
							id="telefone"
							type="text"
							placeholder="Digite o telefone"
							value={estacionamento.telefone}
							onChange={(value) =>
								setEstacionamento({
									...estacionamento,
									telefone: value.target.value,
								})
							}
							readOnly={funcionario?.cargo.id === CargoEnum.Atendente}
						/>
					</div>
					<div className="grid grid-cols-2 items-center gap-4">
						<Label htmlFor="vagas">Vagas</Label>
						<Input
							id="vagas"
							type="number"
							placeholder="Número de vagas"
							value={estacionamento.vagas}
							onChange={(value) =>
								setEstacionamento({
									...estacionamento,
									vagas: +value.target.value,
								})
							}
							readOnly={funcionario?.cargo.id === CargoEnum.Atendente}
						/>
					</div>
					<div className="grid grid-cols-2 items-center gap-4">
						<Label htmlFor="valor_hora">Valor hora</Label>
						<div className="relative">
							<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-50">
								R$
							</span>
							<Input
								id="valor_hora"
								type="number"
								placeholder="Valor por hora"
								className="pl-10"
								value={estacionamento.valor_hora}
								onChange={(value) =>
									setEstacionamento({
										...estacionamento,
										valor_hora: +value.target.value,
									})
								}
								readOnly={funcionario?.cargo.id === CargoEnum.Atendente}
							/>
						</div>
					</div>
					<div className="grid grid-cols-2 items-center gap-4">
						<Label htmlFor="valor_mensal">Valor mensal</Label>
						<div className="relative">
							<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-50">
								R$
							</span>
							<Input
								id="valor_mensal"
								type="number"
								placeholder="Valor mensal"
								className="pl-10"
								value={estacionamento.valor_mensalidade}
								onChange={(value) =>
									setEstacionamento({
										...estacionamento,
										valor_mensalidade: +value.target.value,
									})
								}
								readOnly={funcionario?.cargo.id === CargoEnum.Atendente}
							/>
						</div>
					</div>
				</div>
				<SheetFooter>
					<SheetClose asChild>
						{funcionario?.cargo.id !== CargoEnum.Atendente && (
							<Button
								className="w-[30%] ms-auto"
								type="submit"
								onClick={onHandleSubmit}
							>
								{props.estacionamento?.id ? "Editar" : "Criar"}
							</Button>
						)}
					</SheetClose>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
};
