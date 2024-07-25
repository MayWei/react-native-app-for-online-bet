import { StyleSheet, TouchableOpacity, View, Image } from "react-native";
import { Body } from "../Fonts/Body";
import { ClockCounter } from "../clock/Clock";
import Icon from "react-native-vector-icons/FontAwesome";
interface Props {
  onPress: () => void;
  imguri: string;
  name: string;
  racingNumber: string;
  startTime: string;
}
export const ListSectionItem: React.FC<Props> = ({
  onPress,
  imguri,
  name,
  racingNumber,
  startTime,
}) => {
  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity style={styles.touchable} onPress={onPress}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              source={{
                uri: imguri,
              }}
              style={styles.avatar}
            />
            <Body.B2 semiBold style={styles.name}>
              {name}
            </Body.B2>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Body.B3 semiBold style={{ marginRight: 10 }}>
              {racingNumber}
            </Body.B3>
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
