import { SidebarProvider } from "@/providers/SidebarContext";
import Sidebar from "./_components/ProfileSidebar";
import Header from "./_components/ProfileHeader";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <main className="flex h-screen overflow-hidden">
        <Sidebar />

        <div className="flex-1 overflow-y-scroll">
          <Header />
          <section className="px-14">{children}</section>
        </div>
      </main>
    </SidebarProvider>
  );
}
