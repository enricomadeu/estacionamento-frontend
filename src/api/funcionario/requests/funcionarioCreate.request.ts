export class FuncionarioCreateRequest {
	nome: string;
	senha: string;
	cargo: number;
	estacionamento: number;
	ativo: boolean;
	constructor(params: FuncionarioCreateRequest) {
		this.nome = params.nome;
		this.senha = params.senha;
		this.cargo = params.cargo;
		this.estacionamento = params.estacionamento;
		this.ativo = params.ativo;
	}
}
