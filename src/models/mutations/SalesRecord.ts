import { builder } from "@models/builder";
import { prisma } from "@models/db";

import { SalesRecord } from "@models/objects/SalesRecord";

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
  createSalesRecord: t.prismaField({
    type: SalesRecord,
    args: {
      input: t.arg({ type: SalesRecordCreateInput }),
    },
    resolve: async (query, root, { input }, ctx, info) =>
      await prisma.salesRecord.create({ data: { ...input } }),
  }),
  deleteSalesRecord: t.prismaField({
    type: SalesRecord,
    args: {
      input: t.arg({ type: SalesRecordDeleteInput }),
    },
    resolve: async (query, root, { input }, ctx, info) =>
      await prisma.salesRecord.delete({ where: { id: input.salesRecordId } }),
  }),
  updateSalesRecordClientName: t.prismaField({
    type: SalesRecord,
    args: {
      input: t.arg({ type: SalesRecordUpdateClientNameInput }),
    },
    resolve: async (query, root, { input }, ctx, info) =>
      await prisma.salesRecord.update({
        data: { clientName: input.clientName },
        where: { id: input.salesRecordId },
      }),
  }),
  updateSalesRecordClientContact: t.prismaField({
    type: SalesRecord,
    args: {
      input: t.arg({ type: SalesRecordUpdateClientContactInput }),
    },
    resolve: async (query, root, { input }, ctx, info) =>
      await prisma.salesRecord.update({
        data: { clientContact: input.clientContact },
        where: { id: input.salesRecordId },
      }),
  }),
  updateSalesRecordProduct: t.prismaField({
    type: SalesRecord,
    args: {
      input: t.arg({ type: SalesRecordUpdateProductInput }),
    },
    resolve: async (query, root, { input }, ctx, info) =>
      await prisma.salesRecord.update({
        data: { product: input.product },
        where: { id: input.salesRecordId },
      }),
  }),
  updateSalesRecordPrice: t.prismaField({
    type: SalesRecord,
    args: {
      input: t.arg({ type: SalesRecordUpdatePriceInput }),
    },
    resolve: async (query, root, { input }, ctx, info) =>
      await prisma.salesRecord.update({
        data: { price: input.price },
        where: { id: input.salesRecordId },
      }),
  }),
  updateSalesRecordQuantity: t.prismaField({
    type: SalesRecord,
    args: {
      input: t.arg({ type: SalesRecordUpdateQuantityInput }),
    },
    resolve: async (query, root, { input }, ctx, info) =>
      await prisma.salesRecord.update({
        data: { quantity: input.quantity },
        where: { id: input.salesRecordId },
      }),
  }),
  updateSalesRecordDiscount: t.prismaField({
    type: SalesRecord,
    args: {
      input: t.arg({ type: SalesRecordUpdateDiscountInput }),
    },
    resolve: async (query, root, { input }, ctx, info) =>
      await prisma.salesRecord.update({
        data: { discount: input.discount },
        where: { id: input.salesRecordId },
      }),
  }),
}));
