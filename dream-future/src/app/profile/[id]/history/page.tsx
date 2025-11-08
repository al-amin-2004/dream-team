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

          <div className="py-3 flex gap-2 items-center">
            <div className="w-1.5 rounded-full bg-primary h-6 mb-1" />
            <h1 className="text-2xl font-medium mb-2.5">
              Your Diposite Histories
            </h1>
          </div>

          <div className="grid grid-cols-[repeat(3,minmax(300px,1fr))] justify-items-center gap-7">
            {Array.from({ length: 50 }).map((_, idx) => (
              <HistoryCard key={idx}>s</HistoryCard>
            ))}
          </div>
        </div>
        <div className="flex-2 border-2 p-6 rounded-xl"></div>
      </div>
    </div>
  );
};

export default History;
