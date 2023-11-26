/* models/queries/SalesRecord.ts */

/* Imports */
import { builder } from "@models/builder";
import { prisma } from "@models/db";

import { SalesRecord } from "@models/objects/SalesRecord";

/* Define input type */
const SalesRecordCreateInput = builder.inputType("SalesRecordCreateInput", {
  fields: (t) => ({
    clientName: t.string(),
    clientContact: t.string(),
    product: t.string(),
    price: t.float(),
    quantity: t.int(),
    discount: t.float(),
  }),
});

const SalesRecordDeleteInput = builder.inputType("SalesRecordDeleteInput", {
  fields: (t) => ({
    salesRecordId: t.string(),
  }),
});

const SalesRecordUpdateClientNameInput = builder.inputType(
  "SalesRecordUpdateClientNameInput",
  {
    fields: (t) => ({
      salesRecordId: t.string(),
      clientName: t.string(),
    }),
  },
);

const SalesRecordUpdateClientContactInput = builder.inputType(
  "SalesRecordUpdateClientContactInput",
  {
    fields: (t) => ({
      salesRecordId: t.string(),
      clientContact: t.string(),
    }),
  },
);

const SalesRecordUpdateProductInput = builder.inputType(
  "SalesRecordUpdateProductInput",
  {
    fields: (t) => ({
      salesRecordId: t.string(),
      product: t.string(),
    }),
  },
);

const SalesRecordUpdatePriceInput = builder.inputType(
  "SalesRecordUpdatePriceInput",
  {
    fields: (t) => ({
      salesRecordId: t.string(),
      price: t.float(),
    }),
  },
);

const SalesRecordUpdateQuantityInput = builder.inputType(
  "SalesRecordUpdateQuantityInput",
  {
    fields: (t) => ({
      salesRecordId: t.string(),
      quantity: t.int(),
    }),
  },
);

const SalesRecordUpdateDiscountInput = builder.inputType(
  "SalesRecodUpdateDiscountInput",
  {
    fields: (t) => ({
      salesRecordId: t.string(),
      discount: t.float(),
    }),
  },
);

builder.mutationFields((t) => ({
  /* Create sales record */
  createSalesRecord: t.prismaField({
    type: SalesRecord,
    errors: {
      types: [Error],
    },
    args: {
      input: t.arg({ type: SalesRecordCreateInput }),
    },
    resolve: async (_query, _root, { input }, _ctx, _info) => {
      /* Create sales record */
      const salesRecord = await prisma.salesRecord.create({
        data: { ...input },
      });

      /* If creation failed, throw error */
      if (!salesRecord) throw new Error(`Failed to create new sales record`);

      /* Return new donation record */
      return salesRecord;
    },
  }),
  /* Delete sales record */
  deleteSalesRecord: t.prismaField({
    type: SalesRecord,
    errors: {
      types: [Error],
    },
    args: {
      input: t.arg({ type: SalesRecordDeleteInput }),
    },
    resolve: async (_query, _root, { input }, _ctx, _info) => {
      /* Delete sales record */
      const salesRecord = await prisma.salesRecord.delete({
        where: { id: input.salesRecordId },
      });

      /* If deletion failed, throw error */
      if (!salesRecord) throw new Error(`Failed to delete sales record`);

      /* Return deleted donation record */
      return salesRecord;
    },
  }),
  /* Update client name */
  updateSalesRecordClientName: t.prismaField({
    type: SalesRecord,
    errors: {
      types: [Error],
    },
    args: {
      input: t.arg({ type: SalesRecordUpdateClientNameInput }),
    },
    resolve: async (_query, _root, { input }, _ctx, _info) => {
      /* Update client name */
      const salesRecord = await prisma.salesRecord.update({
        data: { clientName: input.clientName },
        where: { id: input.salesRecordId },
      });

      /* If update failed, throw error */
      if (!salesRecord) throw new Error(`Failed to update client name`);

      /* Return updated sales record */
      return salesRecord;
    },
  }),
  /* Update client contact */
  updateSalesRecordClientContact: t.prismaField({
    type: SalesRecord,
    errors: {
      types: [Error],
    },
    args: {
      input: t.arg({ type: SalesRecordUpdateClientContactInput }),
    },
    resolve: async (_query, _root, { input }, _ctx, _info) => {
      /* Update client contact */
      const salesRecord = await prisma.salesRecord.update({
        data: { clientContact: input.clientContact },
        where: { id: input.salesRecordId },
      });

      /* If update failed, throw error */
      if (!salesRecord) throw new Error(`Failed to update client contact`);

      /* Return updated sales record */
      return salesRecord;
    },
  }),
  /* Update product */
  updateSalesRecordProduct: t.prismaField({
    type: SalesRecord,
    errors: {
      types: [Error],
    },
    args: {
      input: t.arg({ type: SalesRecordUpdateProductInput }),
    },
    resolve: async (_query, _root, { input }, _ctx, _info) => {
      /* Update product */
      const salesRecord = await prisma.salesRecord.update({
        data: { product: input.product },
        where: { id: input.salesRecordId },
      });

      /* If update failed, throw error */
      if (!salesRecord) throw new Error(`Failed to update product`);

      /* Return updated sales record */
      return salesRecord;
    },
  }),
  /* Update price */
  updateSalesRecordPrice: t.prismaField({
    type: SalesRecord,
    errors: {
      types: [Error],
    },
    args: {
      input: t.arg({ type: SalesRecordUpdatePriceInput }),
    },
    resolve: async (_query, _root, { input }, _ctx, _info) => {
      /* Update price */
      const salesRecord = await prisma.salesRecord.update({
        data: { price: input.price },
        where: { id: input.salesRecordId },
      });

      /* If update failed, throw error */
      if (!salesRecord) throw new Error(`Failed to update price`);

      /* Return updated sales record */
      return salesRecord;
    },
  }),
  /* Update quantity */
  updateSalesRecordQuantity: t.prismaField({
    type: SalesRecord,
    errors: {
      types: [Error],
    },
    args: {
      input: t.arg({ type: SalesRecordUpdateQuantityInput }),
    },
    resolve: async (_query, _root, { input }, _ctx, _info) => {
      /* Update quantity */
      const salesRecord = await prisma.salesRecord.update({
        data: { quantity: input.quantity },
        where: { id: input.salesRecordId },
      });

      /* If update failed, throw error */
      if (!salesRecord) throw new Error(`Failed to update quantity`);

      /* Return updated sales record */
      return salesRecord;
    },
  }),
  /* Update discount */
  updateSalesRecordDiscount: t.prismaField({
    type: SalesRecord,
    errors: {
      types: [Error],
    },
    args: {
      input: t.arg({ type: SalesRecordUpdateDiscountInput }),
    },
    resolve: async (_query, _root, { input }, _ctx, _info) => {
      /* Update discount */
      const salesRecord = await prisma.salesRecord.update({
        data: { discount: input.discount },
        where: { id: input.salesRecordId },
      });

      /* If update failed, throw error */
      if (!salesRecord) throw new Error(`Failed to update discount`);

      /* Return updated sales record */
      return salesRecord;
    },
  }),
}));
