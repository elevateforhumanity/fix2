import { useState } from 'react';
import { GraduationCap, CheckCircle } from 'lucide-react';

export default function ApplyScholarship() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    date_of_birth: '',
    address: '',
    city: '',
    state: 'IN',
    zip: '',

    // Scholarship Type
    scholarship_type: '',
    program_interest: '',

    // Eligibility
    household_income: '',
    household_size: '',
    employment_status: '',
    education_level: '',

    // Circumstances
    is_single_parent: false,
    is_formerly_incarcerated: false,
    is_homeless: false,
    is_veteran: false,
    has_disability: false,

    // Essay
    why_scholarship: '',
    career_goals: '',
    financial_need: '',

    // Supporting Documents
    proof_of_income: null,
    identification: null,
    additional_docs: null,
  });

  const [submitted, setSubmitted] = useState(false);

  const scholarshipTypes = [
    {
      id: 'full-ride',
      name: 'Full-Ride Scholarship',
      amount: '$5,000',
      description: 'Covers tuition, books, transportation, and childcare',
      eligibility:
        'Single parents, formerly incarcerated, homeless, or veterans',
    },
    {
      id: 'partial',
      name: 'Partial Scholarship',
      amount: '$2,500',
      description: 'Covers tuition and books',
      eligibility: 'Low-income, first-generation college students',
    },
    {
      id: 'emergency',
      name: 'Emergency Assistance Grant',
      amount: '$500-1,000',
      description: 'Covers rent, utilities, transportation, or childcare',
      eligibility: 'Enrolled students facing crisis',
    },
    {
      id: 'tools',
      name: 'Tool & Equipment Grant',
      amount: '$500-1,500',
      description: 'Covers tools, uniforms, and equipment',
      eligibility: 'Construction, barber, or healthcare students',
    },
  ];

  const programs = [
    'Tax Business Start-Up',
    'Barber Apprenticeship',
    'Building Tech Foundations',
    'Healthcare Pathways',
    'CPR/First Aid Instructor',
    'OSHA Safety Certification',
    'Other',
  ];

  const handleInputChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleFileChange = (e: any) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0],
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      // Create FormData for file uploads
      const submitData = new FormData();
      Object.keys(formData).forEach((key) => {
        if ((formData as any)[key] !== null) {
          submitData.append(key, (formData as any)[key]);
        }
      });

      const response = await fetch(
        '/.netlify/functions/submit-scholarship-application',
        {
          method: 'POST',
          body: submitData,
        }
      );

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
      } else {
        alert('Failed to submit application. Please try again.');
      }
    } catch (error) {
      alert('Failed to submit application. Please try again.');
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
          <h1 className="text-4xl font-bold mb-4">Application Submitted!</h1>
          <p className="text-xl text-brown-600 mb-8">
            Thank you for applying for a Selfish Inc Foundation scholarship.
            We'll review your application and contact you within 2-3 weeks.
          </p>
          <div className="bg-blue-50 rounded-xl p-6 mb-8">
            <h3 className="font-bold mb-2">What Happens Next?</h3>
            <ul className="text-left space-y-2">
              <li className="flex items-start">
                <span className="text-green-600 mr-2">1.</span>
                <span>Application review (1-2 weeks)</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">2.</span>
                <span>Interview (if selected)</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">3.</span>
                <span>Award notification (2-3 weeks)</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">4.</span>
                <span>Enrollment in program</span>
              </li>
            </ul>
          </div>
          <a
            href="/"
            className="inline-block bg-green-600 text-white py-3 px-8 rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            Return Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <GraduationCap className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-center mb-4">
            Scholarship Application
          </h1>
          <p className="text-center text-xl">
            Apply for financial assistance to pursue your workforce training
            goals
          </p>
        </div>
      </div>
      {/* Progress Steps */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  step >= s
                    ? 'bg-green-600 text-white'
                    : 'bg-brown-200 text-brown-500'
                }`}
              >
                {s}
              </div>
              {s < 4 && (
                <div
                  className={`flex-1 h-1 mx-2 ${step > s ? 'bg-green-600' : 'bg-brown-200'}`}
                />
              )}
            </div>
          ))}
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          {/* Step 1: Personal Information */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Personal Information</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-brown-900 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    aria-label="text input"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-brown-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brown-900 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    aria-label="text input"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-brown-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brown-900 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    aria-label="email input"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-brown-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brown-900 mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    aria-label="tel input"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-brown-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brown-900 mb-2">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    aria-label="date input"
                    name="date_of_birth"
                    value={formData.date_of_birth}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-brown-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brown-900 mb-2">
                    Address *
                  </label>
                  <input
                    type="text"
                    aria-label="text input"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-brown-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brown-900 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    aria-label="text input"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-brown-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brown-900 mb-2">
                    State *
                  </label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-brown-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  >
                    <option value="IN">Indiana</option>
                    <option value="TN">Tennessee</option>
                    <option value="TX">Texas</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-brown-900 mb-2">
                    ZIP Code *
                  </label>
                  <input
                    type="text"
                    aria-label="text input"
                    name="zip"
                    value={formData.zip}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-brown-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}
          {/* Step 2: Scholarship & Program */}
          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">
                Scholarship & Program Selection
              </h2>
              <div className="mb-8">
                <label className="block text-sm font-medium text-brown-900 mb-4">
                  Select Scholarship Type *
                </label>
                <div className="grid md:grid-cols-2 gap-4">
                  {scholarshipTypes.map((scholarship) => (
                    <button
                      key={scholarship.id}
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          scholarship_type: scholarship.id,
                        })
                      }
                      className={`p-6 rounded-lg border-2 text-left transition-all ${
                        formData.scholarship_type === scholarship.id
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-brown-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-bold text-lg">
                          {scholarship.name}
                        </h3>
                        <span className="text-green-600 font-bold">
                          {scholarship.amount}
                        </span>
                      </div>
                      <p className="text-sm text-brown-600 mb-2">
                        {scholarship.description}
                      </p>
                      <p className="text-xs text-brown-500">
                        {scholarship.eligibility}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-brown-900 mb-2">
                  Program of Interest *
                </label>
                <select
                  name="program_interest"
                  value={formData.program_interest}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-brown-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                >
                  <option value="">Select a program...</option>
                  {programs.map((program) => (
                    <option key={program} value={program}>
                      {program}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
          {/* Step 3: Eligibility & Circumstances */}
          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">
                Eligibility & Financial Information
              </h2>
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-brown-900 mb-2">
                    Annual Household Income *
                  </label>
                  <select
                    name="household_income"
                    value={formData.household_income}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-brown-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  >
                    <option value="">Select range...</option>
                    <option value="0-15000">$0 - $15,000</option>
                    <option value="15001-25000">$15,001 - $25,000</option>
                    <option value="25001-35000">$25,001 - $35,000</option>
                    <option value="35001-50000">$35,001 - $50,000</option>
                    <option value="50001+">$50,001+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-brown-900 mb-2">
                    Household Size *
                  </label>
                  <input
                    type="number"
                    aria-label="number input"
                    name="household_size"
                    value={formData.household_size}
                    onChange={handleInputChange}
                    required
                    min="1"
                    className="w-full px-4 py-3 border border-brown-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brown-900 mb-2">
                    Employment Status *
                  </label>
                  <select
                    name="employment_status"
                    value={formData.employment_status}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-brown-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  >
                    <option value="">Select status...</option>
                    <option value="unemployed">Unemployed</option>
                    <option value="part-time">Part-time</option>
                    <option value="full-time">Full-time</option>
                    <option value="self-employed">Self-employed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-brown-900 mb-2">
                    Highest Education Level *
                  </label>
                  <select
                    name="education_level"
                    value={formData.education_level}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-brown-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  >
                    <option value="">Select level...</option>
                    <option value="less-than-hs">Less than High School</option>
                    <option value="hs-diploma">High School Diploma/GED</option>
                    <option value="some-college">Some College</option>
                    <option value="associates">Associate's Degree</option>
                    <option value="bachelors">Bachelor's Degree</option>
                    <option value="graduate">Graduate Degree</option>
                  </select>
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-brown-900 mb-4">
                  Special Circumstances (check all that apply)
                </label>
                <div className="space-y-3">
                  {[
                    { name: 'is_single_parent', label: 'Single Parent' },
                    {
                      name: 'is_formerly_incarcerated',
                      label: 'Formerly Incarcerated',
                    },
                    {
                      name: 'is_homeless',
                      label: 'Homeless or Housing Insecure',
                    },
                    { name: 'is_veteran', label: 'Veteran' },
                    { name: 'has_disability', label: 'Person with Disability' },
                  ].map((item) => (
                    <label key={item.name} className="flex items-center">
                      <input
                        type="checkbox"
                        aria-label="checkbox input"
                        name={item.name}
                        checked={(formData as any)[item.name]}
                        onChange={handleInputChange}
                        className="w-5 h-5 text-green-600 border-brown-300 rounded focus:ring-blue-600"
                      />
                      <span className="ml-3 text-brown-900">{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}
          {/* Step 4: Essays & Documents */}
          {step === 4 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">
                Essays & Supporting Documents
              </h2>
              <div className="space-y-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-brown-900 mb-2">
                    Why do you need this scholarship? * (250 words max)
                  </label>
                  <textarea
                    name="why_scholarship"
                    value={formData.why_scholarship}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    maxLength={1500}
                    className="w-full px-4 py-3 border border-brown-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Describe your financial need and how this scholarship will help you..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brown-900 mb-2">
                    What are your career goals? * (250 words max)
                  </label>
                  <textarea
                    name="career_goals"
                    value={formData.career_goals}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    maxLength={1500}
                    className="w-full px-4 py-3 border border-brown-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Describe your career aspirations and how this training will help you achieve them..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brown-900 mb-2">
                    Describe your financial situation (250 words max)
                  </label>
                  <textarea
                    name="financial_need"
                    value={formData.financial_need}
                    onChange={handleInputChange}
                    rows={4}
                    maxLength={1500}
                    className="w-full px-4 py-3 border border-brown-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Provide details about your financial situation and any barriers you face..."
                  />
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-bold text-lg mb-4">
                  Upload Supporting Documents
                </h3>
                <div>
                  <label className="block text-sm font-medium text-brown-900 mb-2">
                    Proof of Income (pay stubs, tax return, etc.) *
                  </label>
                  <input
                    type="file"
                    aria-label="file input"
                    name="proof_of_income"
                    onChange={handleFileChange}
                    required
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="w-full px-4 py-3 border border-brown-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brown-900 mb-2">
                    Photo ID (driver's license, state ID, etc.) *
                  </label>
                  <input
                    type="file"
                    aria-label="file input"
                    name="identification"
                    onChange={handleFileChange}
                    required
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="w-full px-4 py-3 border border-brown-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brown-900 mb-2">
                    Additional Documents (optional)
                  </label>
                  <input
                    type="file"
                    aria-label="file input"
                    name="additional_docs"
                    onChange={handleFileChange}
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="w-full px-4 py-3 border border-brown-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                  <p className="text-sm text-brown-500 mt-1">
                    Letters of recommendation, proof of special circumstances,
                    etc.
                  </p>
                </div>
              </div>
            </div>
          )}
          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-6 py-3 border-2 border-brown-300 rounded-lg font-semibold hover:bg-beige-50 transition-colors"
              >
                Previous
              </button>
            )}
            {step < 4 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="ml-auto px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="ml-auto px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-xl transition-all"
              >
                Submit Application
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
