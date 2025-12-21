import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { AppHeader } from '../components/AppHeader';

interface LeaderboardEntry {
  rank: number;
  user_id: string;
  name: string;
  avatar_url?: string;
  points: number;
  badges_count: number;
  courses_completed: number;
  streak_days: number;
  is_current_user?: boolean;
}

type TimeFrame = 'week' | 'month' | 'all';

export default function LeaderboardScreen({ navigation }: any) {
  const { user } = useAuth();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [currentUserRank, setCurrentUserRank] =
    useState<LeaderboardEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('week');

  useEffect(() => {
    loadLeaderboard();
  }, [timeFrame]);

  const loadLeaderboard = async () => {
    try {
      setLoading(true);

      // Fetch leaderboard data
      const { data, error } = await supabase
        .from('leaderboard')
        .select('*')
        .eq('timeframe', timeFrame)
        .order('rank', { ascending: true })
        .limit(50);

      if (error) throw error;

      const leaderboardData =
        data?.map((entry: any) => ({
          ...entry,
          is_current_user: entry.user_id === user?.id,
        })) || [];

      setLeaderboard(leaderboardData);

      // Find current user's rank
      const userEntry = leaderboardData.find((entry) => entry.is_current_user);
      if (userEntry) {
        setCurrentUserRank(userEntry);
      } else {
        // User not in top 50, fetch their rank separately
        const { data: userData } = await supabase
          .from('leaderboard')
          .select('*')
          .eq('timeframe', timeFrame)
          .eq('user_id', user?.id)
          .single();

        if (userData) {
          setCurrentUserRank({ ...userData, is_current_user: true });
        }
      }
    } catch (error) {
      console.error('Error loading leaderboard:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadLeaderboard();
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return null;
  };

  const getRankColor = (rank: number) => {
    if (rank === 1) return '#F59E0B';
    if (rank === 2) return '#9CA3AF';
    if (rank === 3) return '#CD7F32';
    return '#6B7280';
  };

  const renderLeaderboardEntry = (entry: LeaderboardEntry, index: number) => {
    const rankIcon = getRankIcon(entry.rank);
    const rankColor = getRankColor(entry.rank);

    return (
      <View
        key={entry.user_id}
        style={[
          styles.entryCard,
          entry.is_current_user && styles.currentUserCard,
        ]}
      >
        <View style={styles.rankContainer}>
          {rankIcon ? (
            <Text style={styles.rankIcon}>{rankIcon}</Text>
          ) : (
            <Text style={[styles.rankNumber, { color: rankColor }]}>
              {entry.rank}
            </Text>
          )}
        </View>

        <View style={styles.avatarContainer}>
          {entry.avatar_url ? (
            <Image source={{ uri: entry.avatar_url }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Ionicons name="person" size={24} color="#9CA3AF" />
            </View>
          )}
          {entry.is_current_user && (
            <View style={styles.currentUserBadge}>
              <Text style={styles.currentUserBadgeText}>You</Text>
            </View>
          )}
        </View>

        <View style={styles.entryInfo}>
          <Text style={styles.entryName} numberOfLines={1}>
            {entry.name}
          </Text>
          <View style={styles.entryStats}>
            <View style={styles.statItem}>
              <Ionicons name="trophy" size={12} color="#F59E0B" />
              <Text style={styles.statText}>{entry.badges_count}</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="checkmark-circle" size={12} color="#10B981" />
              <Text style={styles.statText}>{entry.courses_completed}</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="flame" size={12} color="#EF4444" />
              <Text style={styles.statText}>{entry.streak_days}d</Text>
            </View>
          </View>
        </View>

        <View style={styles.pointsContainer}>
          <Text style={styles.pointsValue}>
            {entry.points.toLocaleString()}
          </Text>
          <Text style={styles.pointsLabel}>pts</Text>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <AppHeader title="Leaderboard" showBack />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4F46E5" />
          <Text style={styles.loadingText}>Loading leaderboard...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <AppHeader title="Leaderboard" showBack />

      <View style={styles.timeFrameContainer}>
        <TouchableOpacity
          style={[
            styles.timeFrameButton,
            timeFrame === 'week' && styles.timeFrameButtonActive,
          ]}
          onPress={() => setTimeFrame('week')}
        >
          <Text
            style={[
              styles.timeFrameText,
              timeFrame === 'week' && styles.timeFrameTextActive,
            ]}
          >
            This Week
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.timeFrameButton,
            timeFrame === 'month' && styles.timeFrameButtonActive,
          ]}
          onPress={() => setTimeFrame('month')}
        >
          <Text
            style={[
              styles.timeFrameText,
              timeFrame === 'month' && styles.timeFrameTextActive,
            ]}
          >
            This Month
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.timeFrameButton,
            timeFrame === 'all' && styles.timeFrameButtonActive,
          ]}
          onPress={() => setTimeFrame('all')}
        >
          <Text
            style={[
              styles.timeFrameText,
              timeFrame === 'all' && styles.timeFrameTextActive,
            ]}
          >
            All Time
          </Text>
        </TouchableOpacity>
      </View>

      {currentUserRank && currentUserRank.rank > 50 && (
        <View style={styles.currentUserRankCard}>
          <Text style={styles.currentUserRankTitle}>Your Rank</Text>
          {renderLeaderboardEntry(currentUserRank, -1)}
        </View>
      )}

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {leaderboard.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="trophy-outline" size={64} color="#9CA3AF" />
            <Text style={styles.emptyStateText}>No leaderboard data yet</Text>
            <Text style={styles.emptyStateSubtext}>
              Complete courses and earn badges to appear on the leaderboard!
            </Text>
          </View>
        ) : (
          leaderboard.map((entry, index) =>
            renderLeaderboardEntry(entry, index)
          )
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#6B7280',
  },
  timeFrameContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 8,
  },
  timeFrameButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
  },
  timeFrameButtonActive: {
    backgroundColor: '#4F46E5',
    borderColor: '#4F46E5',
  },
  timeFrameText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#6B7280',
  },
  timeFrameTextActive: {
    color: '#fff',
  },
  currentUserRankCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#EEF2FF',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#4F46E5',
  },
  currentUserRankTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4F46E5',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  entryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  currentUserCard: {
    backgroundColor: '#EEF2FF',
    borderWidth: 2,
    borderColor: '#4F46E5',
  },
  rankContainer: {
    width: 40,
    alignItems: 'center',
  },
  rankIcon: {
    fontSize: 24,
  },
  rankNumber: {
    fontSize: 18,
    fontWeight: '700',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  avatarPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  currentUserBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    backgroundColor: '#4F46E5',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#fff',
  },
  currentUserBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#fff',
  },
  entryInfo: {
    flex: 1,
  },
  entryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  entryStats: {
    flexDirection: 'row',
    gap: 12,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  pointsContainer: {
    alignItems: 'flex-end',
  },
  pointsValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4F46E5',
  },
  pointsLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 64,
    paddingHorizontal: 32,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginTop: 16,
    textAlign: 'center',
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 8,
    textAlign: 'center',
  },
});
