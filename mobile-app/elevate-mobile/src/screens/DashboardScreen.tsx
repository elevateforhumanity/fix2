import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";

export default function DashboardScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Elevate For Humanity</Text>
      <Text style={styles.subtitle}>Workforce Training • On the go</Text>

      <View style={styles.cardRow}>
        <DashCard title="My Courses" subtitle="Continue learning" color="#0ea5e9" />
        <DashCard title="Streak" subtitle="5 days 🔥" color="#f97316" />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Today's Focus</Text>
        <Text style={styles.cardText}>
          Finish 1 lesson and complete 1 quiz to stay On Track.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Announcements</Text>
        <Text style={styles.cardText}>
          New cohort for Medical Assistant and HVAC begins next week. Check your
          email or the Elevate LMS for details.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Quick Actions</Text>
        <View style={styles.actionRow}>
          <ActionButton label="Forums" icon="💬" />
          <ActionButton label="Study Groups" icon="👥" />
          <ActionButton label="AI Chat" icon="🤖" />
        </View>
      </View>
    </ScrollView>
  );
}

function DashCard({ title, subtitle, color }: { title: string; subtitle: string; color: string }) {
  return (
    <TouchableOpacity style={[styles.smallCard, { borderLeftColor: color, borderLeftWidth: 4 }]}>
      <Text style={styles.smallCardTitle}>{title}</Text>
      <Text style={styles.smallCardSubtitle}>{subtitle}</Text>
    </TouchableOpacity>
  );
}

function ActionButton({ label, icon }: { label: string; icon: string }) {
  return (
    <TouchableOpacity style={styles.actionButton}>
      <Text style={styles.actionIcon}>{icon}</Text>
      <Text style={styles.actionLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f1f5f9" },
  content: { padding: 16 },
  title: { fontSize: 20, fontWeight: "700", color: "#0f172a" },
  subtitle: { fontSize: 12, color: "#64748b", marginTop: 4, marginBottom: 16 },
  cardRow: { flexDirection: "row", gap: 12, marginBottom: 12 },
  smallCard: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 16,
    padding: 12,
    elevation: 2,
  },
  smallCardTitle: { fontSize: 12, fontWeight: "600", color: "#0f172a" },
  smallCardSubtitle: { fontSize: 11, color: "#64748b", marginTop: 4 },
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  cardTitle: { fontSize: 14, fontWeight: "600", color: "#0f172a", marginBottom: 6 },
  cardText: { fontSize: 12, color: "#475569", lineHeight: 18 },
  actionRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 8,
  },
  actionButton: {
    flex: 1,
    backgroundColor: "#f1f5f9",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
  },
  actionIcon: { fontSize: 24, marginBottom: 4 },
  actionLabel: { fontSize: 10, fontWeight: "600", color: "#475569" },
});
