import Link from "next/link";

/** Admin shell — no duplicate html/body (see root layout) */
export default function AdminSegmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-exit-off-white">
      <div className="sticky top-0 z-40 border-b border-exit-green/15 bg-[rgba(14,26,15,0.96)] backdrop-blur-sm">
        <div className="mx-auto flex max-w-[1220px] items-center gap-6 px-5 py-3.5 md:px-10">
          <Link
            href="/"
            className="font-display text-[13px] font-bold uppercase tracking-[0.12em] text-white/95 no-underline hover:text-white"
          >
            ← Exit18Equipment.com
          </Link>
        </div>
      </div>
      {children}
    </div>
  );
}
