"use client";

import { useSidebar } from "@/providers/SidebarContext";
import { BellDot, ChevronDown, PanelLeft, PanelRight, User } from "lucide-react";

const Header = () => {
  const { open, toggle } = useSidebar();
  return (
    <header className="py-5 px-6 flex items-center justify-between border-b border-zinc-700 sticky top-0 z-50 bg-background">
      {/* right side */}
      <button onClick={toggle} className="cursor-pointer">
        {open ? <PanelLeft /> : <PanelRight />}
      </button>

      {/* left side */}
      <div className="flex items-center gap-5">
        <BellDot className="size-8 p-2 ring ring-ring rounded-full cursor-pointer" />

        <div className="px-2.5 py-1.5 rounded-full bg-slate-400/15 flex items-center gap-3 cursor-pointer">
          <User className="size-7 p-1 ring-2 ring-ring rounded-full" />

          <span className="w-0.5 h-6 bg-slate-300/40" />

          <div>
            <h2 className="font-semibold text-sm leading-4 tracking-wider">
              Srotosini Mahia
            </h2>
            <p className="text-xs text-primary">woer woeirhw</p>
          </div>

          <ChevronDown className="size-5 ms-2.5 me-1" />
        </div>
      </div>
    </header>
  );
};

export default Header;
