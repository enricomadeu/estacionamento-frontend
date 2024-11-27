import { useState } from "react";
import { EntradaSaidaResponse } from "@/api/entradaSaida/responses/entradaSaida.response";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { Label } from "@radix-ui/react-label";
import { format } from "date-fns";
import { confirmarPagamento } from "@/api/entradaSaida/entradaSaida.service";
import { toast } from "sonner";
import { useAuth } from "@/AuthContext";

interface EntradaSaidaFormProps {
	entradaSaida: EntradaSaidaResponse;
	valor: number;
	buscarEntradasSaidas: () => void;
}

export const EntradaSaidaForm = (props: EntradaSaidaFormProps) => {
	const { funcionario } = useAuth();
	const { entradaSaida, valor, buscarEntradasSaidas } = props;
	const [isOpen, setIsOpen] = useState(false);

	const onHandleSubmit = async () => {
		console.log("onHandleSubmit");
		try {
			await confirmarPagamento(entradaSaida.placa);
			toast.success("Pagamento confirmado com sucesso!", {
				className: "bg-green-600 text-white",
			});
			setIsOpen(false);
			buscarEntradasSaidas();
		} catch {
			toast.error("Erro ao realizar operação.", {
				className: "bg-red-500 text-white",
			});
		}
	};

	return (
		<Sheet open={isOpen} onOpenChange={setIsOpen}>
			<SheetTrigger asChild>
				<Button variant="outline" size="icon">
					<DotsVerticalIcon />
				</Button>
			</SheetTrigger>
			<SheetContent className="tablet:w-[540px] cellphone:w-full">
				<SheetHeader>
					<SheetTitle>Veículo {entradaSaida.placa}</SheetTitle>
					<SheetDescription>
						Informações de entrada/saída do veículo com placa{" "}
						{entradaSaida.placa}
					</SheetDescription>
				</SheetHeader>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-2 items-center gap-4">
						<Label htmlFor="placa">Placa</Label>
						<Input id="placa" type="text" value={entradaSaida.placa} readOnly />
					</div>
					<div className="grid grid-cols-2 items-center gap-4">
						<Label htmlFor="entrada">Entrada</Label>
						<Input
							id="entrada"
							type="text"
							value={format(entradaSaida.data_entrada, "dd/MM/yyyy - HH:mm")}
							readOnly
						/>
					</div>
					<div className="grid grid-cols-2 items-center gap-4">
						<Label htmlFor="saida">Saída</Label>
						<Input
							id="saida"
							type="text"
							value={
								entradaSaida.data_saida
									? format(entradaSaida.data_saida, "dd/MM/yyyy - HH:mm")
									: "-"
							}
							readOnly
						/>
					</div>
					<div className="grid grid-cols-2 items-center gap-4">
						<Label htmlFor="valor">Valor</Label>
						<Input
							id="valor"
							type="text"
							value={valor.toLocaleString("pt-BR", {
								style: "currency",
								currency: "BRL",
							})}
							readOnly
						/>
					</div>
					<div className="grid grid-cols-2 items-center gap-4">
						<Label htmlFor="pago">Pago</Label>
						<Input
							id="pago"
							type="text"
							value={entradaSaida.pago ? "Sim" : "Não"}
							readOnly
						/>
					</div>
					<div className="grid grid-cols-2 items-center gap-4">
						<Label htmlFor="estacionamento">Estacionamento</Label>
						<Input
							id="estacionamento"
							type="text"
							value={entradaSaida.estacionamento.nome}
							readOnly
						/>
					</div>
				</div>
				<SheetFooter>
					{!entradaSaida.pago && funcionario && (
						<Button
							className="w-[50%] ms-auto"
							type="submit"
							onClick={onHandleSubmit}
						>
							Confirmar pagamento
						</Button>
					)}
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
};
