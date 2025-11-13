'use client';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, Download, CheckCircle2, XCircle, Clock } from 'lucide-react';

type ProgramHolder = {
  id: string;
  name: string;
  owner_email: string;
  status: string;
  payout_share: number;
  mou_status: string;
  mou_signed_at: string | null;
  mou_holder_signed_at: string | null;
  mou_final_pdf_url: string | null;
  created_at: string;
  contact_name: string | null;
  contact_email: string | null;
  phone: string | null;
  training_focus: string | null;
};

export default function AdminProgramHolders() {
  const [holders, setHolders] = useState<ProgramHolder[]>([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/program-holders');
      const data = await res.json();
      setHolders(data || []);
    } catch (error) {
      console.error('Failed to load:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      await fetch('/api/admin/program-holders/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status })
      });
      await load();
    } catch (error) {
      alert('Failed to update status');
    }
  };

  const updateMouStatus = async (id: string, mouStatus: string) => {
    try {
      await fetch('/api/admin/program-holders/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, mou_status: mouStatus })
      });
      await load();
    } catch (error) {
      alert('Failed to update MOU status');
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { color: string; icon: any }> = {
      pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
      approved: { color: 'bg-green-100 text-green-800', icon: CheckCircle2 },
      inactive: { color: 'bg-gray-100 text-gray-800', icon: XCircle },
    };
    const variant = variants[status] || variants.pending;
    const Icon = variant.icon;
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs ${variant.color}`}>
        <Icon className="h-3 w-3" />
        {status}
      </span>
    );
  };

  const getMouBadge = (mouStatus: string) => {
    const colors: Record<string, string> = {
      not_sent: 'bg-gray-100 text-gray-800',
      pending: 'bg-yellow-100 text-yellow-800',
      sent: 'bg-blue-100 text-blue-800',
      signed_by_holder: 'bg-orange-100 text-orange-800',
      fully_executed: 'bg-green-100 text-green-800',
    };
    return (
      <span className={`inline-block px-2 py-1 rounded text-xs ${colors[mouStatus] || colors.not_sent}`}>
        {mouStatus.replace(/_/g, ' ')}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Program Holders Management</h1>
            <p className="text-muted-foreground mt-1">
              Review applications, approve training providers, and manage MOUs
            </p>
          </div>
          <Button onClick={load} disabled={loading} variant="outline">
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{holders.length} Training Providers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left border-b">
                    <th className="py-3 px-4 font-semibold">Organization</th>
                    <th className="py-3 px-4 font-semibold">Contact</th>
                    <th className="py-3 px-4 font-semibold">Training Focus</th>
                    <th className="py-3 px-4 font-semibold">Status</th>
                    <th className="py-3 px-4 font-semibold">Payout Share</th>
                    <th className="py-3 px-4 font-semibold">MOU Status</th>
                    <th className="py-3 px-4 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {holders.length > 0 ? (
                    holders.map(h => (
                      <tr key={h.id} className="border-b hover:bg-secondary/50">
                        <td className="py-3 px-4">
                          <div>
                            <div className="font-medium">{h.name}</div>
                            <div className="text-xs text-muted-foreground">
                              Applied: {new Date(h.created_at).toLocaleDateString()}
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-xs">
                            <div>{h.contact_name || h.owner_email}</div>
                            <div className="text-muted-foreground">{h.contact_email || h.owner_email}</div>
                            {h.phone && <div className="text-muted-foreground">{h.phone}</div>}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-xs max-w-xs">
                            {h.training_focus || '—'}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          {getStatusBadge(h.status)}
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-xs">
                            {(h.payout_share * 100).toFixed(1)}%
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          {getMouBadge(h.mou_status)}
                          {h.mou_holder_signed_at && (
                            <div className="text-xs text-muted-foreground mt-1">
                              Holder signed: {new Date(h.mou_holder_signed_at).toLocaleDateString()}
                            </div>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex flex-col gap-1">
                            {h.status === 'pending' && (
                              <Button
                                size="sm"
                                onClick={() => updateStatus(h.id, 'approved')}
                                className="text-xs"
                              >
                                Approve
                              </Button>
                            )}
                            {h.status === 'approved' && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateStatus(h.id, 'inactive')}
                                className="text-xs"
                              >
                                Deactivate
                              </Button>
                            )}
                            {h.mou_status === 'not_sent' && (
                              <Button
                                size="sm"
                                variant="outline"
                                asChild
                                className="text-xs"
                              >
                                <a href={`/api/admin/program-holders/mou?id=${h.id}`} target="_blank">
                                  <Download className="h-3 w-3 mr-1" />
                                  MOU
                                </a>
                              </Button>
                            )}
                            {h.mou_status === 'signed_by_holder' && (
                              <Button
                                size="sm"
                                variant="default"
                                asChild
                                className="text-xs"
                              >
                                <a href={`/admin/program-holders/${h.id}/countersign-mou`}>
                                  Countersign MOU
                                </a>
                              </Button>
                            )}
                            {h.mou_status === 'fully_executed' && h.mou_final_pdf_url && (
                              <Button
                                size="sm"
                                variant="outline"
                                asChild
                                className="text-xs"
                              >
                                <a href={`/api/admin/storage/signature?path=${h.mou_final_pdf_url}`} target="_blank">
                                  <Download className="h-3 w-3 mr-1" />
                                  Final MOU
                                </a>
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-muted-foreground">
                        {loading ? 'Loading...' : 'No program holders yet'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
