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
    <header className="py-5 px-6 flex items-center justify-between border-b border-zinc-700 sticky top-0 z-50 bg-background">
      {/* right side */}
      <button onClick={toggle} className="cursor-pointer">
        {open ? <PanelLeft /> : <PanelRight />}
      </button>

      {/* left side */}
      <div className="flex items-center gap-5">
        {accounts.length > 1 && (
          <ul className="flex gap-2.5">
            {accounts.map((account, idx) => (
              <li
                key={idx}
                onClick={() => setActiveAccount(account)}
                className={cn(
                  "p-2 bg-green-500/15 text-green-500 size-8 rounded-full flex justify-center items-center cursor-pointer",
                  account._id === activeAccount?._id &&
                    "text-red-400 ring ring-red-400 bg-red-400/15"
                )}
              >
                {idx + 1}
              </li>
            ))}
          </ul>
        )}

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

        <div className="px-3.5 py-1.5 rounded-full bg-slate-400/15 flex items-center gap-2">
          <DiamondIcon className="size-5" />
          <p>{activeAccount?.totalRewards}</p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger className="text-start px-2.5 py-1.5 rounded-full bg-slate-400/15 flex items-center gap-3 cursor-pointer">
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

            <span className="w-0.5 h-6 bg-slate-300/40" />

            <div>
              <h2 className="font-semibold text-sm leading-4 tracking-wider">
                {`${user?.firstName} ${user?.lastName}`}
              </h2>
              <p className="text-xs text-primary">{user?.role}</p>
            </div>

            <ChevronDown className="size-5 ms-2.5 me-1" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="mr-2.5 p-2.5">
            <DropdownMenuGroup className="shadow-xl bg-accent rounded-sm p-1 mb-2">
              <DropdownMenuItem className="w-65">
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
              <DropdownMenuItem>
                {accounts.length > 1 && (
                  <Select
                    value={
                      activeAccount ? String(activeAccount._id) : undefined
                    }
                    onValueChange={(value) => {
                      const selected = accounts.find(
                        (acc) => String(acc._id) === value
                      );
                      if (selected) setActiveAccount(selected);
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select account" />
                    </SelectTrigger>

                    <SelectContent>
                      {accounts.map((account, idx) => (
                        <SelectItem
                          key={String(account._id)}
                          value={String(account._id)}
                        >
                          Account {idx + 1}
                          {idx + 1 === 1 && " (Main)"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </DropdownMenuItem>
            </DropdownMenuGroup>

            {user?.role === "admin" && (
              <div>
                <DropdownMenuItem className="cursor-pointer">
                  Admin Paenl
                  <DropdownMenuShortcut>ctl A</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </div>
            )}

            <DropdownMenuGroup>
              <DropdownMenuItem
                className="cursor-pointer"
                onSelect={() => setShowCreateAccountDialog(true)}
              >
                Create another Account
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuItem
              className="cursor-pointer"
              onSelect={() => setShowLogoutDialog(true)}
            >
              Logout
              <DropdownMenuShortcut>ctl L</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Dialog
          open={showCreateAccountDialog}
          onOpenChange={setShowCreateAccountDialog}
        >
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create Account</DialogTitle>
              <DialogDescription>
                Are you sure you want to
                <b>Create</b> another account?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button className="hover:translate-0">Cancel</Button>
              </DialogClose>
              <Button
                type="submit"
                className="bg-green-500 hover:bg-green-600 hover:translate-0"
                onClick={handleCreateAccount}
              >
                Sure
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

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
