import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Share,
} from 'react-native';

export default function CertificatesScreen() {
  const certificates = [
    {
      id: '1',
      title: 'Introduction to Barbering',
      issueDate: '2024-12-15',
      credentialId: 'CERT-2024-001',
      status: 'verified',
    },
    {
      id: '2',
      title: 'Advanced Cutting Techniques',
      issueDate: '2024-11-20',
      credentialId: 'CERT-2024-002',
      status: 'verified',
    },
    {
      id: '3',
      title: 'Customer Service Excellence',
      issueDate: '2024-10-10',
      credentialId: 'CERT-2024-003',
      status: 'verified',
    },
  ];

  const handleShare = async (cert: any) => {
    try {
      await Share.share({
        message: `I earned a certificate in ${cert.title}! Credential ID: ${cert.credentialId}`,
        title: 'My Certificate',
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDownload = (cert: any) => {
    // In production, this would download the PDF
    alert(`Downloading certificate: ${cert.title}`);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Certificates</Text>
        <Text style={styles.subtitle}>
          {certificates.length} certificate
          {certificates.length !== 1 ? 's' : ''} earned
        </Text>
      </View>

      {certificates.map((cert) => (
        <View key={cert.id} style={styles.certCard}>
          <View style={styles.certHeader}>
            <View style={styles.certIcon}>
              <Text style={styles.certIconText}>🎓</Text>
            </View>
            <View style={styles.certInfo}>
              <Text style={styles.certTitle}>{cert.title}</Text>
              <Text style={styles.certDate}>Issued: {cert.issueDate}</Text>
              <Text style={styles.certId}>ID: {cert.credentialId}</Text>
            </View>
            {cert.status === 'verified' && (
              <View style={styles.verifiedBadge}>
                <Text style={styles.verifiedText}>✓</Text>
              </View>
            )}
          </View>

          <View style={styles.certActions}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleDownload(cert)}
            >
              <Text style={styles.actionIcon}>📥</Text>
              <Text style={styles.actionText}>Download</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleShare(cert)}
            >
              <Text style={styles.actionIcon}>📤</Text>
              <Text style={styles.actionText}>Share</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionIcon}>🔗</Text>
              <Text style={styles.actionText}>Verify</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      {certificates.length === 0 && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>📜</Text>
          <Text style={styles.emptyTitle}>No Certificates Yet</Text>
          <Text style={styles.emptyText}>
            Complete courses to earn certificates
          </Text>
        </View>
      )}
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
  title: { fontSize: 24, fontWeight: '700', color: '#0f172a', marginBottom: 4 },
  subtitle: { fontSize: 14, color: '#64748b' },
  certCard: {
    backgroundColor: 'white',
    margin: 16,
    marginBottom: 0,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  certHeader: { flexDirection: 'row', marginBottom: 16 },
  certIcon: {
    width: 60,
    height: 60,
    backgroundColor: '#dbeafe',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  certIconText: { fontSize: 32 },
  certInfo: { flex: 1 },
  certTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 4,
  },
  certDate: { fontSize: 12, color: '#64748b', marginBottom: 2 },
  certId: { fontSize: 11, color: '#94a3b8', fontFamily: 'monospace' },
  verifiedBadge: {
    width: 32,
    height: 32,
    backgroundColor: '#10b981',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifiedText: { color: 'white', fontSize: 16, fontWeight: '700' },
  certActions: { flexDirection: 'row', gap: 8 },
  actionButton: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  actionIcon: { fontSize: 20, marginBottom: 4 },
  actionText: { fontSize: 11, color: '#64748b', fontWeight: '500' },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    marginTop: 60,
  },
  emptyIcon: { fontSize: 64, marginBottom: 16 },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 8,
  },
  emptyText: { fontSize: 14, color: '#64748b', textAlign: 'center' },
});
