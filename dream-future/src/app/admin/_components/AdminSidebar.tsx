"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import {
  ArrowLeftRight,
  BookUser,
  ChartNoAxesColumn,
  DoorOpen,
  LayoutDashboard,
  MessageSquareShare,
  Settings,
  Users,
} from "lucide-react";

const sidebarItems = [
  { label: "Dashboard", icon: <LayoutDashboard />, link: "/admin" },
  {
    label: "Analytics",
    icon: <ChartNoAxesColumn />,
    link: "/admin/analytics",
  },
  { label: "Users", icon: <Users />, link: "/admin/users" },
  { label: "Accounts", icon: <BookUser />, link: "/admin/accounts" },
  {
    label: "Transactions",
    icon: <ArrowLeftRight />,
    link: "/admin/transactions",
  },
  {
    label: "Requests",
    icon: <MessageSquareShare />,
    link: "/admin/requests",
  },
  { label: "Settings", icon: <Settings />, link: "/admin/settings" },
];

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <>
      <aside className={cn()}>
        <ul className="p-2 mt-10 ml-10 bg-primary rounded-full">
          {sidebarItems.map((item, idx) => {
            const navActive = pathname === item.link;
            return (
              <Link key={idx} href={item.link}>
                <li
                  className={cn(
                    "p-3 border-2 border-transparent hover:border-green-500 rounded-full mb-4",
                    navActive && "bg-green-500"
                  )}
                >
                  {item.icon}
                </li>
              </Link>
            );
          })}

          <Link href="/">
            <li className="p-3 border-2 border-transparent hover:border-green-500 rounded-full">
              <DoorOpen />
            </li>
          </Link>
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
