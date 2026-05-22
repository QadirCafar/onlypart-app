import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import { authStorage, AuthUser } from "../src/storage/authStorage";

export default function Home() {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

 async function checkAuth() {
  const token = await authStorage.getToken();

  console.log("HOME TOKEN:", token);

  if (!token) {
    router.replace("/login");
    return;
  }

  const storedUser = await authStorage.getUser();

  //console.log("HOME STORED USER:", storedUser);

  setUser(storedUser);
}

  async function logout() {
    await authStorage.clear();
    router.replace("/login");
  }

  return (
    <View style={{ flex: 1, padding: 24, justifyContent: "center" }}>
      <Text style={{ fontSize: 26, fontWeight: "700" }}>
        Home
      </Text>

      <Text style={{ marginTop: 16 }}>
        Full name: {user?.fullName}
      </Text>

      <Text>Email: {user?.email}</Text>

      <Text>Roles: {user?.roles?.join(", ")}</Text>
      <Button title="Mechanics" onPress={() => router.push("/mechanics" as any)} />
      <View style={{ marginTop: 24 }}>
        <Button title="Logout" onPress={logout} />
      </View>
    </View>
  );
}