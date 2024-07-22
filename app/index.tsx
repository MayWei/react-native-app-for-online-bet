import { Button } from "@/components/Button/Button";
import TextInputImpl from "@/components/TextInput";
import { ScreenView } from "@/components/screen-view/ScreenView";
import React, { useCallback, useState } from "react";

export default function Homescreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const onLogin = useCallback(() => {
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
    }
  }, [username, password]);

  return (
    <ScreenView>
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
      />
    </ScreenView>
  );
}
