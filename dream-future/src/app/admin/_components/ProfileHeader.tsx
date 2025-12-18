"use client";

import { useState } from "react";
import Image from "next/image";
import { DiamondIcon } from "@/icons";
import { useSidebar } from "@/providers/SidebarContext";
import { useUser } from "@/providers/UserContext";
import { Button } from "@/app/_components/ui/Button";
import { toast } from "sonner";
import { useAccounts } from "@/providers/AccountContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  BellDot,
  ChevronDown,
  PanelLeft,
  PanelRight,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Header = () => {
  const { accounts, activeAccount, setActiveAccount, refreshAccounts } =
    useAccounts();
  const [showCreateAccountDialog, setShowCreateAccountDialog] =
    useState<boolean>(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState<boolean>(false);
  const { open, toggle } = useSidebar();
  const { user } = useUser();

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout");
      const data = await res.json();
      if (!res.ok) return toast.error(data?.message || "Logout failed!");
      setShowLogoutDialog(false);
      window.location.href = "/";
      toast.success(data?.message);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
  };

  const handleCreateAccount = async () => {
    try {
      const res = await fetch("/api/accounts", { method: "POST" });
      const data = await res.json();

      if (!data.ok) {
        toast.error("Something went wrong!");
        console.error("Api not response!");
      }

      setShowCreateAccountDialog(false);
      toast.success(data?.message);
      await refreshAccounts();
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
  };

  return (
    <header className="py-4 md:py-5 px-6 flex items-center justify-end md:justify-between border-b border-zinc-700 sticky top-0 z-50 bg-background">
      {/* right side */}
      <button onClick={toggle} className="hidden md:block cursor-pointer">
        {open ? <PanelLeft /> : <PanelRight />}
      </button>

      {/* left side */}
      <div className="flex items-center gap-4 md:gap-5">
        {/* Notification component */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <BellDot className="size-8 p-2 ring ring-ring rounded-full cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-sm p-2.5">
            <DropdownMenuLabel className="text-2xl font-medium">
              Notifications/
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            {Array.from({ length: 8 }).map((_, idx) => (
              <DropdownMenuItem
                key={idx}
                className="flex-col items-start gap-0"
              >
                <h5 className="text-base">Official sms</h5>
                <p className="text-sm">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Laboriosam, at.
                </p>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger className="text-start md:px-2.5 md:py-1.5 rounded-full bg-slate-400/15 flex items-center gap-3 cursor-pointer">
            {user?.avatar ? (
              <Image
                src={user.avatar}
                width={300}
                height={300}
                alt="Profile Picture"
                className="size-7 ring-2 ring-ring rounded-full"
              />
            ) : (
              <User className="size-7 p-1 ring-2 ring-ring rounded-full" />
            )}

            <span className="hidden md:block w-0.5 h-6 bg-slate-300/40" />

            <div className="hidden md:block">
              <h2 className="font-semibold text-sm leading-4 tracking-wider">
                {`${user?.firstName} ${user?.lastName}`}
              </h2>
              <p className="text-xs text-primary">{user?.role}</p>
            </div>

            <ChevronDown className="hidden md:block size-5 ms-2.5 me-1" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="w-[calc(100vw-20px)] md:w-65 mr-2.5 p-2.5"
          >
            <DropdownMenuItem className="shadow-xl bg-accent rounded-sm p-2 mb-2">
              {user?.avatar ? (
                <Image
                  src={user.avatar}
                  width={300}
                  height={300}
                  alt="Profile Picture"
                  className="size-7 ring-2 ring-ring rounded-full"
                />
              ) : (
                <User className="size-7 p-1 ring-2 ring-ring rounded-full" />
              )}

              <span className="w-0.5 h-6 bg-slate-300/40 mr-2" />

              <div>
                <h2 className="font-semibold text-sm leading-4 tracking-wider">
                  {`${user?.firstName} ${user?.lastName}`}
                </h2>
                <p className="text-xs text-primary">{user?.role}</p>
              </div>
            </DropdownMenuItem>

            <DropdownMenuItem
              className="cursor-pointer"
              onSelect={() => setShowLogoutDialog(true)}
            >
              Logout
              <DropdownMenuShortcut>ctl L</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>


        <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Logout Account</DialogTitle>
              <DialogDescription>
                Are you sure you want to{" "}
                <b className="text-destructive">Logout</b> of your account?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button className="hover:translate-0">Cancel</Button>
              </DialogClose>
              <Button
                type="submit"
                className="bg-red-500 hover:bg-red-600 hover:translate-0"
                onClick={handleLogout}
              >
                Sure
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  );
};

export default Header;
