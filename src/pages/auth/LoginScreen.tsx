import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { getMeApi, loginApi } from "../../features/auth/api";
import { authStorage } from "../../storage/authStorage";
import { styles } from "./LoginScreen.styles";

export default function LoginScreen() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("test@atp.com");
  const [password, setPassword] = useState("123asdZXC!@#");

  async function login() {
    const normalizedEmail = email.trim();

    if (!normalizedEmail || !password.trim()) {
      Alert.alert("Xəta", "Email və şifrə boş ola bilməz");
      return;
    }

    try {
      setLoading(true);

      const loginResponse = await loginApi({
        email: normalizedEmail,
        password,
      });

      const token = loginResponse.token;

      if (!token) {
        Alert.alert("Xəta", "Backend token qaytarmadı");
        return;
      }

      await authStorage.setToken(token);

      const me = await getMeApi();
await authStorage.setUser({
  userId: me.userId,
  id: me.id,
  email: me.email ?? normalizedEmail,
  fullName: me.fullName ?? "",
  roles: me.roles ?? [],
});

      router.replace("/home");
    } catch (error: any) {
      Alert.alert(
        "Login alınmadı",
        error?.response?.data?.message ||
          error?.response?.data?.title ||
          "Email və ya şifrə yanlışdır"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>OnlyPart Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Şifrə"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Pressable
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={login}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#ffffff" />
        ) : (
          <Text style={styles.buttonText}>Daxil ol</Text>
        )}
      </Pressable>
    </View>
  );
}