import { PrismaModelTypes, PrismaObjectRef } from "@pothos/plugin-prisma";

import { builder } from "../builder";

export const SalesRecord: PrismaObjectRef<PrismaModelTypes> =
  builder.prismaObject("SalesRecord", {
    select: {
      id: true,
    },
    fields: (t) => ({
      id: t.exposeID("id"),
      clientName: t.exposeString("clientName"),
      clientContact: t.exposeString("clientContact"),
      product: t.exposeString("product"),
      price: t.exposeFloat("price"),
      quantity: t.exposeInt("quantity"),
      discount: t.exposeFloat("discount"),
      createdAt: t.expose("createdAt", { type: "Date" }),
      author: t.relation("author"),
    }),
  });
