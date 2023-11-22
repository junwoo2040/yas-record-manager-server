import { builder } from "@models/builder";
import { prisma } from "@models/db";

import { DonationRecord } from "@models/objects/DonationRecord";

builder.queryFields((t) => ({
  donationRecords: t.prismaField({
    type: [DonationRecord],
    resolve: async (query, root, args, ctx, info) =>
      await prisma.donationRecord.findMany(),
  }),
  donationRecord: t.prismaField({
    type: DonationRecord,
    args: {
      recordId: t.arg.string(),
    },
    resolve: async (query, root, args, ctx, info) =>
      await prisma.donationRecord.findUniqueOrThrow({
        where: { id: args.recordId },
      }),
  }),
}));
