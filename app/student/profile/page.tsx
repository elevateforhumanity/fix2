'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { User, Mail, Phone, MapPin, Calendar, Edit, Save } from 'lucide-react';
import { useState } from 'react';

export default function StudentProfilePage() {
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '(555) 123-4567',
    address: '123 Main St',
    city: 'Milwaukee',
    state: 'WI',
    zip: '53202',
    dateOfBirth: '1995-05-15',
    enrollmentDate: '2024-01-15',
    program: 'HVAC Technician Training',
    studentId: 'STU-2024-001',
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">My Profile</h1>
              <p className="text-slate-600 mt-1">Manage your personal information</p>
            </div>
            <Button 
              variant={editing ? 'primary' : 'outline'}
              onClick={() => setEditing(!editing)}
            >
              {editing ? (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              ) : (
                <>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Summary */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-32 h-32 bg-red-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <User className="h-16 w-16 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-1">
                  {profile.firstName} {profile.lastName}
                </h2>
                <p className="text-slate-600 mb-4">{profile.program}</p>
                <Badge variant="success" className="mb-4">Active Student</Badge>
                <div className="space-y-2 text-sm text-slate-600">
                  <div className="flex items-center justify-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Enrolled: {profile.enrollmentDate}
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <User className="h-4 w-4" />
                    ID: {profile.studentId}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      First Name
                    </label>
                    <Input
                      value={profile.firstName}
                      disabled={!editing}
                      onChange={(e) => setProfile({...profile, firstName: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Last Name
                    </label>
                    <Input
                      value={profile.lastName}
                      disabled={!editing}
                      onChange={(e) => setProfile({...profile, lastName: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Email
                    </label>
                    <Input
                      type="email"
                      value={profile.email}
                      disabled={!editing}
                      onChange={(e) => setProfile({...profile, email: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Phone
                    </label>
                    <Input
                      type="tel"
                      value={profile.phone}
                      disabled={!editing}
                      onChange={(e) => setProfile({...profile, phone: e.target.value})}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Date of Birth
                    </label>
                    <Input
                      type="date"
                      value={profile.dateOfBirth}
                      disabled={!editing}
                      onChange={(e) => setProfile({...profile, dateOfBirth: e.target.value})}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Address</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Street Address
                    </label>
                    <Input
                      value={profile.address}
                      disabled={!editing}
                      onChange={(e) => setProfile({...profile, address: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      City
                    </label>
                    <Input
                      value={profile.city}
                      disabled={!editing}
                      onChange={(e) => setProfile({...profile, city: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      State
                    </label>
                    <Input
                      value={profile.state}
                      disabled={!editing}
                      onChange={(e) => setProfile({...profile, state: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      ZIP Code
                    </label>
                    <Input
                      value={profile.zip}
                      disabled={!editing}
                      onChange={(e) => setProfile({...profile, zip: e.target.value})}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Program Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Current Program
                    </label>
                    <Input value={profile.program} disabled />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Enrollment Date
                    </label>
                    <Input value={profile.enrollmentDate} disabled />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Student ID
                    </label>
                    <Input value={profile.studentId} disabled />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
