import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useMemo, useState } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { Header } from "@/components/Header";
import { LoginProvider } from "@/context/LoginProvider";
import { RacingSelectedProvider } from "@/context/RacingSelectedProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ModalProvider } from "@/context/ModalProvider";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <LoginProvider>
        <RacingSelectedProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <ModalProvider>
              <Header />
              <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="login" />
              </Stack>
            </ModalProvider>
          </GestureHandlerRootView>
        </RacingSelectedProvider>
      </LoginProvider>
    </ThemeProvider>
  );
}
