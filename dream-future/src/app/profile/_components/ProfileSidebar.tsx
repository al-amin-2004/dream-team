"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/providers/SidebarContext";
import { DoorOpen, History, Info, Settings, User, UserRoundPen } from "lucide-react";

const sidebarItems = [
  { label: "Profile", icon: <User />, link: "/profile" },
  { label: "History", icon: <History />, link: "/profile/history" },
  { label: "Info", icon: <Info />, link: "/profile/info" },
  { label: "Update Profle", icon: <UserRoundPen />, link: "/profile/update" },
  { label: "Settings", icon: <Settings />, link: "/profile/settings" },
];

const Sidebar = () => {
  const pathname = usePathname();
  const { open } = useSidebar();
  return (
    <aside
      className={cn(
        "p-2 border-r border-zinc-700 overflow-hidden transition-all duration-400 ease-in-out",
        open ? "w-84" : "w-25"
      )}
    >
      <div className="p-4">
        <ul className="space-y-2">
          {sidebarItems.map((item, idx) => {
            const navActive = pathname === item.link;
            return (
              <li key={idx}>
                <Link
                  href={item.link}
                  className={cn(
                    "flex items-center gap-2 rounded cursor-pointer",
                    { "hover:bg-slate-400/20": open && !navActive },
                    { "bg-primary": open && navActive }
                  )}
                >
                  <div
                    className={cn(
                      "p-2.5 rounded-full",
                      { "hover:bg-slate-400/20": !open && !navActive },
                      { "bg-primary": !open && navActive }
                    )}
                  >
                    {item.icon}
                  </div>
                  <p>{open && item.label}</p>
                </Link>
              </li>
            );
          })}
          <li>
            <Link
              href="/"
              className={cn("flex items-center gap-2 rounded cursor-pointer", {
                "hover:bg-slate-400/20": open,
              })}
            >
              <div
                className={cn("p-2.5 rounded-full", {
                  "hover:bg-slate-400/20": !open,
                })}
              >
                <DoorOpen />
              </div>
              <p>{open && "Exit"}</p>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
