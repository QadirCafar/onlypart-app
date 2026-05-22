import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { api } from "../src/api/api";
import { authStorage } from "../src/storage/authStorage";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function login() {
    if (!username.trim() || !password.trim()) {
      Alert.alert("Xəta", "Login və şifrə boş ola bilməz");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/Auth/login", {
        email: username.trim(),
        password: password,
      });

      const token = response.data?.token;

      if (!token) {
        Alert.alert("Xəta", "Backend token qaytarmadı");
        return;
      }

     await authStorage.setToken(token);

const meResponse = await api.get("/Auth/me");

//console.log("ME RESPONSE:", meResponse.data);

await authStorage.setUser({
  userId: meResponse.data.userId,
  id: meResponse.data.id,
  email: meResponse.data.email,
  fullName: meResponse.data.fullName,
  roles: meResponse.data.roles ?? [],
});

router.replace("/home");
    } catch (error: any) {
         // console.log("LOGIN ERROR:", error?.response?.data || error.message);

          Alert.alert(
            "Login alınmadı",
            error?.response?.data?.message || "Email və ya şifrə yanlışdır"
          );
        }finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Autopart Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Login"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Şifrə"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Pressable style={styles.button} onPress={login} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Daxil ol</Text>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 32,
  },
  input: {
    height: 52,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 12,
    paddingHorizontal: 14,
    marginBottom: 14,
    fontSize: 16,
  },
  button: {
    height: 52,
    borderRadius: 12,
    backgroundColor: "#111827",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});