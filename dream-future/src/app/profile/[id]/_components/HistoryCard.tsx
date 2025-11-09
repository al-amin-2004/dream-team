import { FC } from "react";
import { cn } from "@/lib/utils";
import { CalendarFold } from "lucide-react";

type transactionTypes = "Diposite" | "Withdraw" | "Loan";
type methods = "Cash" | "Bkash" | "Nagad" | "Rocket";

interface HistoryCardProps {
  transactionType: transactionTypes;
  date: string;
  method: methods;
  amount: number;
  transactionId?: string;
  referBy?: string;
}

const HistoryCardGrid: FC<HistoryCardProps> = ({
  transactionType,
  date,
  method,
  amount,
  transactionId,
  referBy,
}) => {
  return (
    <div className={cn("w-full rounded-xl p-4 max-w-[400px] bg-slate-300/10")}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-medium leading-6">{transactionType}</h2>
        <div className="flex items-center gap-1.5">
          <CalendarFold size={16} />
          <p className="text-xs">{date}</p>
        </div>
      </div>

      <div className="text-sm">
        <div className="flex justify-between mb-1">
          <p>Method: {method}</p>
          <p>Amount: {amount}</p>
        </div>

        {method === "Cash" ? (
          <p>Refer by: {referBy}</p>
        ) : (
          <p>Transition ID: {transactionId}</p>
        )}
      </div>
    </div>
  );
};

const HistoryCardList: FC<HistoryCardProps> = ({
  transactionType,
  date,
  method,
  amount,
  transactionId,
  referBy,
}) => {
  return (
    <div
      className={cn(
        "w-full rounded-md p-4 min-w-[350px] bg-slate-300/10 grid grid-cols-5 place-items-center text-sm"
      )}
    >
      <h2>{transactionType}</h2>
      <div className="flex items-center gap-1.5">
        <CalendarFold size={16} />
        <p>{date}</p>
      </div>
      <p>{method}</p>
      <p>{amount}</p>
      <p>{method === "Cash" ? referBy : transactionId}</p>
    </div>
  );
};

export { HistoryCardGrid, HistoryCardList };
