"use client";

import { useMemo, useState } from "react";
import { Eye, Search } from "lucide-react";
import PagesTitle from "@/app/_components/ui/PagesTitle";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/* ================= MOCK DATA (API READY) ================= */
const transactions = [
  {
    id: "tx_001",
    userId: "user_1",
    accountId: "acc_1",
    amount: 5000,
    method: "Bkash",
    transactionId: "scdsnl3954ni34f3vf",
    date: "2025-01-12",
  },
  {
    id: "tx_002",
    userId: "user_2",
    accountId: "acc_2",
    amount: 12000,
    method: "Nagad",
    transactionId: "sdfjk3945r3ej43",
    date: "2025-01-10",
  },
  {
    id: "tx_003",
    userId: "user_3",
    accountId: "acc_3",
    amount: 3000,
    method: "Rocket",
    transactionId: "skjdsdl8435n83f",
    date: "2025-01-09",
  },
];

/* ================= PAGE ================= */
const AdminTransactionsPage = () => {
  const [search, setSearch] = useState("");
  const [method, setMethod] = useState("all");

  const filtered = useMemo(() => {
    return transactions.filter((tx) => {
      const matchSearch =
        tx.userId.includes(search) || tx.accountId.includes(search);

      const matchMethod = method === "all" ? true : tx.method === method;

      return matchSearch && matchMethod;
    });
  }, [search, method]);

  return (
    <div className="space-y-8">
      <PagesTitle
        title="Transactions"
        description="Manage all user transactions"
      />

      {/* ================= FILTER BAR ================= */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by user or account"
            className="w-full pl-9 pr-3 py-2 rounded-md bg-background border"
          />
        </div>

        <Select value={method} onValueChange={(value) => setMethod(value)}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder={method} />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All Methods</SelectItem>
            <SelectItem value="Bkash">Bkash</SelectItem>
            <SelectItem value="Nagad">Nagad</SelectItem>
            <SelectItem value="Rocket">Rocket</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* ================= TABLE ================= */}
      <div className="border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted text-left">
            <tr>
              <th className="p-3 text-left">User</th>
              <th>Account</th>
              <th>Amount</th>
              <th>Method</th>
              <th>Transaction ID</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((tx) => (
              <tr key={tx.id} className="border-t hover:bg-muted/40 transition">
                <td className="p-3">{tx.userId}</td>
                <td>{tx.accountId}</td>
                <td>৳ {tx.amount}</td>
                <td>{tx.method}</td>
                <td>{tx.transactionId}</td>
                <td>{tx.date}</td>
                <td>
                  <Eye />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTransactionsPage;
