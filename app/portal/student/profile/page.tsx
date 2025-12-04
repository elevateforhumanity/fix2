import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { User, Mail, Phone, MapPin, Briefcase, GraduationCap } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Profile | Student Portal',
  description: 'Manage your profile',
};

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">My Profile</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <User size={64} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold">{profile?.full_name || 'Student'}</h2>
                <p className="text-gray-600">{user.email}</p>
                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-full">
                  Edit Profile
                </button>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <h3 className="text-xl font-semibold">Personal Information</h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="text-gray-400" size={20} />
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="text-gray-400" size={20} />
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-medium">{profile?.phone || 'Not provided'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="text-gray-400" size={20} />
                  <div>
                    <p className="text-sm text-gray-600">Location</p>
                    <p className="font-medium">{profile?.location || 'Not provided'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <h3 className="text-xl font-semibold">Education</h3>
              </div>
              <div className="p-6">
                <div className="flex items-start gap-3">
                  <GraduationCap className="text-gray-400 mt-1" size={20} />
                  <div>
                    <p className="font-medium">Current Programs</p>
                    <p className="text-gray-600 text-sm mt-1">View your enrolled programs</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Work Experience */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <h3 className="text-xl font-semibold">Work Experience</h3>
              </div>
              <div className="p-6">
                <div className="flex items-start gap-3">
                  <Briefcase className="text-gray-400 mt-1" size={20} />
                  <div>
                    <p className="font-medium">Add your work experience</p>
                    <p className="text-gray-600 text-sm mt-1">Showcase your professional background</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
