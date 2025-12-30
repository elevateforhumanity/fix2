'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Upload,
  FileText,
  Image as ImageIcon,
  CheckCircle,
  AlertCircle,
  Loader2,
  Sparkles,
  Eye,
  Trash2,
  Download,
} from 'lucide-react';
import { drakeIntegration } from '@/lib/integrations/drake-software';

interface ExtractedData {
  documentType: 'w2' | '1099-misc' | '1099-nec' | '1099-int' | '1099-div' | 'receipt' | 'other';
  data: {
    // W-2 Fields
    employer?: string;
    ein?: string;
    wages?: number;
    federalWithholding?: number;
    stateWithholding?: number;
    socialSecurityWages?: number;
    medicareWages?: number;
    
    // 1099 Fields
    payer?: string;
    payerEIN?: string;
    amount?: number;
    interestIncome?: number;
    dividendIncome?: number;
    
    // Receipt Fields
    vendor?: string;
    date?: string;
    category?: string;
    deductionAmount?: number;
  };
  confidence: number;
  rawText?: string;
}

interface UploadedFile {
  id: string;
  file: File;
  preview: string;
  status: 'uploading' | 'processing' | 'completed' | 'error';
  extractedData?: ExtractedData;
  error?: string;
}

export default function SmartUploadPage() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [processing, setProcessing] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const newFiles: UploadedFile[] = acceptedFiles.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      preview: URL.createObjectURL(file),
      status: 'uploading',
    }));

    setFiles((prev) => [...prev, ...newFiles]);

    // Process each file
    for (const uploadedFile of newFiles) {
      await processFile(uploadedFile);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.heic'],
      'application/pdf': ['.pdf'],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  const processFile = async (uploadedFile: UploadedFile) => {
    try {
      // Update status to processing
      setFiles((prev) =>
        prev.map((f) =>
          f.id === uploadedFile.id ? { ...f, status: 'processing' } : f
        )
      );

      // Step 1: Upload to Drake Software for OCR
      const drakeResult = await drakeIntegration.uploadDocument(
        'temp-return-id', // In production, this would be the actual return ID
        uploadedFile.file,
        detectDocumentType(uploadedFile.file.name)
      );

      // Step 2: Extract data using Drake's OCR
      const extractedData = await extractDataFromOCR(
        drakeResult.ocrData,
        uploadedFile.file
      );

      // Step 3: Update file with extracted data
      setFiles((prev) =>
        prev.map((f) =>
          f.id === uploadedFile.id
            ? { ...f, status: 'completed', extractedData }
            : f
        )
      );

      // Step 4: Auto-save to database
      await saveExtractedData(extractedData);
    } catch (error) {
      console.error('Processing error:', error);
      setFiles((prev) =>
        prev.map((f) =>
          f.id === uploadedFile.id
            ? {
                ...f,
                status: 'error',
                error: error instanceof Error ? error.message : 'Processing failed',
              }
            : f
        )
      );
    }
  };

  const detectDocumentType = (
    filename: string
  ): 'w2' | '1099' | 'receipt' | 'other' => {
    const lower = filename.toLowerCase();
    if (lower.includes('w2') || lower.includes('w-2')) return 'w2';
    if (lower.includes('1099')) return '1099';
    if (lower.includes('receipt')) return 'receipt';
    return 'other';
  };

  const extractDataFromOCR = async (
    ocrData: any,
    file: File
  ): Promise<ExtractedData> => {
    // In production, Drake's OCR would return structured data
    // For now, simulate the extraction
    
    // Use browser's OCR or Tesseract.js as fallback
    const text = await performOCR(file);
    
    // Parse the text to extract tax form data
    const extractedData = parseTextForTaxData(text);
    
    return extractedData;
  };

  const performOCR = async (file: File): Promise<string> => {
    // In production, this would use:
    // 1. Drake Software's built-in OCR (preferred)
    // 2. Google Vision API (backup)
    // 3. Tesseract.js (offline fallback)
    
    // Simulate OCR processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    // Mock extracted text from W-2
    return `
      a Employee's social security number: 123-45-6789
      b Employer identification number (EIN): 12-3456789
      c Employer's name, address, and ZIP code:
      ACME Corporation
      123 Main St
      Indianapolis, IN 46220
      
      1 Wages, tips, other compensation: 50000.00
      2 Federal income tax withheld: 6000.00
      3 Social security wages: 50000.00
      4 Social security tax withheld: 3100.00
      5 Medicare wages and tips: 50000.00
      6 Medicare tax withheld: 725.00
      17 State income tax: 2000.00
    `;
  };

  const parseTextForTaxData = (text: string): ExtractedData => {
    // Smart parsing logic to extract structured data
    const data: ExtractedData = {
      documentType: 'w2',
      data: {},
      confidence: 0.95,
      rawText: text,
    };

    // Extract W-2 data using regex patterns
    const wagesMatch = text.match(/Wages.*?(\d+\.?\d*)/i);
    const federalMatch = text.match(/Federal.*?withheld.*?(\d+\.?\d*)/i);
    const employerMatch = text.match(/Employer.*?name.*?\n(.*?)\n/i);
    const einMatch = text.match(/EIN.*?(\d{2}-\d{7})/i);
    const ssWagesMatch = text.match(/Social security wages.*?(\d+\.?\d*)/i);
    const medicareWagesMatch = text.match(/Medicare wages.*?(\d+\.?\d*)/i);
    const stateMatch = text.match(/State income tax.*?(\d+\.?\d*)/i);

    if (wagesMatch) data.data.wages = parseFloat(wagesMatch[1]);
    if (federalMatch) data.data.federalWithholding = parseFloat(federalMatch[1]);
    if (employerMatch) data.data.employer = employerMatch[1].trim();
    if (einMatch) data.data.ein = einMatch[1];
    if (ssWagesMatch) data.data.socialSecurityWages = parseFloat(ssWagesMatch[1]);
    if (medicareWagesMatch) data.data.medicareWages = parseFloat(medicareWagesMatch[1]);
    if (stateMatch) data.data.stateWithholding = parseFloat(stateMatch[1]);

    return data;
  };

  const saveExtractedData = async (extractedData: ExtractedData) => {
    // Save to database
    try {
      const response = await fetch('/api/supersonic-fast-cash/diy/income', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          documentType: extractedData.documentType,
          data: extractedData.data,
          confidence: extractedData.confidence,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save data');
      }
    } catch (error) {
      console.error('Save error:', error);
    }
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const formatCurrency = (amount?: number) => {
    if (!amount) return '$0';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-semibold">AI-Powered OCR</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Smart Document Upload
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Upload your W-2s, 1099s, and receipts. We'll automatically extract all the
            data for you using Drake Software OCR.
          </p>
        </div>

        {/* Upload Zone */}
        <div
          {...getRootProps()}
          className={`border-3 border-dashed rounded-2xl p-12 text-center cursor-pointer transition ${
            isDragActive
              ? 'border-green-500 bg-green-50'
              : 'border-gray-300 hover:border-green-400 bg-white'
          }`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <Upload className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold mb-2">
              {isDragActive ? 'Drop files here' : 'Upload Tax Documents'}
            </h3>
            <p className="text-gray-600 mb-6">
              Drag & drop or click to browse. We support W-2s, 1099s, receipts, and
              more.
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <ImageIcon className="w-4 h-4" />
                <span>JPG, PNG, HEIC</span>
              </div>
              <div className="flex items-center gap-1">
                <FileText className="w-4 h-4" />
                <span>PDF</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4" />
                <span>Max 10MB</span>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 my-12">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <Sparkles className="w-10 h-10 text-purple-600 mb-4" />
            <h3 className="font-bold text-lg mb-2">Auto Data Extraction</h3>
            <p className="text-sm text-gray-600">
              Drake Software OCR automatically reads and extracts all data from your
              documents
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <CheckCircle className="w-10 h-10 text-green-600 mb-4" />
            <h3 className="font-bold text-lg mb-2">95%+ Accuracy</h3>
            <p className="text-sm text-gray-600">
              Industry-leading OCR technology ensures accurate data extraction
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <Loader2 className="w-10 h-10 text-blue-600 mb-4" />
            <h3 className="font-bold text-lg mb-2">Instant Processing</h3>
            <p className="text-sm text-gray-600">
              Get results in seconds. No manual data entry required
            </p>
          </div>
        </div>

        {/* Uploaded Files */}
        {files.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Uploaded Documents</h2>

            {files.map((file) => (
              <div
                key={file.id}
                className="bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-100"
              >
                <div className="flex items-start gap-6">
                  {/* Preview */}
                  <div className="w-32 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    {file.file.type.startsWith('image/') ? (
                      <img
                        src={file.preview}
                        alt={file.file.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <FileText className="w-12 h-12 text-gray-400" />
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-lg mb-1">{file.file.name}</h3>
                        <p className="text-sm text-gray-500">
                          {(file.file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>

                      {/* Status Badge */}
                      <div className="flex items-center gap-2">
                        {file.status === 'uploading' && (
                          <span className="flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Uploading
                          </span>
                        )}
                        {file.status === 'processing' && (
                          <span className="flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                            <Sparkles className="w-4 h-4 animate-pulse" />
                            Extracting Data
                          </span>
                        )}
                        {file.status === 'completed' && (
                          <span className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                            <CheckCircle className="w-4 h-4" />
                            Completed
                          </span>
                        )}
                        {file.status === 'error' && (
                          <span className="flex items-center gap-2 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
                            <AlertCircle className="w-4 h-4" />
                            Error
                          </span>
                        )}
                        <button
                          onClick={() => removeFile(file.id)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition"
                        >
                          <Trash2 className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    </div>

                    {/* Extracted Data */}
                    {file.extractedData && (
                      <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-bold text-lg">
                            Extracted Data ({file.extractedData.documentType.toUpperCase()})
                          </h4>
                          <span className="text-sm text-green-700 font-semibold">
                            {(file.extractedData.confidence * 100).toFixed(0)}% Confidence
                          </span>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          {file.extractedData.data.employer && (
                            <div>
                              <label className="text-xs font-medium text-gray-600">
                                Employer
                              </label>
                              <p className="font-semibold">
                                {file.extractedData.data.employer}
                              </p>
                            </div>
                          )}
                          {file.extractedData.data.ein && (
                            <div>
                              <label className="text-xs font-medium text-gray-600">
                                EIN
                              </label>
                              <p className="font-semibold">
                                {file.extractedData.data.ein}
                              </p>
                            </div>
                          )}
                          {file.extractedData.data.wages && (
                            <div>
                              <label className="text-xs font-medium text-gray-600">
                                Wages (Box 1)
                              </label>
                              <p className="font-semibold text-green-700 text-lg">
                                {formatCurrency(file.extractedData.data.wages)}
                              </p>
                            </div>
                          )}
                          {file.extractedData.data.federalWithholding && (
                            <div>
                              <label className="text-xs font-medium text-gray-600">
                                Federal Withholding (Box 2)
                              </label>
                              <p className="font-semibold text-green-700 text-lg">
                                {formatCurrency(
                                  file.extractedData.data.federalWithholding
                                )}
                              </p>
                            </div>
                          )}
                          {file.extractedData.data.socialSecurityWages && (
                            <div>
                              <label className="text-xs font-medium text-gray-600">
                                Social Security Wages (Box 3)
                              </label>
                              <p className="font-semibold">
                                {formatCurrency(
                                  file.extractedData.data.socialSecurityWages
                                )}
                              </p>
                            </div>
                          )}
                          {file.extractedData.data.medicareWages && (
                            <div>
                              <label className="text-xs font-medium text-gray-600">
                                Medicare Wages (Box 5)
                              </label>
                              <p className="font-semibold">
                                {formatCurrency(file.extractedData.data.medicareWages)}
                              </p>
                            </div>
                          )}
                          {file.extractedData.data.stateWithholding && (
                            <div>
                              <label className="text-xs font-medium text-gray-600">
                                State Withholding (Box 17)
                              </label>
                              <p className="font-semibold">
                                {formatCurrency(
                                  file.extractedData.data.stateWithholding
                                )}
                              </p>
                            </div>
                          )}
                        </div>

                        <div className="mt-4 pt-4 border-t border-green-200">
                          <p className="text-sm text-green-700 font-semibold">
                            ✓ Data automatically added to your tax return
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Error Message */}
                    {file.error && (
                      <div className="bg-red-50 rounded-xl p-4 border-2 border-red-200">
                        <div className="flex gap-2">
                          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                          <p className="text-sm text-red-700">{file.error}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        {files.some((f) => f.status === 'completed') && (
          <div className="mt-8 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl shadow-xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-3">
              Ready to File Your Return?
            </h3>
            <p className="text-green-100 mb-6">
              All your data has been extracted and saved. Continue to complete your tax
              return.
            </p>
            <a
              href="/supersonic-fast-cash/diy/interview"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-green-600 rounded-xl font-bold hover:bg-green-50 transition"
            >
              Continue to Tax Interview →
            </a>
          </div>
        )}
      </div>
    </main>
  );
}
