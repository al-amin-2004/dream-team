"use client";

import { useMemo, useState } from "react";
import { HistoryCardProps } from "./HistoryCard";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function ChartAreaInteractive({
  monthlyDate,
}: {
  monthlyDate: HistoryCardProps[];
}) {
  const [timeRange, setTimeRange] = useState("90d");
  const chartData = useMemo(() => {
    return monthlyDate.map((d) => ({
      month: new Date(d.depositDate).toLocaleDateString("en-BD", {
        month: "short",
        year: "numeric",
      }),
      date: new Date(d.depositDate).toLocaleDateString("en-BD", {
        day: "2-digit",
      }),
    }));
  }, [monthlyDate]);

  const chartConfig = {
    date: {
      label: "Date",
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig;
  return (
    <>
      <div className="flex justify-between py-3 border-b">
        <h1 className="text-xl font-semibold">Area Chart - Interactive</h1>

        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="hidden w-40 rounded-lg sm:ml-auto sm:flex"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <ChartContainer config={chartConfig}>
        <AreaChart
          accessibilityLayer
          data={chartData}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="line" />}
          />
          <Area
            dataKey="date"
            type="natural"
            fill="var(--color-date)"
            fillOpacity={0.4}
            stroke="var(--color-date)"
          />
        </AreaChart>
      </ChartContainer>
    </>
  );
}
