"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { IAccount } from "@/types";

interface AccountContextType {
  accounts: IAccount[];
  activeAccount: IAccount | null;
  setActiveAccount: (acc: IAccount) => void;
  loading: boolean;
}

const AccountContext = createContext<AccountContextType>({
  accounts: [],
  activeAccount: null,
  setActiveAccount: () => {},
  loading: true,
});

export const AccountProvider = ({ children }: { children: ReactNode }) => {
  const [accounts, setAccounts] = useState<IAccount[]>([]);
  const [activeAccount, setActiveAccount] = useState<IAccount | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchAccounts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/accounts", { cache: "no-store" });
      const data = await res.json();
      if (data.ok) {
        setAccounts(data.accounts);
        setActiveAccount(data.accounts[0]);
      } else {
        setAccounts([]);
        setActiveAccount(null);
      }
    } catch (error) {
      console.error("Failed to fetch accounts:", error);
      setAccounts([]);
      setActiveAccount(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    const loadAccounts = async () => {
      await fetchAccounts();
    };
    loadAccounts();
  }, []);

  return (
    <AccountContext.Provider
      value={{ accounts, activeAccount, setActiveAccount, loading }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export const useAccounts = () => useContext(AccountContext);
