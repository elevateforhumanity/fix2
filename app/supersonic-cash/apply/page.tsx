'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 

  ArrowLeft, ArrowRight, CheckCircle, AlertCircle, 
  User, DollarSign, CreditCard, FileText, Shield
} from 'lucide-react';

interface ApplicationData {
  // Personal Info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  ssn: string;
  
  // Address
  address: string;
  city: string;
  state: string;
  zipCode: string;
  
  // Employment/Income
  employmentStatus: 'student' | 'employed' | 'both';
  employer: string;
  monthlyIncome: string;
  trainingStipend: string;
  
  // Bank Info
  bankName: string;
  accountType: 'checking' | 'savings';
  routingNumber: string;
  accountNumber: string;
  
  // Loan Details
  requestedAmount: number;
  purpose: string;
  repaymentDate: string;
}

export default function ApplyPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState<ApplicationData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    ssn: '',
    address: '',
    city: '',
    state: 'IN',
    zipCode: '',
    employmentStatus: 'student',
    employer: '',
    monthlyIncome: '',
    trainingStipend: '',
    bankName: '',
    accountType: 'checking',
    routingNumber: '',
    accountNumber: '',
    requestedAmount: 500,
    purpose: '',
    repaymentDate: '',
  });

  const updateField = (field: keyof ApplicationData, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const nextStep = () => {
    setError('');
    if (validateStep(step)) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };

  const validateStep = (currentStep: number): boolean => {
    switch (currentStep) {
      case 1:
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
          setError('Please fill in all required fields');
          return false;
        }
        if (!formData.email.includes('@')) {
          setError('Please enter a valid email address');
          return false;
        }
        return true;
      
      case 2:
        if (!formData.address || !formData.city || !formData.zipCode) {
          setError('Please fill in all address fields');
          return false;
        }
        return true;
      
      case 3:
        if (!formData.monthlyIncome && !formData.trainingStipend) {
          setError('Please enter your income or training stipend');
          return false;
        }
        return true;
      
      case 4:
        if (!formData.bankName || !formData.routingNumber || !formData.accountNumber) {
          setError('Please fill in all bank information');
          return false;
        }
        if (formData.routingNumber.length !== 9) {
          setError('Routing number must be 9 digits');
          return false;
        }
        return true;
      
      default:
        return true;
    }
  };

  const submitApplication = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/supersonic-cash/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        router.push(`/supersonic-cash/status/${result.applicationId}`);
      } else {
        setError(result.error || 'Application failed. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const calculateFee = () => {
    if (formData.requestedAmount <= 1000) return 0;
    return Math.round(formData.requestedAmount * 0.03);
  };

  const fee = calculateFee();
  const totalRepayment = formData.requestedAmount + fee;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] lg:h-[700px] flex items-center justify-center text-white overflow-hidden">
        <Image
          src="/images/gallery/image8.jpg"
          alt="Apply"
          fill
          className="object-cover"
          quality={100}
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-purple-900/90" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 drop-shadow-2xl">
            Apply
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-100 drop-shadow-lg">
            Transform your career with free training and industry certifications
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all shadow-2xl"
            >
              Get Started Free
            </Link>
            <Link
              href="/programs"
              className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold transition-all shadow-2xl"
            >
              View Programs
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push('/supersonic-cash')}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Supersonic Cash</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Cash Advance Application</h1>
          <p className="text-gray-600 mt-2">Complete in 2 minutes • Get approved instantly</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <div
                key={s}
                className={`flex items-center ${s < 5 ? 'flex-1' : ''}`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    s < step
                      ? 'bg-green-500 text-white'
                      : s === step
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {s < step ? <CheckCircle className="w-6 h-6" /> : s}
                </div>
                {s < 5 && (
                  <div
                    className={`flex-1 h-1 mx-2 ${
                      s < step ? 'bg-green-500' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-600">
            <span>Personal</span>
            <span>Address</span>
            <span>Income</span>
            <span>Banking</span>
            <span>Review</span>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Form Steps */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Step 1: Personal Information */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <User className="w-8 h-8 text-blue-600" />
                <h2 className="text-2xl font-bold">Personal Information</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => updateField('firstName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="John"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => updateField('lastName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="(317) 555-0123"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => updateField('dateOfBirth', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last 4 of SSN *
                  </label>
                  <input
                    type="text"
                    value={formData.ssn}
                    onChange={(e) => updateField('ssn', e.target.value)}
                    maxLength={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="1234"
                  />
                  <p className="text-xs text-gray-500 mt-1">For identity verification only</p>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Address */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">Address Information</h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Street Address *
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => updateField('address', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="123 Main St"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => updateField('city', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Indianapolis"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State *
                  </label>
                  <select
                    value={formData.state}
                    onChange={(e) => updateField('state', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="IN">Indiana</option>
                    <option value="IL">Illinois</option>
                    <option value="OH">Ohio</option>
                    <option value="KY">Kentucky</option>
                    <option value="MI">Michigan</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ZIP Code *
                  </label>
                  <input
                    type="text"
                    value={formData.zipCode}
                    onChange={(e) => updateField('zipCode', e.target.value)}
                    maxLength={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="46240"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Income */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <DollarSign className="w-8 h-8 text-blue-600" />
                <h2 className="text-2xl font-bold">Income Information</h2>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Employment Status *
                </label>
                <select
                  value={formData.employmentStatus}
                  onChange={(e) => updateField('employmentStatus', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="student">Student (Training Stipend)</option>
                  <option value="employed">Employed</option>
                  <option value="both">Both (Student + Employed)</option>
                </select>
              </div>

              {(formData.employmentStatus === 'employed' || formData.employmentStatus === 'both') && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Employer Name
                    </label>
                    <input
                      type="text"
                      value={formData.employer}
                      onChange={(e) => updateField('employer', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Company Name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Monthly Income (After Tax) *
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-3 text-gray-500">$</span>
                      <input
                        type="number"
                        value={formData.monthlyIncome}
                        onChange={(e) => updateField('monthlyIncome', e.target.value)}
                        className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="2,500"
                      />
                    </div>
                  </div>
                </>
              )}

              {(formData.employmentStatus === 'student' || formData.employmentStatus === 'both') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Monthly Training Stipend *
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-3 text-gray-500">$</span>
                    <input
                      type="number"
                      value={formData.trainingStipend}
                      onChange={(e) => updateField('trainingStipend', e.target.value)}
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="2,400"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Apprentices earning $15-18/hour = ~$2,400-2,880/month
                  </p>
                </div>
              )}

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>Total Monthly Income:</strong> $
                  {(parseInt(formData.monthlyIncome || '0') + parseInt(formData.trainingStipend || '0')).toLocaleString()}
                </p>
              </div>
            </div>
          )}

          {/* Step 4: Banking */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <CreditCard className="w-8 h-8 text-blue-600" />
                <h2 className="text-2xl font-bold">Banking Information</h2>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <div className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-yellow-800">
                    Your banking information is encrypted and secure. We use bank-level security to protect your data.
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bank Name *
                </label>
                <input
                  type="text"
                  value={formData.bankName}
                  onChange={(e) => updateField('bankName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Chase, Wells Fargo, etc."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Account Type *
                </label>
                <select
                  value={formData.accountType}
                  onChange={(e) => updateField('accountType', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="checking">Checking</option>
                  <option value="savings">Savings</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Routing Number *
                </label>
                <input
                  type="text"
                  value={formData.routingNumber}
                  onChange={(e) => updateField('routingNumber', e.target.value)}
                  maxLength={9}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="123456789"
                />
                <p className="text-xs text-gray-500 mt-1">9-digit number on bottom left of check</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Account Number *
                </label>
                <input
                  type="text"
                  value={formData.accountNumber}
                  onChange={(e) => updateField('accountNumber', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Account number"
                />
              </div>
            </div>
          )}

          {/* Step 5: Review & Submit */}
          {step === 5 && (
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <FileText className="w-8 h-8 text-blue-600" />
                <h2 className="text-2xl font-bold">Review & Submit</h2>
              </div>

              {/* Loan Amount Selector */}
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Select Advance Amount</h3>
                <input
                  type="range"
                  min="100"
                  max="3500"
                  step="50"
                  value={formData.requestedAmount}
                  onChange={(e) => updateField('requestedAmount', parseInt(e.target.value))}
                  className="w-full h-3 bg-white/20 rounded-lg appearance-none cursor-pointer mb-4"
                />
                <div className="flex justify-between text-sm mb-6">
                  <span>$100</span>
                  <span className="text-3xl font-bold">${formData.requestedAmount}</span>
                  <span>$3,500</span>
                </div>

                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Advance Amount:</span>
                    <span className="font-bold">${formData.requestedAmount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fee:</span>
                    <span className="font-bold">${fee}</span>
                  </div>
                  <div className="border-t border-white/20 pt-2 flex justify-between text-lg">
                    <span className="font-bold">Total Repayment:</span>
                    <span className="font-bold">${totalRepayment}</span>
                  </div>
                </div>
              </div>

              {/* Purpose */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What will you use this for? (Optional)
                </label>
                <textarea
                  value={formData.purpose}
                  onChange={(e) => updateField('purpose', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Rent, car repair, medical bills, etc."
                />
              </div>

              {/* Repayment Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  When is your next payday? *
                </label>
                <input
                  type="date"
                  value={formData.repaymentDate}
                  onChange={(e) => updateField('repaymentDate', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Repayment will be automatically deducted on this date
                </p>
              </div>

              {/* Summary */}
              <div className="bg-gray-50 rounded-lg p-6 space-y-3">
                <h3 className="font-bold text-lg mb-4">Application Summary</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Name:</span>
                    <span className="ml-2 font-medium">{formData.firstName} {formData.lastName}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Email:</span>
                    <span className="ml-2 font-medium">{formData.email}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Monthly Income:</span>
                    <span className="ml-2 font-medium">
                      ${(parseInt(formData.monthlyIncome || '0') + parseInt(formData.trainingStipend || '0')).toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Bank:</span>
                    <span className="ml-2 font-medium">{formData.bankName}</span>
                  </div>
                </div>
              </div>

              {/* Terms */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input type="checkbox" className="mt-1" required />
                  <span className="text-sm text-blue-900">
                    I agree to the terms and conditions. I authorize Elevate for Humanity to deduct ${totalRepayment} from my bank account on {formData.repaymentDate || '[selected date]'}. I understand this is a short-term cash advance, not a loan.
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            {step > 1 && (
              <button
                onClick={prevStep}
                className="flex items-center space-x-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back</span>
              </button>
            )}
            
            {step < 5 ? (
              <button
                onClick={nextStep}
                className="ml-auto flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <span>Continue</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={submitApplication}
                disabled={loading || !formData.repaymentDate}
                className="ml-auto flex items-center space-x-2 px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-bold"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    <span>Submit Application</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <Shield className="w-4 h-4 inline mr-1" />
          Your information is encrypted and secure. We never share your data.
        </div>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-700 to-purple-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Career?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Join thousands who have launched successful careers through our free training programs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/apply"
                className="bg-white text-blue-700 px-8 py-4 rounded-lg font-bold hover:bg-blue-50 text-lg shadow-2xl transition-all"
              >
                Apply Now - It's Free
              </Link>
              <Link
                href="/programs"
                className="bg-blue-800 text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-900 border-2 border-white text-lg shadow-2xl transition-all"
              >
                Browse All Programs
              </Link>
            </div>
          </div>
        </div>
      </section>

      </div>
    </div>
  );
}
