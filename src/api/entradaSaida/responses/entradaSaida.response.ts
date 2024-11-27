import { EstacionamentoResponse } from "@/api/estacionamento/responses/estacionamento.response";

export class EntradaSaidaResponse {
	id: number;
	placa: string;
	estacionamento: EstacionamentoResponse;
	data_entrada: Date;
	data_saida?: Date;
	valor_pago?: number;
	pago: boolean;

	constructor(params: EntradaSaidaResponse) {
		this.id = params.id;
		this.placa = params.placa;
		this.estacionamento = params.estacionamento;
		this.data_entrada = params.data_entrada;
		this.data_saida = params.data_saida;
		this.valor_pago = params.valor_pago;
		this.pago = params.pago;
	}
}
