import { api } from "@/api";
import { EntradaSaidaResponse } from "@/api/entradaSaida/responses/entradaSaida.response";
import { EntradaSaidaRelatorioResponse } from "./responses/entradaSaidaRelatorio.response";

export const getEntradaSaidas = async () => {
	return api.get<EntradaSaidaResponse[]>("/entradaSaidas");
};

export const getEntradasSaidasEstacionamentos = async (
	idEstacionamento: number
) => {
	return api.get<EntradaSaidaResponse[]>(
		`entradas-saidas/estacionamento/${idEstacionamento}`
	);
};

export const getEntradasSaidasPlaca = async (placa: string) => {
	return api.get<EntradaSaidaResponse[]>(`entradas-saidas/placa/${placa}`);
};

export const confirmarPagamento = async (placa: string) => {
	return api.put(`/entradas-saidas/placa/${placa}/pagamento`);
};

export const getEntradaSaidaRelatorio = async (
	idEstacionamento: number,
	dataInicio: string,
	dataFim: string
) => {
	return api.get<EntradaSaidaRelatorioResponse[]>(
		`entradas-saidas/estacionamento/${idEstacionamento}/dashboard?data_inicio=${dataInicio}&data_fim=${dataFim}`
	);
};
