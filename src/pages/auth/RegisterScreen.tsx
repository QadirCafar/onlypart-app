import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { registerApi } from "../../features/auth/api";
import { styles } from "./RegisterScreen.styles";

export default function RegisterScreen() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  async function submit() {
    const normalizedFullName = fullName.trim();
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedFullName) {
      Alert.alert("Xəta", "Ad və soyad boş ola bilməz");
      return;
    }

    if (!normalizedEmail) {
      Alert.alert("Xəta", "Email boş ola bilməz");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Xəta", "Şifrə ən azı 6 simvol olmalıdır");
      return;
    }

    if (password !== repeatPassword) {
      Alert.alert("Xəta", "Şifrələr eyni deyil");
      return;
    }

    try {
      setLoading(true);
      setSuccessMessage("");

      const result = await registerApi({
        fullName: normalizedFullName,
        email: normalizedEmail,
        phone: phone.trim() || null,
        address: address.trim() || null,
        description: description.trim() || null,
        password,
      });

      setSuccessMessage(
        `${result.fullName} üçün qeydiyyat yaradıldı. Hesab admin tərəfindən təsdiqləndikdən sonra sistemə daxil ola biləcəksiniz.`
      );

      setFullName("");
      setEmail("");
      setPhone("");
      setAddress("");
      setDescription("");
      setPassword("");
      setRepeatPassword("");
    } catch (error: any) {
      Alert.alert(
        "Qeydiyyat alınmadı",
        error?.response?.data?.message ||
          error?.response?.data?.title ||
          "Məlumatları yoxlayıb yenidən cəhd edin"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.page}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.title}>Qeydiyyatdan keç</Text>
            <Text style={styles.subtitle}>
              OnlyPart hesabı yaradın. Hesabınız admin tərəfindən
              təsdiqləndikdən sonra sistemə daxil ola biləcəksiniz.
            </Text>
          </View>

          {successMessage ? (
            <View style={styles.successBox}>
              <Text style={styles.successText}>{successMessage}</Text>
            </View>
          ) : null}

          <View style={styles.form}>
            <View style={styles.field}>
              <Text style={styles.label}>Ad və soyad</Text>
              <TextInput
                style={styles.input}
                placeholder="Məsələn: Vüqar Novruzov"
                value={fullName}
                onChangeText={setFullName}
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="email@example.com"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Telefon</Text>
              <TextInput
                style={styles.input}
                placeholder="0501234567"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Ünvan</Text>
              <TextInput
                style={styles.input}
                placeholder="Şəhər, rayon, küçə"
                value={address}
                onChangeText={setAddress}
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Qeyd</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Əlavə məlumat yaza bilərsiniz"
                value={description}
                onChangeText={setDescription}
                multiline
                textAlignVertical="top"
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Şifrə</Text>
              <TextInput
                style={styles.input}
                placeholder="Ən azı 6 simvol"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Şifrəni təkrar yazın</Text>
              <TextInput
                style={styles.input}
                placeholder="Şifrəni təkrar yazın"
                value={repeatPassword}
                onChangeText={setRepeatPassword}
                secureTextEntry
              />
            </View>

            <Pressable
              style={[styles.submitButton, loading && styles.submitButtonDisabled]}
              onPress={submit}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <Text style={styles.submitButtonText}>Qeydiyyatdan keç</Text>
              )}
            </Pressable>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Artıq hesabınız var?</Text>
            <Pressable onPress={() => router.push("/login")}>
              <Text style={styles.footerLink}>Daxil ol</Text>
            </Pressable>
          </View>

          <Pressable onPress={() => router.push("/")}>
            <Text style={styles.homeLink}>Məhsullara qayıt</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}