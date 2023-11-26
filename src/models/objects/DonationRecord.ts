/* models/objects/DonationRecords.ts */

/* Imports */
import { PrismaModelTypes, PrismaObjectRef } from "@pothos/plugin-prisma";

import { builder } from "../builder";

/* Define donation record object type */
/* Explicit typing to allow circular references */
export const DonationRecord: PrismaObjectRef<PrismaModelTypes> =
  builder.prismaObject("DonationRecord", {
    select: {
      id: true,
    },
    /* Define fields */
    fields: (t) => ({
      id: t.exposeID("id"),
      donorName: t.exposeString("donorName"),
      donorContact: t.exposeString("donorContact"),
      amount: t.exposeFloat("amount"),
      createdAt: t.expose("createdAt", { type: "Date" }),
      author: t.relation("author"),
    }),
  });
