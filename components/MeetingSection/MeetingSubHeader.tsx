import { StyleSheet, View } from "react-native";
import { Body } from "../Fonts/Body";
interface Props {
  distance: number;
  track: string;
  condition: string;
}
export const MeetingSubHeader: React.FC<Props> = ({
  distance,
  track,
  condition,
}) => {
  return (
    <View style={styles.container}>
      <Body.B3 semiBold style={{ marginRight: 10 }}>
        {`Distance:${distance}m  | Track:${track.toLowerCase()}  | Condition:${condition.toLowerCase()}`}
      </Body.B3>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f2f2f2",
    borderBottomColor: "#d9d9d9",
    borderBottomWidth: 2,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
