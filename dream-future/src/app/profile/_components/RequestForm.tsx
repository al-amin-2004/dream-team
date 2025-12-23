import { ChangeEvent, FormEvent, useState } from "react";
import { Button } from "@/app/_components/ui/Button";
import Input from "@/app/_components/ui/Input";
import { Label } from "@/app/_components/ui/Label";
import { Plus, X } from "lucide-react";
import { toast } from "sonner";
import {
  RegistrationCard,
  RegistrationCardHeader,
  RegistrationCardTitle,
} from "@/app/_components/ui/RegistrarCard";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { useUser } from "@/providers/UserContext";
import { useAccounts } from "@/providers/AccountContext";
import { getCurrentMonth } from "@/lib/getCurrentMonth";

interface formDataTypes {
  amount: number;
  month: string;
  method: string;
  transactionId: string;
}

const RequestForm = () => {
  const { user } = useUser();
  const { activeAccount } = useAccounts();
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [currentMonth] = useState(getCurrentMonth);
  const [formData, setFormData] = useState<formDataTypes>({
    amount: 200,
    month: currentMonth,
    method: "Bkash",
    transactionId: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const accountId = activeAccount?._id;
    const userId = user?._id;

    try {
      const res = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, userId, accountId }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed");

      setOpen(false);
      toast.success("Deposit request submitted!");
    } catch (error) {
      console.error("Update Error:", error);
      toast.error("Failed to request submitted!");
    } finally {
      setFormData({
        amount: 200,
        month: currentMonth,
        method: "Bkash",
        transactionId: "",
      });

      setLoading(false);
    }
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild className="float-right sticky lg:static bottom-8">
        <Button>
          <Plus className="stroke-3 mr-1" /> Deposit money
        </Button>
      </DrawerTrigger>

      <DrawerContent className="p-3 z-99">
        <DrawerClose className="cursor-pointer mt-0 ml-auto mr-7">
          <X />
        </DrawerClose>

        <DrawerHeader>
          <DrawerTitle>Deposit Submission</DrawerTitle>
          <DrawerDescription>
            Enter your deposit information carefully. All submissions are
            subject to verification.
          </DrawerDescription>
        </DrawerHeader>

        <div className="max-w-lg mx-auto mb-7">
          <RegistrationCard className="rounded-2xl shadow-md">
            <RegistrationCardHeader>
              <RegistrationCardTitle className="text-xl">
                💰 Monthly Deposit
              </RegistrationCardTitle>
            </RegistrationCardHeader>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Amount */}
              <div className="space-y-2">
                <Label>Deposit Amount (৳)</Label>
                <Input
                  name="amount"
                  type="number"
                  value={formData.amount}
                  placeholder="Enter amount"
                  min={200}
                  max={200}
                  onChange={handleChange}
                />
              </div>

              {/* Month */}
              <div className="space-y-2">
                <Label>Deposit Month</Label>
                <Input
                  name="month"
                  type="month"
                  value={formData.month}
                  onChange={handleChange}
                  min={currentMonth}
                  required
                />
              </div>

              {/* Payment Method */}
              <div className="space-y-2">
                <Label>Payment Method</Label>
                <div className="flex gap-4">
                  {["Bkash", "Nagad", "Rocket"].map((m) => (
                    <label
                      key={m}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="method"
                        value={m}
                        checked={formData.method === m}
                        onChange={handleChange}
                      />
                      <span>{m}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Transaction ID */}
              <div className="space-y-2">
                <Label>Transaction ID</Label>
                <Input
                  name="transactionId"
                  placeholder="Enter transaction reference"
                  value={formData.transactionId}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Info */}
              <p className="text-sm text-muted-foreground">
                ⚠ Your deposit will be reviewed by treasurer or admin. Balance
                will be updated after approval.
              </p>

              {/* Submit */}
              <Button
                disabled={loading}
                className="w-full rounded hover:translate-0"
              >
                {loading ? "Submitting..." : "Submit Deposit Request"}
              </Button>
            </form>
          </RegistrationCard>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default RequestForm;
