export class EstacionamentoCreateRequest {
	nome: string;
	endereco: string;
	telefone: string;
	vagas: number;
	valor_hora: number;
	valor_mensalidade?: number;
	constructor(params: EstacionamentoCreateRequest) {
		this.nome = params.nome;
		this.endereco = params.endereco;
		this.telefone = params.telefone;
		this.vagas = params.vagas;
		this.valor_hora = params.valor_hora;
		this.valor_mensalidade = params.valor_mensalidade
	}
}
