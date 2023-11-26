/* models/objects/User.ts */

/* Imports */
import { PrismaModelTypes, PrismaObjectRef } from "@pothos/plugin-prisma";

import { builder } from "../builder";

/* Define user object type */
/* Explicit typing to allow circular references */
export const User: PrismaObjectRef<PrismaModelTypes> = builder.prismaObject(
  "User",
  {
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
      donationRecords: t.relation("donationRecords"),
      spendingRecords: t.relation("spendingRecords"),
      salesRecord: t.relation("salesRecords"),
    }),
  },
);
