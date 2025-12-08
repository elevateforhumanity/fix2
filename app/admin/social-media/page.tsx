'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Plus, Calendar, TrendingUp, Users, Share2, 
  Facebook, Twitter, Linkedin, Instagram, Clock,
  Play, Pause, Edit, Trash2, BarChart3
} from 'lucide-react';

interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'draft';
  frequency: '3x-daily' | 'daily' | 'weekly';
  platforms: string[];
  postsScheduled: number;
  lastPost: string | null;
  nextPost: string | null;
}

export default function SocialMediaPage() {
  const router = useRouter();
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: '1',
      name: 'Barber Program Promotion',
      status: 'active',
      frequency: '3x-daily',
      platforms: ['facebook', 'twitter', 'linkedin'],
      postsScheduled: 90,
      lastPost: '2025-12-07T10:00:00Z',
      nextPost: '2025-12-07T14:00:00Z',
    },
    {
      id: '2',
      name: 'Student Success Stories',
      status: 'active',
      frequency: '3x-daily',
      platforms: ['facebook', 'instagram', 'linkedin'],
      postsScheduled: 60,
      lastPost: '2025-12-07T09:30:00Z',
      nextPost: '2025-12-07T13:30:00Z',
    },
    {
      id: '3',
      name: 'WIOA Eligibility Info',
      status: 'paused',
      frequency: 'daily',
      platforms: ['facebook', 'twitter'],
      postsScheduled: 30,
      lastPost: '2025-12-06T12:00:00Z',
      nextPost: null,
    },
  ]);

  const toggleStatus = (id: string) => {
    setCampaigns(campaigns.map(c => 
      c.id === id 
        ? { ...c, status: c.status === 'active' ? 'paused' : 'active' }
        : c
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Social Media Automation</h1>
              <p className="text-gray-600 mt-1">Auto-post to Facebook, Twitter, LinkedIn, Instagram 3x daily</p>
            </div>
            
            <button
              onClick={() => router.push('/admin/social-media/campaigns/new')}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-4 h-4" />
              <span>Create Campaign</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <Share2 className="w-8 h-8 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {campaigns.filter(c => c.status === 'active').length}
            </div>
            <div className="text-sm text-gray-600">Active Campaigns</div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <Calendar className="w-8 h-8 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {campaigns.reduce((sum, c) => sum + c.postsScheduled, 0)}
            </div>
            <div className="text-sm text-gray-600">Posts Scheduled</div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-8 h-8 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">3x Daily</div>
            <div className="text-sm text-gray-600">Post Frequency</div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8 text-orange-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">4</div>
            <div className="text-sm text-gray-600">Connected Platforms</div>
          </div>
        </div>

        {/* Connected Platforms */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Connected Platforms</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <PlatformCard
              name="Facebook"
              icon={Facebook}
              color="blue"
              connected
              followers="2,847"
            />
            <PlatformCard
              name="Twitter"
              icon={Twitter}
              color="sky"
              connected
              followers="1,234"
            />
            <PlatformCard
              name="LinkedIn"
              icon={Linkedin}
              color="blue"
              connected
              followers="856"
            />
            <PlatformCard
              name="Instagram"
              icon={Instagram}
              color="pink"
              connected
              followers="3,421"
            />
          </div>
        </div>

        {/* Posting Schedule */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Daily Posting Schedule (3x Daily)</h2>
          <div className="space-y-4">
            <ScheduleSlot time="9:00 AM EST" status="completed" campaign="Barber Program Promotion" />
            <ScheduleSlot time="1:00 PM EST" status="upcoming" campaign="Student Success Stories" />
            <ScheduleSlot time="5:00 PM EST" status="scheduled" campaign="WIOA Eligibility Info" />
          </div>
        </div>

        {/* Campaigns List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Your Campaigns</h2>
            <button
              onClick={() => router.push('/admin/social-media/analytics')}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
            >
              <BarChart3 className="w-4 h-4" />
              <span>View Analytics</span>
            </button>
          </div>

          <div className="divide-y divide-gray-200">
            {campaigns.map((campaign) => (
              <div key={campaign.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{campaign.name}</h3>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        campaign.status === 'active' ? 'bg-green-100 text-green-800' :
                        campaign.status === 'paused' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {campaign.status === 'active' ? '● Active' : 
                         campaign.status === 'paused' ? '⏸ Paused' : 
                         '○ Draft'}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-6 text-sm text-gray-600 mb-3">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>{campaign.frequency === '3x-daily' ? '3x Daily' : campaign.frequency}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>{campaign.postsScheduled} posts scheduled</span>
                      </div>
                      {campaign.nextPost && (
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4" />
                          <span>Next: {new Date(campaign.nextPost).toLocaleTimeString()}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center space-x-2">
                      {campaign.platforms.map((platform) => (
                        <span
                          key={platform}
                          className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {platform === 'facebook' && <Facebook className="w-3 h-3 mr-1" />}
                          {platform === 'twitter' && <Twitter className="w-3 h-3 mr-1" />}
                          {platform === 'linkedin' && <Linkedin className="w-3 h-3 mr-1" />}
                          {platform === 'instagram' && <Instagram className="w-3 h-3 mr-1" />}
                          {platform.charAt(0).toUpperCase() + platform.slice(1)}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => toggleStatus(campaign.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        campaign.status === 'active'
                          ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                          : 'bg-green-100 text-green-700 hover:bg-green-200'
                      }`}
                      title={campaign.status === 'active' ? 'Pause' : 'Activate'}
                    >
                      {campaign.status === 'active' ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4" />
                      )}
                    </button>
                    
                    <button
                      onClick={() => router.push(`/admin/social-media/campaigns/${campaign.id}/edit`)}
                      className="p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    
                    <button
                      onClick={() => {
                        if (confirm('Delete this campaign?')) {
                          setCampaigns(campaigns.filter(c => c.id !== campaign.id));
                        }
                      }}
                      className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

interface PlatformCardProps {
  name: string;
  icon: any;
  color: string;
  connected: boolean;
  followers: string;
}

function PlatformCard({ name, icon: Icon, color, connected, followers }: PlatformCardProps) {
  return (
    <div className="border-2 border-gray-200 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <Icon className={`w-8 h-8 text-${color}-600`} />
        {connected && (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            ● Connected
          </span>
        )}
      </div>
      <h3 className="font-semibold text-gray-900 mb-1">{name}</h3>
      <p className="text-sm text-gray-600">{followers} followers</p>
    </div>
  );
}

interface ScheduleSlotProps {
  time: string;
  status: 'completed' | 'upcoming' | 'scheduled';
  campaign: string;
}

function ScheduleSlot({ time, status, campaign }: ScheduleSlotProps) {
  const statusColors = {
    completed: 'bg-green-100 text-green-800',
    upcoming: 'bg-blue-100 text-blue-800',
    scheduled: 'bg-gray-100 text-gray-800',
  };

  return (
    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
      <div className="flex items-center space-x-4">
        <Clock className="w-5 h-5 text-gray-400" />
        <div>
          <div className="font-medium text-gray-900">{time}</div>
          <div className="text-sm text-gray-600">{campaign}</div>
        </div>
      </div>
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}>
        {status === 'completed' ? '✓ Posted' : status === 'upcoming' ? '→ Next' : '○ Scheduled'}
      </span>
    </div>
  );
}
