import { sign } from "jsonwebtoken";

export const signAuthTokens = async (payload: any, request: Request) => {
  /* Sign access token with JWT */
  const accessToken = sign(payload, process.env.SECRET!, {
    expiresIn: "10s",
  });

  /* Sign refresh token with JWT */
  const refreshToken = sign(payload, process.env.SECRET!, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};
