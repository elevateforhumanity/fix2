/**
 * Staff Panel Page
 * Allows staff and admins to issue certificates to students
 */

import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { supabase } from '../supabaseClient';
import { useAuth } from '../contexts/AuthContext';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

function randomCode(len = 10) {
  return Math.random().toString(36).slice(2, 2 + len).toUpperCase();
}

export default function StaffPanel() {
  const { role } = useAuth();
  const [email, setEmail] = useState('');
  const [programName, setProgramName] = useState('');
  const [programId, setProgramId] = useState('');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'
  const [loading, setLoading] = useState(false);

  async function handleIssue(e) {
    e.preventDefault();
    setMessage('');
    setMessageType('');
    setLoading(true);

    if (!supabase) {
      setMessage('Supabase not initialized');
      setMessageType('error');
      setLoading(false);
      return;
    }

    try {
      // Find user by email
      const { data: users, error: ue } = await supabase.rpc('get_user_by_email', {
        email_input: email
      });

      if (ue || !users?.id) {
        setMessage('User not found. Please check the email address.');
        setMessageType('error');
        setLoading(false);
        return;
      }

      const verify_code = randomCode(8);

      // Upload PDF if provided
      let pdf_url = null;
      if (file) {
        const path = `${users.id}/${verify_code}.pdf`;
        const { error: upErr } = await supabase.storage
          .from('certificates')
          .upload(path, file, { upsert: true });

        if (upErr) {
          setMessage(`Upload error: ${upErr.message}`);
          setMessageType('error');
          setLoading(false);
          return;
        }

        const { data: pub } = supabase.storage
          .from('certificates')
          .getPublicUrl(path);
        pdf_url = pub.publicUrl;
      }

      // Insert certificate record
      const { error: insErr } = await supabase.from('certificates').insert({
        user_id: users.id,
        program_id: programId,
        program_name: programName,
        verify_code,
        pdf_url
      });

      if (insErr) {
        setMessage(`Error issuing certificate: ${insErr.message}`);
        setMessageType('error');
        setLoading(false);
        return;
      }

      setMessage(
        `Certificate issued successfully! Verify at ${window.location.origin}/verify/${verify_code}`
      );
      setMessageType('success');

      // Reset form
      setEmail('');
      setProgramName('');
      setProgramId('');
      setFile(null);
      if (e.target.querySelector('input[type="file"]')) {
        e.target.querySelector('input[type="file"]').value = '';
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-surface-base">
      <Helmet>
        <title>Staff Panel | Elevate for Humanity</title>
        <meta name="description" content="Issue certificates to students" />
      </Helmet>

      <Navigation />

      <main id="main-content" className="container mx-auto py-10 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="heading-1 mb-2">Issue Certificate</h1>
            <p className="body-large text-text-secondary">
              Create and issue certificates to students
            </p>
            {role && (
              <span className="inline-block mt-2 px-3 py-1 bg-brand-light text-brand rounded-full text-sm font-medium">
                Role: {role}
              </span>
            )}
          </div>

          <div className="card card-spacious">
            <form onSubmit={handleIssue} className="space-y-6">
              {message && (
                <div
                  className={`px-4 py-3 rounded-lg ${
                    messageType === 'success'
                      ? 'bg-green-50 border border-green-200 text-green-700'
                      : 'bg-red-50 border border-red-200 text-red-700'
                  }`}
                >
                  {message}
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
                  Learner Email *
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                  placeholder="student@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <p className="text-xs text-text-secondary mt-1">
                  The email address of the student receiving the certificate
                </p>
              </div>

              <div>
                <label htmlFor="programId" className="block text-sm font-medium text-text-primary mb-2">
                  Program ID (Slug) *
                </label>
                <input
                  id="programId"
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                  placeholder="digital-literacy-101"
                  value={programId}
                  onChange={(e) => setProgramId(e.target.value)}
                  required
                />
                <p className="text-xs text-text-secondary mt-1">
                  A unique identifier for the program (e.g., course-slug)
                </p>
              </div>

              <div>
                <label htmlFor="programName" className="block text-sm font-medium text-text-primary mb-2">
                  Program Name *
                </label>
                <input
                  id="programName"
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                  placeholder="Digital Literacy 101"
                  value={programName}
                  onChange={(e) => setProgramName(e.target.value)}
                  required
                />
                <p className="text-xs text-text-secondary mt-1">
                  The full display name of the program
                </p>
              </div>

              <div>
                <label htmlFor="file" className="block text-sm font-medium text-text-primary mb-2">
                  Certificate PDF (Optional)
                </label>
                <input
                  id="file"
                  type="file"
                  accept="application/pdf"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
                <p className="text-xs text-text-secondary mt-1">
                  Upload a PDF certificate file (optional)
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-full text-lg"
              >
                {loading ? 'Issuing Certificate...' : 'Issue Certificate'}
              </button>
            </form>
          </div>

          <div className="mt-8 card p-6">
            <h2 className="heading-4 mb-3">Instructions</h2>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li className="flex items-start">
                <span className="text-brand mr-2">•</span>
                <span>Enter the student's email address (must be registered in the system)</span>
              </li>
              <li className="flex items-start">
                <span className="text-brand mr-2">•</span>
                <span>Provide a unique program ID and the full program name</span>
              </li>
              <li className="flex items-start">
                <span className="text-brand mr-2">•</span>
                <span>Optionally upload a PDF certificate file</span>
              </li>
              <li className="flex items-start">
                <span className="text-brand mr-2">•</span>
                <span>A unique verification code will be generated automatically</span>
              </li>
              <li className="flex items-start">
                <span className="text-brand mr-2">•</span>
                <span>Students can view their certificates in their portal</span>
              </li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
