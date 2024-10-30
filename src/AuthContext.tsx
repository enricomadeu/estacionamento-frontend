import React, { createContext, useContext, useState } from "react";
import { FuncionarioResponse } from "@/api/funcionario/responses/funcionario.response";

interface AuthContextType {
	funcionario: FuncionarioResponse | null;
	setFuncionario: (funcionario: FuncionarioResponse) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const EXPIRATION_TIME = 24 * 60 * 60 * 1000; // 24 horas em milissegundos

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [funcionario, setFuncionarioState] =
		useState<FuncionarioResponse | null>(() => {
			const storedFuncionario = localStorage.getItem("funcionario");
			if (storedFuncionario) {
				const { data, timestamp } = JSON.parse(storedFuncionario);
				if (Date.now() - timestamp < EXPIRATION_TIME) {
					return data;
				} else {
					localStorage.removeItem("funcionario");
				}
			}
			return null;
		});

	const setFuncionario = (funcionario: FuncionarioResponse) => {
		const dataToStore = {
			data: funcionario,
			timestamp: Date.now(),
		};
		setFuncionarioState(funcionario);
		localStorage.setItem("funcionario", JSON.stringify(dataToStore));
	};

	return (
		<AuthContext.Provider value={{ funcionario, setFuncionario }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
