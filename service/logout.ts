import { AsyncKeyStore } from "./TokenStorage";

/**
 * logout clear async storage
 */
export const logout = async () => {
  const tokenstorage = AsyncKeyStore.getInstance();
  await tokenstorage.clear();
};
