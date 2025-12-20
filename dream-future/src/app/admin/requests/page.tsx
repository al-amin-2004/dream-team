import { X, CheckCheck } from "lucide-react";
import PagesTitle from "@/app/_components/ui/PagesTitle";

/* ================= MOCK DATA ================= */
const requests = [
  {
    id: "req_001",
    userId: "user_1",
    accountId: "acc_1",
    amount: 5000,
    transactionId: "sdj45nldd94n",
    date: "2025-01-12",
  },
  {
    id: "req_002",
    userId: "user_2",
    accountId: "acc_2",
    amount: 12000,
    transactionId: "DJK23AS23AJ",
    date: "2025-01-10",
  },
  {
    id: "req_003",
    userId: "user_3",
    accountId: "acc_3",
    amount: 3000,
    transactionId: "sdjdkjr9dt054nD",
    date: "2025-01-09",
  },
];

/* ================= PAGE ================= */
const AdminRequestsPage = () => {
  return (
    <div className="space-y-12">
      <PagesTitle title="Requests" description="Manage all user requests" />

      {/* ================= REQUESTS TABLE ================= */}
      <div className="border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr className="text-left">
              <th className="p-3">Request ID</th>
              <th>User</th>
              <th>Account</th>
              <th>Amount</th>
              <th>Transaction ID</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((req) => (
              <tr
                key={req.id}
                className="border-t hover:bg-muted/40 transition"
              >
                <td className="p-3">{req.id}</td>
                <td>{req.userId}</td>
                <td>{req.accountId}</td>
                <td>৳ {req.amount}</td>
                <td>{req.transactionId}</td>
                <td>{req.date}</td>
                <td>
                  <div className="flex gap-6">
                    <button className="flex items-center gap-1.5 bg-green-600 px-2.5 py-1.5 rounded-full text-xs cursor-pointer">
                      <CheckCheck className="size-5" />
                      <span>Approve</span>
                    </button>

                    <button className="flex items-center gap-1.5 bg-red-500 px-2.5 py-1.5 rounded-full text-xs cursor-pointer">
                      <X className="size-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminRequestsPage;
