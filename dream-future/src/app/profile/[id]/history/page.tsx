"use client";

import React from "react";
import ProfilePagesTitle from "../_components/ProfilePagesTitle";
import { ChartAreaInteractive } from "../_components/Graph";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import HistoryCard from "../_components/HistoryCard";
import {
  ArrowDownUp,
  CalendarFold,
  Funnel,
  LayoutGrid,
  List,
} from "lucide-react";

const History = () => {
  const [timeRange, setTimeRange] = React.useState("90d");

  return (
    <div className="space-y-12">
      <ProfilePagesTitle
        title="History"
        description="Showing your all histories with a clear view."
      />

      <div className="flex gap-8">
        <div className="flex-3 border-2 p-6 rounded-xl"></div>

        <div className="border-2 p-6 rounded-xl flex-2 h-fit">
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

          <ChartAreaInteractive />
        </div>
      </div>

      <div className="flex gap-8">
        <div className="flex-6 border-2 p-6 rounded-xl">
          <div className="py-3 flex justify-between items-center">
            <h1 className="text-2xl font-medium mb-2.5 ps-3 relative before:absolute before:content-[''] before:w-1 before:h-10/12 before:top-4/7 before:left-0 before:bg-primary before:rounded-full before:-translate-y-1/2">
              Your Diposite Histories
            </h1>

            <div className="flex items-center gap-2.5">
              <LayoutGrid size={34} className="cursor-pointer p-1.5 border rounded-md bg-gray-400/10" />
              <List size={34} className="cursor-pointer p-1.5 border rounded-md me-2.5" />
              <div className="cursor-pointer flex items-center gap-2 border px-2.5 py-1 rounded-md">
                <ArrowDownUp size={18} />
                <span className="inline">Sort</span>
              </div>
              <div className="cursor-pointer flex items-center gap-2 border px-2.5 py-1 rounded-md">
                <Funnel size={18}/>
                <span className="inline">Filter</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-[repeat(3,minmax(300px,1fr))] justify-items-center gap-7">
            {Array.from({ length: 50 }).map((_, idx) => (
              <HistoryCard key={idx}>
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-medium leading-6">January</h2>
                  <div className="flex items-center gap-1.5">
                    <CalendarFold size={16} />
                    <p className="text-xs">10/01/2025</p>
                  </div>
                </div>
              </HistoryCard>
            ))}
          </div>
        </div>
        <div className="flex-2 border-2 p-6 rounded-xl"></div>
      </div>
    </div>
  );
};

export default History;
