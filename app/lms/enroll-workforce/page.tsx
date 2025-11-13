'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { 
  Upload,
  CheckCircle,
  AlertCircle,
  FileText,
  User,
  MapPin,
  Briefcase
} from 'lucide-react';

const workforcePrograms = [
  { id: 'cna', name: 'Certified Nursing Assistant (CNA)', fundingSource: 'WRG' },
  { id: 'hvac', name: 'HVAC Technician Training', fundingSource: 'WRG' },
  { id: 'barber', name: 'Barber Apprenticeship', fundingSource: 'DOL' },
  { id: 'cdl', name: 'Commercial Driver License (CDL)', fundingSource: 'WIOA' },
  { id: 'welding', name: 'Welding Certification', fundingSource: 'WIOA' },
  { id: 'life-skills', name: 'Life Skills & Job Readiness', fundingSource: 'JRI' },
];

const workoneRegions = [
  'Central Indiana (Indianapolis)',
  'Northeast Indiana (Fort Wayne)',
  'Northwest Indiana (Gary)',
  'Southwest Indiana (Evansville)',
  'Southeast Indiana (Lawrenceburg)',
  'East Central Indiana (Muncie)',
  'North Central Indiana (Kokomo)',
  'West Central Indiana (Terre Haute)',
  'South Central Indiana (Bloomington)',
  'Region 5 (EmployIndy)',
];

export default function WorkforceEnrollmentPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    ssn4: '',
    address: '',
    city: '',
    state: 'IN',
    zipCode: '',
    workoneRegion: '',
    program: '',
    caseManagerName: '',
    caseManagerEmail: '',
    employmentStatus: '',
    hasId: false,
    hasResume: false,
    eligibilityDoc: false,
  });

  const [files, setFiles] = useState({
    idDocument: null as File | null,
    resume: null as File | null,
    eligibilityDoc: null as File | null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const handleFileChange = (field: string, file: File | null) => {
    setFiles({ ...files, [field]: file });
  };

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'Required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Required';
    if (!formData.email.trim()) newErrors.email = 'Required';
    if (!formData.phone.trim()) newErrors.phone = 'Required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Required';
    if (!formData.ssn4 || formData.ssn4.length !== 4) newErrors.ssn4 = 'Must be 4 digits';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.address.trim()) newErrors.address = 'Required';
    if (!formData.city.trim()) newErrors.city = 'Required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'Required';
    if (!formData.workoneRegion) newErrors.workoneRegion = 'Required';
    if (!formData.program) newErrors.program = 'Required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setStep(4); // Success step
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-600 py-12 px-4">
      <div className="container mx-auto max-w-3xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center text-primary font-bold text-3xl mx-auto mb-4">
            E
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Free Workforce Training Application
          </h1>
          <p className="text-blue-100">
            Funded by WRG, WIOA, JRI, and DOL Apprenticeship Programs
          </p>
        </div>

        {/* Progress Steps */}
        {step < 4 && (
          <div className="mb-8">
            <div className="flex items-center justify-between max-w-md mx-auto">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    s <= step ? 'bg-white text-primary' : 'bg-blue-400 text-white'
                  }`}>
                    {s < step ? <CheckCircle className="h-6 w-6" /> : s}
                  </div>
                  {s < 3 && (
                    <div className={`w-16 h-1 ${s < step ? 'bg-white' : 'bg-blue-400'}`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between max-w-md mx-auto mt-2 text-xs text-white">
              <span>Personal Info</span>
              <span>Program Details</span>
              <span>Documents</span>
            </div>
          </div>
        )}

        <Card>
          <CardContent className="pt-6">
            {/* Step 1: Personal Information */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Personal Information</h2>
                  <p className="text-muted-foreground">
                    This information is required for eligibility verification
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleChange('firstName', e.target.value)}
                      className={errors.firstName ? 'border-red-500' : ''}
                    />
                    {errors.firstName && <p className="text-sm text-red-500">{errors.firstName}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleChange('lastName', e.target.value)}
                      className={errors.lastName ? 'border-red-500' : ''}
                    />
                    {errors.lastName && <p className="text-sm text-red-500">{errors.lastName}</p>}
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className={errors.email ? 'border-red-500' : ''}
                    />
                    {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      className={errors.phone ? 'border-red-500' : ''}
                    />
                    {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                      className={errors.dateOfBirth ? 'border-red-500' : ''}
                    />
                    {errors.dateOfBirth && <p className="text-sm text-red-500">{errors.dateOfBirth}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ssn4">Last 4 of SSN *</Label>
                    <Input
                      id="ssn4"
                      type="text"
                      maxLength={4}
                      value={formData.ssn4}
                      onChange={(e) => handleChange('ssn4', e.target.value.replace(/\D/g, ''))}
                      className={errors.ssn4 ? 'border-red-500' : ''}
                      placeholder="1234"
                    />
                    {errors.ssn4 && <p className="text-sm text-red-500">{errors.ssn4}</p>}
                    <p className="text-xs text-muted-foreground">For eligibility verification only</p>
                  </div>
                </div>

                <Button onClick={handleNext} className="w-full" size="lg">
                  Continue to Program Details
                </Button>
              </div>
            )}

            {/* Step 2: Program & Location */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Program & Location Details</h2>
                  <p className="text-muted-foreground">
                    Select your training program and WorkOne region
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Street Address *</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                    className={errors.address ? 'border-red-500' : ''}
                  />
                  {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleChange('city', e.target.value)}
                      className={errors.city ? 'border-red-500' : ''}
                    />
                    {errors.city && <p className="text-sm text-red-500">{errors.city}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="state">State *</Label>
                    <Input id="state" value="IN" disabled />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="zipCode">ZIP Code *</Label>
                    <Input
                      id="zipCode"
                      value={formData.zipCode}
                      onChange={(e) => handleChange('zipCode', e.target.value)}
                      className={errors.zipCode ? 'border-red-500' : ''}
                    />
                    {errors.zipCode && <p className="text-sm text-red-500">{errors.zipCode}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="workoneRegion">WorkOne Region *</Label>
                  <Select value={formData.workoneRegion} onValueChange={(v) => handleChange('workoneRegion', v)}>
                    <SelectTrigger className={errors.workoneRegion ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select your region" />
                    </SelectTrigger>
                    <SelectContent>
                      {workoneRegions.map((region) => (
                        <SelectItem key={region} value={region}>
                          {region}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.workoneRegion && <p className="text-sm text-red-500">{errors.workoneRegion}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="program">Training Program *</Label>
                  <Select value={formData.program} onValueChange={(v) => handleChange('program', v)}>
                    <SelectTrigger className={errors.program ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select a program" />
                    </SelectTrigger>
                    <SelectContent>
                      {workforcePrograms.map((prog) => (
                        <SelectItem key={prog.id} value={prog.id}>
                          {prog.name} ({prog.fundingSource})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.program && <p className="text-sm text-red-500">{errors.program}</p>}
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="caseManagerName">Case Manager Name (Optional)</Label>
                    <Input
                      id="caseManagerName"
                      value={formData.caseManagerName}
                      onChange={(e) => handleChange('caseManagerName', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="caseManagerEmail">Case Manager Email (Optional)</Label>
                    <Input
                      id="caseManagerEmail"
                      type="email"
                      value={formData.caseManagerEmail}
                      onChange={(e) => handleChange('caseManagerEmail', e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button onClick={() => setStep(1)} variant="outline" className="flex-1">
                    Back
                  </Button>
                  <Button onClick={handleNext} className="flex-1">
                    Continue to Documents
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Document Upload */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Required Documents</h2>
                  <p className="text-muted-foreground">
                    Upload the following documents for verification
                  </p>
                </div>

                <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200">
                  <CardContent className="pt-6">
                    <div className="flex gap-3">
                      <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div className="text-sm">
                        <p className="font-semibold mb-1">Document Requirements:</p>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                          <li>Files must be PDF, JPG, or PNG format</li>
                          <li>Maximum file size: 5MB per document</li>
                          <li>Documents must be clear and legible</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-4">
                  <div className="border-2 border-dashed rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <FileText className="h-6 w-6 text-primary" />
                      <div>
                        <Label className="text-base font-semibold">Government-Issued ID *</Label>
                        <p className="text-sm text-muted-foreground">Driver's license, state ID, or passport</p>
                      </div>
                    </div>
                    <Input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileChange('idDocument', e.target.files?.[0] || null)}
                    />
                    {files.idDocument && (
                      <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
                        <CheckCircle className="h-4 w-4" />
                        {files.idDocument.name}
                      </p>
                    )}
                  </div>

                  <div className="border-2 border-dashed rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Briefcase className="h-6 w-6 text-primary" />
                      <div>
                        <Label className="text-base font-semibold">Resume (Optional)</Label>
                        <p className="text-sm text-muted-foreground">Current resume or work history</p>
                      </div>
                    </div>
                    <Input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => handleFileChange('resume', e.target.files?.[0] || null)}
                    />
                    {files.resume && (
                      <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
                        <CheckCircle className="h-4 w-4" />
                        {files.resume.name}
                      </p>
                    )}
                  </div>

                  <div className="border-2 border-dashed rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Upload className="h-6 w-6 text-primary" />
                      <div>
                        <Label className="text-base font-semibold">Eligibility Document (Optional)</Label>
                        <p className="text-sm text-muted-foreground">WorkOne referral, TANF letter, or unemployment verification</p>
                      </div>
                    </div>
                    <Input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileChange('eligibilityDoc', e.target.files?.[0] || null)}
                    />
                    {files.eligibilityDoc && (
                      <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
                        <CheckCircle className="h-4 w-4" />
                        {files.eligibilityDoc.name}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button onClick={() => setStep(2)} variant="outline" className="flex-1">
                    Back
                  </Button>
                  <Button 
                    onClick={handleSubmit} 
                    disabled={isSubmitting || !files.idDocument}
                    className="flex-1"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                  </Button>
                </div>
              </div>
            )}

            {/* Step 4: Success */}
            {step === 4 && (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-12 w-12 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Application Submitted!</h2>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                  Your workforce training application has been received. Our team will review your information and contact you within 2-3 business days.
                </p>
                <div className="space-y-3 max-w-md mx-auto">
                  <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200">
                    <CardContent className="pt-6">
                      <p className="text-sm font-semibold mb-2">What happens next?</p>
                      <ol className="text-sm text-left space-y-2 list-decimal list-inside">
                        <li>We verify your eligibility with WorkOne</li>
                        <li>You'll receive an email with login credentials</li>
                        <li>Complete orientation and start your training</li>
                      </ol>
                    </CardContent>
                  </Card>
                  <Button onClick={() => router.push('/')} className="w-full">
                    Return to Home
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
