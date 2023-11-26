/* utils/jwt.ts */

/* Imports */
import { sign } from "jsonwebtoken";

export const signAuthTokens = async (payload: any) => {
  /* Sign access token with access token private key */
  const accessToken = sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET!, {
    expiresIn: "10s",
  });

  /* Sign refresh token with refresh token private key */
  const refreshToken = sign(payload, process.env.JWT_REFRESH_TOKEN_SECRET!, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};
