export class EstacionamentoResponse {
	id: number;
	nome: string;
	endereco: string;
	telefone: string;
	vagas: number;
	valor_hora: number;
	ativo: boolean;
	constructor(params: EstacionamentoResponse) {
		this.id = params.id;
		this.nome = params.nome;
		this.endereco = params.endereco;
		this.telefone = params.telefone;
		this.vagas = params.vagas;
		this.valor_hora = params.valor_hora;
		this.ativo = params.ativo;
	}
}
