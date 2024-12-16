export class EntradaSaidaRelatorioResponse {
	mes: string;
	totalArrecadado: number;
	veiculosEstacionados: number;

	constructor(params: EntradaSaidaRelatorioResponse) {
		this.mes = params.mes;
		this.totalArrecadado = params.totalArrecadado;
		this.veiculosEstacionados = params.veiculosEstacionados;
	}
}
