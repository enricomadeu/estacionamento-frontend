export class CreateMensalidadeRequest {
	placa: string;
	estacionamento: number;

	constructor(params: CreateMensalidadeRequest) {
		this.placa = params.placa;
		this.estacionamento = params.estacionamento;
	}
}
