import { builder } from "@models/builder";
import { prisma } from "@models/db";

import { User } from "@models/objects/User";

builder.queryFields((t) => ({
  users: t.prismaField({
    type: [User],
    resolve: async (query, root, args, ctx, info) =>
      await prisma.user.findMany(),
  }),
  user: t.prismaField({
    type: User,
    args: {
      userId: t.arg.string(),
    },
    resolve: async (query, root, args, ctx, info) =>
      await prisma.user.findUniqueOrThrow({
        where: { id: args.userId },
      }),
  }),
}));
