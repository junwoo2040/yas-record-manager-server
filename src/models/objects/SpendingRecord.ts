/* models/objects/SpendingRecord.ts */

/* Imports */
import { PrismaModelTypes, PrismaObjectRef } from "@pothos/plugin-prisma";

import { builder } from "../builder";

/* Define spending record object type */
/* Explicit typing to allow circular references */
export const SpendingRecord: PrismaObjectRef<PrismaModelTypes> =
  builder.prismaObject("SpendingRecord", {
    select: {
      id: true,
    },
    /* Define fields */
    fields: (t) => ({
      id: t.exposeID("id"),
      note: t.exposeString("note"),
      amount: t.exposeFloat("amount"),
      createdAt: t.expose("createdAt", { type: "Date" }),
      author: t.relation("author"),
    }),
  });
