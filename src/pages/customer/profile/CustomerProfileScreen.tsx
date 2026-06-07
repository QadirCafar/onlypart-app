import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import {
  changeCustomerPassword,
  deleteCustomerAccount,
  getCustomerProfile,
  updateCustomerProfile,
} from "../../../features/customerProfile/api";
import type { CustomerProfile } from "../../../features/customerProfile/types";
import CustomerLayout from "../../../layouts/CustomerLayout";
import { styles } from "./CustomerProfileScreen.styles";

function formatDate(value?: string | null) {
  if (!value) return "-";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "-";

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}-${month}-${year} ${hours}:${minutes}`;
}

function getStatusText(status?: string | null) {
  const value = status?.toLowerCase();

  if (value === "active") return "Aktiv";
  if (value === "passive") return "Passiv";
  if (value === "deleted") return "Silinib";

  return status || "-";
}

function isActiveStatus(status?: string | null) {
  return status?.toLowerCase() === "active";
}

export default function CustomerProfileScreen() {
  const router = useRouter();

  const [profile, setProfile] = useState<CustomerProfile | null>(null);

  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      setLoading(true);

      const data = await getCustomerProfile();

      setProfile(data);
      setFullName(data.fullName || "");
      setPhoneNumber(data.phoneNumber || "");
      setDescription(data.description || "");
    } catch {
      Alert.alert("Xəta", "Profil məlumatları yüklənmədi");
    } finally {
      setLoading(false);
    }
  }

  async function handleSaveProfile() {
    const trimmedName = fullName.trim();

    if (!trimmedName) {
      Alert.alert("Xəta", "Ad boş ola bilməz");
      return;
    }

    try {
      setSaveLoading(true);

      await updateCustomerProfile({
        fullName: trimmedName,
        phoneNumber: phoneNumber.trim() || null,
        description: description.trim() || null,
      });

      setProfile((prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          fullName: trimmedName,
          phoneNumber: phoneNumber.trim() || null,
          description: description.trim() || null,
        };
      });

      Alert.alert("Uğurlu", "Profil məlumatları yadda saxlanıldı");
    } catch (error: any) {
      Alert.alert(
        "Xəta",
        error?.response?.data?.message ||
          error?.response?.data?.title ||
          "Profil məlumatları yenilənmədi"
      );
    } finally {
      setSaveLoading(false);
    }
  }

  function openPasswordModal() {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
    setPasswordModalVisible(true);
  }

  function closePasswordModal() {
    if (passwordLoading) return;

    setPasswordModalVisible(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
  }

  async function handleChangePassword() {
    if (!currentPassword.trim()) {
      Alert.alert("Xəta", "Hazırkı şifrə boş ola bilməz");
      return;
    }

    if (!newPassword.trim()) {
      Alert.alert("Xəta", "Yeni şifrə boş ola bilməz");
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert("Xəta", "Yeni şifrə ən azı 6 simvol olmalıdır");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      Alert.alert("Xəta", "Yeni şifrə və təkrar şifrə eyni deyil");
      return;
    }

    try {
      setPasswordLoading(true);

      await changeCustomerPassword({
        currentPassword,
        newPassword,
        confirmNewPassword,
      });

      closePasswordModal();
      Alert.alert("Uğurlu", "Şifrə dəyişdirildi");
    } catch (error: any) {
      Alert.alert(
        "Xəta",
        error?.response?.data?.message ||
          error?.response?.data?.title ||
          "Şifrə dəyişdirilmədi"
      );
    } finally {
      setPasswordLoading(false);
    }
  }

  function confirmDeleteAccount() {
    Alert.alert(
      "Hesab silinsin?",
      "Hesab silindikdən sonra bu hesab ilə sistemə daxil ola bilməyəcəksiniz.",
      [
        {
          text: "İmtina",
          style: "cancel",
        },
        {
          text: "Sil",
          style: "destructive",
          onPress: handleDeleteAccount,
        },
      ]
    );
  }

  async function handleDeleteAccount() {
    try {
      setDeleteLoading(true);

      await deleteCustomerAccount();

      await AsyncStorage.multiRemove(["token", "user", "email", "roles"]);

      router.replace("/login");

      Alert.alert("Məlumat", "Hesab silindi");
    } catch (error: any) {
      Alert.alert(
        "Xəta",
        error?.response?.data?.message ||
          error?.response?.data?.title ||
          "Hesab silinmədi"
      );
    } finally {
      setDeleteLoading(false);
    }
  }

  if (loading) {
    return (
      <CustomerLayout title="Profil">
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#2563eb" />
          <Text style={styles.loadingText}>Profil yüklənir...</Text>
        </View>
      </CustomerLayout>
    );
  }

  if (!profile) {
    return (
      <CustomerLayout title="Profil">
        <View style={styles.center}>
          <Text style={styles.emptyTitle}>Profil tapılmadı</Text>

          <Pressable style={styles.retryButton} onPress={loadProfile}>
            <Text style={styles.retryButtonText}>Yenidən yoxla</Text>
          </Pressable>
        </View>
      </CustomerLayout>
    );
  }

  return (
    <CustomerLayout title="Profil">
      <ScrollView
        style={styles.page}
        contentContainerStyle={styles.pageContent}
        showsVerticalScrollIndicator={false}
      >

        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {(profile.fullName || profile.email || "U")
                .trim()
                .charAt(0)
                .toUpperCase()}
            </Text>
          </View>

          <View style={styles.profileMainInfo}>
            <Text style={styles.profileName} numberOfLines={1}>
              {profile.fullName || "-"}
            </Text>

            <Text style={styles.profileEmail} numberOfLines={1}>
              {profile.email || "-"}
            </Text>
          </View>

          <View
            style={[
              styles.statusBadge,
              isActiveStatus(profile.status)
                ? styles.statusActive
                : styles.statusPassive,
            ]}
          >
            <Text
              style={[
                styles.statusBadgeText,
                isActiveStatus(profile.status)
                  ? styles.statusActiveText
                  : styles.statusPassiveText,
              ]}
            >
              {getStatusText(profile.status)}
            </Text>
          </View>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.cardTitle}>Hesab məlumatları</Text>

          <View style={styles.readonlyGrid}>
            <View style={styles.readonlyBox}>
              <Text style={styles.readonlyLabel}>E-mail</Text>
              <Text style={styles.readonlyValue}>{profile.email || "-"}</Text>
            </View>

            <View style={styles.readonlyBox}>
              <Text style={styles.readonlyLabel}>Yaranma tarixi</Text>
              <Text style={styles.readonlyValue}>
                {formatDate(profile.createdAt)}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.formCard}>
          <Text style={styles.cardTitle}>Məlumatlarımı dəyiş</Text>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Ad</Text>
            <TextInput
              style={styles.input}
              value={fullName}
              onChangeText={setFullName}
              placeholder="Adınızı daxil edin"
              placeholderTextColor="#94a3b8"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Telefon nömrəsi</Text>
            <TextInput
              style={styles.input}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              placeholder="Telefon nömrəsi"
              placeholderTextColor="#94a3b8"
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Qeyd</Text>
            <TextInput
              style={styles.textArea}
              value={description}
              onChangeText={setDescription}
              placeholder="Qeyd əlavə edin"
              placeholderTextColor="#94a3b8"
              multiline
              textAlignVertical="top"
            />
          </View>

          <Pressable
            style={[styles.saveButton, saveLoading && styles.disabledButton]}
            onPress={handleSaveProfile}
            disabled={saveLoading}
          >
            {saveLoading ? (
              <ActivityIndicator color="#ffffff" size="small" />
            ) : (
              <Text style={styles.saveButtonText}>Yadda saxla</Text>
            )}
          </Pressable>
        </View>

        <View style={styles.securityCard}>
          <View style={styles.securityTextBox}>
            <Text style={styles.cardTitle}>Təhlükəsizlik</Text>
            <Text style={styles.securityText}>Hesab şifrəsini dəyiş.</Text>
          </View>

          <Pressable
            style={styles.passwordButton}
            onPress={openPasswordModal}
          >
            <Text style={styles.passwordButtonText}>Şifrəni dəyiş</Text>
          </Pressable>
        </View>

        <View style={styles.dangerCard}>
          <View style={styles.securityTextBox}>
            <Text style={styles.dangerTitle}>Hesabımı sil</Text>
            <Text style={styles.dangerText}>
              Hesab silindikdən sonra bu hesab ilə sistemə daxil ola bilməyəcəksiniz.
            </Text>
          </View>

          <Pressable
            style={[styles.deleteButton, deleteLoading && styles.disabledButton]}
            onPress={confirmDeleteAccount}
            disabled={deleteLoading}
          >
            {deleteLoading ? (
              <ActivityIndicator color="#ffffff" size="small" />
            ) : (
              <Text style={styles.deleteButtonText}>Sil</Text>
            )}
          </Pressable>
        </View>

        <Modal
          visible={passwordModalVisible}
          transparent
          animationType="fade"
          onRequestClose={closePasswordModal}
        >
          <View style={styles.modalBackdrop}>
            <View style={styles.modalCard}>
              <View style={styles.modalHeader}>
                <View style={styles.modalTitleBox}>
                  <Text style={styles.modalTitle}>Şifrəni dəyiş</Text>
                  <Text style={styles.modalSubtitle}>
                    Hesab təhlükəsizliyi üçün güclü şifrə seçin
                  </Text>
                </View>

                <Pressable
                  style={styles.modalClose}
                  onPress={closePasswordModal}
                  disabled={passwordLoading}
                >
                  <Text style={styles.modalCloseText}>×</Text>
                </Pressable>
              </View>

              <View style={styles.modalBody}>
                <View style={styles.formGroup}>
                  <Text style={styles.label}>Hazırkı şifrə</Text>
                  <TextInput
                    style={styles.input}
                    value={currentPassword}
                    onChangeText={setCurrentPassword}
                    placeholder="Hazırkı şifrə"
                    placeholderTextColor="#94a3b8"
                    secureTextEntry
                  />
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.label}>Yeni şifrə</Text>
                  <TextInput
                    style={styles.input}
                    value={newPassword}
                    onChangeText={setNewPassword}
                    placeholder="Yeni şifrə"
                    placeholderTextColor="#94a3b8"
                    secureTextEntry
                  />
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.label}>Yeni şifrəni təkrarla</Text>
                  <TextInput
                    style={styles.input}
                    value={confirmNewPassword}
                    onChangeText={setConfirmNewPassword}
                    placeholder="Yeni şifrəni təkrarla"
                    placeholderTextColor="#94a3b8"
                    secureTextEntry
                  />
                </View>
              </View>

              <View style={styles.modalFooter}>
                <Pressable
                  style={styles.cancelButton}
                  onPress={closePasswordModal}
                  disabled={passwordLoading}
                >
                  <Text style={styles.cancelButtonText}>Ləğv et</Text>
                </Pressable>

                <Pressable
                  style={[
                    styles.modalSaveButton,
                    passwordLoading && styles.disabledButton,
                  ]}
                  onPress={handleChangePassword}
                  disabled={passwordLoading}
                >
                  {passwordLoading ? (
                    <ActivityIndicator color="#ffffff" size="small" />
                  ) : (
                    <Text style={styles.modalSaveButtonText}>Yadda saxla</Text>
                  )}
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </CustomerLayout>
  );
}