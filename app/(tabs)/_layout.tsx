import { Stack } from "expo-router";

export default function CustomerAreaLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="products" />
      <Stack.Screen name="cart" />
      <Stack.Screen name="orders" />
      <Stack.Screen name="profile" />
      <Stack.Screen name="mechanics" />
    </Stack>
  );
}