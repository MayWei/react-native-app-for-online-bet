import { View, StyleSheet } from "react-native";
import { Body } from "./Fonts/Body";
import { useLocalStorage } from "usehooks-ts";
import { Button } from "./Button/Button";
import { login } from "@/service/login";
import { jwtDecode } from "jwt-decode";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";
import { Viewport } from "@/utils/viewport";
import { logout } from "@/service/logout";

interface HeaderProps {
  isLoggedin: boolean;
}
const horizontalMargin = (insets: EdgeInsets) => {
  const standardSpacing = Viewport.isXLUp() ? 16 : 12;

  return {
    marginLeft: standardSpacing + insets.left,
    marginRight: standardSpacing + insets.right,
  };
};
export const Header: React.FC<HeaderProps> = (props) => {
  const { isLoggedin } = props;
  const [name, setName] = useLocalStorage("unsername", undefined);
  const [token, setToken] = useLocalStorage("token", undefined);
  const insets = useSafeAreaInsets();
  const Login = async () => {
    try {
      const token = await login();

      setToken(token);
      const name = (jwtDecode(token) as any).name;
      console.log("token", token, name);
      setName(name ?? "");
    } catch {}
  };

  const Logout = async () => {
    logout();
    setName(undefined);
    setToken(undefined);
  };

  return (
    <View style={[styles.container, horizontalMargin(insets)]}>
      {isLoggedin ? (
        <>
          <Body.B3 semiBold style={[styles.personalisation]}>
            {name ?? ""}
          </Body.B3>
          <Button label="Logout" onPress={Logout} />
        </>
      ) : (
        <Button label="Login" onPress={Login} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  personalisation: {
    marginBottom: 8,
  },
});
