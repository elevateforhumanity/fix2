import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator, ScrollView } from "react-native";
import { AuthContext } from "../../App";
import { api, MobileProfile } from "../lib/api";

export default function ProfileScreen() {
  const { token, setToken } = useContext(AuthContext);
  const [profile, setProfile] = useState<MobileProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    (async () => {
      try {
        setLoading(true);
        const data = await api.getProfile(token);
        setProfile(data);
      } catch (e: any) {
        setError(e.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    })();
  }, [token]);

  if (!token) {
    return (
      <View style={styles.centered}>
        <Text style={styles.info}>Please log in again.</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0ea5e9" />
        <Text style={styles.loadingText}>Loading profile...</Text>
      </View>
    );
  }

  if (error || !profile) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>{error || "No profile data"}</Text>
      </View>
    );
  }

  function handleLogout() {
    setToken(null);
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        {profile.avatarUrl ? (
          <Image source={{ uri: profile.avatarUrl }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, styles.avatarFallback]}>
            <Text style={styles.avatarText}>{profile.name.charAt(0).toUpperCase()}</Text>
          </View>
        )}

        <View style={styles.headerInfo}>
          <Text style={styles.name}>{profile.name}</Text>
          <Text style={styles.email}>{profile.email}</Text>
        </View>
      </View>

      <View style={styles.statsRow}>
        <StatCard label="Courses" value={profile.totalCourses.toString()} color="#0ea5e9" />
        <StatCard label="Completed" value={profile.completedCourses.toString()} color="#22c55e" />
      </View>

      <View style={styles.statsRow}>
        <StatCard label="Certificates" value={profile.certificatesCount.toString()} color="#f59e0b" />
        <StatCard label="Streak" value={`${profile.streakDays}d 🔥`} color="#ef4444" />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>About Your Journey</Text>
        <Text style={styles.cardText}>
          Every lesson you complete moves you closer to a credential, a better job,
          and higher income. Stay consistent – your Elevate team and employers are
          watching your progress.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Quick Links</Text>
        <TouchableOpacity style={styles.linkButton}>
          <Text style={styles.linkText}>📜 View My Certificates</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.linkButton}>
          <Text style={styles.linkText}>📊 My Analytics</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.linkButton}>
          <Text style={styles.linkText}>⚙️ Settings</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Log out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function StatCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <View style={[styles.statCard, { borderLeftColor: color, borderLeftWidth: 4 }]}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f1f5f9" },
  content: { padding: 16 },
  header: { flexDirection: "row", gap: 16, alignItems: "center", marginBottom: 20 },
  avatar: { width: 72, height: 72, borderRadius: 999 },
  avatarFallback: { backgroundColor: "#0ea5e9", alignItems: "center", justifyContent: "center" },
  avatarText: { fontSize: 32, fontWeight: "700", color: "white" },
  headerInfo: { flex: 1 },
  name: { fontSize: 18, fontWeight: "700", color: "#0f172a", marginBottom: 2 },
  email: { fontSize: 13, color: "#64748b" },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 12,
    alignItems: "center",
    elevation: 2,
  },
  statValue: { fontSize: 20, fontWeight: "700", color: "#0f172a", marginBottom: 4 },
  statLabel: { fontSize: 11, color: "#6b7280", fontWeight: "500" },
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  cardTitle: { fontSize: 14, fontWeight: "600", color: "#0f172a", marginBottom: 8 },
  cardText: { fontSize: 12, color: "#475569", lineHeight: 18 },
  linkButton: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  linkText: { fontSize: 13, color: "#0f172a", fontWeight: "500" },
  logoutButton: {
    marginTop: 8,
    marginBottom: 24,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: "#e5e7eb",
    paddingVertical: 12,
    alignItems: "center",
    backgroundColor: "white",
  },
  logoutText: { fontSize: 14, color: "#b91c1c", fontWeight: "600" },
  centered: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24, backgroundColor: "#f1f5f9" },
  info: { fontSize: 14, color: "#0f172a", textAlign: "center" },
  error: { fontSize: 13, color: "#b91c1c", textAlign: "center" },
  loadingText: { fontSize: 13, color: "#64748b", marginTop: 12 },
});
