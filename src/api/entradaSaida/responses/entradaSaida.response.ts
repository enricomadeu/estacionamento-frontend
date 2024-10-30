import { EstacionamentoResponse } from "@/api/estacionamento/responses/estacionamento.response";

export class EntradaSaidaResponse {
	id: number;
	placa: string;
	estacionamento: EstacionamentoResponse;
	dataEntrada: Date;
	dataSaida?: Date;
	valorPago?: number;
	pago: boolean;

	constructor(params: EntradaSaidaResponse) {
		this.id = params.id;
		this.placa = params.placa;
		this.estacionamento = params.estacionamento;
		this.dataEntrada = params.dataEntrada;
		this.dataSaida = params.dataSaida;
		this.valorPago = params.valorPago;
		this.pago = params.pago;
	}
}
