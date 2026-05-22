import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    RefreshControl,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { mechanicsApi } from "../src/api/mechanicsApi";
import { Mechanic } from "../src/types/mechanic";

export default function MechanicsScreen() {
  const [mechanics, setMechanics] = useState<Mechanic[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadMechanics();
  }, []);

  async function loadMechanics() {
    try {
      const data = await mechanicsApi.getAll();

      if (!Array.isArray(data)) {
        console.log("MECHANICS DATA IS NOT ARRAY:", data);
        setMechanics([]);
        return;
      }

      setMechanics(data);
    } catch (error) {
      console.log("MECHANICS LOAD ERROR:", error);
      setMechanics([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  async function refreshMechanics() {
    setRefreshing(true);
    await loadMechanics();
  }

  function renderMechanic({ item }: { item: Mechanic }) {
    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.name}>{item.name}</Text>

          <View
            style={[
              styles.statusBadge,
              item.status === "active"
                ? styles.statusActive
                : styles.statusInactive,
            ]}
          >
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
        </View>

        <Text style={styles.description}>
          {item.description || "No description"}
        </Text>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Address:</Text>
          <Text style={styles.value}>{item.address || "-"}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Experience:</Text>
          <Text style={styles.value}>{item.experienceYears} years</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Rating:</Text>
          <Text style={styles.value}>{item.rating}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Location:</Text>
          <Text style={styles.value}>
            {item.latitude}, {item.longitude}
          </Text>
        </View>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
        <Text style={styles.loadingText}>Loading mechanics...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mechanics</Text>

      <FlatList
        data={mechanics}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderMechanic}
        contentContainerStyle={
          mechanics.length === 0 ? styles.emptyList : styles.list
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refreshMechanics}
          />
        }
        ListEmptyComponent={
          <Text style={styles.emptyText}>No mechanics found.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9fafb",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 16,
    color: "#111827",
  },
  list: {
    paddingBottom: 24,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  name: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    flex: 1,
    marginRight: 10,
  },
  description: {
    marginTop: 8,
    color: "#4b5563",
    fontSize: 14,
  },
  infoRow: {
    flexDirection: "row",
    marginTop: 8,
  },
  label: {
    width: 95,
    color: "#6b7280",
    fontWeight: "600",
  },
  value: {
    flex: 1,
    color: "#111827",
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  statusActive: {
    backgroundColor: "#dcfce7",
  },
  statusInactive: {
    backgroundColor: "#fee2e2",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#111827",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  loadingText: {
    color: "#6b7280",
  },
  emptyList: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: "#6b7280",
    fontSize: 16,
  },
});