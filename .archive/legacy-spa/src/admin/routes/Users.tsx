/**
 * Admin Users Page
 * Manage organization members and roles (RBAC)
 *
 * Copyright (c) 2025 Elevate for Humanity
 */

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../hooks/useAuth';
import { useOrg } from '../../hooks/useOrg';
import {
  getAllRoles,
  getRoleName,
  getRoleDescription,
  canAssignRole,
  type Role,
} from '../../lib/rbac';

interface Member {
  id: string;
  org_id: string;
  user_id: string;
  role: Role;
  status: 'active' | 'invited' | 'suspended';
  joined_at: string;
  user?: {
    email: string;
    user_metadata?: {
      full_name?: string;
    };
  };
}

export default function Users() {
  const { user, role: currentUserRole } = useAuth();
  const { currentOrg, getUsageStats } = useOrg(user?.id || null);
  const [members, setMembers] = useState<Member[]>([]);
  const [usage, setUsage] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<Role>('student');
  const [inviting, setInviting] = useState(false);

  useEffect(() => {
    if (currentOrg) {
      loadMembers();
      loadUsage();
    }
  }, [currentOrg]);

  async function loadMembers() {
    if (!currentOrg) return;

    try {
      setLoading(true);

      const { data, error } = await supabase
        .from('org_members')
        .select(
          `
          id,
          org_id,
          user_id,
          role,
          status,
          joined_at,
          user:auth.users!org_members_user_id_fkey(email, user_metadata)
        `
        )
        .eq('org_id', currentOrg.id)
        .order('joined_at', { ascending: false });

      if (error) throw error;

      setMembers((data as any) || []);
    } catch (error) {
      alert('Failed to load members');
    } finally {
      setLoading(false);
    }
  }

  async function loadUsage() {
    try {
      const usageData = await getUsageStats();
      setUsage(usageData);
    } catch (error) {
    }
  }

  async function inviteMember() {
    if (!currentOrg || !inviteEmail.trim()) return;

    // Check seat limit
    if (usage && usage.seats.used >= usage.seats.max) {
      alert(
        `Seat limit reached (${usage.seats.max} seats). Please upgrade your plan.`
      );
      return;
    }

    try {
      setInviting(true);

      // Call Edge Function to invite user
      const { error } = await supabase.functions.invoke('invite-user', {
        body: {
          org_id: currentOrg.id,
          email: inviteEmail,
          role: inviteRole,
        },
      });

      if (error) throw error;

      alert(`Invitation sent to ${inviteEmail}`);
      setInviteEmail('');
      setInviteRole('student');
      await loadMembers();
      await loadUsage();
    } catch (error: any) {
      alert(`Failed to invite user: ${error.message}`);
    } finally {
      setInviting(false);
    }
  }

  async function updateMemberRole(memberId: string, newRole: Role) {
    if (!currentUserRole || !canAssignRole(currentUserRole, newRole)) {
      alert('You do not have permission to assign this role');
      return;
    }

    try {
      const { error } = await supabase
        .from('org_members')
        .update({ role: newRole })
        .eq('id', memberId);

      if (error) throw error;

      // Log audit
      await logAudit('member.role.update', `member:${memberId}`, {
        before: members.find((m) => m.id === memberId)?.role,
        after: newRole,
      });

      await loadMembers();
      alert('Role updated successfully');
    } catch (error: any) {
      alert(`Failed to update role: ${error.message}`);
    }
  }

  async function updateMemberStatus(
    memberId: string,
    newStatus: 'active' | 'suspended'
  ) {
    try {
      const { error } = await supabase
        .from('org_members')
        .update({ status: newStatus })
        .eq('id', memberId);

      if (error) throw error;

      // Log audit
      await logAudit('member.status.update', `member:${memberId}`, {
        before: members.find((m) => m.id === memberId)?.status,
        after: newStatus,
      });

      await loadMembers();
      alert(`Member ${newStatus === 'active' ? 'activated' : 'suspended'}`);
    } catch (error: any) {
      alert(`Failed to update status: ${error.message}`);
    }
  }

  async function removeMember(memberId: string) {
    if (!confirm('Are you sure you want to remove this member?')) return;

    try {
      const { error } = await supabase
        .from('org_members')
        .delete()
        .eq('id', memberId);

      if (error) throw error;

      // Log audit
      await logAudit('member.remove', `member:${memberId}`, null);

      await loadMembers();
      await loadUsage();
      alert('Member removed successfully');
    } catch (error: any) {
      alert(`Failed to remove member: ${error.message}`);
    }
  }

  async function logAudit(action: string, target: string, diff: any) {
    if (!currentOrg || !user) return;

    try {
      if (!supabase) throw new Error('Supabase not initialized');
      await supabase.from('audit_logs').insert({
        org_id: currentOrg.id,
        actor_id: user.id,
        action,
        target,
        diff,
      });
    } catch (error) {
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Users & Roles</h1>
          <p className="mt-2 text-gray-600">
            Manage organization members and their permissions
          </p>
        </div>
        {usage && (
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">
              {usage.seats.used} / {usage.seats.max}
            </div>
            <div className="text-sm text-gray-600">Seats used</div>
          </div>
        )}
      </div>
      {/* Invite Form */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Invite New Member
        </h2>
        <div className="flex gap-4">
          <input
            type="email"
            placeholder="email@example.com"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={inviteRole}
            onChange={(e) => setInviteRole(e.target.value as Role)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {getAllRoles()
              .filter(
                (r) => currentUserRole && canAssignRole(currentUserRole, r)
              )
              .map((role) => (
                <option key={role} value={role}>
                  {getRoleName(role)}
                </option>
              ))}
          </select>
          <button
            onClick={inviteMember}
            disabled={inviting || !inviteEmail.trim()}
            className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {inviting ? 'Inviting...' : 'Invite'}
          </button>
        </div>
        <p className="mt-2 text-sm text-gray-500">
          An invitation email will be sent to the user
        </p>
      </div>
      {/* Members Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Joined
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {members.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                  No members found
                </td>
              </tr>
            ) : (
              members.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-900">
                        {member.user?.user_metadata?.full_name ||
                          member.user?.email ||
                          'Unknown'}
                      </div>
                      <div className="text-sm text-gray-500">
                        {member.user?.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={member.role}
                      onChange={(e) =>
                        updateMemberRole(member.id, e.target.value as Role)
                      }
                      disabled={
                        !currentUserRole ||
                        !canAssignRole(currentUserRole, member.role) ||
                        member.user_id === user?.id
                      }
                      className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                      title={getRoleDescription(member.role)}
                    >
                      {getAllRoles().map((role) => (
                        <option key={role} value={role}>
                          {getRoleName(role)}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        member.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : member.status === 'invited'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {member.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(member.joined_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right text-sm">
                    {member.user_id !== user?.id && (
                      <div className="flex justify-end gap-2">
                        {member.status === 'active' ? (
                          <button
                            onClick={() =>
                              updateMemberStatus(member.id, 'suspended')
                            }
                            className="text-yellow-600 hover:text-yellow-700 font-medium"
                          >
                            Suspend
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              updateMemberStatus(member.id, 'active')
                            }
                            className="text-green-600 hover:text-green-700 font-medium"
                          >
                            Activate
                          </button>
                        )}
                        <button
                          onClick={() => removeMember(member.id)}
                          className="text-red-600 hover:text-red-700 font-medium"
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Role Descriptions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-sm font-semibold text-blue-900 mb-3">
          Role Descriptions
        </h3>
        <div className="space-y-2 text-sm">
          {getAllRoles().map((role) => (
            <div key={role}>
              <span className="font-medium text-blue-900">
                {getRoleName(role)}:
              </span>{' '}
              <span className="text-blue-700">{getRoleDescription(role)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
