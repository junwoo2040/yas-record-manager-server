import { builder } from "@models/builder";
import { prisma } from "@models/db";

import { SpendingRecord } from "@models/objects/SpendingRecord";

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
  createSpendingRecord: t.prismaField({
    type: SpendingRecord,
    args: {
      input: t.arg({ type: SpendingRecordCreateInput }),
    },
    resolve: async (query, root, { input }, ctx, info) =>
      await prisma.spendingRecord.create({
        data: { ...input },
      }),
  }),
  deleteSpendingRecord: t.prismaField({
    type: SpendingRecord,
    args: {
      input: t.arg({ type: SpendingRecordDeleteInput }),
    },
    resolve: async (query, root, { input }, ctx, info) =>
      await prisma.spendingRecord.delete({
        where: { id: input.spendingRecordId },
      }),
  }),
  updateSpendingRecordNote: t.prismaField({
    type: SpendingRecord,
    args: {
      input: t.arg({ type: SpendingRecordUpdateNoteInput }),
    },
    resolve: async (query, root, { input }, ctx, info) =>
      await prisma.spendingRecord.update({
        data: { note: input.note },
        where: { id: input.spendingRecordId },
      }),
  }),
  updateSpendingRecordAmount: t.prismaField({
    type: SpendingRecord,
    args: {
      input: t.arg({ type: SpendingRecordUpdateAmountInput }),
    },
    resolve: async (query, root, { input }, ctx, info) =>
      await prisma.spendingRecord.update({
        data: { amount: input.amount },
        where: { id: input.spendingRecordId },
      }),
  }),
}));
