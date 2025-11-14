"use client"

import { useState, useEffect, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function VideoMeetingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const meetingCode = searchParams.get('code');
  
  const [isInMeeting, setIsInMeeting] = useState(false);
  const [inputCode, setInputCode] = useState('');
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [participants, setParticipants] = useState<string[]>([]);
  
  const localVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (meetingCode) {
      joinMeeting(meetingCode);
    }
  }, [meetingCode]);

  const startLocalStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setLocalStream(stream);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      return stream;
    } catch (error) {
      console.error('Error accessing media devices:', error);
      alert('Could not access camera/microphone. Please check permissions.');
      return null;
    }
  };

  const joinMeeting = async (code: string) => {
    const stream = await startLocalStream();
    if (stream) {
      setIsInMeeting(true);
      setParticipants(['You', 'Participant 2']);
    }
  };

  const createMeeting = async () => {
    const newCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    router.push(`/video?code=${newCode}`);
  };

  const leaveMeeting = () => {
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
    }
    setLocalStream(null);
    setIsInMeeting(false);
    setParticipants([]);
    router.push('/video');
  };

  const toggleMute = () => {
    if (localStream) {
      localStream.getAudioTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsMuted(!isMuted);
    }
  };

  const toggleVideo = () => {
    if (localStream) {
      localStream.getVideoTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsVideoOff(!isVideoOff);
    }
  };

  if (!isInMeeting) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold text-white mb-6 text-center">Video Meeting</h1>
          <div className="space-y-6">
            <button onClick={createMeeting} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg">
              Start New Meeting
            </button>
            <div className="relative"><div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-600"></div></div><div className="relative flex justify-center text-sm"><span className="px-2 bg-gray-800 text-gray-400">Or</span></div></div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Join with code</label>
              <div className="flex gap-2">
                <input type="text" value={inputCode} onChange={(e) => setInputCode(e.target.value.toUpperCase())} placeholder="Enter code" className="flex-1 bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-2" maxLength={6} />
                <button onClick={() => inputCode && joinMeeting(inputCode)} disabled={!inputCode} className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white font-semibold px-6 py-2 rounded-lg">Join</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div><h1 className="text-xl font-semibold text-white">Meeting: {meetingCode}</h1><p className="text-sm text-gray-400">{participants.length} participants</p></div>
          <button onClick={leaveMeeting} className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-lg">Leave</button>
        </div>
      </div>
      <div className="flex-1 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
          <div className="relative bg-gray-800 rounded-lg overflow-hidden">
            <video ref={localVideoRef} autoPlay muted playsInline className="w-full h-full object-cover" />
            <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded">You {isMuted && '(Muted)'}</div>
            {isVideoOff && <div className="absolute inset-0 flex items-center justify-center bg-gray-700"><div className="text-center"><div className="w-20 h-20 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-2"><span className="text-3xl">👤</span></div><p className="text-white">Camera Off</p></div></div>}
          </div>
          {participants.slice(1).map((p, i) => <div key={i} className="bg-gray-800 rounded-lg flex items-center justify-center"><div className="text-center"><div className="w-20 h-20 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-2"><span className="text-3xl">👤</span></div><p className="text-white">{p}</p></div></div>)}
        </div>
      </div>
      <div className="bg-gray-800 border-t border-gray-700 px-6 py-4">
        <div className="flex items-center justify-center gap-4">
          <button onClick={toggleMute} className={`${isMuted ? 'bg-red-600' : 'bg-gray-700'} text-white p-4 rounded-full`}>{isMuted ? '🔇' : '🎤'}</button>
          <button onClick={toggleVideo} className={`${isVideoOff ? 'bg-red-600' : 'bg-gray-700'} text-white p-4 rounded-full`}>{isVideoOff ? '📹' : '📷'}</button>
          <button onClick={() => { navigator.clipboard.writeText(meetingCode || ''); alert('Code copied!'); }} className="bg-gray-700 text-white px-6 py-3 rounded-lg">Copy Code</button>
        </div>
      </div>
    </div>
  );
}

export default function VideoMeetingPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <VideoMeetingContent />
    </Suspense>
  );
}
