/* models/objects/AccountRequest.ts */

/* Imports */
import { PrismaModelTypes, PrismaObjectRef } from "@pothos/plugin-prisma";

import { builder } from "../builder";

/* Define account request object type */
/* Explicit typing to allow circular references */
export const AccountRequest: PrismaObjectRef<PrismaModelTypes> =
  builder.prismaObject("AccountRequest", {
    select: {
      id: true,
    },
    /* Define fields */
    fields: (t) => ({
      id: t.exposeID("id"),
      email: t.exposeString("email"),
      firstName: t.exposeString("firstName"),
      lastName: t.exposeString("lastName"),
      username: t.exposeString("username", { nullable: true }),
      school: t.exposeString("school"),
      createdAt: t.expose("createdAt", { type: "Date" }),
      acceptedAt: t.expose("acceptedAt", { type: "Date", nullable: true }),
    }),
  });
