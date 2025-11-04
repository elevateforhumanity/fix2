import React from 'react';
/**
 * Admin Community Page
 * Manage forums, badges, and leaderboards
 *
 * Copyright (c) 2025 Elevate for Humanity
 */

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../hooks/useAuth';
import { useOrg } from '../../hooks/useOrg';

interface Thread {
  id: string;
  title: string;
  created_at: string;
  created_by: string;
  creator?: { email: string };
}

interface Badge {
  id: string;
  key: string;
  name: string;
  description: string;
}

interface LeaderboardEntry {
  org_id: string;
  user_id: string;
  points: number;
  user?: { email: string };
}

export default function Community() {
  const { user } = useAuth();
  const { currentOrg } = useOrg(user?.id || null);
  const [threads, setThreads] = useState<Thread[]>([]);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  // Thread form
  const [threadTitle, setThreadTitle] = useState('');
  const [creatingThread, setCreatingThread] = useState(false);

  // Badge form
  const [badgeKey, setBadgeKey] = useState('');
  const [badgeName, setBadgeName] = useState('');
  const [badgeDesc, setBadgeDesc] = useState('');
  const [creatingBadge, setCreatingBadge] = useState(false);
  const [showBadgeModal, setShowBadgeModal] = useState(false);

  useEffect(() => {
    if (currentOrg) {
      loadCommunityData();
    }
  }, [currentOrg]);

  async function loadCommunityData() {
    if (!currentOrg) return;

    try {
      setLoading(true);

      const [threadsRes, badgesRes, leaderboardRes] = await Promise.all([
        supabase
          .from('forum_threads')
          .select('*, creator:auth.users!forum_threads_created_by_fkey(email)')
          .eq('org_id', currentOrg.id)
          .order('created_at', { ascending: false }),
        supabase
          .from('badges')
          .select('*')
          .eq('org_id', currentOrg.id)
          .order('created_at', { ascending: false }),
        supabase
          .from('leaderboards')
          .select('*, user:auth.users(email)')
          .eq('org_id', currentOrg.id)
          .order('points', { ascending: false })
          .limit(20),
      ]);

      setThreads((threadsRes.data as any) || []);
      setBadges((badgesRes.data as any) || []);
      setLeaderboard((leaderboardRes.data as any) || []);
    } catch (error) {
      console.error('Failed to load community data:', error);
      alert('Failed to load community data');
    } finally {
      setLoading(false);
    }
  }

  async function createThread() {
    if (!currentOrg || !user || !threadTitle.trim()) return;

    try {
      setCreatingThread(true);

      const { error } = await supabase.from('forum_threads').insert({
        org_id: currentOrg.id,
        title: threadTitle,
        created_by: user.id,
      });

      if (error) throw error;

      setThreadTitle('');
      await loadCommunityData();
      alert('Thread created successfully!');
    } catch (error: any) {
      console.error('Failed to create thread:', error);
      alert('Failed to create thread: ' + error.message);
    } finally {
      setCreatingThread(false);
    }
  }

  async function createBadge() {
    if (!currentOrg || !badgeKey.trim() || !badgeName.trim()) return;

    try {
      setCreatingBadge(true);

      const { error } = await supabase.from('badges').insert({
        org_id: currentOrg.id,
        key: badgeKey,
        name: badgeName,
        description: badgeDesc,
      });

      if (error) throw error;

      setBadgeKey('');
      setBadgeName('');
      setBadgeDesc('');
      setShowBadgeModal(false);
      await loadCommunityData();
      alert('Badge created successfully!');
    } catch (error: any) {
      console.error('Failed to create badge:', error);
      alert('Failed to create badge: ' + error.message);
    } finally {
      setCreatingBadge(false);
    }
  }

  async function awardBadge(badgeId: string, userId: string) {
    if (!currentOrg) return;

    try {
      const { error } = await supabase.from('user_badges').insert({
        org_id: currentOrg.id,
        user_id: userId,
        badge_id: badgeId,
      });

      if (error) throw error;
      alert('Badge awarded!');
    } catch (error: any) {
      console.error('Failed to award badge:', error);
      alert('Failed to award badge: ' + error.message);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Community</h1>
        <p className="mt-2 text-gray-600">
          Manage forums, badges, and leaderboards
        </p>
      </div>
      {/* Forum Threads */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Forum Threads</h2>
        </div>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={threadTitle}
            onChange={(e) => setThreadTitle(e.target.value)}
            placeholder="New thread title"
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={createThread}
            disabled={creatingThread || !threadTitle.trim()}
            className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {creatingThread ? 'Creating...' : 'Create Thread'}
          </button>
        </div>
        <div className="space-y-2">
          {threads.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No threads yet. Create the first one!
            </div>
          ) : (
            threads.map((thread) => (
              <div
                key={thread.id}
                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
              >
                <div className="font-semibold text-gray-900">
                  {thread.title}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  by {thread.creator?.email || 'Unknown'} •{' '}
                  {new Date(thread.created_at).toLocaleString()}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      {/* Leaderboard */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Leaderboard
        </h2>
        <div className="space-y-2">
          {leaderboard.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No leaderboard entries yet
            </div>
          ) : (
            leaderboard.map((entry, index) => (
              <div
                key={entry.user_id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`text-2xl font-bold ${
                      index === 0
                        ? 'text-yellow-500'
                        : index === 1
                          ? 'text-gray-400'
                          : index === 2
                            ? 'text-orange-600'
                            : 'text-gray-400'
                    }`}
                  >
                    #{index + 1}
                  </span>
                  <span className="font-medium">
                    {entry.user?.email || 'Unknown'}
                  </span>
                </div>
                <span className="font-bold text-lg">{entry.points} pts</span>
              </div>
            ))
          )}
        </div>
      </div>
      {/* Badges */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Badges</h2>
          <button
            onClick={() => setShowBadgeModal(true)}
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
          >
            Create Badge
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {badges.length === 0 ? (
            <div className="col-span-3 text-center py-8 text-gray-500">
              No badges yet. Create the first one!
            </div>
          ) : (
            badges.map((badge) => (
              <div
                key={badge.id}
                className="border border-gray-200 rounded-lg p-4 text-center hover:shadow-md transition-shadow"
              >
                <div className="text-4xl mb-2">🏆</div>
                <div className="font-semibold text-gray-900">{badge.name}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {badge.description}
                </div>
                <div className="text-xs text-gray-400 mt-2">
                  Key: {badge.key}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      {/* Create Badge Modal */}
      {showBadgeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Create New Badge
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Badge Key *
                </label>
                <input
                  type="text"
                  value={badgeKey}
                  onChange={(e) => setBadgeKey(e.target.value)}
                  placeholder="founder"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Badge Name *
                </label>
                <input
                  type="text"
                  value={badgeName}
                  onChange={(e) => setBadgeName(e.target.value)}
                  placeholder="Founder Badge"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={badgeDesc}
                  onChange={(e) => setBadgeDesc(e.target.value)}
                  placeholder="Early supporter & facilitator"
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => {
                  setShowBadgeModal(false);
                  setBadgeKey('');
                  setBadgeName('');
                  setBadgeDesc('');
                }}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={createBadge}
                disabled={
                  creatingBadge || !badgeKey.trim() || !badgeName.trim()
                }
                className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {creatingBadge ? 'Creating...' : 'Create Badge'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
