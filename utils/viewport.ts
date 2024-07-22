import { Dimensions } from "react-native";

export enum Breakpoint {
  XL = 411,
  L = 390,
  M = 360,
  S = 320,
}

const getViewportWidth = () => Dimensions.get("window").width;
const getBreakpoint = (): Breakpoint => {
  const width = getViewportWidth();

  if (width >= Breakpoint.XL) {
    return Breakpoint.XL;
  } else if (width >= Breakpoint.L) {
    return Breakpoint.L;
  } else if (width >= Breakpoint.M) {
    return Breakpoint.M;
  } else {
    return Breakpoint.S;
  }
};

const isBreakpoint =
  (breakpoint: Breakpoint) =>
  (breakpointToCheck = getBreakpoint()) =>
    breakpointToCheck === breakpoint;

const isBreakpointUp =
  (breakpoint: Breakpoint) =>
  (breakpointToCheck = getBreakpoint()) =>
    breakpointToCheck >= breakpoint;

export const Viewport = {
  isXLUp: isBreakpoint(Breakpoint.XL),
  isLarge: isBreakpoint(Breakpoint.L),
  isLargeUp: isBreakpointUp(Breakpoint.L),
  isMedium: isBreakpoint(Breakpoint.M),
  isSmall: isBreakpoint(Breakpoint.S),
  isMediumUp: isBreakpointUp(Breakpoint.M),
  getBreakpoint,
};
