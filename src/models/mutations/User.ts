import { builder } from "@models/builder";
import { prisma } from "@models/db";

import { User } from "@models/objects/User";

import { encrypt } from "@utils/encrypt";

const UserCreateInput = builder.inputType("UserCreateInput", {
  fields: (t) => ({
    email: t.string(),
    firstName: t.string(),
    lastName: t.string(),
    username: t.string(),
    password: t.string(),
  }),
});

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
  createUser: t.prismaField({
    type: User,
    args: {
      input: t.arg({ type: UserCreateInput, required: true }),
    },
    resolve: async (query, root, { input }, ctx, info) =>
      await prisma.user.create({
        data: {
          ...input,
          username: input.username || `${input.firstName} ${input.lastName}`,
          password: await encrypt(input.password, 10),
        },
      }),
  }),
  deleteUser: t.prismaField({
    type: User,
    args: {
      input: t.arg({ type: UserDeleteInput }),
    },
    resolve: async (query, root, { input }, ctx, info) =>
      await prisma.user.delete({ where: { id: input.userId } }),
  }),
  updateUserName: t.prismaField({
    type: User,
    args: {
      input: t.arg({ type: UserUpdateNameInput, required: true }),
    },
    resolve: async (query, root, { input }, ctx, info) =>
      await prisma.user.update({
        data: {
          firstName: input.firstName || undefined,
          lastName: input.lastName || undefined,
          username: input.username || undefined,
        },
        where: { id: input.userId },
      }),
  }),
  updateUserPassword: t.prismaField({
    type: User,
    args: {
      input: t.arg({ type: UserUpdatePasswordInput, required: true }),
    },
    resolve: async (query, root, { input }, ctx, info) =>
      await prisma.user.update({
        data: { password: input.password },
        where: { id: input.userId },
      }),
  }),
  updateUserSchool: t.prismaField({
    type: User,
    args: {
      input: t.arg({ type: UserUpdateSchoolInput, required: true }),
    },
    resolve: async (query, root, { input }, ctx, info) =>
      await prisma.user.update({
        data: { school: input.school },
        where: { id: input.userId },
      }),
  }),
}));
