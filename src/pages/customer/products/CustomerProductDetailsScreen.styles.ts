import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#f4f7fb",
  },

  pageContent: {
    padding: 14,
    paddingBottom: 34,
  },



  card: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 20,
    padding: 14,
    shadowColor: "#0f172a",
    shadowOpacity: 0.08,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },

  gallery: {
    width: "100%",
  },

  mainImageBox: {
    height: 285,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 18,
    backgroundColor: "#f8fafc",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },

  mainImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },

  noImageText: {
    color: "#94a3b8",
    fontSize: 13,
    fontWeight: "800",
  },

  conditionBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    minWidth: 76,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  conditionBadgeNew: {
    backgroundColor: "#dcfce7",
    borderColor: "#86efac",
  },

  conditionBadgeUsed: {
    backgroundColor: "#dbeafe",
    borderColor: "#93c5fd",
  },

  conditionBadgeText: {
    fontSize: 12,
    fontWeight: "900",
  },

  conditionBadgeTextNew: {
    color: "#166534",
  },

  conditionBadgeTextUsed: {
    color: "#1d4ed8",
  },

  thumbsRow: {
    gap: 10,
    paddingTop: 12,
    paddingBottom: 2,
  },

  thumb: {
    width: 76,
    height: 64,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "transparent",
    backgroundColor: "#ffffff",
    overflow: "hidden",
  },

  thumbActive: {
    borderColor: "#2563eb",
  },

  thumbImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  content: {
    marginTop: 18,
    gap: 18,
  },

  productName: {
    color: "#111827",
    fontSize: 23,
    fontWeight: "900",
    lineHeight: 30,
  },

  description: {
    marginTop: 8,
    color: "#6b7280",
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 21,
  },

  infoGrid: {
    gap: 10,
  },

  infoBox: {
    minHeight: 72,
    backgroundColor: "#f9fafb",
    borderRadius: 14,
    padding: 13,
  },

  infoLabel: {
    color: "#9ca3af",
    fontSize: 12,
    fontWeight: "800",
    marginBottom: 7,
  },

  infoValue: {
    color: "#111827",
    fontSize: 14,
    fontWeight: "900",
    lineHeight: 20,
  },

  buyBox: {
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    paddingTop: 18,
    gap: 16,
  },

  priceBox: {
    width: "100%",
  },

  priceLabel: {
    color: "#9ca3af",
    fontSize: 13,
    fontWeight: "800",
    marginBottom: 5,
  },

  price: {
    color: "#111827",
    fontSize: 26,
    fontWeight: "900",
  },

  stockWarning: {
    marginTop: 8,
    color: "#dc2626",
    fontSize: 14,
    fontWeight: "900",
  },

  actions: {
    width: "100%",
    gap: 10,
  },

  quantityControl: {
    height: 44,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    backgroundColor: "#f9fafb",
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
  },

  quantityButton: {
    width: 48,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  quantityButtonText: {
    color: "#111827",
    fontSize: 23,
    fontWeight: "900",
  },

  quantityButtonTextDisabled: {
    color: "#cbd5e1",
  },

  quantityText: {
    flex: 1,
    textAlign: "center",
    color: "#111827",
    fontSize: 16,
    fontWeight: "900",
  },

  addButton: {
    height: 46,
    borderRadius: 12,
    backgroundColor: "#111827",
    alignItems: "center",
    justifyContent: "center",
  },

  addButtonDisabled: {
    backgroundColor: "#9ca3af",
  },

  addButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "900",
  },

  center: {
    flex: 1,
    backgroundColor: "#f4f7fb",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },

  loadingText: {
    marginTop: 12,
    color: "#64748b",
    fontSize: 15,
    fontWeight: "700",
  },

  emptyTitle: {
    color: "#111827",
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 14,
  },
});