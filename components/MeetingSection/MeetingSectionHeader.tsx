import { StyleSheet, View, Text } from "react-native";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

interface Props {
  onPress: () => void;
}
export const MeetingSectionHeader = (props: Props) => {
  const { onPress } = props;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.touch}
        onPress={() => {
          onPress();
        }}
      >
        <Icon
          name="angle-left"
          size={36}
          color="#60f483"
          style={{ marginRight: 20 }}
        />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    borderColor: "#000",
    backgroundColor: "#403c3c",
    padding: 12,
    minHeight: 48,
  },
  touch: {
    textAlign: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
});
