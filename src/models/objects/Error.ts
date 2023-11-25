import { builder } from "@models/builder";

builder.objectType(Error, {
  name: "Error",
  fields: (t) => ({
    message: t.exposeString("message"),
  }),
});
