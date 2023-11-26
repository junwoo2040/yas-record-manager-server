import { Prisma } from "@prisma/client";

import SchemaBuilder from "@pothos/core";
import PrismaPlugin from "@pothos/plugin-prisma";
import ErrorsPlugin from "@pothos/plugin-errors";
import PrismaTypes from "@pothos/plugin-prisma/generated";
import { DateResolver } from "graphql-scalars";

import { prisma } from "./db";
import { IContext } from "@utils/context";

export const builder = new SchemaBuilder<{
  DefaultFieldNullability: true;
  DefaultInputFieldRequiredness: true;
  Context: IContext;
  Scalars: {
    Date: { Input: Date; Output: Date };
  };
  PrismaTypes: PrismaTypes;
}>({
  defaultFieldNullability: true,
  defaultInputFieldRequiredness: true,
  plugins: [ErrorsPlugin, PrismaPlugin],
  errorOptions: {
    defaultTypes: [],
  },
  prisma: {
    client: prisma,
    dmmf: Prisma.dmmf,
    filterConnectionTotalCount: true,
  },
});

builder.addScalarType("Date", DateResolver, {});
