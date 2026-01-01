# OCR Setup Guide

**Date:** December 31, 2025  
**Status:** OCR infrastructure partially implemented

---

## Current OCR Implementation

### ✅ Existing Components

#### 1. OCR API Endpoint

**Location:** `app/api/supersonic-fast-cash/ocr-extract/route.ts`

**Features:**

- File upload to Supabase Storage
- Drake Software integration for tax document OCR
- Fallback text extraction for W-2 and 1099 forms
- Automatic data extraction and database storage

**Supported Document Types:**

- W-2 (Wage and Tax Statement)
- 1099-MISC (Miscellaneous Income)
- 1099-NEC (Nonemployee Compensation)
- 1099-INT (Interest Income)
- 1099-DIV (Dividend Income)

#### 2. Smart Upload Interface

**Location:** `app/supersonic-fast-cash/tools/smart-upload/page.tsx`

**Features:**

- Drag-and-drop file upload
- Image and PDF support
- Real-time processing status
- Extracted data preview

#### 3. Drake Software Integration

**Location:** `lib/integrations/drake-software.ts`

**Credentials Required:**

```env
DRAKE_ACCOUNT_NUMBER=211607
DRAKE_SERIAL_NUMBER=B7ED-0119-0036-E407
DRAKE_EFILE_PASSWORD=Lizzy6262*
```

**Capabilities:**

- Professional tax document OCR
- W-2 and 1099 form recognition
- Data validation and verification
- E-file integration

---

## Image Processing Libraries

### Installed Dependencies

From `package.json`:

- ✅ **canvas** (v3.2.0) - Node.js canvas implementation
- ✅ **sharp** (v0.34.5) - High-performance image processing
- ✅ **html2canvas** (v1.4.1) - HTML to canvas conversion
- ✅ **jspdf** (v3.0.4) - PDF generation

### Missing OCR Libraries

- ❌ **tesseract.js** - Client-side OCR (recommended)
- ❌ **@google-cloud/vision** - Google Cloud Vision API
- ❌ **aws-sdk** (Textract) - AWS Textract OCR

---

## OCR Implementation Strategy

### Current Approach

1. **Primary:** Drake Software API (tax documents only)
2. **Fallback:** Basic regex pattern matching on text content
3. **Storage:** Supabase Storage for uploaded files
4. **Database:** `tax_documents` table for metadata and extracted data

### Limitations

- Only works for tax-related documents
- Fallback extraction is basic pattern matching, not true OCR
- No support for general document types
- Requires Drake Software credentials

---

## Recommended Enhancements

### Phase 1: Add Tesseract.js (Client-Side OCR)

**Why Tesseract.js:**

- Free and open-source
- Works in browser (no server costs)
- Good accuracy for printed text
- Supports 100+ languages
- No API keys required

**Installation:**

```bash
pnpm add tesseract.js
```

**Implementation:**

```typescript
// lib/ocr/tesseract-client.ts
import Tesseract from 'tesseract.js';

export async function extractTextFromImage(file: File): Promise<{
  text: string;
  confidence: number;
}> {
  const result = await Tesseract.recognize(file, 'eng', {
    logger: (m) => console.log(m),
  });

  return {
    text: result.data.text,
    confidence: result.data.confidence / 100,
  };
}
```

**Use Cases:**

- General document scanning
- Receipt OCR
- Business card scanning
- Form data extraction
- Certificate verification

### Phase 2: Add Google Cloud Vision API (Server-Side OCR)

**Why Google Vision:**

- Highest accuracy for complex documents
- Handwriting recognition
- Multi-language support
- Document structure detection
- Table and form recognition

**Installation:**

```bash
pnpm add @google-cloud/vision
```

**Environment Variables:**

```env
GOOGLE_CLOUD_PROJECT_ID=your-project-id
GOOGLE_CLOUD_VISION_API_KEY=your-api-key
# OR use service account JSON
GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account.json
```

**Implementation:**

```typescript
// lib/ocr/google-vision.ts
import vision from '@google-cloud/vision';

const client = new vision.ImageAnnotatorClient({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});

export async function extractTextFromDocument(buffer: Buffer): Promise<{
  text: string;
  confidence: number;
  blocks: any[];
}> {
  const [result] = await client.documentTextDetection(buffer);
  const fullText = result.fullTextAnnotation;

  return {
    text: fullText?.text || '',
    confidence: fullText?.pages?.[0]?.confidence || 0,
    blocks: fullText?.pages?.[0]?.blocks || [],
  };
}
```

**Use Cases:**

- Complex tax forms
- Handwritten documents
- Multi-page PDFs
- Foreign language documents
- Low-quality scans

### Phase 3: Add AWS Textract (Advanced Document Analysis)

**Why AWS Textract:**

- Form field extraction
- Table detection and extraction
- Checkbox and signature detection
- Key-value pair extraction
- Best for structured forms

**Installation:**

```bash
pnpm add @aws-sdk/client-textract
```

**Environment Variables:**

```env
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=us-east-1
```

**Implementation:**

```typescript
// lib/ocr/aws-textract.ts
import {
  TextractClient,
  AnalyzeDocumentCommand,
} from '@aws-sdk/client-textract';

const client = new TextractClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function analyzeDocument(buffer: Buffer): Promise<{
  text: string;
  forms: Record<string, string>;
  tables: any[];
}> {
  const command = new AnalyzeDocumentCommand({
    Document: { Bytes: buffer },
    FeatureTypes: ['FORMS', 'TABLES'],
  });

  const response = await client.send(command);

  // Parse response...
  return {
    text: extractText(response.Blocks),
    forms: extractForms(response.Blocks),
    tables: extractTables(response.Blocks),
  };
}
```

**Use Cases:**

- Government forms (W-2, 1099, etc.)
- Application forms
- Medical records
- Legal documents
- Insurance claims

---

## Database Schema for OCR

### Existing Table: `tax_documents`

```sql
CREATE TABLE tax_documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL,
  phone TEXT,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size INTEGER,
  file_type TEXT,
  status TEXT DEFAULT 'pending_review',
  ocr_data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Recommended: Generic `documents` Table

```sql
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id),
  document_type TEXT NOT NULL, -- 'tax', 'receipt', 'certificate', 'application', etc.
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size INTEGER,
  file_type TEXT,
  status TEXT DEFAULT 'pending',

  -- OCR Results
  ocr_provider TEXT, -- 'tesseract', 'google-vision', 'aws-textract', 'drake'
  ocr_text TEXT,
  ocr_confidence DECIMAL(3,2),
  ocr_data JSONB,
  ocr_processed_at TIMESTAMPTZ,

  -- Verification
  verified BOOLEAN DEFAULT false,
  verified_by UUID REFERENCES profiles(id),
  verified_at TIMESTAMPTZ,

  -- Metadata
  tags TEXT[],
  category TEXT,
  notes TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_documents_user ON documents(user_id);
CREATE INDEX idx_documents_type ON documents(document_type);
CREATE INDEX idx_documents_status ON documents(status);
```

---

## OCR Processing Pipeline

### Recommended Flow

```
1. User uploads file
   ↓
2. Validate file (type, size, format)
   ↓
3. Upload to Supabase Storage
   ↓
4. Determine document type
   ↓
5. Select OCR provider:
   - Tax documents → Drake Software
   - Complex forms → Google Vision or AWS Textract
   - Simple text → Tesseract.js
   ↓
6. Process with OCR
   ↓
7. Extract structured data
   ↓
8. Save to database
   ↓
9. Return results to user
   ↓
10. Allow manual verification/correction
```

### Error Handling

- Retry failed OCR with different provider
- Fall back to manual entry if OCR fails
- Store raw OCR output for debugging
- Log confidence scores for quality monitoring

---

## Cost Comparison

### Free Options

- **Tesseract.js:** Free, unlimited
- **Drake Software:** Included with tax software license

### Paid Options

- **Google Cloud Vision:**
  - First 1,000 units/month: Free
  - After: $1.50 per 1,000 units
- **AWS Textract:**
  - First 1,000 pages/month: Free (12 months)
  - After: $1.50 per 1,000 pages (text detection)
  - Forms/Tables: $50 per 1,000 pages

---

## Implementation Priority

### Immediate (Week 1)

1. ✅ Review existing OCR implementation
2. ✅ Document current capabilities
3. ⬜ Test Drake Software integration
4. ⬜ Add Tesseract.js for general documents

### Short-term (Week 2-3)

5. ⬜ Create generic documents table
6. ⬜ Build unified OCR API endpoint
7. ⬜ Add document type detection
8. ⬜ Implement provider selection logic

### Medium-term (Month 2)

9. ⬜ Add Google Cloud Vision for complex documents
10. ⬜ Build verification interface
11. ⬜ Add confidence score monitoring
12. ⬜ Create OCR analytics dashboard

### Long-term (Month 3+)

13. ⬜ Add AWS Textract for forms
14. ⬜ Implement batch processing
15. ⬜ Add machine learning for document classification
16. ⬜ Build automated data validation

---

## Testing Checklist

### Document Types to Test

- [ ] W-2 forms (current year)
- [ ] 1099 forms (all types)
- [ ] Receipts (various formats)
- [ ] Business cards
- [ ] Certificates
- [ ] Application forms
- [ ] Handwritten notes
- [ ] Multi-page PDFs
- [ ] Low-quality scans
- [ ] Photos from mobile devices

### Quality Metrics

- [ ] Accuracy rate > 95% for printed text
- [ ] Accuracy rate > 80% for handwritten text
- [ ] Processing time < 5 seconds per page
- [ ] Confidence scores properly calibrated
- [ ] Error handling for unsupported formats

---

## Security Considerations

### Data Protection

- Encrypt files at rest in Supabase Storage
- Use HTTPS for all file transfers
- Implement access controls (RLS policies)
- Audit log for document access
- Automatic deletion of sensitive documents after processing

### Compliance

- FERPA compliance for student documents
- HIPAA compliance for medical records
- IRS Publication 1075 for tax documents
- GDPR compliance for EU users

---

## Next Steps

1. **Test existing OCR endpoint:**

   ```bash
   curl -X POST http://localhost:3000/api/supersonic-fast-cash/ocr-extract \
     -F "file=@test-w2.pdf" \
     -F "documentType=w2" \
     -F "email=test@example.com" \
     -F "phone=555-1234"
   ```

2. **Install Tesseract.js:**

   ```bash
   pnpm add tesseract.js
   ```

3. **Create generic OCR service:**

   ```bash
   mkdir -p lib/ocr
   touch lib/ocr/index.ts
   touch lib/ocr/tesseract-client.ts
   touch lib/ocr/provider-selector.ts
   ```

4. **Update environment variables:**
   - Add OCR provider credentials to `.env.local`
   - Configure Supabase Storage bucket for documents

5. **Build verification interface:**
   - Create admin page for reviewing OCR results
   - Add manual correction workflow
   - Implement confidence score display

---

## Resources

### Documentation

- [Tesseract.js Docs](https://tesseract.projectnaptha.com/)
- [Google Cloud Vision API](https://cloud.google.com/vision/docs)
- [AWS Textract](https://docs.aws.amazon.com/textract/)
- [Drake Software API](https://www.drakesoftware.com/api)

### Tutorials

- [Building an OCR App with Tesseract.js](https://blog.logrocket.com/building-ocr-app-tesseract-js/)
- [Google Vision API Tutorial](https://cloud.google.com/vision/docs/ocr)
- [AWS Textract Examples](https://github.com/aws-samples/amazon-textract-code-samples)

---

## Support

For questions or issues:

1. Check existing OCR implementation in `app/api/supersonic-fast-cash/ocr-extract/route.ts`
2. Review Drake Software integration in `lib/integrations/drake-software.ts`
3. Test with sample documents in `_incoming/` directory
4. Contact Drake Software support for API issues
