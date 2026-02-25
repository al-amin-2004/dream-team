"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Ban, CheckCircle, Eye, Users, Shield } from "lucide-react";
import ProfilePagesTitle from "@/app/_components/ui/PagesTitle";
import Input from "@/app/_components/ui/Input";
import { UserRole } from "@/types";
import { useAllUsers } from "@/providers/AllUsersContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AdminMembersPage() {
  const { allUsers } = useAllUsers();
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<"all" | UserRole>("all");

  const filterdUsers = useMemo(() => {
    return allUsers.filter((user) => {
      const matchSearch =
        user.firstName.toLowerCase().includes(search.toLowerCase()) ||
        user.lastName?.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.username.toLowerCase().includes(search.toLowerCase());

      const matchRole = roleFilter === "all" ? true : user.role === roleFilter;

      return matchSearch && matchRole;
    });
  }, [allUsers, search, roleFilter]);
  

  return (
    <div className="space-y-8">
      {/* ================= PAGE TITLE ================= */}
      <ProfilePagesTitle
        title="Members"
        description="Manage all registered members"
      />

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="Total Members"
          value={allUsers.length}
          icon={<Users />}
        />
        <StatCard
          title="KISU EKTA DITE HOBE"
          value={10}
          icon={<CheckCircle />}
          color="text-green-500"
        />
        <StatCard
          title="KISU EKTA DITE HOBE"
          value={10}
          icon={<Ban />}
          color="text-red-500"
        />
      </div>

      {/* ================= SEARCH AND FILTER ================= */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <Input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-80 px-4 py-2 rounded-lg border bg-background outline-none focus:ring-2 focus:ring-primary"
        />

        {/* Role Filter */}
        <Select
          value={roleFilter}
          onValueChange={(value) => setRoleFilter(value as "all" | UserRole)}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder={roleFilter} />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="treasurer">Treasurer</SelectItem>
            <SelectItem value="member">Member</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* ================= TABLE ================= */}
      <div className="border rounded-xl overflow-hidden">
        <table className="w-full text-sm table-fixed">
          <thead className="bg-muted text-left">
            <tr>
              <th className="p-3">Users</th>
              <th>Username</th>
              <th>Role</th>
              <th>Accounts</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filterdUsers.map((user) => (
              <tr
                key={user._id.toString()}
                className="border-t hover:bg-muted/40 transition"
              >
                {/* USER */}
                <td className="p-3 flex items-center gap-3">
                  {user.avatar ? (
                    <Image
                      src={user.avatar}
                      width={36}
                      height={36}
                      alt="avatar"
                      className="rounded-full"
                    />
                  ) : (
                    <div className="size-9 rounded-full bg-primary/20 flex items-center justify-center font-semibold">
                      {user.firstName.slice(0, 1)}
                    </div>
                  )}

                  <div>
                    <p className="font-medium">
                      {user.firstName + " " + (user.lastName && user.lastName)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </td>

                {/* USERNAME */}
                <td>{user.username}</td>

                {/* ROLE */}
                <td>
                  <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-400">
                    <Shield className="size-3" />
                    {user.role.toLocaleUpperCase()}
                  </span>
                </td>

                {/* ACCOUNTS */}
                <td>{}</td>

                {/* ACTION */}
                <td title="See all info!">
                  <Eye className="cursor-pointer" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ================= SMALL COMPONENTS ================= */

const StatCard = ({
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
  <div className="p-5 rounded-xl border flex justify-between items-center">
    <div>
      <p className="text-sm text-muted-foreground">{title}</p>
      <h2 className="text-2xl font-bold">{value}</h2>
    </div>
    <div className={cn("size-10", color)}>{icon}</div>
  </div>
);
