import { api } from "@/api";
import { CargoResponse } from "./responses/cargo.response";

export const getCargos = async () => {
	return api.get<CargoResponse[]>("/cargos");
};
