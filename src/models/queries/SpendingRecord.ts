/* models/queries/SpendingRecord.ts */

/* Imports */
import { builder } from "@models/builder";
import { prisma } from "@models/db";

import { SpendingRecord } from "@models/objects/SpendingRecord";

/* Define input type */
const SpendingRecordFindByIdInput = builder.inputType(
  "SpendingRecordFindByIdInput",
  {
    fields: (t) => ({
      recordId: t.string(),
    }),
  },
);

builder.queryFields((t) => ({
  /* Get all spending records */
  spendingRecords: t.prismaField({
    type: [SpendingRecord],
    errors: {
      types: [Error],
    },
    resolve: async (_query, _root, _args, _ctx, _info) =>
      /* Find all spending records and return */
      await prisma.spendingRecord.findMany(),
  }),
  /* Get one spending record by id  */
  spendingRecord: t.prismaField({
    type: SpendingRecord,
    errors: {
      types: [Error],
    },
    args: {
      input: t.arg({ type: SpendingRecordFindByIdInput }),
    },
    resolve: async (_query, _root, { input }, _ctx, _info) => {
      /* Find a spending record with corresponding id */
      const spendingRecord = await prisma.spendingRecord.findUniqueOrThrow({
        where: { id: input.recordId },
      });

      /* If spending record isn't found, throw error */
      if (!spendingRecord)
        throw new Error(
          `Spending record with id ${input.recordId} does not exist`,
        );

      /* Return spending record */
      return spendingRecord;
    },
  }),
}));
