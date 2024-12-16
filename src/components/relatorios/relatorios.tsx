import { EntradaSaidaRelatorioResponse } from "@/api/entradaSaida/responses/entradaSaidaRelatorio.response";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	ChartLegend,
	ChartLegendContent,
} from "@/components/ui/chart";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { DateRange } from "react-day-picker";

interface RelatoriosProps {
	entradaSaidaRelatorio: EntradaSaidaRelatorioResponse[];
	estacionamentoId: number;
	onBuscarRelatorio: (id: number, dataInicio: string, dataFim: string) => void;
}

const chartConfig = {
	totalArrecadado: {
		label: "Valor",
		color: "#2563eb",
	},
	veiculosEstacionados: {
		label: "Veículos",
		color: "#60a5fa",
	},
} satisfies ChartConfig;

export const Relatorios = (props: RelatoriosProps) => {
	const { entradaSaidaRelatorio, estacionamentoId, onBuscarRelatorio } = props;
	const [date, setDate] = useState<DateRange | undefined>({
		from: new Date(new Date().setMonth(new Date().getMonth() - 2)),
		to: new Date(),
	});

	const onAplicar = () => {
		if (date) {
			onBuscarRelatorio(
				estacionamentoId,
				date.from!.toISOString(),
				date.to!.toISOString()
			);
		}
	};

	return (
		<div className="w-full mt-4">
			<div className="w-full flex justify-between">
				<div className="grid gap-2">
					<Popover>
						<PopoverTrigger asChild>
							<Button
								id="date"
								variant={"outline"}
								className={cn(
									"w-[225px] justify-start text-left font-normal",
									!date && "text-muted-foreground"
								)}
							>
								<CalendarIcon />
								{date?.from ? (
									date.to ? (
										<>
											{format(date.from, "MMM dd, y", { locale: ptBR })} -{" "}
											{format(date.to, "MMM dd, y", { locale: ptBR })}
										</>
									) : (
										format(date.from, "MMM dd, y", { locale: ptBR })
									)
								) : (
									<span>Pick a date</span>
								)}
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-auto p-0" align="start">
							<Calendar
								initialFocus
								mode="range"
								defaultMonth={date?.from}
								selected={date}
								onSelect={setDate}
								numberOfMonths={2}
								locale={ptBR}
							/>
						</PopoverContent>
					</Popover>
				</div>
				<Button onClick={onAplicar}>Aplicar</Button>
			</div>
			<ChartContainer config={chartConfig} className="w-full min-h-[200px]">
				<BarChart accessibilityLayer data={entradaSaidaRelatorio}>
					<CartesianGrid vertical={false} />
					<XAxis
						dataKey="mes"
						tickLine={false}
						tickMargin={10}
						axisLine={false}
					/>
					<ChartTooltip content={<ChartTooltipContent />} />
					<ChartLegend content={<ChartLegendContent />} />
					<Bar
						dataKey={"totalArrecadado"}
						fill="var(--color-totalArrecadado)"
						radius={4}
					></Bar>
					<Bar
						dataKey="veiculosEstacionados"
						fill="var(--color-veiculosEstacionados)"
						radius={4}
					></Bar>
				</BarChart>
			</ChartContainer>
		</div>
	);
};
