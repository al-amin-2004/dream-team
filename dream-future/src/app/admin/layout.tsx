import Header from "./_components/ProfileHeader";
import Sidebar from "./_components/AdminSidebar";
import { AllUsersProvider } from "@/providers/AllUsersContext";
import { AllAccountsProvider } from "@/providers/AllAccountsContext";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AllUsersProvider>
      <AllAccountsProvider>
        <Header />

        <main className="flex">
          <Sidebar />
          <div className="px-6 md:px-14 container">{children}</div>
        </main>
      </AllAccountsProvider>
    </AllUsersProvider>
  );
}
