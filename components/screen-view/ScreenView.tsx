import useViewport from "@/hooks/useViewport";
import { Breakpoint } from "@/utils/viewport";
import React, { PropsWithChildren } from "react";
import {
  ScrollView,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "react-native/Libraries/NewAppScreen";

export interface ScreenViewProps {
  style?: StyleProp<ViewStyle>;
  as?: typeof View | typeof ScrollView;
  [x: string]: unknown;
}

export const determineHorizontalPadding = (breakpoint: Breakpoint): number => {
  switch (breakpoint) {
    case Breakpoint.XL:
      return 6;
    case Breakpoint.L:
      return 5;
    default:
      return 4; // M and S have the same margin
  }
};

export const ScreenView = React.forwardRef<
  ScrollView,
  PropsWithChildren<ScreenViewProps>
>((props, ref) => {
  const { as: ViewType = View } = props;
  const { breakpoint } = useViewport();
  const insets = useSafeAreaInsets();
  const horizontalPadding = determineHorizontalPadding(breakpoint);

  return (
    <ViewType
      {...props}
      ref={ref}
      style={[
        styles.screenView,
        {
          paddingLeft: horizontalPadding + insets.left,
          paddingRight: horizontalPadding + insets.right,
          paddingBottom: insets.bottom + 50,
        },
        props.style,
      ]}
    >
      {props.children}
    </ViewType>
  );
});

const styles = StyleSheet.create({
  screenView: {
    backgroundColor: "#000",
  },
});
