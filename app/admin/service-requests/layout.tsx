import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Service requests",
};

export default function AdminServiceRequestsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
