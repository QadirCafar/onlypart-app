import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#f4f7fb",
    paddingHorizontal: 12,
    paddingTop: 12,
  },

  header: {
    marginBottom: 12,
  },

  title: {
    fontSize: 24,
    fontWeight: "900",
    color: "#0f172a",
  },

  subtitle: {
    marginTop: 3,
    fontSize: 13,
    color: "#64748b",
    fontWeight: "600",
  },

  searchInput: {
    height: 46,
    borderWidth: 1,
    borderColor: "#dbe3ef",
    borderRadius: 16,
    backgroundColor: "#ffffff",
    paddingHorizontal: 14,
    color: "#0f172a",
    fontSize: 15,
    marginBottom: 14,
  },

  listContent: {
    paddingBottom: 32,
  },

  productRow: {
    justifyContent: "space-between",
    marginBottom: 14,
  },

  productCard: {
    width: "48%",
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 10,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#0f172a",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },

  imageBox: {
    height: 132,
    borderRadius: 14,
    backgroundColor: "#f8fafc",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    marginBottom: 9,
  },

  productImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },

  noImageText: {
    color: "#94a3b8",
    fontSize: 12,
    fontWeight: "800",
  },

  imageCountBadge: {
    position: "absolute",
    right: 7,
    bottom: 7,
    width: 24,
    height: 24,
    borderRadius: 999,
    backgroundColor: "rgba(15, 23, 42, 0.78)",
    alignItems: "center",
    justifyContent: "center",
  },

  imageCountText: {
    color: "#ffffff",
    fontSize: 10,
    fontWeight: "900",
  },

  conditionBadge: {
    position: "absolute",
    left: 7,
    top: 7,
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
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
    fontSize: 10,
    fontWeight: "900",
  },

  conditionBadgeTextNew: {
    color: "#166534",
  },

  conditionBadgeTextUsed: {
    color: "#1d4ed8",
  },

  productName: {
    color: "#020617",
    fontSize: 14,
    fontWeight: "900",
    lineHeight: 18,
    minHeight: 36,
    marginBottom: 6,
  },

  metaText: {
    color: "#64748b",
    fontSize: 11,
    fontWeight: "700",
    marginBottom: 3,
  },

  stockPriceRow: {
    marginTop: 7,
    gap: 4,
  },

  stockText: {
    color: "#475569",
    fontSize: 12,
    fontWeight: "800",
  },

  price: {
    color: "#020617",
    fontSize: 15,
    fontWeight: "900",
  },

  cartRow: {
    marginTop: 10,
    flexDirection: "row",
    gap: 7,
    alignItems: "center",
  },

  quantityControl: {
    flex: 1,
    height: 34,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    backgroundColor: "#f8fafc",
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
  },

  quantityButton: {
    width: 28,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  quantityButtonText: {
    color: "#111827",
    fontSize: 18,
    fontWeight: "900",
  },

  quantityText: {
    flex: 1,
    textAlign: "center",
    color: "#111827",
    fontSize: 13,
    fontWeight: "900",
  },

  addButton: {
    width: 62,
    height: 34,
    borderRadius: 10,
    backgroundColor: "#111827",
    alignItems: "center",
    justifyContent: "center",
  },

  addButtonDisabled: {
    backgroundColor: "#9ca3af",
  },

  addButtonText: {
    color: "#ffffff",
    fontSize: 11,
    fontWeight: "900",
  },

  loadMoreBox: {
    paddingVertical: 18,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  loadMoreText: {
    color: "#64748b",
    fontSize: 13,
    fontWeight: "700",
  },

  center: {
    flex: 1,
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

  emptyBox: {
    padding: 24,
    borderRadius: 18,
    backgroundColor: "#ffffff",
    alignItems: "center",
    marginTop: 20,
  },

  emptyTitle: {
    color: "#111827",
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 6,
  },

  emptyText: {
    color: "#64748b",
    fontSize: 14,
    textAlign: "center",
  },

  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.72)",
    alignItems: "center",
    justifyContent: "center",
    padding: 14,
  },

  imageModal: {
    width: "100%",
    maxHeight: "92%",
    backgroundColor: "#ffffff",
    borderRadius: 20,
    overflow: "hidden",
  },

  imageModalHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },

  imageModalHeaderText: {
    flex: 1,
  },

  imageModalTitle: {
    color: "#111827",
    fontSize: 18,
    fontWeight: "900",
  },

  imageModalSubtitle: {
    marginTop: 4,
    color: "#64748b",
    fontSize: 13,
    fontWeight: "700",
  },

  imageModalClose: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#f1f5f9",
    alignItems: "center",
    justifyContent: "center",
  },

  imageModalCloseText: {
    color: "#334155",
    fontSize: 28,
    fontWeight: "700",
    marginTop: -3,
  },

  imageModalBody: {
    height: 380,
    backgroundColor: "#0f172a",
    alignItems: "center",
    justifyContent: "center",
  },

  imageModalImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },

  imageModalNav: {
    position: "absolute",
    top: "50%",
    width: 42,
    height: 42,
    marginTop: -21,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.92)",
    alignItems: "center",
    justifyContent: "center",
  },

  imageModalPrev: {
    left: 12,
  },

  imageModalNext: {
    right: 12,
  },

  imageModalNavText: {
    color: "#111827",
    fontSize: 34,
    fontWeight: "900",
    marginTop: -4,
  },

  thumbsRow: {
    flexDirection: "row",
    gap: 10,
    padding: 12,
    backgroundColor: "#f8fafc",
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },

  thumb: {
    width: 72,
    height: 58,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "transparent",
    overflow: "hidden",
    backgroundColor: "#ffffff",
  },

  thumbActive: {
    borderColor: "#2563eb",
  },

  thumbImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});