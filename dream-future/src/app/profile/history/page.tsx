"use client";

import { useState } from "react";
import ProfilePagesTitle from "../../_components/ProfilePagesTitle";
import { ChartAreaInteractive } from "../../_components/Graph";
import { ArrowDownUp, Funnel, LayoutGrid, List } from "lucide-react";
import {
  HistoryCardGrid,
  HistoryCardList,
} from "../../_components/HistoryCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const History = () => {
  const [isGrid, setIsGrid] = useState<boolean>(true);
  const [timeRange, setTimeRange] = useState("90d");

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
        <div className="flex-6 border-2 py-6 pl-6 rounded-xl">
          <div className="py-3 flex justify-between items-center pe-6">
            <h1 className="text-2xl font-medium mb-2.5 ps-3 relative before:absolute before:content-[''] before:w-1 before:h-10/12 before:top-4/7 before:left-0 before:bg-primary before:rounded-full before:-translate-y-1/2">
              Your Transition Histories
            </h1>

            <div className="flex items-center gap-2.5">
              <LayoutGrid
                size={34}
                className={`cursor-pointer p-1.5 border rounded-md ${
                  isGrid && "bg-gray-400/10"
                }`}
                onClick={() => setIsGrid(true)}
              />
              <List
                size={34}
                className={`cursor-pointer p-1.5 border rounded-md me-2.5 ${
                  !isGrid && "bg-gray-400/10"
                }`}
                onClick={() => setIsGrid(false)}
              />
              <div className="cursor-pointer flex items-center gap-2 border px-2.5 py-1 rounded-md">
                <ArrowDownUp size={18} />
                <span className="inline">Sort</span>
              </div>
              <div className="cursor-pointer flex items-center gap-2 border px-2.5 py-1 rounded-md">
                <Funnel size={18} />
                <span className="inline">Filter</span>
              </div>
            </div>
          </div>

          <div
            className={`max-h-185 pe-6 overflow-y-scroll grid justify-items-center ${
              isGrid
                ? "grid-cols-[repeat(3,minmax(300px,1fr))] gap-6"
                : "grid-cols-1 gap-2.5"
            }`}
          >
            <div
              className={`w-full rounded-md p-4 min-w-[350px] bg-[#1e1f21] grid grid-cols-5 place-items-center text-lg font-medium border border-emerald-600 sticky top-0 ${
                isGrid && "hidden"
              }`}
            >
              <h2>Transaction Type</h2>
              <p>Date</p>
              <p>Method</p>
              <p>Amount</p>
              <p>Transition ID / Refer by</p>
            </div>

            {Array.from({ length: 50 }).map((_, idx) => {
              return isGrid ? (
                <HistoryCardGrid
                  key={idx}
                  transactionType="Diposite"
                  date="12/01/2025"
                  method="Bkash"
                  amount={200}
                  transactionId="bq83b28d2d4"
                />
              ) : (
                <HistoryCardList
                  key={idx}
                  transactionType="Withdraw"
                  date="12/01/2025"
                  method="Cash"
                  amount={200}
                  referBy="Al amin"
                />
              );
            })}
          </div>
        </div>
        <div className="flex-2 border-2 p-6 rounded-xl"></div>
      </div>
    </div>
  );
};

export default History;
