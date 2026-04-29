import type { ServiceRequestStatus } from "@prisma/client";

export const SERVICE_STATUS_OPTIONS: readonly {
  value: ServiceRequestStatus;
  label: string;
}[] = [
  { value: "NEW", label: "New" },
  { value: "CONTACTED", label: "Contacted" },
  { value: "SCHEDULED", label: "Scheduled" },
  { value: "IN_SHOP", label: "In Shop" },
  { value: "WAITING_PARTS", label: "Waiting Parts" },
  { value: "READY", label: "Ready" },
  { value: "COMPLETED", label: "Completed" },
] as const;

export function formatServiceStatus(status: ServiceRequestStatus): string {
  return SERVICE_STATUS_OPTIONS.find((o) => o.value === status)?.label ?? status;
}
