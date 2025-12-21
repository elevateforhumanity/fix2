import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function LessonPlayerScreen({ route, navigation }: any) {
  const { moduleId, lessonId } = route.params || {};
  const [completed, setCompleted] = useState(false);

  // Mock lesson data
  const lesson = {
    id: lessonId || '1',
    title: 'Introduction to Hair Cutting',
    module: 'Basic Cutting Techniques',
    duration: '15:30',
    content: `
Welcome to this lesson on hair cutting fundamentals!

In this lesson, you'll learn:
• Proper scissor grip and hand positioning
• Basic cutting angles and techniques
• Safety protocols and sanitation
• Client consultation best practices

Let's get started with the fundamentals that every barber needs to master.

Remember: Practice makes perfect. Take your time to understand each technique before moving on to the next.
    `.trim(),
  };

  const handleMarkComplete = () => {
    setCompleted(true);
    setTimeout(() => {
      navigation.goBack();
    }, 1500);
  };

  return (
    <View style={styles.container}>
      {/* Video Player Placeholder */}
      <View style={styles.videoContainer}>
        <View style={styles.videoPlaceholder}>
          <Text style={styles.videoIcon}>▶️</Text>
          <Text style={styles.videoText}>Video Player</Text>
          <Text style={styles.videoDuration}>{lesson.duration}</Text>
        </View>
      </View>

      {/* Lesson Info */}
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.module}>{lesson.module}</Text>
          <Text style={styles.title}>{lesson.title}</Text>
        </View>

        {/* Lesson Content */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Lesson Overview</Text>
          <Text style={styles.text}>{lesson.content}</Text>
        </View>

        {/* Resources */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resources</Text>
          <TouchableOpacity style={styles.resourceCard}>
            <Text style={styles.resourceIcon}>📄</Text>
            <Text style={styles.resourceText}>Lesson Notes (PDF)</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.resourceCard}>
            <Text style={styles.resourceIcon}>📝</Text>
            <Text style={styles.resourceText}>Practice Worksheet</Text>
          </TouchableOpacity>
        </View>

        {/* Notes Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Notes</Text>
          <TouchableOpacity style={styles.notesButton}>
            <Text style={styles.notesButtonText}>+ Add Note</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Actions */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navButtonText}>← Previous</Text>
        </TouchableOpacity>

        {!completed ? (
          <TouchableOpacity
            style={styles.completeButton}
            onPress={handleMarkComplete}
          >
            <Text style={styles.completeButtonText}>Mark Complete</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.completedBadge}>
            <Text style={styles.completedText}>✅ Completed!</Text>
          </View>
        )}

        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navButtonText}>Next →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f1f5f9' },
  videoContainer: {
    width: '100%',
    height: width * 0.5625,
    backgroundColor: '#000',
  },
  videoPlaceholder: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  videoIcon: { fontSize: 48, marginBottom: 8 },
  videoText: { color: 'white', fontSize: 16, fontWeight: '600' },
  videoDuration: { color: '#94a3b8', fontSize: 14, marginTop: 4 },
  content: { flex: 1 },
  header: {
    backgroundColor: 'white',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  module: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  title: { fontSize: 20, fontWeight: '700', color: '#0f172a' },
  section: { backgroundColor: 'white', padding: 20, marginTop: 12 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 12,
  },
  text: { fontSize: 14, color: '#475569', lineHeight: 22 },
  resourceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  resourceIcon: { fontSize: 24, marginRight: 12 },
  resourceText: { fontSize: 14, color: '#0f172a', fontWeight: '500' },
  notesButton: {
    backgroundColor: '#f8fafc',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderStyle: 'dashed',
    alignItems: 'center',
  },
  notesButtonText: { fontSize: 14, color: '#64748b', fontWeight: '500' },
  bottomBar: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    gap: 12,
  },
  navButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    alignItems: 'center',
  },
  navButtonText: { fontSize: 14, color: '#64748b', fontWeight: '500' },
  completeButton: {
    flex: 2,
    backgroundColor: '#10b981',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  completeButtonText: { color: 'white', fontSize: 14, fontWeight: '700' },
  completedBadge: {
    flex: 2,
    backgroundColor: '#dcfce7',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  completedText: { color: '#16a34a', fontSize: 14, fontWeight: '700' },
});
