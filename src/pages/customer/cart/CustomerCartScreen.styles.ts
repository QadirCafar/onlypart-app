import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#f4f7fb",
  },

  listContent: {
    padding: 14,
    paddingBottom: 34,
  },

  header: {
    marginBottom: 14,
  },

  title: {
    color: "#111827",
    fontSize: 24,
    fontWeight: "900",
  },

  subtitle: {
    marginTop: 4,
    color: "#64748b",
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 19,
  },

  summaryRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 14,
  },

  summaryBox: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    padding: 14,
  },

  summaryLabel: {
    color: "#94a3b8",
    fontSize: 12,
    fontWeight: "800",
    marginBottom: 7,
  },

  summaryValue: {
    color: "#111827",
    fontSize: 18,
    fontWeight: "900",
  },

  cartItemCard: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    padding: 14,
    marginBottom: 14,
    shadowColor: "#0f172a",
    shadowOpacity: 0.07,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 7 },
    elevation: 3,
  },

  itemHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 10,
  },

  itemTitleBox: {
    flex: 1,
  },

  itemName: {
    color: "#111827",
    fontSize: 16,
    fontWeight: "900",
    lineHeight: 21,
  },

  itemSubText: {
    marginTop: 5,
    color: "#64748b",
    fontSize: 12,
    fontWeight: "700",
  },

  deleteButton: {
    minWidth: 54,
    height: 34,
    borderRadius: 10,
    backgroundColor: "#fee2e2",
    borderWidth: 1,
    borderColor: "#fecaca",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },

  deleteButtonText: {
    color: "#dc2626",
    fontSize: 12,
    fontWeight: "900",
  },

  infoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 14,
  },

  infoBox: {
    width: "48%",
    minHeight: 64,
    backgroundColor: "#f8fafc",
    borderRadius: 13,
    borderWidth: 1,
    borderColor: "#eef2f7",
    padding: 10,
  },

  infoLabel: {
    color: "#94a3b8",
    fontSize: 11,
    fontWeight: "800",
    marginBottom: 6,
  },

  infoValue: {
    color: "#111827",
    fontSize: 12,
    fontWeight: "900",
    lineHeight: 17,
  },

  stockWarning: {
    marginTop: 10,
    color: "#b45309",
    fontSize: 12,
    fontWeight: "800",
  },

  stockDanger: {
    marginTop: 10,
    color: "#dc2626",
    fontSize: 12,
    fontWeight: "900",
  },

  stockDangerText: {
    color: "#dc2626",
  },

  itemBottomRow: {
    marginTop: 14,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },

  quantityControl: {
    width: 138,
    height: 42,
    borderWidth: 1,
    borderColor: "#dbe3ef",
    borderRadius: 12,
    backgroundColor: "#f8fafc",
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
  },

  quantityButton: {
    width: 42,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  quantityButtonText: {
    color: "#111827",
    fontSize: 22,
    fontWeight: "900",
  },

  quantityButtonTextDisabled: {
    color: "#cbd5e1",
  },

  quantityValueBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  quantityText: {
    color: "#111827",
    fontSize: 15,
    fontWeight: "900",
  },

  lineTotalBox: {
    flex: 1,
    alignItems: "flex-end",
  },

  lineTotalLabel: {
    color: "#94a3b8",
    fontSize: 11,
    fontWeight: "800",
    marginBottom: 4,
  },

  lineTotalValue: {
    color: "#111827",
    fontSize: 16,
    fontWeight: "900",
  },

  checkoutCard: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    padding: 14,
    marginTop: 2,
    shadowColor: "#0f172a",
    shadowOpacity: 0.07,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 7 },
    elevation: 3,
  },

  checkoutTitle: {
    color: "#111827",
    fontSize: 17,
    fontWeight: "900",
    marginBottom: 12,
  },

  noteInput: {
    minHeight: 76,
    borderWidth: 1,
    borderColor: "#dbe3ef",
    borderRadius: 14,
    backgroundColor: "#f8fafc",
    paddingHorizontal: 13,
    paddingVertical: 11,
    color: "#111827",
    fontSize: 14,
    fontWeight: "700",
    textAlignVertical: "top",
  },

  totalRow: {
    marginTop: 14,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  totalLabel: {
    color: "#64748b",
    fontSize: 14,
    fontWeight: "800",
  },

  totalValue: {
    color: "#111827",
    fontSize: 22,
    fontWeight: "900",
  },

  checkoutActions: {
    marginTop: 14,
    gap: 10,
  },

  clearButton: {
    height: 46,
    borderRadius: 13,
    backgroundColor: "#dc2626",
    alignItems: "center",
    justifyContent: "center",
  },

  clearButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "900",
  },

  checkoutButton: {
    height: 48,
    borderRadius: 13,
    backgroundColor: "#2563eb",
    alignItems: "center",
    justifyContent: "center",
  },

  checkoutButtonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "900",
  },

  disabledButton: {
    backgroundColor: "#9ca3af",
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
    backgroundColor: "#ffffff",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    padding: 22,
    alignItems: "center",
  },

  emptyTitle: {
    color: "#111827",
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 7,
  },

  emptyText: {
    color: "#64748b",
    fontSize: 14,
    fontWeight: "700",
    textAlign: "center",
    lineHeight: 20,
  },
});