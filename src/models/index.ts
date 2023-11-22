import { builder } from "@models/builder";

import "@models/objects";

builder.queryType({});

import "@models/queries";

builder.mutationType({});

import "@models/mutations";

export const schema = builder.toSchema();
