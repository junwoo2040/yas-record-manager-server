import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

import { builder } from "@models/builder";
import { prisma } from "@models/db";

import { User } from "@models/objects/User";
import { encrypt } from "@utils/encrypt";
import { AccountRequest } from "@models/objects/AccountRequest";

const AccountLoginInput = builder.inputType("LoginInput", {
  fields: (t) => ({
    username: t.string(),
    password: t.string(),
  }),
});

const AccountRequestInput = builder.inputType("AccountRequestInput", {
  fields: (t) => ({
    email: t.string(),
    firstName: t.string(),
    lastName: t.string(),
    username: t.string(),
    password: t.string(),
  }),
});

const AccountAcceptInput = builder.inputType("AccountAcceptInput", {
  fields: (t) => ({
    email: t.string(),
  }),
});

const AccountDenyInput = builder.inputType("AccountDenyInput", {
  fields: (t) => ({
    email: t.string(),
  }),
});

builder.mutationFields((t) => ({
  accountLogin: t.prismaField({
    type: User,
    errors: {
      types: [Error],
    },
    args: {
      input: t.arg({ type: AccountLoginInput, required: true }),
    },
    resolve: async (query, root, { input }, ctx, info) => {
      /* Find user by username */
      const user = await prisma.user.findUnique({
        where: { username: input.username },
      });

      /* Throw error if user doesn't exist */
      if (!user) throw new Error(`User ${input.username} does not exist`);

      /* Compare entered password with hashed password */
      const isValid = compare(input.password, user.password);
      // const isValid = input.password === user.password;

      /* Throw error if passwords don't match  */
      if (!isValid) throw new Error(`Incorrect password`);

      /* Sign access token with JWT */
      const accessToken = sign({ userId: user.id }, process.env.SECRET!, {
        expiresIn: "1m",
      });

      /* Sign refresh token with JWT */
      const refreshToken = sign({ userId: user.id }, process.env.SECRET!, {
        expiresIn: "7d",
      });

      /* Set access token cookie */
      await ctx.request.cookieStore?.set("access-token", accessToken);

      /* Set refresh token cookie */
      await ctx.request.cookieStore?.set("refresh-token", refreshToken);

      return user;
    },
  }),
  accountRequest: t.prismaField({
    type: AccountRequest,
    errors: {
      types: [Error],
    },
    args: {
      input: t.arg({ type: AccountRequestInput, required: true }),
    },
    resolve: async (query, root, { input }, ctx, info) => {
      /* Check if username is taken */
      const usernameCheck = await prisma.user.findUnique({
        where: { username: input.username },
      });

      /* Throw error if username is taken */
      if (usernameCheck)
        throw new Error(`Username ${input.username} is already in use!`);

      /* Check if email is taken */
      const emailCheck = await prisma.user.findUnique({
        where: { email: input.email },
      });

      /* Throw error if email is taken */
      if (emailCheck)
        throw new Error(`Email ${input.email} is already in use!`);

      return await prisma.accountRequest.create({
        data: {
          ...input,
          username: input.username || `${input.firstName} ${input.lastName}`,
          password: await encrypt(input.password, 10),
        },
      });
    },
  }),
  accountAccept: t.prismaField({
    type: User,
    errors: {
      types: [Error],
    },
    args: {
      input: t.arg({ type: AccountAcceptInput }),
    },
    resolve: async (query, root, { input }, ctx, info) => {
      /* Find target account request */
      const request = await prisma.accountRequest.findUnique({
        where: { email: input.email },
      });

      /* Throw error if account request doesn't exist */
      if (!request) throw new Error(`Request doesn't exist`);

      /* Update acceptance date */
      await prisma.accountRequest.update({
        data: { acceptedAt: new Date() },
        where: { email: input.email },
      });

      /* Remove unnecessary properties */
      const { id, createdAt, acceptedAt, deniedAt, ...data } = request;

      /* Create new user from request information */
      return await prisma.user.create({ data: { ...data } });
    },
  }),
  accountDeny: t.prismaField({
    type: User,
    errors: {
      types: [Error],
    },
    args: {
      input: t.arg({ type: AccountDenyInput }),
    },
    resolve: async (query, root, { input }, ctx, info) => {
      /* Find target account request */
      const request = await prisma.accountRequest.findUnique({
        where: { email: input.email },
      });

      /* Throw error if account request doesn't exist */
      if (!request) throw new Error(`Request doesn't exist`);

      /* Update denial date */
      await prisma.accountRequest.update({
        data: { acceptedAt: new Date() },
        where: { email: input.email },
      });
    },
  }),
}));
