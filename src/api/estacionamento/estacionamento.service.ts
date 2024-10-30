import { api } from "@/api";
import { EstacionamentoCreateRequest } from "./requests/estacionamentoCreate.request";

export const getEstacionamentos = async () => {
	return api.get("/estacionamentos");
};

export const createEstacionamento = async (
	data: EstacionamentoCreateRequest
) => {
	return api.post("/estacionamentos", data);
};

export const updateEstacionamento = async (
	id: number,
	data: EstacionamentoCreateRequest
) => {
	return api.put(`/estacionamentos/${id}`, data);
};

export const deleteEstacionamento = async (id: number) => {
	return api.delete(`/estacionamentos/${id}`);
};
