import { api } from "@/api";
import { EntradaSaidaResponse } from "@/api/entradaSaida/responses/entradaSaida.response";

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
