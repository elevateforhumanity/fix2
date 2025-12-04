'use client';

import { useState } from 'react';
import { Video, VideoOff, Mic, MicOff, Monitor, MonitorOff, Users, Calendar, Clock, Plus, X, Settings, Copy, Check, Phone, PhoneOff, MessageSquare, Grid, Maximize2 } from 'lucide-react';

interface Meeting {
  id: string;
  title: string;
  host: string;
  date: string;
  time: string;
  duration: string;
  participants: number;
  status: 'upcoming' | 'live' | 'ended';
  meetingLink: string;
  recordingAvailable: boolean;
}

interface Participant {
  id: string;
  name: string;
  avatar: string;
  isMuted: boolean;
  isVideoOn: boolean;
  isHost: boolean;
}

export default function VideoConferencingPage() {
  const [meetings, setMeetings] = useState<Meeting[]>([
    {
      id: '1',
      title: 'Web Development Class',
      host: 'Dr. Sarah Johnson',
      date: '2024-12-05',
      time: '14:00',
      duration: '1 hour',
      participants: 24,
      status: 'upcoming',
      meetingLink: 'https://meet.example.com/abc-123',
      recordingAvailable: false,
    },
    {
      id: '2',
      title: 'Study Group Session',
      host: 'Michael Chen',
      date: '2024-12-04',
      time: '18:00',
      duration: '2 hours',
      participants: 8,
      status: 'live',
      meetingLink: 'https://meet.example.com/xyz-789',
      recordingAvailable: false,
    },
    {
      id: '3',
      title: 'Career Counseling',
      host: 'Emily Davis',
      date: '2024-12-03',
      time: '10:00',
      duration: '30 minutes',
      participants: 2,
      status: 'ended',
      meetingLink: 'https://meet.example.com/def-456',
      recordingAvailable: true,
    },
  ]);

  const [participants] = useState<Participant[]>([
    { id: '1', name: 'Dr. Sarah Johnson', avatar: 'SJ', isMuted: false, isVideoOn: true, isHost: true },
    { id: '2', name: 'John Doe', avatar: 'JD', isMuted: false, isVideoOn: true, isHost: false },
    { id: '3', name: 'Jane Smith', avatar: 'JS', isMuted: true, isVideoOn: false, isHost: false },
    { id: '4', name: 'Mike Wilson', avatar: 'MW', isMuted: false, isVideoOn: true, isHost: false },
  ]);

  const [showNewMeeting, setShowNewMeeting] = useState(false);
  const [showMeetingDetails, setShowMeetingDetails] = useState<Meeting | null>(null);
  const [inMeeting, setInMeeting] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [copied, setCopied] = useState(false);

  const upcomingMeetings = meetings.filter(m => m.status === 'upcoming');
  const liveMeetings = meetings.filter(m => m.status === 'live');
  const totalParticipants = meetings.reduce((sum, m) => sum + m.participants, 0);

  const handleCopyLink = (link: string) => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleJoinMeeting = () => {
    setInMeeting(true);
  };

  const handleLeaveMeeting = () => {
    setInMeeting(false);
    setIsMuted(false);
    setIsVideoOn(true);
    setIsScreenSharing(false);
  };

  if (inMeeting) {
    return (
      <div className="fixed inset-0 bg-gray-900 z-50">
        <div className="h-full flex flex-col">
          {/* Video Grid */}
          <div className="flex-1 p-4">
            <div className="grid grid-cols-2 gap-4 h-full">
              {participants.map((participant) => (
                <div key={participant.id} className="relative bg-gray-800 rounded-lg overflow-hidden">
                  {participant.isVideoOn ? (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600">
                      <div className="text-white text-6xl font-bold">{participant.avatar}</div>
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-700">
                      <VideoOff className="text-gray-400" size={48} />
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <span className="px-3 py-1 bg-black/50 text-white text-sm rounded-full">
                      {participant.name}
                      {participant.isHost && ' (Host)'}
                    </span>
                    {participant.isMuted && (
                      <div className="p-1 bg-red-500 rounded-full">
                        <MicOff size={14} className="text-white" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="bg-gray-800 p-4">
            <div className="container mx-auto flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-white font-semibold">Web Development Class</span>
                <span className="px-2 py-1 bg-red-500 text-white text-xs rounded">LIVE</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className={`p-4 rounded-full ${isMuted ? 'bg-red-500' : 'bg-gray-700'} hover:bg-opacity-80 transition`}
                >
                  {isMuted ? <MicOff className="text-white" size={20} /> : <Mic className="text-white" size={20} />}
                </button>

                <button
                  onClick={() => setIsVideoOn(!isVideoOn)}
                  className={`p-4 rounded-full ${!isVideoOn ? 'bg-red-500' : 'bg-gray-700'} hover:bg-opacity-80 transition`}
                >
                  {isVideoOn ? <Video className="text-white" size={20} /> : <VideoOff className="text-white" size={20} />}
                </button>

                <button
                  onClick={() => setIsScreenSharing(!isScreenSharing)}
                  className={`p-4 rounded-full ${isScreenSharing ? 'bg-blue-500' : 'bg-gray-700'} hover:bg-opacity-80 transition`}
                >
                  {isScreenSharing ? <MonitorOff className="text-white" size={20} /> : <Monitor className="text-white" size={20} />}
                </button>

                <button className="p-4 rounded-full bg-gray-700 hover:bg-opacity-80 transition">
                  <MessageSquare className="text-white" size={20} />
                </button>

                <button className="p-4 rounded-full bg-gray-700 hover:bg-opacity-80 transition">
                  <Users className="text-white" size={20} />
                </button>

                <button className="p-4 rounded-full bg-gray-700 hover:bg-opacity-80 transition">
                  <Grid className="text-white" size={20} />
                </button>

                <button className="p-4 rounded-full bg-gray-700 hover:bg-opacity-80 transition">
                  <Settings className="text-white" size={20} />
                </button>

                <button
                  onClick={handleLeaveMeeting}
                  className="px-6 py-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition flex items-center gap-2"
                >
                  <PhoneOff size={20} />
                  Leave
                </button>
              </div>

              <div className="flex items-center gap-2 text-white">
                <Clock size={16} />
                <span className="text-sm">45:23</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Video Conferencing</h1>
            <p className="text-gray-600 mt-1">Join classes and meetings</p>
          </div>
          <button
            onClick={() => setShowNewMeeting(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus size={20} />
            Schedule Meeting
          </button>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <Video className="text-blue-600 mb-3" size={32} />
            <p className="text-2xl font-bold">{meetings.length}</p>
            <p className="text-sm text-gray-600">Total Meetings</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <Calendar className="text-green-600 mb-3" size={32} />
            <p className="text-2xl font-bold">{upcomingMeetings.length}</p>
            <p className="text-sm text-gray-600">Upcoming</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <Users className="text-purple-600 mb-3" size={32} />
            <p className="text-2xl font-bold">{totalParticipants}</p>
            <p className="text-sm text-gray-600">Total Participants</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <Clock className="text-orange-600 mb-3" size={32} />
            <p className="text-2xl font-bold">{liveMeetings.length}</p>
            <p className="text-sm text-gray-600">Live Now</p>
          </div>
        </div>

        {liveMeetings.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-red-900 mb-4 flex items-center gap-2">
              <Video size={20} />
              Live Meetings
            </h3>
            <div className="space-y-3">
              {liveMeetings.map((meeting) => (
                <div key={meeting.id} className="bg-white rounded-lg p-4 flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">{meeting.title}</h4>
                    <p className="text-sm text-gray-600">Hosted by {meeting.host}</p>
                  </div>
                  <button
                    onClick={handleJoinMeeting}
                    className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center gap-2"
                  >
                    <Video size={16} />
                    Join Now
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">All Meetings</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {meetings.map((meeting) => (
                <div key={meeting.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-lg">{meeting.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          meeting.status === 'live' ? 'bg-red-100 text-red-700' :
                          meeting.status === 'upcoming' ? 'bg-blue-100 text-blue-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {meeting.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">Hosted by {meeting.host}</p>
                      <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Calendar size={16} />
                          <span>{new Date(meeting.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock size={16} />
                          <span>{meeting.time} ({meeting.duration})</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users size={16} />
                          <span>{meeting.participants} participants</span>
                        </div>
                        {meeting.recordingAvailable && (
                          <div className="flex items-center gap-2 text-green-600">
                            <Video size={16} />
                            <span>Recording available</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 ml-4">
                      {meeting.status === 'live' && (
                        <button
                          onClick={handleJoinMeeting}
                          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm whitespace-nowrap"
                        >
                          Join Now
                        </button>
                      )}
                      {meeting.status === 'upcoming' && (
                        <button
                          onClick={() => handleCopyLink(meeting.meetingLink)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm whitespace-nowrap flex items-center gap-2"
                        >
                          {copied ? <Check size={16} /> : <Copy size={16} />}
                          Copy Link
                        </button>
                      )}
                      {meeting.recordingAvailable && (
                        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm whitespace-nowrap">
                          Watch Recording
                        </button>
                      )}
                      <button
                        onClick={() => setShowMeetingDetails(meeting)}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm whitespace-nowrap"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {showNewMeeting && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Schedule Meeting</h3>
                <button onClick={() => setShowNewMeeting(false)} className="text-gray-500 hover:text-gray-700">
                  <X size={24} />
                </button>
              </div>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Meeting Title</label>
                  <input type="text" required className="w-full px-4 py-2 border rounded-lg" placeholder="e.g., Study Group Session" />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Date</label>
                    <input type="date" required className="w-full px-4 py-2 border rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Time</label>
                    <input type="time" required className="w-full px-4 py-2 border rounded-lg" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Duration</label>
                  <select required className="w-full px-4 py-2 border rounded-lg">
                    <option value="30">30 minutes</option>
                    <option value="60">1 hour</option>
                    <option value="90">1.5 hours</option>
                    <option value="120">2 hours</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Description (Optional)</label>
                  <textarea className="w-full px-4 py-2 border rounded-lg" rows={3} placeholder="Meeting agenda or notes..." />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Enable waiting room</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-sm">Record meeting</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Mute participants on entry</span>
                  </label>
                </div>
                <div className="flex gap-3 pt-4">
                  <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Schedule Meeting
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowNewMeeting(false)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showMeetingDetails && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Meeting Details</h3>
                <button onClick={() => setShowMeetingDetails(null)} className="text-gray-500 hover:text-gray-700">
                  <X size={24} />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-lg mb-2">{showMeetingDetails.title}</h4>
                  <p className="text-gray-600">Hosted by {showMeetingDetails.host}</p>
                </div>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Date:</p>
                    <p className="font-semibold">{new Date(showMeetingDetails.date).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Time:</p>
                    <p className="font-semibold">{showMeetingDetails.time}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Duration:</p>
                    <p className="font-semibold">{showMeetingDetails.duration}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Participants:</p>
                    <p className="font-semibold">{showMeetingDetails.participants}</p>
                  </div>
                </div>
                <div>
                  <p className="text-gray-600 mb-2">Meeting Link:</p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={showMeetingDetails.meetingLink}
                      readOnly
                      className="flex-1 px-4 py-2 border rounded-lg bg-gray-50"
                    />
                    <button
                      onClick={() => handleCopyLink(showMeetingDetails.meetingLink)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      {copied ? <Check size={16} /> : <Copy size={16} />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
