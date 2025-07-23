import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "../global.css";

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Mogra: require("@/assets/fonts/Mogra/Mogra-Regular.ttf"),
    Lato: require("@/assets/fonts/Lato/Lato-Regular.ttf"),
    "Lato-Italic": require("@/assets/fonts/Lato/Lato-Italic.ttf"),
    "Lato-Bold": require("@/assets/fonts/Lato/Lato-Bold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  return <Stack screenOptions={{ headerShown: false }} />;
}
