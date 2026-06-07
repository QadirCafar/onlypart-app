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

  profileCard: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    padding: 14,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    shadowColor: "#0f172a",
    shadowOpacity: 0.07,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 7 },
    elevation: 3,
  },

  avatar: {
    width: 54,
    height: 54,
    borderRadius: 999,
    backgroundColor: "#2563eb",
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "900",
  },

  profileMainInfo: {
    flex: 1,
  },

  profileName: {
    color: "#111827",
    fontSize: 17,
    fontWeight: "900",
  },

  profileEmail: {
    marginTop: 4,
    color: "#64748b",
    fontSize: 12,
    fontWeight: "700",
  },

  statusBadge: {
    minWidth: 70,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  statusActive: {
    backgroundColor: "#dcfce7",
    borderColor: "#86efac",
  },

  statusPassive: {
    backgroundColor: "#fee2e2",
    borderColor: "#fecaca",
  },

  statusBadgeText: {
    fontSize: 11,
    fontWeight: "900",
  },

  statusActiveText: {
    color: "#15803d",
  },

  statusPassiveText: {
    color: "#b91c1c",
  },

  infoCard: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    padding: 14,
    marginBottom: 14,
  },

  formCard: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    padding: 14,
    marginBottom: 14,
  },

  cardTitle: {
    color: "#111827",
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 12,
  },

  readonlyGrid: {
    gap: 10,
  },

  readonlyBox: {
    minHeight: 66,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    backgroundColor: "#f8fafc",
    padding: 12,
  },

  readonlyLabel: {
    color: "#94a3b8",
    fontSize: 11,
    fontWeight: "800",
    marginBottom: 7,
  },

  readonlyValue: {
    color: "#111827",
    fontSize: 13,
    fontWeight: "900",
    lineHeight: 18,
  },

  formGroup: {
    marginBottom: 13,
  },

  label: {
    color: "#344054",
    fontSize: 13,
    fontWeight: "900",
    marginBottom: 7,
  },

  input: {
    height: 46,
    borderWidth: 1,
    borderColor: "#d0d5dd",
    borderRadius: 13,
    backgroundColor: "#ffffff",
    paddingHorizontal: 13,
    color: "#111827",
    fontSize: 14,
    fontWeight: "700",
  },

  textArea: {
    minHeight: 96,
    borderWidth: 1,
    borderColor: "#d0d5dd",
    borderRadius: 13,
    backgroundColor: "#ffffff",
    paddingHorizontal: 13,
    paddingVertical: 11,
    color: "#111827",
    fontSize: 14,
    fontWeight: "700",
  },

  saveButton: {
    height: 46,
    borderRadius: 13,
    backgroundColor: "#2563eb",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },

  saveButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "900",
  },

  securityCard: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    padding: 14,
    marginBottom: 14,
    gap: 12,
  },

  securityTextBox: {
    flex: 1,
  },

  securityText: {
    color: "#64748b",
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 19,
  },

  passwordButton: {
    height: 44,
    borderRadius: 13,
    backgroundColor: "#2563eb",
    alignItems: "center",
    justifyContent: "center",
  },

  passwordButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "900",
  },

  dangerCard: {
    backgroundColor: "#fff7f7",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#fecaca",
    padding: 14,
    marginBottom: 14,
    gap: 12,
  },

  dangerTitle: {
    color: "#111827",
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 7,
  },

  dangerText: {
    color: "#64748b",
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 19,
  },

  deleteButton: {
    height: 44,
    borderRadius: 13,
    backgroundColor: "#dc2626",
    alignItems: "center",
    justifyContent: "center",
  },

  deleteButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "900",
  },

  disabledButton: {
    backgroundColor: "#9ca3af",
  },

  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.62)",
    alignItems: "center",
    justifyContent: "center",
    padding: 14,
  },

  modalCard: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 20,
    overflow: "hidden",
  },

  modalHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },

  modalTitleBox: {
    flex: 1,
  },

  modalTitle: {
    color: "#111827",
    fontSize: 20,
    fontWeight: "900",
  },

  modalSubtitle: {
    marginTop: 5,
    color: "#64748b",
    fontSize: 12,
    fontWeight: "700",
    lineHeight: 18,
  },

  modalClose: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#f1f5f9",
    alignItems: "center",
    justifyContent: "center",
  },

  modalCloseText: {
    color: "#334155",
    fontSize: 28,
    fontWeight: "700",
    marginTop: -3,
  },

  modalBody: {
    padding: 16,
  },

  modalFooter: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    backgroundColor: "#f8fafc",
    gap: 10,
  },

  cancelButton: {
    height: 44,
    borderRadius: 13,
    backgroundColor: "#e5e7eb",
    alignItems: "center",
    justifyContent: "center",
  },

  cancelButtonText: {
    color: "#334155",
    fontSize: 14,
    fontWeight: "900",
  },

  modalSaveButton: {
    height: 46,
    borderRadius: 13,
    backgroundColor: "#2563eb",
    alignItems: "center",
    justifyContent: "center",
  },

  modalSaveButtonText: {
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

  retryButton: {
    height: 42,
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: "#2563eb",
    alignItems: "center",
    justifyContent: "center",
  },

  retryButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "900",
  },
});