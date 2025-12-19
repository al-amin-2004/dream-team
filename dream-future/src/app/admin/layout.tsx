import Header from "./_components/ProfileHeader";
import { AccountProvider } from "@/providers/AccountContext";
import Sidebar from "./_components/AdminSidebar";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AccountProvider>
      <Header />

      <main className="flex">
        <Sidebar />
        <div className="px-6 md:px-14 container">{children}</div>
      </main>
    </AccountProvider>
  );
}
