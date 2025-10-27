import Header from "../_components/shared/Header";

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative">
      <Header />
      {children}
    </main>
  );
}
