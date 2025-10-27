import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dream Future",
};

export default function DreamFutureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main>{children}</main>;
}
