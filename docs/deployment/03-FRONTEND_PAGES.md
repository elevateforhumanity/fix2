# 🎨 Frontend Pages

## Complete List of Pages Created

### 1. Document Upload (`/documents/upload`)

**Purpose:** Upload required documents based on user role

**Features:**

- Displays role-based document requirements
- Shows upload status (pending, approved, rejected)
- File upload with validation
- Real-time status updates

**Database Function:** `get_user_document_requirements(user_id)`

**UI Components:**

- Document requirement cards
- Upload button with file picker
- Status badges
- Loading states

---

### 2. Partner Course Creation (`/partner/courses/create`)

**Purpose:** Partners can create courses based on their license

**Features:**

- License selection dropdown
- License details display
- Course name and description
- Duration input
- SCORM package upload (if license allows)

**Database Function:** `get_partner_license_info(partner_id)`

**UI Components:**

- License selector
- License info card
- Course form
- SCORM upload
- Submit button

---

### 3. License Purchase (`/licenses/purchase`)

**Purpose:** Purchase licenses via Stripe

**Features:**

- 3 pricing tiers (Basic, Professional, Enterprise)
- Feature comparison table
- Stripe checkout integration
- Responsive pricing cards

**Integration:** Stripe Checkout

**UI Components:**

- Pricing cards
- Feature lists
- Comparison table
- Purchase buttons

---

### 4. Program Enrollment (`/enroll/[programId]`)

**Purpose:** Enroll in programs with license validation

**Features:**

- Program details display
- License key input
- Eligibility checking
- Enrollment confirmation

**Database Function:** `can_user_enroll(user_id, program_id, license_key)`

**UI Components:**

- Program header
- License input
- Eligibility status
- Enroll button

---

### 5. Admin License Management (`/admin/licenses`)

**Purpose:** Admin dashboard for managing all licenses

**Features:**

- License list with stats
- Status filtering
- Usage tracking
- Status updates

**UI Components:**

- Stats cards
- License table
- Filter buttons
- Status dropdown

---

### 6. Admin Dashboard (`/admin/dashboard`)

**Purpose:** System overview for administrators

**Features:**

- System statistics
- Recent activity
- Quick actions
- System health

**UI Components:**

- Stat cards
- Activity feed
- Action buttons
- Health indicators

---

## Common Features

All pages include:

- Loading states
- Error handling
- Success messages
- Responsive design
- Proper authentication checks
