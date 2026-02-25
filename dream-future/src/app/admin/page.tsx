"use client";

import ProfilePagesTitle from "@/app/_components/ui/PagesTitle";
import { Loading2 } from "@/icons";
import { useAllAccounts } from "@/providers/AllAccountsContext";
import { useAllUsers } from "@/providers/AllUsersContext";
import { Users, Wallet, TrendingUp, ShieldAlert } from "lucide-react";

export default function AdminDashboard() {
  const { allUsers, loading: userLoading } = useAllUsers();
  const { allAccounts, loading } = useAllAccounts();

  const blockedAccounts = allAccounts.filter(
    (account) => account.status === "block"
  );

  const stats = [
    {
      title: "Total Users",
      value: userLoading ? <Loading2 /> : allUsers.length,
      icon: Users,
      color: "text-cyan-400",
    },
    {
      title: "Total Accounts",
      value: loading ? <Loading2 /> : allAccounts.length,
      icon: Wallet,
      color: "text-green-400",
    },
    {
      title: "Deposits this Month",
      value: true ? <Loading2 /> : "৳ 5,40,000",
      icon: TrendingUp,
      color: "text-yellow-400",
    },
    {
      title: "Blocked Accounts",
      value: loading ? <Loading2 /> : blockedAccounts.length,
      icon: ShieldAlert,
      color: "text-red-400",
    },
    {
      title: "Still due this month",
      value: "10",
      icon: ShieldAlert,
      color: "text-red-500",
    },
  ];

  return (
    <div className="space-y-5 md:space-y-12">
      {/* ================= PAGE TITLE COMPONENT ================= */}
      <ProfilePagesTitle
        title="Admin Dashboard"
        description="System-wide overview, analytics and platform health."
      />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-[#111827] rounded-2xl">
            <div className="p-5 flex items-center justify-between">
              <div>
                <p className="text-sm text-zinc-400">{stat.title}</p>
                <h2 className="text-2xl font-semibold mt-1">{stat.value}</h2>
              </div>
              <stat.icon className={`size-10 ${stat.color}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
