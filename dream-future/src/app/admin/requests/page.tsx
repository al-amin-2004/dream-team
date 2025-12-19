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

/* ================= MOCK DATA ================= */

const requests = [
  {
    id: "req_001",
    userId: "user_1",
    accountId: "acc_1",
    amount: 5000,
    status: "PENDING",
    date: "2025-01-12",
  },
  {
    id: "req_002",
    userId: "user_2",
    accountId: "acc_2",
    amount: 12000,
    status: "APPROVED",
    date: "2025-01-10",
  },
  {
    id: "req_003",
    userId: "user_3",
    accountId: "acc_3",
    amount: 3000,
    status: "REJECTED",
    date: "2025-01-09",
  },
];

/* ================= PAGE ================= */

const AdminRequestsPage = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");

  const filtered = useMemo(() => {
    return requests.filter((req) => {
      const matchSearch =
        req.userId.includes(search) ||
        req.accountId.includes(search) ||
        req.id.includes(search);

      const matchStatus =
        status === "ALL" ? true : req.status === status;

      return matchSearch && matchStatus;
    });
  }, [search, status]);

  return (
    <div className="space-y-8">
      <PagesTitle
        title="Requests"
        description="Manage all user requests"
      />

      {/* ================= OVERVIEW CARDS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Stat title="Total" value={requests.length} icon={<Layers />} />
        <Stat
          title="Pending"
          value={requests.filter((r) => r.status === "PENDING").length}
          icon={<Clock />}
          color="text-yellow-500"
        />
        <Stat
          title="Approved"
          value={requests.filter((r) => r.status === "APPROVED").length}
          icon={<CheckCircle />}
          color="text-green-500"
        />
        <Stat
          title="Rejected"
          value={requests.filter((r) => r.status === "REJECTED").length}
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
            placeholder="Search by user/account/request"
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

      {/* ================= REQUESTS TABLE ================= */}
      <div className="border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="p-3 text-left">Request ID</th>
              <th>User</th>
              <th>Account</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((req) => (
              <tr
                key={req.id}
                className="border-t hover:bg-muted/40 transition"
              >
                <td className="p-3">{req.id}</td>
                <td>{req.userId}</td>
                <td>{req.accountId}</td>
                <td>৳ {req.amount}</td>
                <td>
                  <StatusBadge status={req.status} />
                </td>
                <td>{req.date}</td>
                <td className="flex gap-2">
                  <Action icon={<Eye />} />
                  {req.status === "PENDING" && (
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

export default AdminRequestsPage;

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
