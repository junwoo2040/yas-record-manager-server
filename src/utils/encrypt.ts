/* encrypt.ts */

import { hash } from "bcrypt";

/* https://stackoverflow.com/questions/48799894/trying-to-hash-a-password-using-bcrypt-inside-an-async-function */
export const encrypt = async (str: string, rounds: number) => {
  const hashedPassword: string = await new Promise((resolve, reject) => {
    hash(str, rounds, function (err, hash) {
      if (err) reject(err);
      resolve(hash);
    });
  });

  return hashedPassword;
};
