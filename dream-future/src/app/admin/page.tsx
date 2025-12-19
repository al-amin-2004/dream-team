import ProfilePagesTitle from "@/app/_components/ui/PagesTitle";
import { Users, Wallet, TrendingUp, ShieldAlert } from "lucide-react";

const stats = [
  {
    title: "Total Users",
    value: "1,248",
    icon: Users,
    color: "text-cyan-400",
  },
  {
    title: "Total Accounts",
    value: "2,031",
    icon: Wallet,
    color: "text-green-400",
  },
  {
    title: "Monthly Deposits",
    value: "৳ 5,40,000",
    icon: TrendingUp,
    color: "text-yellow-400",
  },
  {
    title: "Blocked Users",
    value: "12",
    icon: ShieldAlert,
    color: "text-red-400",
  },
];

export default function AdminDashboard() {
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
