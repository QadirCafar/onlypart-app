import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#f4f7fb",
    paddingHorizontal: 16,
    paddingTop: 54,
  },

  header: {
    gap: 14,
    marginBottom: 18,
  },

  title: {
    fontSize: 28,
    fontWeight: "900",
    color: "#0f172a",
  },

  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: "#64748b",
    fontWeight: "600",
  },

  headerActions: {
    flexDirection: "row",
    gap: 10,
  },

  loginButton: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#2563eb",
    alignItems: "center",
    justifyContent: "center",
  },

  loginButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "800",
  },

  registerButton: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#cbd5e1",
    alignItems: "center",
    justifyContent: "center",
  },

  registerButtonText: {
    color: "#0f172a",
    fontSize: 14,
    fontWeight: "800",
  },

  searchInput: {
    height: 48,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#cbd5e1",
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
    fontSize: 15,
    color: "#0f172a",
    marginBottom: 14,
  },

  filterSection: {
    marginBottom: 14,
  },

  filterTitle: {
    color: "#0f172a",
    fontSize: 14,
    fontWeight: "900",
    marginBottom: 8,
  },

  filterList: {
    gap: 8,
    paddingRight: 16,
  },

  filterChip: {
    minHeight: 38,
    borderRadius: 999,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#cbd5e1",
    paddingHorizontal: 14,
    alignItems: "center",
    justifyContent: "center",
  },

  filterChipActive: {
    backgroundColor: "#2563eb",
    borderColor: "#2563eb",
  },

  filterChipText: {
    color: "#334155",
    fontSize: 13,
    fontWeight: "800",
  },

  filterChipTextActive: {
    color: "#ffffff",
  },

  listContent: {
    paddingBottom: 32,
    gap: 16,
  },

  productCard: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 14,
    borderWidth: 2,
    borderColor: "transparent",
  },

  productCardNew: {
    borderColor: "#22c55e",
    shadowColor: "#22c55e",
    shadowOpacity: 0.28,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 7,
  },

  productCardUsed: {
    borderColor: "#2563eb",
    shadowColor: "#2563eb",
    shadowOpacity: 0.22,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 7,
  },

  imageBox: {
    height: 180,
    borderRadius: 16,
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    marginBottom: 14,
  },

  productImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  noImageText: {
    color: "#94a3b8",
    fontSize: 13,
    fontWeight: "600",
  },

  productName: {
    color: "#020617",
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 6,
    textTransform: "uppercase",
  },

  description: {
    color: "#64748b",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 14,
  },

  infoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 10,
  },

  infoBox: {
    width: "48%",
    minHeight: 74,
    borderRadius: 14,
    backgroundColor: "#f8fafc",
    padding: 12,
  },

  infoLabel: {
    fontSize: 12,
    color: "#94a3b8",
    fontWeight: "700",
    marginBottom: 8,
  },

  infoValue: {
    fontSize: 13,
    color: "#020617",
    fontWeight: "800",
    lineHeight: 19,
  },

  stockRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 14,
  },

  stockBox: {
    flex: 1,
    minHeight: 74,
    borderRadius: 14,
    backgroundColor: "#f8fafc",
    padding: 12,
  },

  stockValue: {
    fontSize: 14,
    color: "#020617",
    fontWeight: "900",
  },

  conditionBox: {
    width: 100,
    minHeight: 74,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    borderWidth: 1,
  },

  conditionNew: {
    backgroundColor: "#dcfce7",
    borderColor: "#86efac",
  },

  conditionUsed: {
    backgroundColor: "#dbeafe",
    borderColor: "#93c5fd",
  },

  conditionText: {
    fontSize: 13,
    fontWeight: "900",
  },

  conditionTextNew: {
    color: "#166534",
  },

  conditionTextUsed: {
    color: "#1e40af",
  },

  footer: {
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
    paddingTop: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    gap: 12,
  },

  priceLabel: {
    fontSize: 12,
    color: "#94a3b8",
    fontWeight: "700",
    marginBottom: 4,
  },

  price: {
    fontSize: 19,
    color: "#020617",
    fontWeight: "900",
  },

  outOfStockText: {
    marginTop: 8,
    color: "#dc2626",
    fontSize: 13,
    fontWeight: "900",
  },

  addButton: {
    minWidth: 112,
    height: 46,
    borderRadius: 12,
    backgroundColor: "#111827",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 14,
  },

  addButtonDisabled: {
    backgroundColor: "#cbd5e1",
  },

  addButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "900",
  },

  listFooter: {
    paddingVertical: 18,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  loadingMoreText: {
    color: "#64748b",
    fontSize: 13,
    fontWeight: "700",
  },

  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.65)",
    alignItems: "center",
    justifyContent: "center",
    padding: 18,
  },

  modalBox: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 22,
    padding: 20,
  },

  modalTitle: {
    color: "#111827",
    fontSize: 22,
    fontWeight: "900",
    marginBottom: 10,
  },

  modalText: {
    color: "#64748b",
    fontSize: 15,
    lineHeight: 22,
  },

  modalActions: {
    gap: 10,
    marginTop: 22,
  },

  modalSecondaryButton: {
    height: 46,
    borderRadius: 12,
    backgroundColor: "#f1f5f9",
    alignItems: "center",
    justifyContent: "center",
  },

  modalSecondaryText: {
    color: "#334155",
    fontSize: 14,
    fontWeight: "900",
  },

  modalPrimaryButton: {
    height: 46,
    borderRadius: 12,
    backgroundColor: "#2563eb",
    alignItems: "center",
    justifyContent: "center",
  },

  modalPrimaryText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "900",
  },

  modalDarkButton: {
    height: 46,
    borderRadius: 12,
    backgroundColor: "#0f172a",
    alignItems: "center",
    justifyContent: "center",
  },

  modalDarkText: {
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

  emptyBox: {
    padding: 24,
    borderRadius: 18,
    backgroundColor: "#ffffff",
    alignItems: "center",
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
});