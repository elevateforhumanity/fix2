"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Send, Users, BarChart3, Calendar, Plus, Eye } from "lucide-react";

export default function EmailMarketingPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"campaigns" | "templates" | "analytics">("campaigns");

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Email Marketing</h1>
          <p className="text-slate-600">
            Send campaigns to students, employers, and partners. Powered by Resend.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <div className="rounded-xl bg-white p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <Mail className="h-8 w-8 text-blue-600" />
              <span className="text-xs font-semibold text-slate-500">THIS MONTH</span>
            </div>
            <div className="text-2xl font-bold text-slate-900">2,847</div>
            <div className="text-sm text-slate-600">Emails Sent</div>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <Eye className="h-8 w-8 text-green-600" />
              <span className="text-xs font-semibold text-slate-500">OPEN RATE</span>
            </div>
            <div className="text-2xl font-bold text-slate-900">42.3%</div>
            <div className="text-sm text-slate-600">Average Opens</div>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <Users className="h-8 w-8 text-purple-600" />
              <span className="text-xs font-semibold text-slate-500">CONTACTS</span>
            </div>
            <div className="text-2xl font-bold text-slate-900">1,234</div>
            <div className="text-sm text-slate-600">Total Subscribers</div>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <BarChart3 className="h-8 w-8 text-orange-600" />
              <span className="text-xs font-semibold text-slate-500">CLICK RATE</span>
            </div>
            <div className="text-2xl font-bold text-slate-900">8.7%</div>
            <div className="text-sm text-slate-600">Average Clicks</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 border-b border-slate-200">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab("campaigns")}
              className={`pb-3 px-1 text-sm font-semibold border-b-2 transition ${
                activeTab === "campaigns"
                  ? "border-orange-600 text-orange-600"
                  : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              Campaigns
            </button>
            <button
              onClick={() => setActiveTab("templates")}
              className={`pb-3 px-1 text-sm font-semibold border-b-2 transition ${
                activeTab === "templates"
                  ? "border-orange-600 text-orange-600"
                  : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              Templates
            </button>
            <button
              onClick={() => setActiveTab("analytics")}
              className={`pb-3 px-1 text-sm font-semibold border-b-2 transition ${
                activeTab === "analytics"
                  ? "border-orange-600 text-orange-600"
                  : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              Analytics
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === "campaigns" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-slate-900">Email Campaigns</h2>
              <button 
                onClick={() => router.push('/admin/email-marketing/campaigns/new')}
                className="inline-flex items-center gap-2 rounded-xl bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 transition"
              >
                <Plus className="h-4 w-4" />
                New Campaign
              </button>
            </div>

            {/* Campaign List */}
            <div className="space-y-3">
              {[
                {
                  name: "New CNA Program Launch",
                  status: "Sent",
                  sent: "Dec 5, 2025",
                  recipients: 456,
                  opens: "45.2%",
                  clicks: "12.3%",
                },
                {
                  name: "Barber Apprenticeship Enrollment",
                  status: "Scheduled",
                  sent: "Dec 10, 2025",
                  recipients: 234,
                  opens: "-",
                  clicks: "-",
                },
                {
                  name: "HVAC Program Update",
                  status: "Draft",
                  sent: "-",
                  recipients: 0,
                  opens: "-",
                  clicks: "-",
                },
              ].map((campaign, idx) => (
                <div
                  key={idx}
                  className="rounded-xl bg-white p-6 shadow-sm border border-slate-200 hover:border-slate-300 transition cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-slate-900">{campaign.name}</h3>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                            campaign.status === "Sent"
                              ? "bg-green-100 text-green-800"
                              : campaign.status === "Scheduled"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-slate-100 text-slate-800"
                          }`}
                        >
                          {campaign.status}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                        <div>
                          <div className="text-slate-500">Sent</div>
                          <div className="font-semibold text-slate-900">{campaign.sent}</div>
                        </div>
                        <div>
                          <div className="text-slate-500">Recipients</div>
                          <div className="font-semibold text-slate-900">{campaign.recipients}</div>
                        </div>
                        <div>
                          <div className="text-slate-500">Opens</div>
                          <div className="font-semibold text-slate-900">{campaign.opens}</div>
                        </div>
                        <div>
                          <div className="text-slate-500">Clicks</div>
                          <div className="font-semibold text-slate-900">{campaign.clicks}</div>
                        </div>
                      </div>
                    </div>
                    <button className="ml-4 text-sm font-semibold text-orange-600 hover:text-orange-700">
                      View →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "templates" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-slate-900">Email Templates</h2>
              <button className="inline-flex items-center gap-2 rounded-xl bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 transition">
                <Plus className="h-4 w-4" />
                New Template
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                "Program Enrollment",
                "Welcome Email",
                "Course Reminder",
                "Certificate Ready",
                "Event Invitation",
                "Partner Outreach",
              ].map((template, idx) => (
                <div
                  key={idx}
                  className="rounded-xl bg-white p-6 shadow-sm border border-slate-200 hover:border-slate-300 transition cursor-pointer"
                >
                  <div className="aspect-video bg-slate-100 rounded-lg mb-4 flex items-center justify-center">
                    <Mail className="h-12 w-12 text-slate-400" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">{template}</h3>
                  <p className="text-sm text-slate-600 mb-4">
                    Professional email template for {template.toLowerCase()}
                  </p>
                  <div className="flex gap-2">
                    <button className="flex-1 text-sm font-semibold text-orange-600 hover:text-orange-700">
                      Edit
                    </button>
                    <button className="flex-1 text-sm font-semibold text-slate-600 hover:text-slate-900">
                      Preview
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "analytics" && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-slate-900">Email Analytics</h2>

            <div className="rounded-xl bg-white p-6 shadow-sm border border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-4">Performance Over Time</h3>
              <div className="h-64 flex items-center justify-center bg-slate-50 rounded-lg">
                <div className="text-center text-slate-500">
                  <BarChart3 className="h-12 w-12 mx-auto mb-2 text-slate-400" />
                  <p className="text-sm">Chart will be displayed here</p>
                  <p className="text-xs">Showing opens, clicks, and conversions</p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-white p-6 shadow-sm border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-4">Top Performing Campaigns</h3>
                <div className="space-y-3">
                  {[
                    { name: "CNA Program Launch", rate: "52.3%" },
                    { name: "HVAC Enrollment", rate: "48.1%" },
                    { name: "Barber Apprenticeship", rate: "45.7%" },
                  ].map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center">
                      <span className="text-sm text-slate-700">{item.name}</span>
                      <span className="text-sm font-semibold text-green-600">{item.rate}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl bg-white p-6 shadow-sm border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-4">Engagement by Audience</h3>
                <div className="space-y-3">
                  {[
                    { name: "Students", rate: "45.2%" },
                    { name: "Employers", rate: "38.7%" },
                    { name: "Partners", rate: "52.1%" },
                  ].map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center">
                      <span className="text-sm text-slate-700">{item.name}</span>
                      <span className="text-sm font-semibold text-blue-600">{item.rate}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
