"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Check,
  X,
  Eye,
  Search,
  Layers,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import PagesTitle from "@/app/_components/ui/PagesTitle";

/* ================= MOCK DATA (API READY) ================= */

const transactions = [
  {
    id: "tx_001",
    userId: "user_1",
    accountId: "acc_1",
    amount: 5000,
    method: "Bkash",
    status: "PENDING",
    date: "2025-01-12",
  },
  {
    id: "tx_002",
    userId: "user_2",
    accountId: "acc_2",
    amount: 12000,
    method: "Nagad",
    status: "APPROVED",
    date: "2025-01-10",
  },
  {
    id: "tx_003",
    userId: "user_3",
    accountId: "acc_3",
    amount: 3000,
    method: "Rocket",
    status: "REJECTED",
    date: "2025-01-09",
  },
];

/* ================= PAGE ================= */

const AdminTransactionsPage = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");

  const filtered = useMemo(() => {
    return transactions.filter((tx) => {
      const matchSearch =
        tx.userId.includes(search) || tx.accountId.includes(search);

      const matchStatus =
        status === "ALL" ? true : tx.status === status;

      return matchSearch && matchStatus;
    });
  }, [search, status]);

  return (
    <div className="space-y-8">
      <PagesTitle
        title="Transactions"
        description="Manage all user transactions"
      />

      {/* ================= OVERVIEW ================= */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Stat title="Total" value={transactions.length} icon={<Layers />} />
        <Stat
          title="Pending"
          value={transactions.filter((t) => t.status === "PENDING").length}
          icon={<Clock />}
          color="text-yellow-500"
        />
        <Stat
          title="Approved"
          value={transactions.filter((t) => t.status === "APPROVED").length}
          icon={<CheckCircle />}
          color="text-green-500"
        />
        <Stat
          title="Rejected"
          value={transactions.filter((t) => t.status === "REJECTED").length}
          icon={<XCircle />}
          color="text-red-500"
        />
      </div>

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

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="px-3 py-2 bg-background border rounded-md"
        >
          <option value="ALL">All Status</option>
          <option value="PENDING">Pending</option>
          <option value="APPROVED">Approved</option>
          <option value="REJECTED">Rejected</option>
        </select>
      </div>

      {/* ================= TABLE ================= */}
      <div className="border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="p-3 text-left">User</th>
              <th>Account</th>
              <th>Amount</th>
              <th>Method</th>
              <th>Status</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((tx) => (
              <tr
                key={tx.id}
                className="border-t hover:bg-muted/40 transition"
              >
                <td className="p-3">{tx.userId}</td>
                <td>{tx.accountId}</td>
                <td>৳ {tx.amount}</td>
                <td>{tx.method}</td>
                <td>
                  <StatusBadge status={tx.status} />
                </td>
                <td>{tx.date}</td>
                <td className="flex gap-2">
                  <Action icon={<Eye />} />
                  {tx.status === "PENDING" && (
                    <>
                      <Action icon={<Check />} success />
                      <Action icon={<X />} danger />
                    </>
                  )}
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

/* ================= SMALL COMPONENTS ================= */

const Stat = ({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  color?: string;
}) => (
  <div className="p-5 border rounded-xl flex justify-between items-center">
    <div>
      <p className="text-sm text-muted-foreground">{title}</p>
      <h2 className="text-2xl font-bold">{value}</h2>
    </div>
    <div className={cn("size-10", color)}>{icon}</div>
  </div>
);

const StatusBadge = ({ status }: { status: string }) => (
  <span
    className={cn(
      "px-2 py-1 rounded-full text-xs",
      status === "APPROVED" &&
        "bg-green-500/20 text-green-500",
      status === "PENDING" &&
        "bg-yellow-500/20 text-yellow-500",
      status === "REJECTED" &&
        "bg-red-500/20 text-red-500"
    )}
  >
    {status}
  </span>
);

const Action = ({
  icon,
  success,
  danger,
}: {
  icon: React.ReactNode;
  success?: boolean;
  danger?: boolean;
}) => (
  <button
    className={cn(
      "p-2 rounded-md hover:bg-muted",
      success && "text-green-500 hover:bg-green-500/10",
      danger && "text-red-500 hover:bg-red-500/10"
    )}
  >
    {icon}
  </button>
);
