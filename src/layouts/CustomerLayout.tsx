import { router, usePathname } from "expo-router";
import React, { ReactNode, useMemo, useState } from "react";
import { Modal, Pressable, SafeAreaView, Text, View } from "react-native";
import { authStorage } from "../storage/authStorage";
import { styles } from "./CustomerLayout.styles";

type CustomerLayoutProps = {
  title: string;
  children: ReactNode;
};

type CustomerMenuItem = {
  label: string;
  icon: string;
  route: string;
};

const menuItems: CustomerMenuItem[] = [
  {
    label: "Ana səhifə",
    icon: "⌂",
    route: "/(tabs)",
  },
  {
    label: "Məhsullar",
    icon: "▦",
    route: "/(tabs)/products",
  },
  {
    label: "Səbət",
    icon: "🛒",
    route: "/(tabs)/cart",
  },
  {
    label: "Sifarişlər",
    icon: "📦",
    route: "/(tabs)/orders",
  },
  {
    label: "Profil",
    icon: "👤",
    route: "/(tabs)/profile",
  },
];

export default function CustomerLayout({ title, children }: CustomerLayoutProps) {
  const pathname = usePathname();
  const [menuVisible, setMenuVisible] = useState(false);

  const activeRoute = useMemo(() => {
    if (pathname.includes("/products")) return "/(tabs)/products";
    if (pathname.includes("/cart")) return "/(tabs)/cart";
    if (pathname.includes("/orders")) return "/(tabs)/orders";
    if (pathname.includes("/profile")) return "/(tabs)/profile";

    return "/(tabs)";
  }, [pathname]);

  function openMenu() {
    setMenuVisible(true);
  }

  function closeMenu() {
    setMenuVisible(false);
  }

  function goTo(route: string) {
    setMenuVisible(false);

    setTimeout(() => {
      router.push(route as any);
    }, 120);
  }

  async function logout() {
    setMenuVisible(false);
    await authStorage.clear();

    setTimeout(() => {
      router.replace("/login");
    }, 120);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.page}>
        <View style={styles.header}>
          <View style={styles.headerTextBox}>
            <Text style={styles.headerTitle}>{title}</Text>
            <Text style={styles.headerSubtitle}>OnlyPart müştəri paneli</Text>
          </View>
        </View>

        <View style={styles.content}>{children}</View>

        <Pressable style={styles.floatingMenuButton} onPress={openMenu}>
          <Text style={styles.floatingMenuText}>☰</Text>
        </Pressable>

        <Modal
          visible={menuVisible}
          transparent
          animationType="fade"
          onRequestClose={closeMenu}
        >
          <View style={styles.modalRoot}>
            <Pressable style={styles.backdrop} onPress={closeMenu} />

            <View style={styles.radialMenu}>
              <View style={styles.menuHeader}>
                <View>
                  <Text style={styles.menuBrand}>OnlyPart</Text>
                  <Text style={styles.menuSubtitle}>Müştəri paneli</Text>
                </View>

                <Pressable style={styles.closeButton} onPress={closeMenu}>
                  <Text style={styles.closeButtonText}>×</Text>
                </Pressable>
              </View>

              <View style={styles.orbitBox}>
                <View style={styles.centerLogo}>
                  <Text style={styles.centerLogoText}>OP</Text>
                </View>

                {menuItems.map((item, index) => {
                  const active = activeRoute === item.route;

                  return (
                    <Pressable
                      key={item.route}
                      style={[
                        styles.menuBubble,
                        getBubblePosition(index),
                        active && styles.menuBubbleActive,
                      ]}
                      onPress={() => goTo(item.route)}
                    >
                      <Text style={styles.menuBubbleIcon}>{item.icon}</Text>
                      <Text
                        style={[
                          styles.menuBubbleText,
                          active && styles.menuBubbleTextActive,
                        ]}
                      >
                        {item.label}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>

              <Pressable style={styles.logoutButton} onPress={logout}>
                <Text style={styles.logoutButtonText}>Çıxış</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

function getBubblePosition(index: number) {
  const positions = [
    styles.bubbleTop,
    styles.bubbleRight,
    styles.bubbleBottomRight,
    styles.bubbleBottomLeft,
    styles.bubbleLeft,
  ];

  return positions[index] || styles.bubbleTop;
}