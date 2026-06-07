import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#f4f7fb",
  },

  scrollContent: {
    flexGrow: 1,
    padding: 16,
    justifyContent: "center",
  },

  card: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 22,
    padding: 20,
    shadowColor: "#0f172a",
    shadowOpacity: 0.1,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 14 },
    elevation: 6,
  },

  header: {
    marginBottom: 20,
  },

  title: {
    color: "#0f172a",
    fontSize: 28,
    fontWeight: "900",
    letterSpacing: -0.6,
  },

  subtitle: {
    marginTop: 8,
    color: "#64748b",
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "500",
  },

  successBox: {
    borderWidth: 1,
    borderColor: "#bbf7d0",
    backgroundColor: "#dcfce7",
    borderRadius: 14,
    padding: 12,
    marginBottom: 16,
  },

  successText: {
    color: "#166534",
    fontSize: 14,
    fontWeight: "800",
    lineHeight: 20,
  },

  form: {
    gap: 14,
  },

  field: {
    gap: 7,
  },

  label: {
    color: "#334155",
    fontSize: 13,
    fontWeight: "800",
  },

  input: {
    minHeight: 48,
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 13,
    backgroundColor: "#ffffff",
    color: "#0f172a",
    paddingHorizontal: 14,
    fontSize: 14,
  },

  textArea: {
    minHeight: 96,
    paddingTop: 12,
    paddingBottom: 12,
  },

  submitButton: {
    height: 50,
    borderRadius: 13,
    backgroundColor: "#2563eb",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },

  submitButtonDisabled: {
    backgroundColor: "#94a3b8",
  },

  submitButtonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "900",
  },

  footer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
  },

  footerText: {
    color: "#64748b",
    fontSize: 14,
    fontWeight: "500",
  },

  footerLink: {
    color: "#2563eb",
    fontSize: 14,
    fontWeight: "900",
  },

  homeLink: {
    marginTop: 18,
    textAlign: "center",
    color: "#0f172a",
    fontSize: 14,
    fontWeight: "900",
  },
});