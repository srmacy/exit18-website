"use server";

import { revalidatePath } from "next/cache";
import type { ServiceRequestStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export async function updateServiceRequestStatus(
  id: string,
  status: ServiceRequestStatus,
) {
  if (!(await isAdminAuthenticated())) {
    throw new Error("Unauthorized");
  }

  await prisma.serviceRequest.update({
    where: { id },
    data: { status },
  });

  revalidatePath("/admin/service-requests");
}
