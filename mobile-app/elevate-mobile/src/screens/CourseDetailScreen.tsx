import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

export default function CourseDetailScreen({ route, navigation }: any) {
  const { courseId } = route.params || {};
  const [loading, setLoading] = useState(false);
  const [enrolled, setEnrolled] = useState(false);

  // Mock course data
  const course = {
    id: courseId || '1',
    title: 'Introduction to Barbering',
    description:
      'Learn the fundamentals of barbering including cutting techniques, styling, and customer service.',
    instructor: 'Master Barber John Smith',
    duration: '12 weeks',
    modules: 8,
    students: 156,
    rating: 4.8,
    progress: enrolled ? 35 : 0,
  };

  const modules = [
    { id: 1, title: 'Introduction & Safety', lessons: 5, completed: true },
    { id: 2, title: 'Basic Cutting Techniques', lessons: 8, completed: true },
    { id: 3, title: 'Advanced Styling', lessons: 6, completed: false },
    { id: 4, title: 'Customer Service', lessons: 4, completed: false },
    { id: 5, title: 'Business Basics', lessons: 5, completed: false },
  ];

  const handleEnroll = () => {
    setLoading(true);
    setTimeout(() => {
      setEnrolled(true);
      setLoading(false);
    }, 1000);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>{course.title}</Text>
        <View style={styles.meta}>
          <Text style={styles.metaText}>⭐ {course.rating}</Text>
          <Text style={styles.metaText}>👥 {course.students} students</Text>
          <Text style={styles.metaText}>⏱️ {course.duration}</Text>
        </View>
      </View>

      {/* Description */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About This Course</Text>
        <Text style={styles.description}>{course.description}</Text>
        <Text style={styles.instructor}>Instructor: {course.instructor}</Text>
      </View>

      {/* Progress (if enrolled) */}
      {enrolled && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Progress</Text>
          <View style={styles.progressBar}>
            <View
              style={[styles.progressFill, { width: `${course.progress}%` }]}
            />
          </View>
          <Text style={styles.progressText}>{course.progress}% Complete</Text>
        </View>
      )}

      {/* Modules */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Course Modules ({course.modules})
        </Text>
        {modules.map((module) => (
          <TouchableOpacity
            key={module.id}
            style={styles.moduleCard}
            onPress={() =>
              enrolled &&
              navigation.navigate('LessonPlayer', { moduleId: module.id })
            }
            disabled={!enrolled}
          >
            <View style={styles.moduleHeader}>
              <Text style={styles.moduleTitle}>
                {module.completed ? '✅' : '📚'} {module.title}
              </Text>
              <Text style={styles.moduleLessons}>{module.lessons} lessons</Text>
            </View>
            {!enrolled && (
              <Text style={styles.locked}>🔒 Enroll to access</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Enroll Button */}
      {!enrolled && (
        <TouchableOpacity
          style={styles.enrollButton}
          onPress={handleEnroll}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.enrollButtonText}>Enroll Now - Free</Text>
          )}
        </TouchableOpacity>
      )}

      {enrolled && (
        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => navigation.navigate('LessonPlayer', { moduleId: 3 })}
        >
          <Text style={styles.continueButtonText}>Continue Learning →</Text>
        </TouchableOpacity>
      )}

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f1f5f9' },
  header: {
    backgroundColor: 'white',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 12,
  },
  meta: { flexDirection: 'row', gap: 16 },
  metaText: { fontSize: 14, color: '#64748b' },
  section: { backgroundColor: 'white', padding: 20, marginTop: 12 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 22,
    marginBottom: 12,
  },
  instructor: { fontSize: 14, color: '#64748b', fontStyle: 'italic' },
  progressBar: {
    height: 8,
    backgroundColor: '#e2e8f0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: { height: '100%', backgroundColor: '#0ea5e9' },
  progressText: { fontSize: 12, color: '#64748b', textAlign: 'right' },
  moduleCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  moduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  moduleTitle: { fontSize: 14, fontWeight: '600', color: '#0f172a', flex: 1 },
  moduleLessons: { fontSize: 12, color: '#64748b' },
  locked: { fontSize: 12, color: '#94a3b8', marginTop: 8 },
  enrollButton: {
    backgroundColor: '#0ea5e9',
    margin: 20,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  enrollButtonText: { color: 'white', fontSize: 16, fontWeight: '700' },
  continueButton: {
    backgroundColor: '#10b981',
    margin: 20,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  continueButtonText: { color: 'white', fontSize: 16, fontWeight: '700' },
});
