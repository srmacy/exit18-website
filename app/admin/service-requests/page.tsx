import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ServiceRequestsTable } from "./ServiceRequestsTable";

export const dynamic = "force-dynamic";

export default async function AdminServiceRequestsPage() {
  const requests = await prisma.serviceRequest.findMany({
    orderBy: { createdAt: "desc" },
  });

  const rows = requests.map((r) => ({
    id: r.id,
    createdAt: r.createdAt.toISOString(),
    name: r.name,
    phone: r.phone,
    brand: r.brand,
    model: r.model,
    needsPickup: r.needsPickup,
    status: r.status,
  }));

  return (
    <div className="mx-auto max-w-[1220px] px-5 py-10 md:px-10 md:py-14">
      <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[2.5px] text-exit-green">
            Admin
          </p>
          <h1 className="font-display mt-2 text-[clamp(1.875rem,3vw,2.5rem)] font-black uppercase leading-tight tracking-[-0.5px] text-exit-dark">
            Service Requests
          </h1>
        </div>
        <Link
          href="/api/admin/logout"
          prefetch={false}
          className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-full border border-exit-dark/[0.12] px-6 text-[13px] font-bold uppercase tracking-wide text-exit-dark transition hover:bg-exit-green/15"
        >
          Log out
        </Link>
      </div>
      <ServiceRequestsTable rows={rows} />
    </div>
  );
}
