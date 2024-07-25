import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Body } from "../Fonts/Body";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface SectionHeaderProps {
  title: string;
}

export const ListSectionHeader = (props: SectionHeaderProps) => {
  const { title } = props;

  return (
    <View style={styles.container}>
      <Icon
        name="horse-variant-fast"
        size={36}
        color="#fff"
        style={{ marginRight: 20 }}
      />
      <Body.B2 semiBold style={{ color: "#fff" }}>
        {title}
      </Body.B2>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: "#000",
    padding: 12,
    backgroundColor: "#403c3c",
    textAlign: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
});
