import { CargoResponse } from "@/api/cargo/responses/cargo.response";
import { EstacionamentoResponse } from "@/api/estacionamento/responses/estacionamento.response";

export class FuncionarioResponse {
	id: number;
	nome: string;
	senha: string;
	cargo: CargoResponse;
	estacionamento: EstacionamentoResponse;
	ativo: boolean;

	constructor(params: FuncionarioResponse) {
		this.id = params.id;
		this.nome = params.nome;
		this.senha = params.senha;
		this.cargo = params.cargo;
		this.estacionamento = params.estacionamento;
		this.ativo = params.ativo;
	}
}
