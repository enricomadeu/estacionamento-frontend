export class FuncionarioLoginRequest {
	nome: string;
	senha: string;
	constructor(params: FuncionarioLoginRequest) {
		this.nome = params.nome;
		this.senha = params.senha;
	}
}
