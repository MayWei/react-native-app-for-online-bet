import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { useMemo, useState } from "react";
import { createSafeContext, useSafeContext } from "./contextHelpers";
import { AsyncKeyStore } from "@/service/TokenStorage";
import { useLogin } from "./LoginProvider";

export interface RacingSelectedProviderState {
  racingSelected: { [racingType: string]: boolean } | null;
  setRacingSelected: (
    racingType: string | { [racingType: string]: boolean }
  ) => void;
}

export interface RacingSelectedProviderProps {}
const RacingSelectedContext = createSafeContext<RacingSelectedProviderState>();
export const RacingSelectedProvider = (
  props: PropsWithChildren<RacingSelectedProviderProps>
) => {
  const { children } = props;
  const { isLoggedin } = useLogin();
  const [racingSelected, setRacingSelected] = useState<{
    [racingType: string]: boolean;
  } | null>(null);
//   const renderFirst = useRef(true);
  const tokenstorage = AsyncKeyStore.getInstance();
  const setRacingType = useCallback(
    (racingType: string | { [racingType: string]: boolean }) => {
      console.log("press change", typeof racingType, racingSelected);
      if (
        typeof racingType === "string" &&
        racingSelected !== null &&
        racingSelected[racingType] &&
        Object.values(racingSelected).filter((v) => v).length == 1
      ) {
        return;
      }
      if (typeof racingType === "string")
        setRacingSelected((prev) => ({
          ...prev,
          [racingType]: !prev![racingType],
        }));
      else
        setRacingSelected((prev) => ({
          ...prev,
          ...racingType,
        }));
    },
    [racingSelected, setRacingSelected]
  );

  useEffect(() => {
    const readRacing = async () => {
      const racingTypes = await tokenstorage.get("racingtypes");
      console.log("racingTypes", racingTypes);
      const newracing = {};

      racingTypes
        ? (JSON.parse(racingTypes) as string[]).forEach((racing) =>
            Object.assign(newracing, { [racing as string]: true })
          )
        : null;
      setRacingSelected((prev) => {
        return racingTypes === undefined ? null : { ...prev, ...newracing };
      });
    };
    // if (renderFirst.current || isLoggedin) {
    readRacing();
    //   renderFirst.current = false;
    // }
  }, [isLoggedin]);
  useEffect(() => {
    console.log("racingSelected", racingSelected);
    const readRacing = async () => {
      if (racingSelected !== null) {
        const selectedRaces = Object.keys(racingSelected).filter(
          (key) => racingSelected[key]
        );
        const result = await tokenstorage.add(
          "racingtypes",
          JSON.stringify(selectedRaces)
        );
      }
    };
    readRacing();
  }, [racingSelected]);

  const value = useMemo(
    () => ({ racingSelected, setRacingSelected: setRacingType }),
    [racingSelected, setRacingType]
  );

  return (
    <RacingSelectedContext.Provider value={value}>
      {children}
    </RacingSelectedContext.Provider>
  );
};

export const useRacingSelected = () => useSafeContext(RacingSelectedContext);
