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
import { CreateMensalidadeRequest } from "@/api/mensalidade/requests/createMensalidade.request";
import { EstacionamentoResponse } from "@/api/estacionamento/responses/estacionamento.response";
import { createMensalidade } from "@/api/mensalidade/mensalidade.service";
import { MensalidadeResponse } from "@/api/mensalidade/responses/mensalidade.response";
import { format } from "date-fns";
import { DotsVerticalIcon } from "@radix-ui/react-icons";

interface MensalidadeFormProps {
	mensalidade?: MensalidadeResponse;
	estacionamento: EstacionamentoResponse;
	onBuscarMensalidades: (id: number) => void;
}

export const MensalidadeForm = (props: MensalidadeFormProps) => {
	const { estacionamento, mensalidade, onBuscarMensalidades } = props;
	const [novaMensalidade, setNovaMensalidade] =
		useState<CreateMensalidadeRequest>({
			placa: mensalidade?.placa ?? "",
			estacionamento: estacionamento.id,
		});

	const onHandleSubmit = async () => {
		try {
			if (!novaMensalidade.placa) {
				toast.error("Por favor, preencha todos os campos.", {
					className: "bg-red-500 text-white",
				});
				return;
			}

			await createMensalidade(novaMensalidade);
			toast.success("Mensalidade registrada com sucesso!", {
				className: "bg-green-600 text-white",
			});
		} catch {
			toast.error("Erro ao realizar operação.", {
				className: "bg-red-500 text-white",
			});
		} finally {
			onBuscarMensalidades(estacionamento.id);
		}
	};
	return (
		<Sheet>
			<SheetTrigger asChild>
				{mensalidade ? (
					<Button variant="outline" size="icon">
						<DotsVerticalIcon />
					</Button>
				) : (
					<Button>Nova Mensalidade</Button>
				)}
			</SheetTrigger>
			<SheetContent className="tablet:w-[540px] cellphone:w-full">
				<SheetHeader>
					<SheetTitle>Registrar nova mensalidade</SheetTitle>
					<SheetDescription>
						Preencha os campos abaixo para registrar uma nova mensalidade.
					</SheetDescription>
				</SheetHeader>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-2 items-center gap-4">
						<Label htmlFor="placa">Placa</Label>
						<Input
							id="placa"
							type="text"
							placeholder="Digite a placa do veículo"
							value={novaMensalidade?.placa}
							onChange={(value) => {
								setNovaMensalidade({
									...novaMensalidade,
									placa: value.target.value
										.toUpperCase()
										.replace(/[^a-zA-Z0-9]/g, ""),
								});
							}}
							readOnly={mensalidade ? true : false}
						/>
					</div>
				</div>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-2 items-center gap-4">
						<Label htmlFor="estacionamento">Estacionamento</Label>
						<Input
							id="estacionamento"
							type="text"
							value={estacionamento.nome}
							readOnly
						/>
					</div>
				</div>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-2 items-center gap-4">
						<Label htmlFor="data_pagamento">Data pagamento</Label>
						<Input
							id="data_pagamento"
							type="text"
							value={format(
								mensalidade?.data_pagamento ?? new Date(),
								"dd/MM/yyyy"
							)}
							readOnly
						/>
					</div>
				</div>
				{mensalidade && (
					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-2 items-center gap-4">
							<Label htmlFor="data_vencimento">Data vencimento</Label>
							<Input
								id="data_vencimento"
								type="text"
								value={format(
									new Date(
										new Date(mensalidade.data_pagamento).setMonth(
											new Date(mensalidade.data_pagamento).getMonth() + 1
										)
									),
									"dd/MM/yyyy"
								)}
								readOnly
							/>
						</div>
					</div>
				)}
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-2 items-center gap-4">
						<Label htmlFor="valor">Valor</Label>
						<Input
							id="valor"
							type="text"
							value={estacionamento.valor_mensalidade?.toLocaleString("pt-BR", {
								style: "currency",
								currency: "BRL",
							})}
							readOnly
						/>
					</div>
				</div>
				<SheetFooter>
					<SheetClose asChild>
						{!mensalidade && (
							<Button
								className="w-[30%] ms-auto"
								type="submit"
								onClick={onHandleSubmit}
							>
								Registrar
							</Button>
						)}
					</SheetClose>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
};
