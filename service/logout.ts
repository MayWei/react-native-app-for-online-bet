import { AsyncKeyStore } from "./TokenStorage";

export const logout = async () => {
  const tokenstorage = AsyncKeyStore.getInstance();
  await tokenstorage.clear();
};
