-- CreateTable
CREATE TABLE "AccountRequest" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "acceptedAt" TIMESTAMP(3),
    "deniedAt" TIMESTAMP(3),
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "school" TEXT,

    CONSTRAINT "AccountRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AccountRequest_email_key" ON "AccountRequest"("email");

-- CreateIndex
CREATE UNIQUE INDEX "AccountRequest_username_key" ON "AccountRequest"("username");
