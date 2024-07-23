import AsyncStorage from "@react-native-async-storage/async-storage";

type KeyType = "token" | "username";

interface KeyStore {
  add: (key: KeyType, value: string) => Promise<void>;
  get: (key: KeyType) => Promise<string | undefined>;
  clear: () => Promise<void>;
}

export class AsyncKeyStore implements KeyStore {
  private static instance: AsyncKeyStore | null = null;
  public static getInstance(): AsyncKeyStore {
    if (!AsyncKeyStore.instance) {
      AsyncKeyStore.instance = new AsyncKeyStore();
    }
    return AsyncKeyStore.instance;
  }

  async add(key: KeyType, value: string): Promise<void> {
    return await AsyncStorage.setItem(key, value);
  }

  async clear(): Promise<void> {
    const asyncStorageKeys = await AsyncStorage.getAllKeys();
    if (asyncStorageKeys.length > 0) {
      await AsyncStorage.clear();
    }
  }

  async get(key: KeyType): Promise<string | undefined> {
    return (await AsyncStorage.getItem(key)) || undefined;
  }
}
