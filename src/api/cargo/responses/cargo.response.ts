export class CargoResponse {
	id: number;
	descricao: string;
	constructor(params: CargoResponse) {
		this.id = params.id;
		this.descricao = params.descricao;
	}
}
