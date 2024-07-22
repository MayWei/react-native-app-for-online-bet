import { useEffect, useState } from "react";
import { Breakpoint, Viewport } from "@/utils/viewport";
import { Dimensions } from "react-native";

const useViewport = () => {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>(
    Viewport.getBreakpoint()
  );

  const handleDimensionChange = () => {
    setBreakpoint(Viewport.getBreakpoint());
  };

  useEffect(() => {
    const unsubscribe = Dimensions.addEventListener(
      "change",
      handleDimensionChange
    );

    return () => {
      unsubscribe.remove();
    };
  }, []);

  return {
    breakpoint,
  };
};

export default useViewport;
