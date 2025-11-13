'use client';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Clock, FileText, Download, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { MOUStatusBadge, MOUStatusAlert } from '@/components/MOUStatusBadge';

type ProgramHolderData = {
  program_holder_id: string;
  program_holder_name: string;
  status: string;
  payout_share: number;
  mou_status: string;
  mou_signed_at: string | null;
  contact_name: string | null;
  contact_email: string | null;
};

export default function ProgramHolderDashboard() {
  const [data, setData] = useState<ProgramHolderData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await fetch('/api/program-holder/mou-data');
      const result = await res.json();
      setData(result);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { color: string; icon: any }> = {
      pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
      approved: { color: 'bg-green-100 text-green-800', icon: CheckCircle2 },
      inactive: { color: 'bg-gray-100 text-gray-800', icon: AlertCircle },
    };
    const variant = variants[status] || variants.pending;
    const Icon = variant.icon;
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${variant.color}`}>
        <Icon className="h-4 w-4" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getMouStatusBadge = (mouStatus: string) => {
    const colors: Record<string, string> = {
      not_sent: 'bg-gray-100 text-gray-800',
      sent: 'bg-blue-100 text-blue-800',
      signed: 'bg-green-100 text-green-800',
    };
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${colors[mouStatus] || colors.not_sent}`}>
        <FileText className="h-4 w-4" />
        {mouStatus.replace('_', ' ').charAt(0).toUpperCase() + mouStatus.replace('_', ' ').slice(1)}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>No Program Holder Profile</CardTitle>
            <CardDescription>
              You don't have a program holder profile yet.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push('/program-holder/apply')}>
              Apply to Become a Training Provider
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Training Provider Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {data.contact_name || 'Training Provider'}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          {/* Status Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Provider Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Current Status</p>
                  {getStatusBadge(data.status)}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Organization</p>
                  <p className="font-medium">{data.program_holder_name}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Revenue Share Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Revenue Share</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Your Share</p>
                  <p className="text-3xl font-bold text-primary">
                    {(data.payout_share * 100).toFixed(1)}%
                  </p>
                </div>
                <p className="text-xs text-muted-foreground">
                  Of net program revenue from participants you train
                </p>
              </div>
            </CardContent>
          </Card>

          {/* MOU Status Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">MOU Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Agreement Status</p>
                  <MOUStatusBadge status={data.mou_status} />
                </div>
                {data.mou_signed_at && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Signed On</p>
                    <p className="text-sm font-medium">
                      {new Date(data.mou_signed_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* MOU Action Card */}
        <Card>
          <CardHeader>
            <CardTitle>Memorandum of Understanding (MOU)</CardTitle>
            <CardDescription>
              Your legal agreement with Elevate for Humanity
            </CardDescription>
          </CardHeader>
          <CardContent>
            {data.mou_status === 'fully_executed' ? (
              <div className="space-y-4">
                <MOUStatusAlert status={data.mou_status} programHolderName={data.program_holder_name} />
                <div className="flex gap-3">
                  <Button variant="outline" asChild>
                    <a href="/api/program-holder/mou/download" target="_blank">
                      <Download className="h-4 w-4 mr-2" />
                      Download Signed MOU
                    </a>
                  </Button>
                  <Button onClick={() => router.push('/program-holder/cases')}>
                    View Participant Cases
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <MOUStatusAlert status={data.mou_status} programHolderName={data.program_holder_name} />
                <div className="flex gap-3">
                  <Button variant="outline" asChild>
                    <a href="/api/program-holder/mou-pdf" target="_blank">
                      <Download className="h-4 w-4 mr-2" />
                      Download MOU (Preview)
                    </a>
                  </Button>
                  <Button onClick={() => router.push('/program-holder/mou')}>
                    <FileText className="h-4 w-4 mr-2" />
                    Sign MOU Now
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Links */}
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => router.push('/program-holder/cases')}>
            <CardContent className="pt-6">
              <div className="text-center">
                <FileText className="h-8 w-8 mx-auto mb-2 text-primary" />
                <p className="font-medium">Participant Cases</p>
                <p className="text-xs text-muted-foreground mt-1">Manage training cases</p>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => router.push('/program-holder/certificates')}>
            <CardContent className="pt-6">
              <div className="text-center">
                <CheckCircle2 className="h-8 w-8 mx-auto mb-2 text-primary" />
                <p className="font-medium">Certificates</p>
                <p className="text-xs text-muted-foreground mt-1">Issue completion certificates</p>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => router.push('/program-holder/reports')}>
            <CardContent className="pt-6">
              <div className="text-center">
                <FileText className="h-8 w-8 mx-auto mb-2 text-primary" />
                <p className="font-medium">Reports</p>
                <p className="text-xs text-muted-foreground mt-1">View performance reports</p>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => router.push('/program-holder/settings')}>
            <CardContent className="pt-6">
              <div className="text-center">
                <AlertCircle className="h-8 w-8 mx-auto mb-2 text-primary" />
                <p className="font-medium">Settings</p>
                <p className="text-xs text-muted-foreground mt-1">Update your profile</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
