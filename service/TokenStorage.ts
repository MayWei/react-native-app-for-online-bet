import AsyncStorage from "@react-native-async-storage/async-storage";

type KeyType = "token" | "username" | "racingtypes";

interface KeyStore {
  add: (key: KeyType, value: string) => Promise<void>;
  get: (key: KeyType) => Promise<string | undefined>;
  clear: () => Promise<void>;
}
/**
 * this is a class to process async storage, also with a private static instance
 * which will be used as a global var in this project access local storage
 */
export class AsyncKeyStore implements KeyStore {
  private static instance: AsyncKeyStore | null = null;
  public static getInstance(): AsyncKeyStore {
    if (!AsyncKeyStore.instance) {
      AsyncKeyStore.instance = new AsyncKeyStore();
    }
    return AsyncKeyStore.instance;
  }

  async add(key: KeyType, value: string): Promise<void> {
    console.log("AsyncStorage", AsyncStorage);
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
