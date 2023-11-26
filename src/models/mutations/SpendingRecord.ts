/* models/queries/SpendingRecord.ts */

/* Imports */
import { builder } from "@models/builder";
import { prisma } from "@models/db";

import { SpendingRecord } from "@models/objects/SpendingRecord";

/* Define input type */
const SpendingRecordCreateInput = builder.inputType(
  "SpendingRecordCreateInput",
  {
    fields: (t) => ({
      note: t.string(),
      amount: t.float(),
    }),
  },
);

const SpendingRecordDeleteInput = builder.inputType(
  "SpendingRecordDeleteInput",
  {
    fields: (t) => ({
      spendingRecordId: t.string(),
    }),
  },
);

const SpendingRecordUpdateNoteInput = builder.inputType(
  "SpendingRecordUpdateNoteInput",
  {
    fields: (t) => ({
      spendingRecordId: t.string(),
      note: t.string(),
    }),
  },
);

const SpendingRecordUpdateAmountInput = builder.inputType(
  "SpendingRecordUpdatePasswordInput",
  {
    fields: (t) => ({
      spendingRecordId: t.string(),
      amount: t.float(),
    }),
  },
);

builder.mutationFields((t) => ({
  /* Create spending record */
  createSpendingRecord: t.prismaField({
    type: SpendingRecord,
    errors: {
      types: [Error],
    },
    args: {
      input: t.arg({ type: SpendingRecordCreateInput }),
    },
    resolve: async (_query, _root, { input }, _ctx, _info) => {
      /* Create spending record */
      const spendingRecord = await prisma.spendingRecord.create({
        data: { ...input },
      });

      /* If creation failed, throw error */
      if (!spendingRecord)
        throw new Error(`Failed to create new spending record`);

      /* Return new spending record */
      return spendingRecord;
    },
  }),
  /* Delete spending record */
  deleteSpendingRecord: t.prismaField({
    type: SpendingRecord,
    errors: {
      types: [Error],
    },
    args: {
      input: t.arg({ type: SpendingRecordDeleteInput }),
    },
    resolve: async (_query, _root, { input }, _ctx, _info) => {
      /* Delete spending record */
      const spendingRecord = await prisma.spendingRecord.delete({
        where: { id: input.spendingRecordId },
      });

      /* If deletion failed, throw error */
      if (!spendingRecord) throw new Error(`Failed to delete spending record`);

      /* Return deleted spending record */
      return spendingRecord;
    },
  }),
  /* Update note */
  updateSpendingRecordNote: t.prismaField({
    type: SpendingRecord,
    errors: {
      types: [Error],
    },
    args: {
      input: t.arg({ type: SpendingRecordUpdateNoteInput }),
    },
    resolve: async (_query, _root, { input }, _ctx, _info) => {
      /* Update note */
      const spendingRecord = await prisma.spendingRecord.update({
        data: { note: input.note },
        where: { id: input.spendingRecordId },
      });

      /* If update failed, throw error */
      if (!spendingRecord) throw new Error(`Failed to update note`);

      /* Return updated spending record */
      return spendingRecord;
    },
  }),
  /* Update amount */
  updateSpendingRecordAmount: t.prismaField({
    type: SpendingRecord,
    errors: {
      types: [Error],
    },
    args: {
      input: t.arg({ type: SpendingRecordUpdateAmountInput }),
    },
    resolve: async (_query, _root, { input }, _ctx, _info) => {
      /* Update amount */
      const spendingRecord = await prisma.spendingRecord.update({
        data: { amount: input.amount },
        where: { id: input.spendingRecordId },
      });

      /* If update failed, throw error */
      if (!spendingRecord) throw new Error(`Failed to update amount`);

      /* Return updated spending record */
      return spendingRecord;
    },
  }),
}));
