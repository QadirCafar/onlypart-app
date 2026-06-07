import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#eef4fb",
  },

  pageContent: {
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

  loadingBox: {
    minHeight: 46,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#bfdbfe",
    backgroundColor: "#eff6ff",
    paddingHorizontal: 14,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  loadingText: {
    color: "#1d4ed8",
    fontSize: 13,
    fontWeight: "800",
  },

  errorBox: {
    minHeight: 46,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#fecaca",
    backgroundColor: "#fef2f2",
    paddingHorizontal: 14,
    marginBottom: 14,
    justifyContent: "center",
  },

  errorText: {
    color: "#b91c1c",
    fontSize: 13,
    fontWeight: "800",
  },

  summaryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 22,
  },

  summaryCard: {
    width: "48%",
    minHeight: 138,
    borderRadius: 18,
    padding: 14,
    justifyContent: "center",
    shadowColor: "#0f172a",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 7 },
    elevation: 3,
  },

  debtCard: {
    backgroundColor: "#669cf6",
  },

  ordersCard: {
    backgroundColor: "#7866be",
  },

  cartCard: {
    backgroundColor: "#f1c950",
  },

  pendingCard: {
    backgroundColor: "#7388b6",
  },

  summaryIcon: {
    fontSize: 32,
    marginBottom: 10,
    textAlign: "center",
  },

  summaryTitle: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "900",
    textAlign: "center",
    lineHeight: 19,
  },

  summaryValue: {
    marginTop: 6,
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "900",
    textAlign: "center",
    lineHeight: 20,
  },

  summaryHint: {
    marginTop: 5,
    color: "#eef2ff",
    fontSize: 12,
    fontWeight: "800",
    textAlign: "center",
    lineHeight: 17,
  },

  sectionHeader: {
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: 12,
  },

  sectionTitle: {
    color: "#6b7280",
    fontSize: 22,
    fontWeight: "900",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },

  sectionDate: {
    marginTop: 5,
    color: "#ef4444",
    fontSize: 13,
    fontWeight: "900",
  },

  showAllButton: {
    minWidth: 82,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#ffd21f",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
  },

  showAllButtonText: {
    color: "#3045d6",
    fontSize: 13,
    fontWeight: "900",
    textTransform: "uppercase",
  },

  productsRow: {
    gap: 12,
    paddingBottom: 4,
  },

  productCard: {
    width: 150,
    minHeight: 218,
    borderRadius: 18,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    padding: 11,
    shadowColor: "#0f172a",
    shadowOpacity: 0.07,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 7 },
    elevation: 3,
  },

  productImageBox: {
    height: 106,
    borderRadius: 14,
    backgroundColor: "#f8fafc",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    marginBottom: 10,
  },

  productImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },

  noImageText: {
    color: "#94a3b8",
    fontSize: 11,
    fontWeight: "800",
  },

  productName: {
    color: "#111827",
    fontSize: 13,
    fontWeight: "900",
    lineHeight: 18,
    minHeight: 36,
  },

  productBrand: {
    marginTop: 5,
    color: "#64748b",
    fontSize: 12,
    fontWeight: "700",
  },

  productPrice: {
    marginTop: 7,
    color: "#111827",
    fontSize: 14,
    fontWeight: "900",
  },

  emptyProductsBox: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    padding: 22,
    alignItems: "center",
    shadowColor: "#0f172a",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 7 },
    elevation: 3,
  },

  emptyProductsTitle: {
    color: "#111827",
    fontSize: 17,
    fontWeight: "900",
    textAlign: "center",
  },

  emptyProductsText: {
    marginTop: 7,
    color: "#64748b",
    fontSize: 13,
    fontWeight: "700",
    textAlign: "center",
    lineHeight: 19,
  },

  emptyProductsButton: {
    marginTop: 14,
    height: 42,
    borderRadius: 13,
    backgroundColor: "#2563eb",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 18,
  },

  emptyProductsButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "900",
  },
});