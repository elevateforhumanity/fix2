'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import toast from 'react-hot-toast';

type Contact = {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  message: string | null;
  interest: string | null;
  status: string;
  created_at: string;
  last_contacted_at: string | null;
  notes: string | null;
};

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [sendingEmail, setSendingEmail] = useState(false);

  useEffect(() => {
    loadContacts();
  }, []);

  async function loadContacts() {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('marketing_contacts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setContacts(data || []);
    } catch (err: any) {
      console.error('Error loading contacts:', err);
      toast.error('Failed to load contacts');
    } finally {
      setLoading(false);
    }
  }

  async function updateContactStatus(contactId: string, newStatus: string) {
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from('marketing_contacts')
        .update({ status: newStatus })
        .eq('id', contactId);

      if (error) throw error;
      toast.success('Status updated');
      loadContacts();
    } catch (err: any) {
      console.error('Error updating status:', err);
      toast.error('Failed to update status');
    }
  }

  async function sendWelcomeEmail(contact: Contact) {
    setSendingEmail(true);
    try {
      const response = await fetch('/api/marketing/send-welcome', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contactId: contact.id,
          email: contact.email,
          name: contact.full_name,
          interest: contact.interest,
          subject: emailSubject,
          body: emailBody,
        }),
      });

      if (!response.ok) throw new Error('Failed to send email');

      toast.success(
        `Welcome email sent to ${contact.full_name || contact.email}`
      );

      // Update last_contacted_at
      const supabase = createClient();
      await supabase
        .from('marketing_contacts')
        .update({
          last_contacted_at: new Date().toISOString(),
          status: 'contacted',
        })
        .eq('id', contact.id);

      setSelectedContact(null);
      setEmailSubject('');
      setEmailBody('');
      loadContacts();
    } catch (err: any) {
      console.error('Error sending email:', err);
      toast.error('Failed to send email');
    } finally {
      setSendingEmail(false);
    }
  }

  function openEmailModal(contact: Contact) {
    setSelectedContact(contact);

    // Generate personalized welcome message using universal partnership template
    const name = contact.full_name || 'there';
    const interest = contact.interest || 'exploring collaboration';

    setEmailSubject(
      `Welcome — Let's Explore a Partnership with Elevate for Humanity 🌟`
    );
    setEmailBody(`Hi ${name},

Thank you for connecting with me — I'm excited to learn more about what you do and explore how we can collaborate through Elevate for Humanity.

Your Area of Interest:
👉 ${interest}

At Elevate for Humanity, we partner with:

• Program Holders & Licensed Schools
• Barbershops, Salons, Apprenticeship Sites
• Employers + Workforce Boards
• Community Organizations & Youth Agencies
• Training Providers & Instructors

We support partners with:

• Student referrals
• Workforce funding assistance (when available)
• Compliance support (WIOA, JAG, WRG, Apprenticeship, etc.)
• Curriculum, documentation & onboarding
• Digital tools, LMS access & reporting
• Employer pipelines & placement
• Co-branded marketing & outreach
• Support with becoming a recognized training site

---

✅ NEXT STEPS FOR ALL PARTNERS

To move forward, please reply with the following:

1. What type of partnership you're interested in
   (Program Holder, Training Provider, Worksite Partner, Employer, Instructor, Youth Provider, etc.)

2. Your location + service area
   (City, state, and where you operate)

3. What programs you currently offer or want to offer
   (HVAC, Barbering, CDL, Cosmetology, Nursing Support, Digital Skills, etc.)

4. Your capacity
   • How many students you can accept
   • Days/times you operate
   • Whether you want virtual + onsite support

5. Your immediate goals
   • Grow enrollment
   • Add workforce funding
   • Host apprentices
   • Start a new program
   • Strengthen compliance
   • Add digital/onboarding systems

---

📌 WHAT HAPPENS NEXT

Once you reply, I will send:

• Your program holder packet
• Required paperwork (MOU, partnership form, compliance steps)
• Onboarding walkthrough for Elevate for Humanity
• How payouts, referrals, reporting, and compliance works
• Scheduled call availability if you'd like to speak live

Our goal is to make the partnership simple, clear, and beneficial for both sides.

---

Thank you again for reaching out — I'm looking forward to working together and building something meaningful for our community.

Warm regards,
Elizabeth Greene
Founder, Elevate for Humanity
elevateforhumanity.org`);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading contacts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Contact Management
          </h1>
          <p className="mt-2 text-gray-600">
            {contacts.length} total contacts •{' '}
            {contacts.filter((c) => c.status === 'new').length} new leads
          </p>
        </div>

        {/* Contacts Table */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Interest
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {contacts.map((contact) => (
                <tr key={contact.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {contact.full_name || 'No name'}
                    </div>
                    <div className="text-sm text-gray-500">{contact.email}</div>
                    {contact.message && (
                      <div className="text-xs text-gray-400 mt-1 max-w-md truncate">
                        {contact.message}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {contact.interest || 'General'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={contact.status}
                      onChange={(e) =>
                        updateContactStatus(contact.id, e.target.value)
                      }
                      className="text-sm border-gray-300 rounded-md"
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="enrolled">Enrolled</option>
                      <option value="not_interested">Not Interested</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(contact.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => openEmailModal(contact)}
                      className="text-blue-600 hover:text-blue-900 font-medium"
                    >
                      Send Welcome Email
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Email Modal */}
      {selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Send Welcome Email
                </h2>
                <p className="text-gray-600 mt-1">
                  To: {selectedContact.full_name} ({selectedContact.email})
                </p>
              </div>
              <button
                onClick={() => setSelectedContact(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  value={emailBody}
                  onChange={(e) => setEmailBody(e.target.value)}
                  rows={16}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md font-mono text-sm"
                />
              </div>

              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setSelectedContact(null)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => sendWelcomeEmail(selectedContact)}
                  disabled={sendingEmail}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  {sendingEmail ? 'Sending...' : 'Send Email'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
