/* models/queries/User.ts */

/* Imports */
import { builder } from "@models/builder";
import { prisma } from "@models/db";

import { User } from "@models/objects/User";

/* Define input type */
const UserFindByIdInput = builder.inputType("UserFindByIdInput", {
  fields: (t) => ({
    userId: t.string(),
  }),
});

builder.queryFields((t) => ({
  /* Get all users */
  users: t.prismaField({
    type: [User],
    errors: {
      types: [Error],
    },
    resolve: async (_query, _root, _args, _ctx, _info) =>
      /* Find all users and return */
      await prisma.user.findMany(),
  }),
  /* Get one user by id  */
  user: t.prismaField({
    type: User,
    errors: {
      types: [Error],
    },
    args: {
      input: t.arg({ type: UserFindByIdInput }),
    },
    resolve: async (_query, _root, { input }, _ctx, _info) => {
      /* Find a user with corresponding id */
      const user = await prisma.user.findUnique({
        where: { id: input.userId },
      });

      /* If user isn't found, throw error */
      if (!user) throw new Error(`User with id ${input.userId} does not exist`);

      /* Return user */
      return user;
    },
  }),
  /* Get current user */
  currentUser: t.prismaField({
    type: User,
    errors: {
      types: [Error],
    },
    resolve: async (_query, _root, _args, ctx, _info) => {
      /* Check if context userId is defined*/
      if (!ctx.userId) throw new Error(`Not logged in`);

      /* Find a user with id in context */
      const user = await prisma.user.findUnique({ where: { id: ctx.userId } });

      /* If the user isn't found, throw error */
      if (!user) throw new Error(`User with id ${ctx.userId} does not exist`);

      /* Return user */
      return user;
    },
  }),
}));
