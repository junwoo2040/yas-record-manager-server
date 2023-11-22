import { builder } from "@models/builder";
import { prisma } from "@models/db";

import { SpendingRecord } from "@models/objects/SpendingRecord";

builder.queryFields((t) => ({
  spendingRecords: t.prismaField({
    type: [SpendingRecord],
    resolve: async (query, root, args, ctx, info) =>
      await prisma.spendingRecord.findMany(),
  }),
  spendingRecord: t.prismaField({
    type: SpendingRecord,
    args: {
      spendingRecordId: t.arg.string(),
    },
    resolve: async (query, root, args, ctx, info) =>
      await prisma.spendingRecord.findUniqueOrThrow({
        where: { id: args.spendingRecordId },
      }),
  }),
}));
