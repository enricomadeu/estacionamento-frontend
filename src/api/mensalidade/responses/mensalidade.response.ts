import { EstacionamentoResponse } from "@/api/estacionamento/responses/estacionamento.response";

export class MensalidadeResponse {
	id: number;
	placa: string;
	estacionamento: EstacionamentoResponse;
	data_pagamento: Date;
	valor_pago: number;

	constructor(params: MensalidadeResponse) {
		this.id = params.id;
		this.placa = params.placa;
		this.estacionamento = params.estacionamento;
		this.data_pagamento = params.data_pagamento;
		this.valor_pago = params.valor_pago;
	}
}
