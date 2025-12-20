"use client";

import { useAccounts } from "@/providers/AccountContext";
import { cn } from "@/lib/utils";
import { Eye, Ban, RefreshCcw, Wallet, Layers } from "lucide-react";
import ProfilePagesTitle from "@/app/_components/ui/PagesTitle";
import { useMemo, useState } from "react";

const AccountsPage = () => {
  const { accounts, setActiveAccount, loading } = useAccounts();
  const [search, setSearch] = useState<string>("");

  const filteredAccounts = useMemo(() => {
    if (!search) return accounts;

    return accounts.filter((acc) =>
      acc._id?.toString().toLowerCase().includes(search.toLowerCase())
    );
  }, [accounts, search]);

  if (loading) {
    return <div className="text-center py-20">Loading accounts...</div>;
  }

  return (
    <div className="space-y-8">
      {/* ================= PAGE TITLE COMPONENT ================= */}
      <ProfilePagesTitle
        title="Accounts"
        description="Manage all user accounts from here"
      >
        <input
          type="text"
          placeholder="Search by User Name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-2 border rounded-md text-sm w-68"
        />
      </ProfilePagesTitle>

      {/* ================= OVERVIEW CARDS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="Total Accounts"
          value={accounts.length}
          icon={<Layers />}
        />
        <StatCard
          title="Active Accounts"
          value={accounts.filter((a) => a.status === "active").length}
          icon={<Wallet />}
          color="text-green-500"
        />
        <StatCard
          title="Blocked Accounts"
          value={accounts.filter((a) => a.status === "block").length}
          icon={<Ban />}
          color="text-red-500"
        />
      </div>

      {/* ================= ACCOUNTS TABLE ================= */}
      <div className="border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="p-3">Account</th>
              <th>Balance</th>
              <th>Deposit</th>
              <th>Profit</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody className="text-center">
            {filteredAccounts.map((account) => {
              return (
                <tr
                  key={account._id?.toString()}
                  className={cn("border-t hover:bg-muted/40 transition")}
                >
                  <td className="p-3 font-semibold">
                    {account._id?.toString()}
                  </td>

                  <td>৳ {account.balance}</td>
                  <td>৳ {account.totalDeposit}</td>
                  <td>৳ {account.totalProfit}</td>

                  <td>
                    <span
                      className={cn(
                        "px-2 py-1 rounded-full text-xs",
                        account.status === "active"
                          ? "bg-green-500/20 text-green-500"
                          : "bg-red-500/20 text-red-500"
                      )}
                    >
                      {account.status.toUpperCase()}
                    </span>
                  </td>

                  <td className="flex gap-2 justify-center">
                    <ActionBtn icon={<Eye />} />
                    <ActionBtn
                      icon={<RefreshCcw />}
                      onClick={() => setActiveAccount(account)}
                    />
                    <ActionBtn
                      icon={<Ban />}
                      danger={account.status === "active"}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AccountsPage;

/* ================= SMALL COMPONENTS ================= */

const StatCard = ({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color?: string;
}) => (
  <div className="p-5 rounded-xl border flex justify-between items-center">
    <div>
      <p className="text-sm text-muted-foreground">{title}</p>
      <h2 className="text-2xl font-bold">{value}</h2>
    </div>
    <div className={cn("size-10", color)}>{icon}</div>
  </div>
);

const ActionBtn = ({
  icon,
  onClick,
  danger,
}: {
  icon: React.ReactNode;
  onClick?: () => void;
  danger?: boolean;
}) => (
  <button
    onClick={onClick}
    className={cn(
      "p-2 rounded-md hover:bg-muted",
      danger && "text-red-500 hover:bg-red-500/10"
    )}
  >
    {icon}
  </button>
);
