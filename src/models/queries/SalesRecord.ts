import { builder } from "@models/builder";
import { prisma } from "@models/db";

import { SalesRecord } from "@models/objects/SalesRecord";

builder.queryFields((t) => ({
  salesRecords: t.prismaField({
    type: [SalesRecord],
    resolve: async (query, root, args, ctx, info) =>
      await prisma.salesRecord.findMany(),
  }),
  salesRecord: t.prismaField({
    type: SalesRecord,
    args: {
      salesRecordId: t.arg.string(),
    },
    resolve: async (query, root, args, ctx, info) =>
      await prisma.salesRecord.findUniqueOrThrow({
        where: { id: args.salesRecordId },
      }),
  }),
}));
