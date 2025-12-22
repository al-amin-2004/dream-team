"use client";

import { Eye } from "lucide-react";
import PagesTitle from "@/app/_components/ui/PagesTitle";
import { useAllRequests } from "@/providers/AllRequestsContext";
import { useAllAccounts } from "@/providers/AllAccountsContext";
import { useAllUsers } from "@/providers/AllUsersContext";
import { useState } from "react";
import { IRequest } from "@/types";
import { Button } from "@/app/_components/ui/Button";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

/* ================= PAGE ================= */
const AdminRequestsPage = () => {
  const { allRequests } = useAllRequests();
  const { allUsers } = useAllUsers();
  const { allAccounts } = useAllAccounts();

  const [selectedRequest, setSelectedRequest] = useState<IRequest | null>(null);

  const userMap = Object.fromEntries(
    allUsers.map((u) => [u._id.toString(), u])
  );

  const accountMap = Object.fromEntries(
    allAccounts.map((a) => [a._id.toString(), a])
  );

  return (
    <div className="space-y-12">
      <PagesTitle title="Requests" description="All user requests Histories" />

      {/* ================= REQUESTS TABLE ================= */}
      <Dialog>
        <div className="border rounded-xl overflow-hidden">
          <table className="w-full text-sm table-fixed">
            <thead className="bg-muted">
              <tr className="text-center">
                <th colSpan={2} className="p-3">
                  Request ID
                </th>
                <th>User</th>
                <th>Amount</th>
                <th>Method</th>
                <th colSpan={2}>Transaction ID</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {allRequests.map((req) => (
                <tr
                  key={req._id?.toString()}
                  className="border-t hover:bg-muted/40 transition text-center"
                >
                  <td colSpan={2} className="p-3">
                    {req._id?.toString()}
                  </td>

                  <td>
                    {userMap[req.userId.toString()]?.firstName}{" "}
                    {userMap[req.userId.toString()]?.lastName}
                  </td>
                  <td>৳ {req.amount}</td>
                  <td>{req.method}</td>
                  <td colSpan={2}>{req.transactionId}</td>
                  <td title="MM/DD/YYYY">
                    {new Date(req.createdAt!).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>

                  <td>
                    <DialogTrigger
                      className="cursor-pointer"
                      title="View Details"
                      onClick={() => setSelectedRequest(req)}
                    >
                      <Eye />
                    </DialogTrigger>
                    {/* <button onClick={() => setSelectedRequest(req)}></button> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <DialogContent className="min-w-160">
          <DialogHeader>
            <DialogTitle className="text-xl">Request Details</DialogTitle>
            <DialogDescription>
              Full information about this deposit request
            </DialogDescription>
          </DialogHeader>

          {selectedRequest && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mt-4">
              {/* LEFT COLUMN */}
              <div className="space-y-2">
                <InfoRow
                  label="Request ID"
                  value={selectedRequest._id?.toString()}
                />
                <InfoRow
                  label="User"
                  value={`${
                    userMap[selectedRequest.userId.toString()]?.firstName
                  }
                    ${userMap[selectedRequest.userId.toString()]?.lastName}`}
                />
                <InfoRow
                  label="Username"
                  value={userMap[selectedRequest.userId.toString()]?.username}
                />
                <InfoRow
                  label="Email"
                  value={userMap[selectedRequest.userId.toString()]?.email}
                />
                <InfoRow
                  label="Account"
                  value={accountMap[selectedRequest.accountId.toString()]?.name}
                />

                {selectedRequest.approvedBy && (
                  <InfoRow
                    label="User"
                    value={
                      userMap[selectedRequest.approvedBy.toString()]?.username
                    }
                  />
                )}

                {selectedRequest.rejectedBy && (
                  <InfoRow
                    label="User"
                    value={
                      userMap[selectedRequest.rejectedBy.toString()]?.username
                    }
                  />
                )}
              </div>

              {/* RIGHT COLUMN */}
              <div className="space-y-2">
                <InfoRow label="Amount" value={`৳ ${selectedRequest.amount}`} />
                <InfoRow label="Method" value={selectedRequest.method} />
                <InfoRow
                  label="Transaction ID"
                  value={selectedRequest.transactionId ?? "N/A"}
                />
                <InfoRow
                  label="Month"
                  value={new Date(selectedRequest.month).toLocaleDateString(
                    "en-BD",
                    {
                      month: "long",
                      year: "numeric",
                    }
                  )}
                />
                <InfoRow
                  label="Status"
                  value={
                    <span
                      className={cn(
                        "px-2 py-0.5 rounded text-xs",
                        {
                          "bg-yellow-500/20 text-yellow-500":
                            selectedRequest.status === "pending",
                        },
                        {
                          "bg-green-500/20 text-green-500":
                            selectedRequest.status === "approved",
                        },
                        {
                          "bg-red-500/20 text-red-500":
                            selectedRequest.status === "rejected",
                        }
                      )}
                    >
                      {selectedRequest.status.toUpperCase()}
                    </span>
                  }
                />

                {selectedRequest.approvedOrRejectedAt && (
                  <InfoRow
                    label="Approved or Rejected"
                    value={new Date(
                      selectedRequest.approvedOrRejectedAt
                    ).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  />
                )}
              </div>

              {/* FULL WIDTH */}
              {selectedRequest.rejectReason && (
                <div className="md:col-span-2 bg-red-500/10 p-3 rounded text-red-500">
                  Reject Reason: {selectedRequest.rejectReason}
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <DialogClose asChild>
              <Button>Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const InfoRow = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <div className="flex gap-3">
    <span className="text-muted-foreground">{label}:</span>
    <span className="font-medium text-right">{value}</span>
  </div>
);

export default AdminRequestsPage;
