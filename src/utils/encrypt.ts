/* utils/encrypt.ts */

/* Imports */
import { hash } from "bcrypt";

/*
https://stackoverflow.com/questions/48799894/trying-to-hash-a-password-using-
bcrypt-inside-an-async-function
*/
export const encrypt = async (str: string, rounds: number) => {
  /* Hash password */
  const hashedPassword: string = await new Promise((resolve, reject) => {
    /* Hash "str" by salting it "rounds" times */
    hash(str, rounds, function (err, hash) {
      /* If error is raised, output error */
      if (err) reject(err);

      /* If no error is raised, resolve hash */
      resolve(hash);
    });
  });

  return hashedPassword;
};
