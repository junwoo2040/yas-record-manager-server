import { PrismaModelTypes, PrismaObjectRef } from "@pothos/plugin-prisma";

import { builder } from "../builder";

export const AccountRequest: PrismaObjectRef<PrismaModelTypes> =
  builder.prismaObject("AccountRequest", {
    select: {
      id: true,
    },
    fields: (t) => ({
      id: t.exposeID("id"),
      email: t.exposeString("email"),
      firstName: t.exposeString("firstName"),
      lastName: t.exposeString("lastName"),
      username: t.exposeString("username", { nullable: true }),
      school: t.exposeString("school"),
      createdAt: t.expose("createdAt", { type: "Date" }),
      acceptedAt: t.expose("acceptedAt", { type: "Date", nullable: true }),
      deniedAt: t.expose("deniedAt", { type: "Date", nullable: true }),
    }),
  });
