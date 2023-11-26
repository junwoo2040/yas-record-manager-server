/* models/objects/Error.ts */
import { builder } from "@models/builder";

/* Imports */
/* Define error object type */
builder.objectType(Error, {
  name: "Error",
  /* Define fields */
  fields: (t) => ({
    message: t.exposeString("message"),
  }),
});
