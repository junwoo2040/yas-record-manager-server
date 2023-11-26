/* models/queries/SalesRecord.ts */

/* Imports */
import { builder } from "@models/builder";
import { prisma } from "@models/db";

import { User } from "@models/objects/User";

/* Define input type */
const UserDeleteInput = builder.inputType("UserDeleteInput", {
  fields: (t) => ({
    userId: t.string(),
  }),
});

const UserUpdateNameInput = builder.inputType("UserUpdateNameInput", {
  fields: (t) => ({
    userId: t.string(),
    firstName: t.string({ required: false }),
    lastName: t.string({ required: false }),
    username: t.string({ required: false }),
  }),
});

const UserUpdatePasswordInput = builder.inputType("UserUpdatePasswordInput", {
  fields: (t) => ({
    userId: t.string(),
    password: t.string(),
  }),
});

const UserUpdateSchoolInput = builder.inputType("UserUpdateSchoolInput", {
  fields: (t) => ({
    userId: t.string(),
    school: t.string(),
  }),
});

builder.mutationFields((t) => ({
  /* Delete user */
  deleteUser: t.prismaField({
    type: User,
    errors: {
      types: [Error],
    },
    args: {
      input: t.arg({ type: UserDeleteInput }),
    },
    resolve: async (_query, _root, { input }, _ctx, _info) => {
      /* Delete user */
      const user = await prisma.user.delete({ where: { id: input.userId } });

      /* If deletion failed, throw error */
      if (!user) throw new Error(`Failed to delete user`);

      /* Return deleted user */
      return user;
    },
  }),
  /* Update name */
  updateUserName: t.prismaField({
    type: User,
    errors: {
      types: [Error],
    },
    args: {
      input: t.arg({ type: UserUpdateNameInput, required: true }),
    },
    resolve: async (_query, _root, { input }, _ctx, _info) => {
      /* Update name */
      const user = await prisma.user.update({
        data: {
          firstName: input.firstName || undefined,
          lastName: input.lastName || undefined,
          username: input.username || undefined,
        },
        where: { id: input.userId },
      });

      /* If update failed, throw error */
      if (!user) throw new Error(`Failed to update name`);

      /* Return updated user */
      return user;
    },
  }),
  /* Update password */
  updateUserPassword: t.prismaField({
    type: User,
    errors: {
      types: [Error],
    },
    args: {
      input: t.arg({ type: UserUpdatePasswordInput, required: true }),
    },
    resolve: async (_query, _root, { input }, _ctx, _info) => {
      /* Update password */
      const user = await prisma.user.update({
        data: { password: input.password },
        where: { id: input.userId },
      });

      /* If update failed, throw error */
      if (!user) throw new Error(`Failed to update password`);

      /* Return updated user */
      return user;
    },
  }),
  /* Update school */
  updateUserSchool: t.prismaField({
    type: User,
    errors: {
      types: [Error],
    },
    args: {
      input: t.arg({ type: UserUpdateSchoolInput, required: true }),
    },
    resolve: async (_query, _root, { input }, _ctx, _info) => {
      /* Update school */
      const user = await prisma.user.update({
        data: { school: input.school },
        where: { id: input.userId },
      });

      /* If update failed, throw error */
      if (!user) throw new Error(`Failed to update school`);

      /* Return updated user */
      return user;
    },
  }),
}));
