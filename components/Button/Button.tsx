import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import React, { ReactElement } from "react";
import { Body } from "../Fonts/Body";

export interface ButtonProps {
  onPress?: () => void;
  label: string;
  style?: StyleProp<ViewStyle>;
}

export const Button = (props: ButtonProps): ReactElement => {
  return (
    <View style={[styles.container]}>
      <TouchableOpacity
        onPress={props.onPress}
        style={[styles.button, props.style]}
      >
        <Body.B3 semiBold style={[styles.label]}>
          {props.label}
        </Body.B3>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  button: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: "black",
  },
  label: {
    color: "white",
  },
});
