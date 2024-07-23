import { AsyncKeyStore } from "@/service/TokenStorage";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";

import { useEventCallback, useEventListener } from "usehooks-ts";

declare global {
  interface WindowEventMap {
    "local-storage": CustomEvent;
  }
}
type KeyType = "token" | "username";
type SetValue<T> = Dispatch<SetStateAction<T>>;

/**
 * a hook return and value, and a set function that update this value and localstorage simutaneously
 * @param key the key for the localstorage
 * @param initialValue initial value
 * @returns value Setvalue
 */
function useLocalStorage<T>(
  key: KeyType,
  initialValue?: T
): [T | undefined, SetValue<T | undefined>] {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T | undefined>(initialValue);

  // Get from local storage then
  // parse stored json or return initialValue
  const tokenstorage = AsyncKeyStore.getInstance();

  const readValue = useCallback(async (): Promise<void> => {
    try {
      const item = await tokenstorage.get(key);
      setStoredValue(item ? (parseJSON(item) as T) : initialValue);
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error);
      setStoredValue(initialValue);
    }
  }, [initialValue, key]);

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue: SetValue<T | undefined> = useEventCallback(async (value) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const newValue = value instanceof Function ? value(storedValue) : value;

      // Save to local storage
      await tokenstorage.add(key, JSON.stringify(newValue));

      // Save state
      setStoredValue(newValue);

      // We dispatch a custom event so every useLocalStorage hook are notified
      window.dispatchEvent(new Event("local-storage"));
    } catch (error) {
      console.warn(`Error setting localStorage key “${key}”:`, error);
    }
  });

  useEffect(() => {
    readValue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStorageChange = useCallback(
    (event: StorageEvent | CustomEvent) => {
      if ((event as StorageEvent)?.key && (event as StorageEvent).key !== key) {
        return;
      }
      readValue();
    },
    [key, readValue]
  );

  // this is a custom event, triggered in writeValueToLocalStorage
  // See: useLocalStorage()
  useEventListener("local-storage", handleStorageChange);

  return [storedValue, setValue];
}

export { useLocalStorage };

// A wrapper for "JSON.parse()"" to support "undefined" value
export function parseJSON<T>(value: string | null): T | undefined {
  try {
    return value === "undefined" ? undefined : JSON.parse(value ?? "");
  } catch {
    console.log("parsing error on", { value });
    return undefined;
  }
}
