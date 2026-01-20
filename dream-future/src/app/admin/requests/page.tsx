"use client";

import { useState } from "react";
import PagesTitle from "@/app/_components/ui/PagesTitle";
import { Button } from "@/app/_components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Eye, Check, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { IRequest } from "@/types";
import Input from "@/app/_components/ui/Input";
import { useAllRequests } from "@/providers/AllRequestsContext";
import Link from "next/link";
import { useAllUsers } from "@/providers/AllUsersContext";
import { useAllAccounts } from "@/providers/AllAccountsContext";
import DialogInfoRow from "../_components/DialogInfoRow";
import ActionBtn from "../_components/ActionBtn";
import { ObjectId } from "mongoose";
import { toast } from "sonner";

const AdminRequestActionPage = () => {
  const [selectedRequest, setSelectedRequest] = useState<IRequest | null>(null);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  const { allRequests, refreshRequests } = useAllRequests();
  const { allUsers } = useAllUsers();
  const { allAccounts } = useAllAccounts();

  /* ================= ALL PENDING STATUS FILTERING ================= */
  const pendingRequests = allRequests
    .filter((r) => r.status === "pending")
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

  const userMap = Object.fromEntries(
    allUsers.map((u) => [u._id.toString(), u])
  );

  const accountMap = Object.fromEntries(
    allAccounts.map((a) => [a._id.toString(), a])
  );

  const handleApprove = async (id: string | ObjectId) => {
    const res = await fetch(`/api/requests/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "approve" }),
    });

    const data = await res.json();

    if (!data.ok) {
      toast.error(data.message || "Action failed");
    }

    if (data.ok) {
      toast.success("Request approved successfully");
      refreshRequests();
    }
  };

  const handleReject = async (id: string | ObjectId, rejectReason: string) => {
    const res = await fetch(`/api/requests/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "reject", rejectReason }),
    });

    const data = await res.json();

    if (!data.ok) {
      toast.error(data.message || "Action failed");
    }

    if (data.ok) {
      toast.success("Request rejected successfully");
      refreshRequests();
    }
  };

  return (
    <div className="space-y-10">
      {/* ================= TITLE ================= */}
      <PagesTitle
        title="Pending Requests"
        description="Approve or reject user deposit requests"
      >
        <Link href="requests/history">
          <Button>
            Request Histories <ArrowRight />
          </Button>
        </Link>
      </PagesTitle>

      {pendingRequests.length === 0 ? (
        <div className="text-4xl text-center">No Request yet</div>
      ) : (
        <>
          <Dialog>
            {/* ================= TABLE ================= */}
            <div className="border rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr className="text-center">
                    <th className="p-3">Request ID</th>
                    <th>Name</th>
                    <th>Account Name</th>
                    <th>Amount</th>
                    <th>Method</th>
                    <th>Month</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {pendingRequests.map((req) => (
                    <tr
                      key={req._id?.toString()}
                      className="border-t text-center hover:bg-muted/40"
                    >
                      <td className="p-3">{req._id.toString()}</td>
                      <td>
                        {userMap[req.userId.toString()]?.firstName}{" "}
                        {userMap[req.userId.toString()]?.lastName}
                      </td>
                      <td>{accountMap[req.accountId.toString()]?.name} </td>
                      <td>৳ {req.amount}</td>
                      <td>{req.method}</td>
                      <td>
                        {new Date(req.month).toLocaleDateString("en-BD", {
                          month: "long",
                          year: "numeric",
                        })}
                      </td>
                      <td className="flex justify-center gap-3 py-2">
                        <DialogTrigger asChild>
                          <ActionBtn
                            icon={<Eye />}
                            onClick={() => setSelectedRequest(req)}
                          />
                        </DialogTrigger>

                        <ActionBtn
                          icon={<Check />}
                          success
                          onClick={() => handleApprove(req._id)}
                        />

                        <ActionBtn
                          icon={<X />}
                          danger
                          onClick={() => {
                            setSelectedRequest(req);
                            setRejectOpen(true);
                          }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ================= VIEW DETAILS ================= */}

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
                    <DialogInfoRow
                      label="Request ID"
                      value={selectedRequest._id?.toString()}
                    />
                    <DialogInfoRow
                      label="User"
                      value={`${
                        userMap[selectedRequest.userId.toString()]?.firstName
                      }
                    ${userMap[selectedRequest.userId.toString()]?.lastName}`}
                    />
                    <DialogInfoRow
                      label="Username"
                      value={
                        userMap[selectedRequest.userId.toString()]?.username
                      }
                    />
                    <DialogInfoRow
                      label="Email"
                      value={userMap[selectedRequest.userId.toString()]?.email}
                    />
                    <DialogInfoRow
                      label="Account"
                      value={
                        accountMap[selectedRequest.accountId.toString()]?.name
                      }
                    />

                    {selectedRequest.approvedBy && (
                      <DialogInfoRow
                        label="User"
                        value={
                          userMap[selectedRequest.approvedBy.toString()]
                            ?.username
                        }
                      />
                    )}

                    {selectedRequest.rejectedBy && (
                      <DialogInfoRow
                        label="User"
                        value={
                          userMap[selectedRequest.rejectedBy.toString()]
                            ?.username
                        }
                      />
                    )}
                  </div>

                  {/* RIGHT COLUMN */}
                  <div className="space-y-2">
                    <DialogInfoRow
                      label="Amount"
                      value={`৳ ${selectedRequest.amount}`}
                    />
                    <DialogInfoRow
                      label="Method"
                      value={selectedRequest.method}
                    />
                    <DialogInfoRow
                      label="Transaction ID"
                      value={selectedRequest.transactionId ?? "N/A"}
                    />
                    <DialogInfoRow
                      label="Month"
                      value={new Date(selectedRequest.month).toLocaleDateString(
                        "en-BD",
                        {
                          month: "long",
                          year: "numeric",
                        }
                      )}
                    />
                    <DialogInfoRow
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
                      <DialogInfoRow
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
                <Button onClick={() => setSelectedRequest(null)}>Close</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* ================= REJECT ================= */}
          <Dialog open={rejectOpen} onOpenChange={setRejectOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Reject Request</DialogTitle>
              </DialogHeader>

              <Input
                placeholder="Reject reason"
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
              />

              <DialogFooter>
                {selectedRequest && (
                  <Button
                    onClick={() => {
                      handleReject(selectedRequest?._id, rejectReason);
                      setRejectReason("");
                      setRejectOpen(false);
                      setSelectedRequest(null);
                    }}
                  >
                    Confirm Reject
                  </Button>
                )}
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
};

export default AdminRequestActionPage;
