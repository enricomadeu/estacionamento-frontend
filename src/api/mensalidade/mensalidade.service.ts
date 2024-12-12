import { api } from "@/api";
import { MensalidadeResponse } from "@/api/mensalidade/responses/mensalidade.response";
import { CreateMensalidadeRequest } from "@/api/mensalidade/requests/createMensalidade.request";

export const getMensalidades = async () => {
	return api.get<MensalidadeResponse[]>("/mensalidades");
};

export const getMensalidadesEstacionamento = async (id: number) => {
	return api.get<MensalidadeResponse[]>(`/mensalidades/estacionamento/${id}`);
};

export const getMensalidadesPlaca = async (placa: string) => {
	return api.get<MensalidadeResponse[]>(`/mensalidades/placa/${placa}`);
};

export const createMensalidade = async (data: CreateMensalidadeRequest) => {
	return api.post("/mensalidades", data);
};
