'use client';

/*
  Copyright (c) 2025 Elevate for Humanity
  Commercial License. No resale, sublicensing, or redistribution allowed.
  See LICENSE file for details.
*/

import React, { useState } from 'react';
import Link from 'next/link';

interface Program {
  slug: string;
  name: string;
  code: string;
  duration: string;
  funding: string;
}

const ETPL_PROGRAMS: Program[] = [
  { slug: 'tax-prep-financial-services', name: 'Tax Preparation & Financial Services', code: 'TAX-PREP-FS', duration: '10 Weeks', funding: 'WIOA • WRG • Earn and Learn' },
  { slug: 'medical-assistant', name: 'Medical Assistant', code: 'MA-CERT', duration: '16-24 Weeks', funding: 'WRG • WIOA' },
  { slug: 'hvac-technician', name: 'HVAC Technician', code: 'HVAC-TECH', duration: '4-9 Months', funding: 'WIOA • Workforce Grants' },
  { slug: 'barber-apprenticeship', name: 'Barber Apprenticeship', code: 'BARBER-APPR', duration: '12-18 Months', funding: 'Apprenticeship • WIOA • WRG' },
  { slug: 'business-startup-marketing', name: 'Business Start-Up & Marketing', code: 'BIZ-STARTUP', duration: '5 Weeks', funding: 'WIOA • WRG' },
  { slug: 'emergency-health-safety-tech', name: 'Emergency Health & Safety Technician', code: 'EMERG-HEALTH', duration: '4 Weeks', funding: 'WIOA • WRG • Apprenticeship' },
  { slug: 'professional-esthetician', name: 'Professional Esthetician & Client Services', code: 'ESTH-PROF', duration: '5 Weeks', funding: 'WIOA • WRG • Apprenticeship' },
  { slug: 'peer-recovery-coach', name: 'Certified Peer Recovery Coach (CPRC)', code: 'CPRC-CERT', duration: '45 Days', funding: 'WIOA • JRI' },
  { slug: 'building-maintenance', name: 'Building Maintenance Technician', code: 'BLDG-MAINT', duration: '4-9 Months', funding: 'WIOA • Apprenticeship' },
  { slug: 'truck-driving', name: 'CDL / Truck Driving', code: 'CDL-TRUCK', duration: '4-6 Weeks', funding: 'WIOA • Workforce Grants' },
  { slug: 'phlebotomy', name: 'Phlebotomy Technician', code: 'PHLEB-TECH', duration: '4-8 Weeks', funding: 'WRG • WIOA' },
  { slug: 'welding', name: 'Welding Technology', code: 'WELD-TECH', duration: '12-24 Weeks', funding: 'WIOA • Apprenticeship' },
  { slug: 'electrical', name: 'Electrical Technician', code: 'ELEC-TECH', duration: '16-24 Weeks', funding: 'Apprenticeship • WIOA • WRG' },
  { slug: 'pharmacy-tech', name: 'Pharmacy Technician', code: 'PHARM-TECH', duration: '12-16 Weeks', funding: 'WRG • WIOA' },
  { slug: 'it-support', name: 'IT Support Specialist', code: 'IT-SUPPORT', duration: '12-20 Weeks', funding: 'WIOA • Workforce Grants' },
  { slug: 'culinary-arts', name: 'Culinary Arts & Food Service', code: 'CULINARY', duration: '12-18 Months', funding: 'Apprenticeship • WIOA • WRG' },
];

const ADDITIONAL_PROGRAMS: Program[] = [
  { slug: 'beauty-career-educator', name: 'Beauty & Career Educator Training', code: 'BEAUTY-EDU', duration: '12-16 Weeks', funding: 'WIOA • WRG' },
  { slug: 'peer-support-professional', name: 'Certified Peer Support Professional', code: 'PEER-SUPPORT', duration: '6-8 Weeks', funding: 'WIOA • JRI' },
];

export default function SyllabusGenerator() {
  const [selectedPrograms, setSelectedPrograms] = useState<string[]>([]);
  const [downloadFormat, setDownloadFormat] = useState<'markdown' | 'pdf'>('markdown');
  const [generating, setGenerating] = useState(false);

  const toggleProgram = (slug: string) => {
    setSelectedPrograms(prev =>
      prev.includes(slug)
        ? prev.filter(s => s !== slug)
        : [...prev, slug]
    );
  };

  const selectAll = () => {
    setSelectedPrograms(ETPL_PROGRAMS.map(p => p.slug));
  };

  const clearAll = () => {
    setSelectedPrograms([]);
  };

  const downloadSyllabus = (slug: string) => {
    const url = `/docs/syllabi/${slug}.md`;
    const link = document.createElement('a');
    link.href = url;
    link.download = `${slug}-syllabus.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadSelected = () => {
    setGenerating(true);
    selectedPrograms.forEach((slug, index) => {
      setTimeout(() => {
        downloadSyllabus(slug);
        if (index === selectedPrograms.length - 1) {
          setGenerating(false);
        }
      }, index * 500);
    });
  };

  const downloadMasterPackage = () => {
    const url = '/docs/syllabi/ETPL_MASTER_SUBMISSION_PACKAGE.md';
    const link = document.createElement('a');
    link.href = url;
    link.download = 'ETPL_Master_Submission_Package.md';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Syllabus Generator</h1>
              <p className="text-gray-600 mt-2">
                Download program syllabi for ETPL submission and documentation
              </p>
            </div>
            <Link
              href="/admin/dashboard"
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
            >
              ← Back to Admin
            </Link>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-3 mt-6">
            <button
              onClick={downloadMasterPackage}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              📦 Download Master ETPL Package
            </button>
            <button
              onClick={selectAll}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              ✓ Select All ETPL Programs
            </button>
            <button
              onClick={clearAll}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
            >
              Clear Selection
            </button>
            {selectedPrograms.length > 0 && (
              <button
                onClick={downloadSelected}
                disabled={generating}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition disabled:opacity-50"
              >
                {generating ? '⏳ Downloading...' : `⬇ Download ${selectedPrograms.length} Selected`}
              </button>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-3xl font-bold text-blue-600">16</div>
            <div className="text-gray-600 text-sm mt-1">ETPL Programs</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-3xl font-bold text-green-600">18</div>
            <div className="text-gray-600 text-sm mt-1">Total Programs</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-3xl font-bold text-purple-600">{selectedPrograms.length}</div>
            <div className="text-gray-600 text-sm mt-1">Selected</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-3xl font-bold text-orange-600">10000949</div>
            <div className="text-gray-600 text-sm mt-1">ETPL Provider ID</div>
          </div>
        </div>

        {/* ETPL Programs */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            ETPL-Approved Programs (16)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ETPL_PROGRAMS.map(program => (
              <div
                key={program.slug}
                className={`border rounded-lg p-4 cursor-pointer transition ${
                  selectedPrograms.includes(program.slug)
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => toggleProgram(program.slug)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <input
                        type="checkbox"
                        checked={selectedPrograms.includes(program.slug)}
                        onChange={() => toggleProgram(program.slug)}
                        className="w-5 h-5 text-blue-600 rounded"
                        onClick={(e) => e.stopPropagation()}
                      />
                      <h3 className="font-semibold text-gray-900">{program.name}</h3>
                    </div>
                    <div className="ml-7 space-y-1 text-sm text-gray-600">
                      <div>Code: <span className="font-mono">{program.code}</span></div>
                      <div>Duration: {program.duration}</div>
                      <div>Funding: {program.funding}</div>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      downloadSyllabus(program.slug);
                    }}
                    className="ml-4 px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition text-sm"
                  >
                    ⬇ Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Programs */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Additional Programs (Not ETPL-Listed)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ADDITIONAL_PROGRAMS.map(program => (
              <div
                key={program.slug}
                className="border border-gray-200 rounded-lg p-4"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">{program.name}</h3>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div>Code: <span className="font-mono">{program.code}</span></div>
                      <div>Duration: {program.duration}</div>
                      <div>Funding: {program.funding}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => downloadSyllabus(program.slug)}
                    className="ml-4 px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition text-sm"
                  >
                    ⬇ Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-6">
          <h3 className="font-semibold text-blue-900 mb-2">📋 Instructions</h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>• <strong>Master Package:</strong> Download the complete ETPL submission package with all program information</li>
            <li>• <strong>Individual Syllabi:</strong> Click on any program to select it, then download individually or in bulk</li>
            <li>• <strong>Format:</strong> All syllabi are in Markdown format (.md) - easily convertible to PDF or Word</li>
            <li>• <strong>ETPL Submission:</strong> Use these documents for Indiana ETPL listing applications and renewals</li>
            <li>• <strong>Contact Info:</strong> All syllabi include updated contact information (317-314-3757, elevate4humanityedu@gmail.com)</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
          <h3 className="font-semibold text-gray-900 mb-3">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <div className="text-gray-600">Provider</div>
              <div className="font-semibold">Elevate for Humanity</div>
            </div>
            <div>
              <div className="text-gray-600">Email</div>
              <div className="font-semibold">elevate4humanityedu@gmail.com</div>
            </div>
            <div>
              <div className="text-gray-600">Phone</div>
              <div className="font-semibold">(317) 314-3757</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
