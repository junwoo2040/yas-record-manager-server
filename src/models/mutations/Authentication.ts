/* models/mutations/Authentication.ts */

/* Imports */
import { compare } from "bcrypt";

import { builder } from "@models/builder";
import { prisma } from "@models/db";

import { User } from "@models/objects/User";
import { AccountRequest } from "@models/objects/AccountRequest";

import { encrypt } from "@utils/encrypt";
import { signAuthTokens } from "@utils/jwt";

/* Define input type */
const AccountLoginInput = builder.inputType("AccountLoginInput", {
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
  /* Handle account login */
  accountLogin: t.prismaField({
    type: User,
    errors: {
      types: [Error],
    },
    args: {
      input: t.arg({ type: AccountLoginInput, required: true }),
    },
    resolve: async (_query, _root, { input }, ctx, _info) => {
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

      /* Sign authentication tokens */
      const { accessToken, refreshToken } = await signAuthTokens({
        userId: user.id,
      });

      /* Set access token cookie */
      await ctx.request.cookieStore?.set("access-token", accessToken);

      /* Set refresh token cookie */
      await ctx.request.cookieStore?.set("refresh-token", refreshToken);

      return user;
    },
  }),
  /* Handle account request */
  accountRequest: t.prismaField({
    type: AccountRequest,
    errors: {
      types: [Error],
    },
    args: {
      input: t.arg({ type: AccountRequestInput, required: true }),
    },
    resolve: async (_query, _root, { input }, _ctx, _info) => {
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

      /* Create new account request */
      return await prisma.accountRequest.create({
        data: {
          ...input,
          username: input.username || `${input.firstName} ${input.lastName}`,
          password: await encrypt(input.password, 10),
        },
      });
    },
  }),
  /* Handle account accept */
  accountAccept: t.prismaField({
    type: User,
    errors: {
      types: [Error],
    },
    args: {
      input: t.arg({ type: AccountAcceptInput }),
    },
    resolve: async (_query, _root, { input }, _ctx, _info) => {
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
      const { id, createdAt, acceptedAt, ...data } = request;

      /* Create new user from request information */
      return await prisma.user.create({ data: { ...data } });
    },
  }),
  /* Handle account deny */
  accountDeny: t.prismaField({
    type: User,
    errors: {
      types: [Error],
    },
    args: {
      input: t.arg({ type: AccountDenyInput }),
    },
    resolve: async (_query, _root, { input }, _ctx, _info) => {
      /* Find target account request */
      const request = await prisma.accountRequest.findUnique({
        where: { email: input.email },
      });

      /* Throw error if account request doesn't exist */
      if (!request) throw new Error(`Request doesn't exist`);

      /* Delete denied request */
      await prisma.accountRequest.delete({ where: { email: input.email } });
    },
  }),
}));
