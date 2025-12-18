"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/providers/SidebarContext";
import {
  DoorOpen,
  History,
  Info,
  Settings,
  User,
  UserRoundPen,
} from "lucide-react";
import { LeftArrowIcon } from "@/icons";

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
  const [navOpen, setNavOpen] = useState<boolean>(false);
  return (
    <>
      <aside
        className={cn(
          "fixed md:static bg-background h-screen z-60 md:p-2 border-r border-zinc-700 transition-all duration-400 ease-in-out",
          navOpen ? "w-[calc(100%-30px)]" : "w-0",
          open ? "md:w-84" : "md:w-25"
        )}
      >
        <LeftArrowIcon
          className={cn(
            "md:hidden size-10 cursor-pointer mt-3.5 mr-6 ml-auto z-60 transition",
            navOpen ? "rotate-0" : "rotate-180 -mr-12"
          )}
          onClick={() => setNavOpen(!navOpen)}
        />

        <div className="overflow-hidden">
          <ul className="space-y-2 p-4">
            {sidebarItems.map((item, idx) => {
              const navActive = pathname === item.link;
              return (
                <li key={idx} onClick={() => setNavOpen(false)}>
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
                className={cn(
                  "flex items-center gap-2 rounded cursor-pointer",
                  {
                    "hover:bg-slate-400/20": open,
                  }
                )}
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
    </>
  );
};

export default Sidebar;

// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { cn } from "@/lib/utils";
// import { usePathname } from "next/navigation";
// import { useSidebar } from "@/providers/SidebarContext";
// import {
//   DoorOpen,
//   History,
//   Info,
//   Settings,
//   User,
//   UserRoundPen,
//   X,
// } from "lucide-react";

// const sidebarItems = [
//   { label: "Profile", icon: <User />, link: "/profile" },
//   { label: "History", icon: <History />, link: "/profile/history" },
//   { label: "Info", icon: <Info />, link: "/profile/info" },
//   { label: "Update Profile", icon: <UserRoundPen />, link: "/profile/update" },
//   { label: "Settings", icon: <Settings />, link: "/profile/settings" },
// ];

// export default function Sidebar() {
//   const pathname = usePathname();
//   const { open } = useSidebar();
//   const [mobileOpen, setMobileOpen] = useState(false);

//   return (
//     <>

//       {mobileOpen && (
//         <div
//           className="fixed inset-0 bg-black/40 z-40 md:hidden"
//           onClick={() => setMobileOpen(false)}
//         />
//       )}

//       <aside
//         className={cn(
//           "fixed md:static z-60 h-screen bg-background border-r transition-all duration-300",
//           open ? "md:w-72" : "md:w-20",
//           mobileOpen ? "w-72" : "w-0 md:w-auto"
//         )}
//       >

//         <div className="flex md:hidden justify-end p-3">
//           <X className="cursor-pointer" onClick={() => setMobileOpen(false)} />
//         </div>

//         <ul className="space-y-2 p-4 overflow-hidden">
//           {sidebarItems.map((item) => {
//             const active = pathname === item.link;

//             return (
//               <li key={item.link}>
//                 <Link
//                   href={item.link}
//                   onClick={() => setMobileOpen(false)}
//                   className={cn(
//                     "flex items-center gap-3 rounded-md transition px-2 py-2",
//                     active
//                       ? "bg-primary text-primary-foreground"
//                       : "hover:bg-muted"
//                   )}
//                 >
//                   <span className="p-2 rounded-full">{item.icon}</span>
//                   {open && <span>{item.label}</span>}
//                 </Link>
//               </li>
//             );
//           })}

//           <li>
//             <Link
//               href="/"
//               className="flex items-center gap-3 px-2 py-2 rounded hover:bg-muted"
//             >
//               <span className="p-2 rounded-full">
//                 <DoorOpen />
//               </span>
//               {open && <span>Exit</span>}
//             </Link>
//           </li>
//         </ul>
//       </aside>

//       <button
//         onClick={() => setMobileOpen(true)}
//         className="fixed bottom-5 left-5 z-40 md:hidden bg-primary text-white p-3 rounded-full shadow-lg"
//       >
//         ☰
//       </button>
//     </>
//   );
// }
