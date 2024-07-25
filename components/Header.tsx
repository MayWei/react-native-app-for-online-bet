import { View, StyleSheet } from "react-native";
import { Body } from "./Fonts/Body";
import { useLocalStorage } from "usehooks-ts";
import { Button } from "./Button/Button";
import { login } from "@/service/login";
import { jwtDecode } from "jwt-decode";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";
import { Viewport } from "@/utils/viewport";
import { logout } from "@/service/logout";
import { AsyncKeyStore } from "@/service/TokenStorage";
import { useEffect, useState } from "react";
import { useLogin } from "@/context/LoginProvider";
import { usePathname, useRouter } from "expo-router";

interface HeaderProps {}
const horizontalMargin = (insets: EdgeInsets) => {
  const standardSpacing = Viewport.isXLUp() ? 16 : 12;

  return {
    marginLeft: standardSpacing + insets.left,
    marginRight: standardSpacing + insets.right,
  };
};
export const Header: React.FC<HeaderProps> = (props) => {
  const { isLoggedin, setIsLoggedin } = useLogin();
  const tokenstorage = AsyncKeyStore.getInstance();
  const [name, setName] = useState("");
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const pathname = usePathname();

  const Login = async () => {
    router.push("/login");
  };

  const Logout = async () => {
    logout();
    await tokenstorage.clear();
    setIsLoggedin(false);
  };

  useEffect(() => {
    const getName = async () => {
      const name = await tokenstorage.get("username");
      setName(name ?? "");
    };
    if (isLoggedin) {
      getName();
    }
  }, [isLoggedin]);

  return (
    <View
      style={[
        styles.container,
        horizontalMargin(insets),
        { marginTop: insets.top + 16 },
      ]}
    >
      {isLoggedin ? (
        <View style={styles.logincontainer}>
          <Body.B3 semiBold style={styles.personalisation}>
            {!!name ? name : ""}
          </Body.B3>
          <Button label="Logout" onPress={Logout} style={styles.login} />
        </View>
      ) : pathname !== "/login" ? (
        <Button label="Login" onPress={Login} style={styles.logout} />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-end",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  logincontainer: {
    width: "20%",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignSelf: "flex-end",
  },
  personalisation: {
    marginRight: "10%",
    alignSelf: "center",
  },
  login: {
    paddingVertical: 6,
  },
  logout: {
    paddingVertical: 6,
    justifyContent: "flex-end",
    alignSelf: "flex-end",
  },
});
