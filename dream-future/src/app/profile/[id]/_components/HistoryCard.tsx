import { cn } from "@/lib/utils";
import { FC, ReactNode } from "react";

interface HistoryCardProps {
  className?: string;
  children: ReactNode;
}

const HistoryCard: FC<HistoryCardProps> = ({ className, children }) => {
  return <div className={cn("rounded-xl p-4 w-full max-w-[400px] h-40 bg-slate-300/10 ", className)}>{children}</div>;
};

export default HistoryCard;
