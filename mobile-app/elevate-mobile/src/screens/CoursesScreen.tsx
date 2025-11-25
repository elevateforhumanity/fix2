import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { AuthContext } from "../../App";
import { api, MobileCourseSummary } from "../lib/api";

export default function CoursesScreen() {
  const { token } = useContext(AuthContext);
  const [courses, setCourses] = useState<MobileCourseSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    (async () => {
      try {
        setLoading(true);
        const data = await api.getMyCourses(token);
        setCourses(data);
      } catch (e: any) {
        setError(e.message || "Failed to load courses");
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
        <Text style={styles.loadingText}>Loading your courses...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>{error}</Text>
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={() => {
            setError(null);
            setLoading(true);
            api.getMyCourses(token!).then(setCourses).catch(e => setError(e.message)).finally(() => setLoading(false));
          }}
        >
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (courses.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.emptyIcon}>📚</Text>
        <Text style={styles.info}>You're not enrolled in any courses yet.</Text>
        <Text style={styles.subInfo}>Talk to your Elevate coach or visit the website to enroll.</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.list}
      contentContainerStyle={{ padding: 16 }}
      data={courses}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <CourseCard course={item} />}
      ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
    />
  );
}

function CourseCard({ course }: { course: MobileCourseSummary }) {
  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.row}>
        {course.thumbnailUrl ? (
          <Image source={{ uri: course.thumbnailUrl }} style={styles.thumb} />
        ) : (
          <View style={[styles.thumb, styles.thumbFallback]}>
            <Text style={styles.thumbText}>{course.title.charAt(0)}</Text>
          </View>
        )}

        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{course.title}</Text>
          <Text style={styles.desc} numberOfLines={2}>
            {course.shortDescription}
          </Text>

          <View style={styles.progressRow}>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${course.progressPercent}%` }]} />
            </View>
            <Text style={styles.progressLabel}>{Math.round(course.progressPercent)}%</Text>
          </View>

          {course.nextLessonTitle ? (
            <Text style={styles.nextLesson}>▶ Next: {course.nextLessonTitle}</Text>
          ) : course.progressPercent === 100 ? (
            <Text style={styles.completed}>✓ Completed</Text>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  list: { flex: 1, backgroundColor: "#f1f5f9" },
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 12,
    elevation: 2,
  },
  row: { flexDirection: "row", gap: 12 },
  thumb: { width: 64, height: 64, borderRadius: 12 },
  thumbFallback: { backgroundColor: "#e5e7eb", alignItems: "center", justifyContent: "center" },
  thumbText: { fontSize: 24, fontWeight: "700", color: "#4b5563" },
  title: { fontSize: 14, fontWeight: "600", color: "#0f172a", marginBottom: 2 },
  desc: { fontSize: 11, color: "#6b7280", marginTop: 2, lineHeight: 16 },
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    gap: 8,
  },
  progressTrack: {
    flex: 1,
    height: 6,
    borderRadius: 999,
    backgroundColor: "#e5e7eb",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: "#0ea5e9",
  },
  progressLabel: { fontSize: 10, fontWeight: "600", color: "#4b5563" },
  nextLesson: { fontSize: 11, color: "#22c55e", marginTop: 6, fontWeight: "500" },
  completed: { fontSize: 11, color: "#10b981", marginTop: 6, fontWeight: "600" },
  centered: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24, backgroundColor: "#f1f5f9" },
  info: { fontSize: 14, fontWeight: "600", color: "#0f172a", textAlign: "center", marginTop: 8 },
  subInfo: { fontSize: 12, color: "#6b7280", marginTop: 8, textAlign: "center", lineHeight: 18 },
  error: { fontSize: 13, color: "#b91c1c", textAlign: "center", marginBottom: 16 },
  loadingText: { fontSize: 13, color: "#64748b", marginTop: 12 },
  emptyIcon: { fontSize: 48, marginBottom: 8 },
  retryButton: {
    backgroundColor: "#0ea5e9",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 999,
  },
  retryText: { color: "white", fontWeight: "600", fontSize: 14 },
});
