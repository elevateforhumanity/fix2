'use client';

import { useState } from 'react';
import { Calendar } from 'lucide-react';

export default function ContentCalendar() {
  const [posts, setPosts] = useState([
    { date: '2025-12-27', platform: 'LinkedIn', content: 'Free HVAC training starting soon!' },
    { date: '2025-12-28', platform: 'Facebook', content: 'Student success story' },
    { date: '2025-12-29', platform: 'YouTube', content: 'Program overview video' },
  ]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex items-center gap-3 mb-6">
        <Calendar className="w-6 h-6" />
        <h2 className="text-2xl font-bold">Content Calendar</h2>
      </div>
      
      <div className="space-y-3">
        {posts.map((post, i) => (
          <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <div className="font-medium">{post.date}</div>
              <div className="text-sm text-gray-600">{post.platform}</div>
            </div>
            <div className="flex-1 mx-4 text-sm">{post.content}</div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">Edit</button>
          </div>
        ))}
      </div>
    </div>
  );
}
