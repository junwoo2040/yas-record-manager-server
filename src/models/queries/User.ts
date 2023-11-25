import { builder } from "@models/builder";
import { prisma } from "@models/db";

import { User } from "@models/objects/User";
import { verify } from "jsonwebtoken";

builder.queryFields((t) => ({
  users: t.prismaField({
    type: [User],
    errors: {
      types: [Error],
    },
    resolve: async (query, root, args, ctx, info) =>
      await prisma.user.findMany(),
  }),
  user: t.prismaField({
    type: User,
    errors: {
      types: [Error],
    },
    args: {
      userId: t.arg.string(),
    },
    resolve: async (query, root, args, ctx, info) => {
      const user = await prisma.user.findUnique({
        where: { id: args.userId },
      });

      if (!user) throw new Error(`User with id ${args.userId} does not exist`);

      return user;
    },
  }),
  currentUser: t.prismaField({
    type: User,
    errors: {
      types: [Error],
    },
    resolve: async (query, root, args, ctx, info) => {
      const cookie = await ctx.request.cookieStore?.get("access-token");

      if (!cookie) throw new Error(`Missing cookie`);

      const data = verify(cookie.value, process.env.SECRET!);

      const id = (data as any).userId;
      if (!(data as any).userId) throw new Error(`Invalid cookie`);

      return await prisma.user.findUnique({ where: { id } });
    },
  }),
}));
