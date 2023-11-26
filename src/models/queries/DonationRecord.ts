/* models/queries/DonationRecord.ts */

/* Imports */
import { builder } from "@models/builder";
import { prisma } from "@models/db";

import { DonationRecord } from "@models/objects/DonationRecord";

/* Define input type */
const DonationRecordFindByIdInput = builder.inputType(
  "DonationRecordFindByIdInput",
  {
    fields: (t) => ({
      recordId: t.string(),
    }),
  },
);

builder.queryFields((t) => ({
  /* Get all donation records */
  donationRecords: t.prismaField({
    type: [DonationRecord],
    errors: {
      types: [Error],
    },
    resolve: async (_query, _root, _args, _ctx, _info) =>
      /* Find all donation records and return */
      await prisma.donationRecord.findMany(),
  }),
  /* Get one donation record by id  */
  donationRecord: t.prismaField({
    type: DonationRecord,
    errors: {
      types: [Error],
    },
    args: {
      input: t.arg({ type: DonationRecordFindByIdInput }),
    },
    resolve: async (_query, _root, { input }, _ctx, _info) => {
      /* Find a donation record with corresponding id */
      const donationRecord = await prisma.donationRecord.findUniqueOrThrow({
        where: { id: input.recordId },
      });

      /* If donation record isn't found, throw error */
      if (!donationRecord)
        throw new Error(
          `Donation record with id ${input.recordId} does not exist`,
        );

      /* Return donation record */
      return donationRecord;
    },
  }),
}));
