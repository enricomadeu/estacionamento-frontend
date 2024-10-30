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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CargoResponse } from "@/api/cargo/responses/cargo.response";
import { FuncionarioResponse } from "@/api/funcionario/responses/funcionario.response";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { FuncionarioCreateRequest } from "@/api/funcionario/requests/funcionarioCreate.request";
import {
	createFuncionario,
	updateFuncionario,
} from "@/api/funcionario/funcionario.service";
import { CargoEnum } from "@/api/cargo/enums/cargo.enum";
import { useAuth } from "@/AuthContext";

interface FuncionarioFormProps {
	funcionario?: FuncionarioResponse;
	estacionamentoId: number;
	cargos: CargoResponse[];
	onBuscarFuncionarios: () => void;
}

export const FuncionarioForm = (props: FuncionarioFormProps) => {
	const { funcionario: funcionarioLogado } = useAuth();
	const { onBuscarFuncionarios, cargos } = props;
	const [funcionario, setFuncionario] = useState<FuncionarioCreateRequest>({
		nome: props.funcionario?.nome ?? "",
		senha: props.funcionario?.senha ?? "",
		cargo: props.funcionario?.cargo.id ?? 0,
		estacionamento:
			props.funcionario?.estacionamento.id ?? props.estacionamentoId,
		ativo: props.funcionario?.ativo ?? true,
	});

	const onHandleSubmit = async () => {
		if (!funcionario.nome || !funcionario.senha || !funcionario.cargo) {
			toast.error("Por favor, preencha todos os campos.");
			return;
		}
		try {
			if (props.funcionario?.id) {
				await updateFuncionario(props.funcionario.id, funcionario);
				toast.success("Funcionário atualizado com sucesso!", {
					className: "bg-green-600 text-white",
				});
				return;
			}
			await createFuncionario(funcionario);
			toast.success("Funcionário criado com sucesso!", {
				className: "bg-green-600 text-white",
			});
		} catch {
			toast.error("Erro ao realizar operação.", {
				className: "bg-red-500 text-white",
			});
		} finally {
			onBuscarFuncionarios();
		}
	};

	return (
		<Sheet>
			<SheetTrigger asChild>
				{props.funcionario?.id ? (
					<Button
						variant="outline"
						size="icon"
						disabled={
							props.funcionario?.cargo.id === CargoEnum.Administrador &&
							funcionarioLogado?.cargo.id !== CargoEnum.Administrador
						}
					>
						<Pencil2Icon />
					</Button>
				) : (
					<Button>Novo funcionário</Button>
				)}
			</SheetTrigger>
			<SheetContent className="tablet:w-[540px] cellphone:w-full">
				<SheetHeader>
					<SheetTitle>{props.funcionario?.id ? "Editar" : "Criar"}</SheetTitle>
					<SheetDescription>
						{props.funcionario?.id ? "Editar" : "Criar um novo"} funcionário
					</SheetDescription>
				</SheetHeader>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-2 items-center gap-4">
						<Label htmlFor="nome">Nome</Label>
						<Input
							id="nome"
							type="text"
							placeholder="Digite o nome"
							value={funcionario?.nome}
							onChange={(value) => {
								setFuncionario({
									...funcionario,
									nome: value.target.value,
								});
							}}
						/>
					</div>
					<div className="grid grid-cols-2 items-center gap-4">
						<Label htmlFor="nome">Senha</Label>
						<Input
							id="nome"
							type="text"
							placeholder="Digite uma senha"
							value={funcionario?.senha}
							onChange={(value) => {
								setFuncionario({
									...funcionario,
									senha: value.target.value,
								});
							}}
						/>
					</div>
					<div className="grid grid-cols-2 items-center gap-4">
						<Label htmlFor="cargo">Cargo</Label>
						<Select
							value={String(funcionario?.cargo)}
							onValueChange={(value) =>
								setFuncionario({
									...funcionario,
									cargo: Number(value),
								})
							}
						>
							<SelectTrigger>
								<SelectValue placeholder="Selecione um cargo" />
							</SelectTrigger>
							<SelectContent>
								{cargos
									.filter((c) => {
										if (
											funcionarioLogado?.cargo.id === CargoEnum.Administrador
										) {
											return true;
										} else {
											return c.id !== CargoEnum.Administrador;
										}
									})
									.map((cargo) => (
										<SelectItem key={cargo.id} value={String(cargo.id)}>
											{cargo.descricao}
										</SelectItem>
									))}
							</SelectContent>
						</Select>
					</div>
					<div className="grid grid-cols-2 items-center gap-4">
						<Label htmlFor="ativo">Ativo</Label>
						<Switch
							checked={funcionario.ativo}
							onCheckedChange={() =>
								setFuncionario({
									...funcionario,
									ativo: !funcionario.ativo,
								})
							}
						/>
					</div>
				</div>
				<SheetFooter>
					<SheetClose asChild>
						<Button
							className="w-[30%] ms-auto"
							type="submit"
							onClick={onHandleSubmit}
						>
							{props.funcionario?.id ? "Editar" : "Criar"}
						</Button>
					</SheetClose>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
};
