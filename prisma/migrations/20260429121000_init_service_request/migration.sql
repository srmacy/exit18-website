-- CreateEnum
CREATE TYPE "ServiceRequestStatus" AS ENUM ('NEW', 'CONTACTED', 'SCHEDULED', 'IN_SHOP', 'WAITING_PARTS', 'READY', 'COMPLETED');

-- CreateTable
CREATE TABLE "ServiceRequest" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "address" TEXT,
    "brand" TEXT,
    "model" TEXT,
    "issue" TEXT NOT NULL,
    "needsPickup" BOOLEAN NOT NULL DEFAULT false,
    "bestTime" TEXT,
    "status" "ServiceRequestStatus" NOT NULL DEFAULT 'NEW',

    CONSTRAINT "ServiceRequest_pkey" PRIMARY KEY ("id")
);
