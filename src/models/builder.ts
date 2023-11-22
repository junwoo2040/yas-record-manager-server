import { Prisma } from "@prisma/client";

import SchemaBuilder from "@pothos/core";
import PrismaPlugin from "@pothos/plugin-prisma";
import PrismaTypes from "@pothos/plugin-prisma/generated";

import { prisma } from "./db";
import { DateResolver } from "graphql-scalars";

export const builder = new SchemaBuilder<{
  DefaultFieldNullability: true;
  DefaultInputFieldRequiredness: true;
  Scalars: {
    Date: { Input: Date; Output: Date };
  };
  PrismaTypes: PrismaTypes;
}>({
  defaultFieldNullability: true,
  defaultInputFieldRequiredness: true,
  plugins: [PrismaPlugin],
  prisma: {
    client: prisma,
    dmmf: Prisma.dmmf,
    filterConnectionTotalCount: true,
  },
});

builder.addScalarType("Date", DateResolver, {});
