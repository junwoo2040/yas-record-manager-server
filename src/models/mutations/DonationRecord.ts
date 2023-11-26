/* models/mutations/DonationRecord.ts */

/* Imports */
import { builder } from "@models/builder";
import { prisma } from "@models/db";

import { DonationRecord } from "@models/objects/DonationRecord";

/* Define input type */
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
  /* Create donation record */
  createDonationRecord: t.prismaField({
    type: DonationRecord,
    errors: {
      types: [Error],
    },
    args: {
      input: t.arg({ type: DonationRecordCreateInput }),
    },
    resolve: async (_query, _root, { input }, _ctx, _info) => {
      /* Create donation record */
      const donationRecord = await prisma.donationRecord.create({
        data: { ...input },
      });

      /* If creation failed, throw error */
      if (!donationRecord)
        throw new Error(`Failed to create new donation record`);

      /* Return new donation record */
      return donationRecord;
    },
  }),
  /* Delete donation record */
  deleteDonationRecord: t.prismaField({
    type: DonationRecord,
    errors: {
      types: [Error],
    },
    args: {
      input: t.arg({ type: DonationRecordDeleteInput }),
    },
    resolve: async (_query, _root, { input }, _ctx, _info) => {
      /* Delete donation record */
      const donationRecord = await prisma.donationRecord.delete({
        where: { id: input.donationRecordId },
      });

      /* If deletion failed, throw error */
      if (!donationRecord) throw new Error(`Failed to delete donation record`);

      /* Return deleted donation record */
      return donationRecord;
    },
  }),
  /* Update donor name */
  updateDonationRecordDonorName: t.prismaField({
    type: DonationRecord,
    errors: {
      types: [Error],
    },
    args: {
      input: t.arg({ type: DonationRecordUpdateDonorNameInput }),
    },
    resolve: async (_query, _root, { input }, _ctx, _info) => {
      /* Update donor name */
      const donationRecord = await prisma.donationRecord.update({
        data: {
          donorName: input.donorName,
        },
        where: { id: input.donationRecordId },
      });

      /* If update failed, throw error */
      if (!donationRecord) throw new Error(`Failed to update donor name`);

      /* Return updated donation record */
      return donationRecord;
    },
  }),
  /* Update donor contact */
  updateDonationRecordDonorContact: t.prismaField({
    type: DonationRecord,
    errors: {
      types: [Error],
    },
    args: {
      input: t.arg({ type: DonationRecordUpdateDonorContactInput }),
    },
    resolve: async (_query, _root, { input }, _ctx, _info) => {
      /* Update donor contact */
      const donationRecord = await prisma.donationRecord.update({
        data: { donorContact: input.donorContact },
        where: { id: input.donationRecordId },
      });

      /* If update failed, throw error */
      if (!donationRecord) throw new Error(`Failed to update donor contact`);

      /* Return updated donation record */
      return donationRecord;
    },
  }),
  /* Update amount */
  updateDonationRecordAmount: t.prismaField({
    type: DonationRecord,
    errors: {
      types: [Error],
    },
    args: {
      input: t.arg({ type: DonationRecordUpdateAmountInput }),
    },
    resolve: async (_query, _root, { input }, _ctx, _info) => {
      /* Update amount */
      const donationRecord = await prisma.donationRecord.update({
        data: { amount: input.amount },
        where: { id: input.donationRecordId },
      });

      /* If update failed, throw error */
      if (!donationRecord) throw new Error(`Failed to update amount`);

      /* Return updated donation record */
      return donationRecord;
    },
  }),
}));
