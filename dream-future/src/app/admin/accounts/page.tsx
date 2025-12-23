"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { getCurrentMonth } from "@/lib/getCurrentMonth";
import { Eye, Ban, Wallet, Layers } from "lucide-react";
import { useAllAccounts } from "@/providers/AllAccountsContext";
import { DepositIcon } from "@/icons";
import { Button } from "@/app/_components/ui/Button";
import { useAllUsers } from "@/providers/AllUsersContext";
import { IAccount } from "@/types";
import ProfilePagesTitle from "@/app/_components/ui/PagesTitle";
import ActionBtn from "../_components/ActionBtn";
import DialogInfoRow from "../_components/DialogInfoRow";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const AccountsPage = () => {
  const [search, setSearch] = useState<string>("");
  const [viewAccount, setViewAccount] = useState<IAccount | null>(null);
  const [depositAccount, setDepositAccount] = useState<IAccount | null>(null);
  const [amount, setAmount] = useState<number>(200);
  const [month, setMonth] = useState(getCurrentMonth);

  const { allAccounts, loading } = useAllAccounts();
  const { allUsers } = useAllUsers();

  const userMap = Object.fromEntries(
    allUsers.map((u) => [u._id.toString(), u])
  );

  const filteredAccounts = useMemo(() => {
    if (!search) return allAccounts;

    return allAccounts.filter(
      (acc) =>
        userMap[acc.userId.toString()].firstName
          .toLocaleLowerCase()
          .includes(search.toLocaleLowerCase()) ||
        userMap[acc.userId.toString()].lastName
          ?.toLocaleLowerCase()
          .includes(search.toLocaleLowerCase()) ||
        userMap[acc.userId.toString()].email
          .toLocaleLowerCase()
          .includes(search.toLocaleLowerCase())
    );
  }, [allAccounts, search, userMap]);

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
          placeholder="Search by User Name or Email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-2 border rounded-md text-sm w-68"
        />
      </ProfilePagesTitle>

      {/* ================= OVERVIEW CARDS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="Total Accounts"
          value={allAccounts.length}
          icon={<Layers />}
        />
        <StatCard
          title="Active Accounts"
          value={allAccounts.filter((a) => a.status === "active").length}
          icon={<Wallet />}
          color="text-green-500"
        />
        <StatCard
          title="Blocked Accounts"
          value={allAccounts.filter((a) => a.status === "block").length}
          icon={<Ban />}
          color="text-red-500"
        />
      </div>

      {/* ================= ACCOUNTS TABLE ================= */}
      <div className="border rounded-xl overflow-hidden">
        <table className="w-full text-sm table-fixed">
          <thead className="bg-muted">
            <tr>
              <th className="p-3">Account</th>
              <th>Name</th>
              <th>Email</th>
              <th>Deposit</th>
              <th>Profit</th>
              <th>Balance</th>
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
                  <td className="p-3 font-semibold">{account.name}</td>

                  <td>
                    {userMap[account.userId.toString()]?.firstName}{" "}
                    {userMap[account.userId.toString()]?.lastName}
                  </td>
                  <td>{userMap[account.userId.toString()]?.email}</td>
                  <td>৳ {account.totalDeposit}</td>
                  <td>৳ {account.totalProfit}</td>
                  <td>৳ {account.balance}</td>

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

                  <td className="flex gap-3 justify-center">
                    <ActionBtn
                      icon={<Eye />}
                      onClick={() => setViewAccount(account)}
                    />
                    <ActionBtn
                      icon={<DepositIcon className="size-5" />}
                      onClick={() => setDepositAccount(account)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ================= VIEW ACCOUNT DETAILS DIALOG ================= */}
      <Dialog open={!!viewAccount} onOpenChange={() => setViewAccount(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl">
              {viewAccount?.name} Account
            </DialogTitle>

            <div className="flex items-center justify-between">
              <DialogDescription>Account financial overview</DialogDescription>
              <span
                className={cn(
                  "px-3 py-1 rounded-full text-xs font-medium",
                  viewAccount?.status === "active"
                    ? "bg-green-500/15 text-green-500"
                    : "bg-red-500/15 text-red-500"
                )}
              >
                {viewAccount?.status.toUpperCase()}
              </span>
            </div>
          </DialogHeader>

          {viewAccount && (
            <div className="space-y-6">
              {/* ===== STATS ===== */}
              <div className="grid grid-cols-3 gap-3">
                <StatBox
                  label="Balance"
                  value={`৳ ${viewAccount.balance}`}
                  primary
                />
                <StatBox
                  label="Deposit"
                  value={`৳ ${viewAccount.totalDeposit}`}
                />
                <StatBox
                  label="Profit"
                  value={`৳ ${viewAccount.totalProfit}`}
                />
              </div>

              {/* ===== META INFO ===== */}
              <div className="rounded-lg border p-4 space-y-2 text-sm">
                <DialogInfoRow
                  className="flex justify-between"
                  label="Account Name"
                  value={viewAccount.name}
                />
                <DialogInfoRow
                  className="flex justify-between"
                  label="User Name"
                  value={`${
                    userMap[viewAccount.userId.toString()].firstName
                  } ${" "}
                  ${userMap[viewAccount.userId.toString()].lastName}`}
                />
                <DialogInfoRow
                  className="flex justify-between"
                  label="Email"
                  value={userMap[viewAccount.userId.toString()].email}
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <DialogClose asChild>
              <Button>Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ================= DEPOSIT FORM DIALOG ================= */}
      <Dialog
        open={!!depositAccount}
        onOpenChange={() => setDepositAccount(null)}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Cash Deposit</DialogTitle>
            <DialogDescription>
              Admin/Treaser cash deposit to user account
            </DialogDescription>
          </DialogHeader>

          {depositAccount && (
            <div className="space-y-5">
              {/* ===== ACCOUNT INFO ===== */}
              <div className="rounded-lg border p-3 text-sm space-y-1">
                <DialogInfoRow
                  label="Name"
                  value={`${
                    userMap[depositAccount.userId.toString()].firstName
                  } ${" "}
                  ${userMap[depositAccount.userId.toString()].lastName}`}
                />
                <DialogInfoRow
                  label="Account Name"
                  value={depositAccount.name}
                />
              </div>

              {/* ===== AMOUNT ===== */}
              <div>
                <label className="text-sm font-medium">Amount</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  placeholder="Enter deposit amount"
                  className="mt-1 w-full px-3 py-2 border rounded-md bg-background"
                />
              </div>

              {/* ===== MONTH ===== */}
              <div>
                <label className="text-sm font-medium">Month</label>
                <input
                  type="month"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  className="mt-1 w-full px-3 py-2 border rounded-md bg-background"
                />
              </div>
            </div>
          )}

          <DialogFooter className="gap-2">
            <DialogClose asChild>
              <Button>Cancel</Button>
            </DialogClose>

            <Button
              disabled={!amount || !month}
              onClick={() => {
                console.log({
                  accountId: depositAccount?._id,
                  amount,
                  month,
                  method: "Cash",
                });
              }}
            >
              Confirm Deposit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
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

const StatBox = ({
  label,
  value,
  primary,
}: {
  label: string;
  value: string;
  primary?: boolean;
}) => (
  <div
    className={cn(
      "p-3 rounded-lg text-center border",
      primary && "bg-primary/10 border-primary"
    )}
  >
    <p className="text-xs text-muted-foreground">{label}</p>
    <p className="text-lg font-semibold">{value}</p>
  </div>
);
