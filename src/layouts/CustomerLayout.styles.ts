import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f3f6fb",
  },

  page: {
    flex: 1,
    backgroundColor: "#f3f6fb",
  },

  header: {
    height: 72,
    paddingHorizontal: 22,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    flexDirection: "row",
    alignItems: "center",
  },

  headerTextBox: {
    flex: 1,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: "#0f172a",
  },

  headerSubtitle: {
    fontSize: 12,
    color: "#475569",
    marginTop: 2,
  },

  content: {
    flex: 1,
  },

  floatingMenuButton: {
    position: "absolute",
    right: 22,
    bottom: 28,
    width: 66,
    height: 66,
    borderRadius: 33,
    backgroundColor: "#2563eb",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#2563eb",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 12,
  },

  floatingMenuText: {
    color: "#ffffff",
    fontSize: 30,
    fontWeight: "900",
  },

  modalRoot: {
    flex: 1,
    backgroundColor: "rgba(2, 6, 23, 0.72)",
    alignItems: "center",
    justifyContent: "center",
  },

  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },

  radialMenu: {
    width: 340,
    minHeight: 560,
    borderRadius: 36,
    backgroundColor: "rgba(15, 23, 42, 0.97)",
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 16,
    },
    shadowOpacity: 0.4,
    shadowRadius: 26,
    elevation: 18,
  },

  menuHeader: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 22,
  },

  menuBrand: {
    color: "#ffffff",
    fontSize: 26,
    fontWeight: "900",
  },

  menuSubtitle: {
    color: "#94a3b8",
    fontSize: 13,
    marginTop: 4,
  },

  closeButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "rgba(255,255,255,0.12)",
    alignItems: "center",
    justifyContent: "center",
  },

  closeButtonText: {
    color: "#ffffff",
    fontSize: 34,
    lineHeight: 38,
    fontWeight: "300",
  },

  orbitBox: {
    width: 292,
    height: 330,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  centerLogo: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: "#2563eb",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 7,
    borderColor: "rgba(96, 165, 250, 0.3)",
    shadowColor: "#2563eb",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.35,
    shadowRadius: 18,
    elevation: 12,
  },

  centerLogoText: {
    color: "#ffffff",
    fontSize: 28,
    fontWeight: "900",
  },

  menuBubble: {
    position: "absolute",
    width: 98,
    height: 98,
    borderRadius: 49,
    backgroundColor: "rgba(30, 41, 59, 0.94)",
    borderWidth: 2,
    borderColor: "rgba(148, 163, 184, 0.28)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 6,
  },

  menuBubbleActive: {
    backgroundColor: "#2563eb",
    borderColor: "#60a5fa",
  },

  menuBubbleIcon: {
    fontSize: 24,
    marginBottom: 5,
  },

  menuBubbleText: {
    color: "#e5e7eb",
    fontSize: 12,
    fontWeight: "800",
    textAlign: "center",
  },

  menuBubbleTextActive: {
    color: "#ffffff",
  },

  bubbleTop: {
    top: 0,
    left: 97,
  },

  bubbleRight: {
    top: 90,
    right: 0,
  },

  bubbleBottomRight: {
    bottom: 0,
    right: 46,
  },

  bubbleBottomLeft: {
    bottom: 0,
    left: 46,
  },

  bubbleLeft: {
    top: 90,
    left: 0,
  },

  logoutButton: {
    width: "100%",
    height: 54,
    borderRadius: 18,
    backgroundColor: "#fee2e2",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 26,
  },

  logoutButtonText: {
    color: "#991b1b",
    fontSize: 16,
    fontWeight: "900",
  },
});