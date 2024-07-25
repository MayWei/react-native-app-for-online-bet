import { Colors } from "@/constants/Colors";
import React from "react";
import { StyleSheet, Text, TextProps as RNTextProps } from "react-native";
import { Fonts } from "./Fonts";

export interface TextProps extends RNTextProps {
  children?: React.ReactNode;
  semiBold?: boolean;
  style?: Object;
}

const BodyText = (props: TextProps) => {
  return (
    <Text {...props} style={[styles.b, props.style]}>
      {props.children}
    </Text>
  );
};

const B1 = (props: TextProps) => {
  return (
    <BodyText
      {...props}
      style={[
        styles.b1,
        props.style,
        ...(props.semiBold ? [styles.sfProDisplaySemiBold] : []),
      ]}
    />
  );
};

const B2 = (props: TextProps) => {
  return (
    <BodyText
      {...props}
      style={[
        styles.b2,
        ...(props.semiBold ? [styles.sfProDisplaySemiBold] : []),
        props.style,
      ]}
    />
  );
};

const B3 = (props: TextProps) => {
  return (
    <BodyText
      {...props}
      style={[
        styles.b3,
        ...(props.semiBold ? [styles.sfProDisplaySemiBold] : []),
        props.style,
      ]}
    />
  );
};

const B4 = (props: TextProps) => {
  return (
    <BodyText
      {...props}
      style={[
        styles.b4,
        ...(props.semiBold ? [styles.sfProDisplaySemiBold] : []),
        props.style,
      ]}
    />
  );
};

export const Body = {
  B1,
  B2,
  B3,
  B4,
};

const styles = StyleSheet.create({
  b: {
    color: "#333333",
  },
  b1: {
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: 0.38,
  },
  b2: {
    fontSize: 18,
    lineHeight: 26,
    letterSpacing: -0.4,
  },
  b3: {
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: -0.32,
  },
  b4: {
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: -0.16,
  },
  sfProDisplaySemiBold: {
    fontFamily: Fonts.SFProDisplay.Semibold,
  },
  sfProSemiBold: {
    fontFamily: Fonts.SFPro.Semibold,
  },
});
