import { builder } from "@models/builder";
import { prisma } from "@models/db";

import { DonationRecord } from "@models/objects/DonationRecord";

const DonationRecordCreateInput = builder.inputType(
  "DonationRecordCreateInput",
  {
    fields: (t) => ({
      donorName: t.string(),
      donorContact: t.string(),
      amount: t.float(),
    }),
  },
);

const DonationRecordDeleteInput = builder.inputType(
  "DonationRecordDeleteInput",
  {
    fields: (t) => ({
      donationRecordId: t.string(),
    }),
  },
);

const DonationRecordUpdateDonorNameInput = builder.inputType(
  "DonationRecordUpdateDonorNameInput",
  {
    fields: (t) => ({
      donationRecordId: t.string(),
      donorName: t.string(),
    }),
  },
);

const DonationRecordUpdateDonorContactInput = builder.inputType(
  "DonationRecordUpdateDonorContactInput",
  {
    fields: (t) => ({
      donationRecordId: t.string(),
      donorContact: t.string(),
    }),
  },
);

const DonationRecordUpdateAmountInput = builder.inputType(
  "DonationRecordUpdateAmountInput",
  {
    fields: (t) => ({
      donationRecordId: t.string(),
      amount: t.float(),
    }),
  },
);

builder.mutationFields((t) => ({
  createDonationRecord: t.prismaField({
    type: DonationRecord,
    args: {
      input: t.arg({ type: DonationRecordCreateInput, required: true }),
    },
    resolve: async (query, root, { input }, ctx, info) =>
      await prisma.donationRecord.create({
        data: {
          ...input,
        },
      }),
  }),
  deleteDonationRecord: t.prismaField({
    type: DonationRecord,
    args: {
      input: t.arg({ type: DonationRecordDeleteInput }),
    },
    resolve: async (query, root, { input }, ctx, info) =>
      await prisma.donationRecord.delete({
        where: { id: input.donationRecordId },
      }),
  }),
  updateDonationRecordDonorName: t.prismaField({
    type: DonationRecord,
    args: {
      input: t.arg({
        type: DonationRecordUpdateDonorNameInput,
        required: true,
      }),
    },
    resolve: async (query, root, { input }, ctx, info) =>
      await prisma.donationRecord.update({
        data: {
          donorName: input.donorName,
        },
        where: { id: input.donationRecordId },
      }),
  }),
  updateDonationRecordDonorContact: t.prismaField({
    type: DonationRecord,
    args: {
      input: t.arg({
        type: DonationRecordUpdateDonorContactInput,
        required: true,
      }),
    },
    resolve: async (query, root, { input }, ctx, info) =>
      await prisma.donationRecord.update({
        data: { donorContact: input.donorContact },
        where: { id: input.donationRecordId },
      }),
  }),
  updateDonationRecordSchool: t.prismaField({
    type: DonationRecord,
    args: {
      input: t.arg({ type: DonationRecordUpdateAmountInput, required: true }),
    },
    resolve: async (query, root, { input }, ctx, info) =>
      await prisma.donationRecord.update({
        data: { amount: input.amount },
        where: { id: input.donationRecordId },
      }),
  }),
}));
