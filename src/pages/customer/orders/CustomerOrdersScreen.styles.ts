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

  headerSummaryRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 14,
  },

  headerSummaryBox: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    padding: 14,
  },

  headerSummaryLabel: {
    color: "#94a3b8",
    fontSize: 12,
    fontWeight: "800",
    marginBottom: 7,
  },

  headerSummaryValue: {
    color: "#111827",
    fontSize: 18,
    fontWeight: "900",
  },

  headerDebtValue: {
    color: "#c2410c",
  },

  orderCard: {
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

  orderTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 10,
  },

  orderTitleBox: {
    flex: 1,
  },

  orderLabel: {
    color: "#94a3b8",
    fontSize: 12,
    fontWeight: "800",
    marginBottom: 5,
  },

  orderNumber: {
    color: "#111827",
    fontSize: 18,
    fontWeight: "900",
  },

  statusBadge: {
    minWidth: 92,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  statusConfirmed: {
    backgroundColor: "#dcfce7",
    borderColor: "#86efac",
  },

  statusPending: {
    backgroundColor: "#fef3c7",
    borderColor: "#fde68a",
  },

  statusDeclined: {
    backgroundColor: "#fee2e2",
    borderColor: "#fecaca",
  },

  statusDefault: {
    backgroundColor: "#f1f5f9",
    borderColor: "#e2e8f0",
  },

  statusBadgeText: {
    color: "#111827",
    fontSize: 11,
    fontWeight: "900",
  },

  orderMetaRow: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },

  orderMetaText: {
    color: "#64748b",
    fontSize: 12,
    fontWeight: "700",
  },

  summaryGrid: {
    marginTop: 14,
    flexDirection: "row",
    gap: 8,
  },

  summaryBox: {
    flex: 1,
    minHeight: 68,
    backgroundColor: "#f8fafc",
    borderRadius: 13,
    padding: 10,
    borderWidth: 1,
    borderColor: "#eef2f7",
  },

  debtBox: {
    backgroundColor: "#fff7ed",
    borderColor: "#fed7aa",
  },

  summaryLabel: {
    color: "#94a3b8",
    fontSize: 11,
    fontWeight: "800",
    marginBottom: 6,
  },

  summaryValue: {
    color: "#111827",
    fontSize: 12,
    fontWeight: "900",
    lineHeight: 17,
  },

  debtValue: {
    color: "#c2410c",
  },

  paymentStatusRow: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },

  paymentStatusLabel: {
    color: "#64748b",
    fontSize: 12,
    fontWeight: "800",
  },

  paymentBadge: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
  },

  paymentPaid: {
    backgroundColor: "#dcfce7",
    borderColor: "#86efac",
  },

  paymentPartial: {
    backgroundColor: "#fef3c7",
    borderColor: "#fde68a",
  },

  paymentUnpaid: {
    backgroundColor: "#fee2e2",
    borderColor: "#fecaca",
  },

  paymentBadgeText: {
    color: "#111827",
    fontSize: 11,
    fontWeight: "900",
  },

  noteBox: {
    marginTop: 12,
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    padding: 11,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },

  noteLabel: {
    color: "#94a3b8",
    fontSize: 11,
    fontWeight: "800",
    marginBottom: 5,
  },

  noteText: {
    color: "#334155",
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 18,
  },

  actionRow: {
    marginTop: 14,
    flexDirection: "row",
    gap: 10,
  },

  secondaryButton: {
    flex: 1,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#475467",
    alignItems: "center",
    justifyContent: "center",
  },

  secondaryButtonText: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "900",
  },

  primaryButton: {
    flex: 1,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#2563eb",
    alignItems: "center",
    justifyContent: "center",
  },

  primaryButtonText: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "900",
  },

  detailsBox: {
    marginTop: 14,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },

  sectionTitle: {
    color: "#111827",
    fontSize: 16,
    fontWeight: "900",
    marginBottom: 12,
  },

  detailsSummary: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 12,
  },

  detailsSummaryItem: {
    flex: 1,
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    padding: 11,
    borderWidth: 1,
    borderColor: "#eef2f7",
  },

  detailsSummaryLabel: {
    color: "#94a3b8",
    fontSize: 11,
    fontWeight: "800",
    marginBottom: 5,
  },

  detailsSummaryValue: {
    color: "#111827",
    fontSize: 12,
    fontWeight: "900",
    lineHeight: 17,
  },

  orderItemCard: {
    backgroundColor: "#f9fafb",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    padding: 12,
    marginBottom: 10,
  },

  orderItemHeader: {
    flexDirection: "row",
    gap: 8,
    alignItems: "flex-start",
    marginBottom: 10,
  },

  orderItemIndex: {
    color: "#64748b",
    fontSize: 13,
    fontWeight: "900",
  },

  orderItemName: {
    flex: 1,
    color: "#111827",
    fontSize: 14,
    fontWeight: "900",
    lineHeight: 19,
  },

  orderItemInfoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  orderItemInfo: {
    width: "48%",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 9,
  },

  orderItemLabel: {
    color: "#94a3b8",
    fontSize: 10,
    fontWeight: "800",
    marginBottom: 5,
  },

  orderItemValue: {
    color: "#111827",
    fontSize: 11,
    fontWeight: "800",
    lineHeight: 16,
  },

  orderItemTotalRow: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  orderItemTotalLabel: {
    color: "#64748b",
    fontSize: 12,
    fontWeight: "800",
  },

  orderItemTotalValue: {
    color: "#111827",
    fontSize: 13,
    fontWeight: "900",
  },

  paymentItemCard: {
    backgroundColor: "#f8fafc",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    padding: 12,
    marginBottom: 10,
  },

  paymentAmount: {
    color: "#111827",
    fontSize: 16,
    fontWeight: "900",
  },

  paymentMeta: {
    marginTop: 4,
    color: "#64748b",
    fontSize: 12,
    fontWeight: "800",
  },

  paymentDate: {
    marginTop: 8,
    color: "#334155",
    fontSize: 12,
    fontWeight: "800",
  },

  paymentNumber: {
    marginTop: 5,
    color: "#64748b",
    fontSize: 12,
    fontWeight: "700",
  },

  paymentNote: {
    marginTop: 7,
    color: "#475569",
    fontSize: 12,
    fontWeight: "700",
    lineHeight: 18,
  },

  emptyInnerText: {
    color: "#64748b",
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 19,
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