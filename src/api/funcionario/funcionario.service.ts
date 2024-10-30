import { api } from "@/api";
import { FuncionarioCreateRequest } from "@/api/funcionario/requests/funcionarioCreate.request";
import { FuncionarioResponse } from "@/api/funcionario/responses/funcionario.response";
import { FuncionarioLoginRequest } from "@/api/funcionario/requests/funcionarioLogin.request";

export const getFuncionarios = async () => {
	return api.get<FuncionarioResponse[]>("/funcionarios");
};

export const getFuncionariosEstacionamento = async (id: string) => {
	return api.get<FuncionarioResponse[]>(`/funcionarios/estacionamento/${id}`);
};

export const getFuncionario = async (id: string) => {
	return api.get<FuncionarioResponse[]>(`/funcionarios/${id}`);
};

export const createFuncionario = async (data: FuncionarioCreateRequest) => {
	return api.post("/funcionarios", data);
};

export const updateFuncionario = async (
	id: number,
	data: FuncionarioCreateRequest
) => {
	return api.put(`/funcionarios/${id}`, data);
};

export const loginFuncionario = async (data: FuncionarioLoginRequest) => {
	return api.post<FuncionarioResponse>("/funcionarios/login", data);
};
