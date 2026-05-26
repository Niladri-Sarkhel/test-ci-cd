import bcrypt from "bcrypt";

import { env } from "#consts";

const SALT_ROUNDS = env.SALT_ROUNDS;

export const hashUtil = {
  hash: async (plain) => {
    return bcrypt.hash(plain, SALT_ROUNDS);
  },

  compare: async (plain, hash) => {
    return bcrypt.compare(plain, hash);
  },
};
