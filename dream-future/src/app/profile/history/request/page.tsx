"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PagesTitle from "@/app/_components/ui/PagesTitle";
import { IRequest } from "@/types";
import { Button } from "@/app/_components/ui/Button";

/* ================= PAGE ================= */
const AdminRequestsPage = () => {
  const [histories, setHistories] = useState<IRequest[]>([]);

  useEffect(() => {
    try {
      const fetchHistories = async () => {
        const res = await fetch("/api/requests/my");
        const data = await res.json();
        if (data.ok) setHistories(data.requests);
      };

      fetchHistories();
    } catch (error) {
      console.error("Api error", error);
    }
  }, []);

  return (
    <div className="space-y-12">
      <PagesTitle
        title="Requests Histories"
        description="All user requests Histories"
      >
        <Link href="/profile/history">
          <Button>
            <ArrowLeft /> Bact to Histories
          </Button>
        </Link>
      </PagesTitle>

      {/* ================= REQUESTS TABLE ================= */}
      {histories.length === 0 ? (
        <h2 className="text-xl text-center text-primary">No Request here!</h2>
      ) : (
        <div className="border rounded-xl overflow-hidden">
          <table className="w-full text-sm table-fixed">
            <thead className="bg-muted">
              <tr className="text-center">
                <th colSpan={2} className="p-3">
                  Request ID
                </th>
                <th>Month</th>
                <th>Amount</th>
                <th>Method</th>
                <th colSpan={2}>Transaction ID</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {histories.map((req) => (
                <tr
                  key={req._id?.toString()}
                  className="border-t hover:bg-muted/40 transition text-center"
                >
                  <td colSpan={2} className="p-3">
                    {req._id?.toString()}
                  </td>

                  <td>
                    {new Date(req.month).toLocaleDateString("en-GB", {
                      month: "long",
                      year: "numeric",
                    })}
                  </td>
                  <td>৳ {req.amount}</td>
                  <td>{req.method}</td>
                  <td colSpan={2}>{req.transactionId}</td>
                  <td>
                    {new Date(req.createdAt!).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td>{req.status.toLocaleUpperCase()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminRequestsPage;
