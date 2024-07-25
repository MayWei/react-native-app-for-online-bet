import { Button } from "@/components/Button/Button";
import TextInputImpl from "@/components/TextInput";
import { ScreenView } from "@/components/screen-view/ScreenView";
import { useLogin } from "@/context/LoginProvider";
import { AsyncKeyStore } from "@/service/TokenStorage";
import { login } from "@/service/login";
import { jwtDecode } from "jwt-decode";
import React, { useCallback, useState } from "react";
import { useRouter } from "expo-router";
import { useModal } from "@/context/ModalProvider";

/**
 * Login page
 * after successfully Login, writing token to asyncstorage and setIsLoggedin state to LoginContext
 * and push to home page
 */
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const { isLoggedin, setIsLoggedin } = useLogin();
  const tokenstorage = AsyncKeyStore.getInstance();
  const router = useRouter();
  const { openModal, closeModal } = useModal();

  const onLogin = useCallback(async () => {
    if (!username) {
      setNameErrorMessage("User name can not be empty!");
    }
    if (!password) {
      setPasswordErrorMessage("Password can not be empty!");
    }
    if (!username || !password) return;
    else {
      setNameErrorMessage("");
      setPasswordErrorMessage("");
      try {
        const token: { token: string } = await login();
        await tokenstorage.add("token", token.token);
        const name = (jwtDecode(token.token) as any).name;

        await tokenstorage.add("username", name);
        const b = await tokenstorage.get("token");
        console.log("token b", b);
        setIsLoggedin(true);
        router.push("/");
      } catch (error) {
        //ading Modal to show login error
        setIsLoggedin(false);
        openModal("Login failed, do you want to try again?", {
          button: <Button label="Yes" onPress={() => closeModal()}></Button>,
        });
      }
    }
  }, [username, password]);

  return (
    <ScreenView style={{ backgroundColor: "#fff" }}>
      <TextInputImpl
        value={username}
        setValue={setUsername}
        errorMessage={nameErrorMessage}
        type="emailAddress"
        setErrorMessage={setNameErrorMessage}
      />
      <TextInputImpl
        value={password}
        setValue={setPassword}
        errorMessage={passwordErrorMessage}
        setErrorMessage={setPasswordErrorMessage}
        type="password"
      />
      <Button
        onPress={() => {
          onLogin();
        }}
        label="Login"
        style={{ width: "100%" }}
      />
    </ScreenView>
  );
}
