import { YogaInitialContext } from "graphql-yoga";
import { verify } from "jsonwebtoken";
import { signAuthTokens } from "./jwt";
import { prisma } from "@models/db";

/* Context Interface */
export interface IContext extends YogaInitialContext {
  userId?: string;
}

export const getUserFromRequest = async (request: Request) => {
  /* Initialize contextUserId object */
  let contextUserId = "";

  /* Parse cookie to get access token & refresh token */
  const accessToken = await request.cookieStore?.get("access-token");
  const refreshToken = await request.cookieStore?.get("refresh-token");

  /* If access token is missing, return */
  if (!accessToken) return contextUserId;

  try {
    /* Verify access token with private key */
    const accessTokenPayload = verify(accessToken!.value, process.env.SECRET!);

    /* Set contextUserId to payload userId & return context */
    contextUserId = (accessTokenPayload as any).userId || "";
    return contextUserId;
  } catch {}

  /* If refresh token is missing, return */
  if (!refreshToken) return contextUserId;

  let refreshTokenPayload;
  try {
    /* Verify refresh token with private key */
    refreshTokenPayload = verify(refreshToken!.value, process.env.SECRET!);
  } catch {
    /* If not verified, return */
    return contextUserId;
  }

  /* Find user with id in payload */
  const userId = (refreshTokenPayload as any).userId || "";
  const user = await prisma.user.findUnique({ where: { id: userId } });

  /* If user doesn't exist, return */
  if (!user) return contextUserId;

  /* Sign new authentication tokens */
  const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
    await signAuthTokens({ userId: user.id }, request);

  /* Set access token cookie */
  await request.cookieStore?.set("access-token", newAccessToken);

  /* Set refresh token cookie */
  await request.cookieStore?.set("refresh-token", newRefreshToken);

  /* Set contextUserId to payload userId & return */
  contextUserId = user.id;
  return contextUserId;
};
