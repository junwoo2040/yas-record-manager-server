/* models/index.ts */

/* Imports */
import { builder } from "@models/builder";

/* Initialize GraphQL query type and mutation type */
builder.queryType({});
builder.mutationType({});

/* Import objects, queries, and mutations */
import "@models/objects";
import "@models/queries";
import "@models/mutations";

/* Get GraphQL schema from builder and export */
export const schema = builder.toSchema();
