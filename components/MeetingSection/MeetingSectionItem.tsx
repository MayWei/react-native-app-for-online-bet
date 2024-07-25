import { StyleSheet, TouchableOpacity, View, Image } from "react-native";
import { Body } from "../Fonts/Body";
import { ClockCounter } from "../clock/ClockCounter";
import Icon from "react-native-vector-icons/FontAwesome";
interface Props {
  name: string;
  racingNumber: string;
  startTime: string;
}
export const MeetingSectionItem: React.FC<Props> = ({
  name,
  racingNumber,
  startTime,
}) => {
  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity style={styles.touchable}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              flexBasis: "50%",
            }}
          >
            <Body.B2 semiBold style={{ marginRight: 10 }}>
              {racingNumber}
            </Body.B2>
            <Body.B3 semiBold style={styles.name}>
              {name}
            </Body.B3>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <ClockCounter startTime={startTime}></ClockCounter>
            <Icon name="angle-right" size={24} color="#000" />
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    borderBottomColor: "#d9d9d9",
    borderBottomWidth: 2,
    padding: 12,
  },
  touchable: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  name: {
    marginLeft: 12,
  },
});
