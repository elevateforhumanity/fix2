import { MessageSquare, Video, FileText, CheckCircle } from 'lucide-react';

const interviewTips = [
  {
    category: 'Before the Interview',
    tips: [
      'Research the company and role thoroughly',
      'Practice common interview questions',
      'Prepare questions to ask the interviewer',
      'Plan your outfit and route the day before'
    ]
  },
  {
    category: 'During the Interview',
    tips: [
      'Arrive 10-15 minutes early',
      'Make eye contact and offer a firm handshake',
      'Use the STAR method (Situation, Task, Action, Result)',
      'Ask thoughtful questions about the role'
    ]
  },
  {
    category: 'After the Interview',
    tips: [
      'Send a thank-you email within 24 hours',
      'Follow up if you haven\'t heard back in a week',
      'Reflect on what went well and areas to improve',
      'Continue your job search while waiting'
    ]
  }
];

const commonQuestions = [
  'Tell me about yourself',
  'Why do you want this position?',
  'What are your greatest strengths?',
  'What is your biggest weakness?',
  'Where do you see yourself in 5 years?',
  'Why should we hire you?',
  'Tell me about a time you faced a challenge',
  'Do you have any questions for us?'
];

export default function InterviewPrepPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <MessageSquare className="mb-4" size={48} />
          <h1 className="text-4xl font-bold mb-4">Interview Preparation</h1>
          <p className="text-xl text-indigo-50">Ace your next interview with confidence</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 text-center">
            <Video className="mx-auto mb-4 text-indigo-600" size={48} />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Mock Interviews</h3>
            <p className="text-sm text-slate-600 mb-4">Practice with AI-powered video interviews</p>
            <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition">
              Start Practice
            </button>
          </div>
          <div className="bg-white rounded-xl p-6 text-center">
            <FileText className="mx-auto mb-4 text-blue-600" size={48} />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Question Bank</h3>
            <p className="text-sm text-slate-600 mb-4">500+ common interview questions</p>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
              Browse Questions
            </button>
          </div>
          <div className="bg-white rounded-xl p-6 text-center">
            <CheckCircle className="mx-auto mb-4 text-green-600" size={48} />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Interview Checklist</h3>
            <p className="text-sm text-slate-600 mb-4">Ensure you're fully prepared</p>
            <button className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition">
              View Checklist
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Common Interview Questions</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {commonQuestions.map((question, index) => (
              <div key={index} className="flex items-start p-4 bg-slate-50 rounded-lg">
                <MessageSquare className="text-indigo-600 mr-3 mt-1 flex-shrink-0" size={20} />
                <p className="text-slate-700">{question}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {interviewTips.map((section, index) => (
            <div key={index} className="bg-white rounded-xl p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4">{section.category}</h3>
              <ul className="space-y-3">
                {section.tips.map((tip, tipIndex) => (
                  <li key={tipIndex} className="flex items-start">
                    <CheckCircle className="text-green-600 mr-2 mt-0.5 flex-shrink-0" size={18} />
                    <span className="text-sm text-slate-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-indigo-50 border border-indigo-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Need One-on-One Help?</h3>
          <p className="text-slate-700 mb-4">
            Schedule a mock interview session with our career coaches to get personalized feedback.
          </p>
          <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition">
            Schedule Mock Interview
          </button>
        </div>
      </div>
    </div>
  );
}
