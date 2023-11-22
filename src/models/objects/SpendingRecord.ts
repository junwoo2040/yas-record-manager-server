import { PrismaModelTypes, PrismaObjectRef } from "@pothos/plugin-prisma";

import { builder } from "../builder";

export const SpendingRecord: PrismaObjectRef<PrismaModelTypes> =
  builder.prismaObject("SpendingRecord", {
    select: {
      id: true,
    },
    fields: (t) => ({
      id: t.exposeID("id"),
      note: t.exposeString("note"),
      amount: t.exposeFloat("amount"),
      createdAt: t.expose("createdAt", { type: "Date" }),
      author: t.relation("author"),
    }),
  });
