import React, { PropsWithChildren, useCallback, useEffect } from "react";
import { useMemo, useState } from "react";
import { createSafeContext, useSafeContext } from "./contextHelpers";

export interface LoginProviderState {
  isLoggedin: boolean;
  setIsLoggedin: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface LoginProviderProps {}
const LoginContext = createSafeContext<LoginProviderState>();
/**
 * a Context saving Logged in state
 */
export const LoginProvider = (props: PropsWithChildren<LoginProviderProps>) => {
  const { children } = props;
  const [isLoggedin, setIsLoggedin] = useState(false);

  const value = useMemo<LoginProviderState>(() => {
    return {
      isLoggedin,
      setIsLoggedin,
    };
  }, [isLoggedin, setIsLoggedin]);

  return (
    <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
  );
};

export const useLogin = () => useSafeContext(LoginContext);
