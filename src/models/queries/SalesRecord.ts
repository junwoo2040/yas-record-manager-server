/* models/queries/SalesRecord.ts */

/* Imports */
import { builder } from "@models/builder";
import { prisma } from "@models/db";

import { SalesRecord } from "@models/objects/SalesRecord";

/* Define input type */
const SalesRecordFindByIdInput = builder.inputType("SalesRecordFindByIdInput", {
  fields: (t) => ({
    recordId: t.string(),
  }),
});

builder.queryFields((t) => ({
  /* Get all sales records */
  salesRecords: t.prismaField({
    type: [SalesRecord],
    errors: {
      types: [Error],
    },
    resolve: async (_query, _root, _args, _ctx, _info) =>
      /* Find all sales records and return */
      await prisma.salesRecord.findMany(),
  }),
  /* Get one sales record by id  */
  salesRecord: t.prismaField({
    type: SalesRecord,
    errors: {
      types: [Error],
    },
    args: {
      input: t.arg({ type: SalesRecordFindByIdInput }),
    },
    resolve: async (_query, _root, { input }, _ctx, _info) => {
      /* Find a sales record with corresponding id */
      const salesRecord = await prisma.salesRecord.findUniqueOrThrow({
        where: { id: input.recordId },
      });

      /* If sales record isn't found, throw error */
      if (!salesRecord)
        throw new Error(
          `Sales record with id ${input.recordId} does not exist`,
        );

      /* Return sales record */
      return salesRecord;
    },
  }),
}));
