import { router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { authStorage } from "../src/storage/authStorage";

export default function Index() {
  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    const token = await authStorage.getToken();

    if (token) {
      router.replace("/home");
    } else {
      router.replace("/login");
    }
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ActivityIndicator />
    </View>
  );
}