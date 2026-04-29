"use client";

import { useRouter } from "next/navigation";
import type { ServiceRequestStatus } from "@prisma/client";
import { updateServiceRequestStatus } from "./actions";
import { SERVICE_STATUS_OPTIONS } from "@/lib/service-status";

export type SerializedServiceRequestRow = {
  id: string;
  createdAt: string;
  name: string;
  phone: string;
  brand: string | null;
  model: string | null;
  needsPickup: boolean;
  status: ServiceRequestStatus;
};

export function ServiceRequestsTable({
  rows,
}: {
  rows: SerializedServiceRequestRow[];
}) {
  const router = useRouter();

  return (
    <div className="overflow-x-auto rounded-2xl border border-black/[0.08] bg-white shadow-[0_16px_48px_rgba(0,0,0,0.07)] ring-1 ring-black/[0.04]">
      <table className="w-full min-w-[760px] table-fixed border-collapse text-left text-[14px]">
        <colgroup>
          <col className="w-[155px]" />
          <col className="w-[168px]" />
          <col />
          <col className="w-[92px]" />
          <col className="w-[180px]" />
        </colgroup>
        <thead>
          <tr className="border-b border-black/[0.08] bg-exit-green/[0.06] font-display uppercase tracking-wide text-[11px] text-exit-dark">
            <th className="px-4 py-3.5 font-bold">Date</th>
            <th className="px-4 py-3.5 font-bold">Customer</th>
            <th className="px-4 py-3.5 font-bold">Machine</th>
            <th className="px-4 py-3.5 font-bold text-center">
              Pickup?
            </th>
            <th className="px-4 py-3.5 font-bold">Status</th>
          </tr>
        </thead>
        <tbody className="text-exit-dark">
          {rows.length === 0 ? (
            <tr>
              <td
                colSpan={5}
                className="px-6 py-16 text-center text-exit-gray"
              >
                No service requests yet.
              </td>
            </tr>
          ) : (
            rows.map((r) => {
              const machine = [r.brand, r.model].filter(Boolean).join(" ") || "—";
              const customerLabel = `${r.name} · ${r.phone}`;
              const dateStr = new Date(r.createdAt).toLocaleString("en-US", {
                dateStyle: "medium",
                timeStyle: "short",
              });

              async function handleStatus(status: ServiceRequestStatus) {
                try {
                  await updateServiceRequestStatus(r.id, status);
                  router.refresh();
                } catch {
                  window.alert(
                    "Could not update status. Confirm you are logged in.",
                  );
                }
              }

              return (
                <tr
                  key={r.id}
                  className="border-b border-black/[0.05] last:border-0 odd:bg-white even:bg-exit-off-white/55"
                >
                  <td className="break-words px-4 py-3.5 align-top text-[13px] text-exit-gray">
                    {dateStr}
                  </td>
                  <td className="px-4 py-3.5 align-top">
                    <div className="font-semibold leading-snug">{r.name}</div>
                    <div className="break-all text-[13px] text-exit-gray">{r.phone}</div>
                  </td>
                  <td className="truncate px-4 py-3.5 align-top" title={machine}>
                    <span title={machine} className="line-clamp-2">
                      {machine}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-center align-top font-semibold text-exit-dark">
                    {r.needsPickup ? "Yes" : "No"}
                  </td>
                  <td className="px-4 py-2.5 align-top">
                    <select
                      className="w-full rounded-lg border border-exit-green/35 bg-white px-2 py-2 text-[13px] font-semibold uppercase tracking-wide outline-none focus:ring-2 focus:ring-exit-green/30"
                      value={r.status}
                      onChange={(e) =>
                        handleStatus(e.target.value as ServiceRequestStatus)
                      }
                      aria-label={`Status for ${customerLabel}`}
                    >
                      {SERVICE_STATUS_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
