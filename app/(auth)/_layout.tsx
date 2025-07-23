import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, headerTransparent: false }}>
      <Stack.Screen name="login" options={{ animation: "none" }} />
      <Stack.Screen name="signup" />
    </Stack>
  );
}
