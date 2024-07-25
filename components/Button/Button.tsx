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
  selected?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const Button = (props: ButtonProps): ReactElement => {
  return (
    <View style={[styles.container]}>
      <TouchableOpacity
        onPress={props.onPress}
        style={[styles.button, props.style]}
      >
        <Body.B3 semiBold style={{ color: props.selected ? "#000" : "#fff" }}>
          {props.label}
        </Body.B3>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "auto",
    paddingHorizontal: 2,
    // width:"100%" login ui need this
  },
  button: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 8,
    backgroundColor: "black",
  },
});
