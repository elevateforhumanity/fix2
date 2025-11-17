# Elevate Course Orchestrator – Functional Spec
### Version 1.0 – "Partner-Powered, Elevate-Certified"

---

## 1. Goal in Plain Language

Elevate does **not** want to recreate what credentialing partners already do.

Instead:

- Partners (Milady, Choice Medical, Certiport, etc.)  
  → create and deliver the main courses and issue **industry credentials**  

- Elevate  
  → **orchestrates** a pathway that:
  - Combines multiple partner courses  
  - Adds Elevate's own live instruction and quizzes  
  - Tracks progress  
  - Sends reminders  
  - Issues an **Elevate Certificate of Completion** when everything is done  

Each Elevate program = a **composed course** built from several "blocks":
- Partner courses  
- Free online modules  
- Live sessions  
- Elevate quizzes  
- Compliance/admin steps  

---

## 2. Core Concepts

### 2.1 CourseConfig (the "composed course")

One Elevate program (e.g., "Barber Apprenticeship Pathway") is represented as a `CourseConfig` object:

- ID and title  
- Description  
- Total hours (for workforce compliance)  
- List of content **blocks** in order  
- Rules for completion  
- Email automations  
- Tags for agencies/funding (WRG, JRI, ETPL, etc.)

### 2.2 Block Types

Each block is one step in the learner's journey. Supported types:

1. **partner_course**
   - A module delivered by a credentialing partner  
   - Examples:
     - Milady Barbering Core Theory
     - Choice Medical CNA module
     - Certiport IT certification prep

2. **free_online**
   - External resource from the open web  
   - Examples:
     - YouTube playlist
     - Free OSHA course
     - Free customer service training

3. **live_session**
   - Synchronous session managed by Elevate or a program holder  
   - Examples:
     - Weekly Q&A
     - Orientation session
     - Office hours

4. **quiz**
   - Internal Elevate quiz/assessment  
   - Verifies that students actually learned something  

5. **admin_task** (optional)
   - Compliance / paperwork steps  
   - Examples:
     - Upload WIOA intake form
     - Sign apprenticeship agreement
     - ID upload

---

## 3. How a Program Holder Builds a Course

### 3.1 Step 1 – Create Program Shell

Fields:

- Program ID  
- Program title  
- Category (HVAC, Barber, CNA, CDL, etc.)  
- Short public description  
- Total hours estimate  
- Tags:
  - `["WRG", "JRI", "ETPL", "Apprenticeship", "WorkOne"]` etc.  
- Who issues **credentials**:
  - e.g., `["milady", "choice_medical"]`  
- Who issues **completion certificate**:
  - Always Elevate

This creates the **shell** that the blocks will live inside.

### 3.2 Step 2 – Add Partner Course Blocks

Admin/instructor chooses from a pre-defined partner catalog:

- Pick partner (Milady / Choice / Certiport / etc.)  
- Pick course from that partner's list  
- System pre-fills:
  - Title  
  - Description  
  - Expected hours  
  - Launch URL (LTI/deep link/etc.)

Admin can adjust visibility and whether it's required.

### 3.3 Step 3 – Add Free Online Blocks

Admin can add external resources:

- Title ("OSHA Safety Basics")  
- URL (YouTube, website, etc.)  
- Expected hours  
- Optional: attach an Elevate quiz to verify understanding

### 3.4 Step 4 – Add Live Instruction Blocks

Program holder can plug in:

- Session title (e.g., "Weekly Live Q&A")  
- Meeting link (Zoom / Teams / in-person address)  
- Schedule info (one-time / recurring)  
- Whether attendance is required or optional  
- Whether a recording upload is expected afterward

### 3.5 Step 5 – Add Quizzes and Completion Rules

- Create Elevate quizzes (questions stored in your question bank)  
- Attach quizzes:
  - After partner blocks
  - After free online blocks
  - After live sessions

Then define course-level completion rules, such as:

- All required blocks completed  
- Average quiz score ≥ 75%  
- Required admin tasks done  
- Minimum number of live sessions attended

When all conditions are met:
- Mark course complete
- Generate Elevate Certificate of Completion
- Fire "completion" email

---

## 4. Student Experience

### 4.1 Enrollment

When a student enrolls:

1. A `StudentCourseProgress` record is created for that `CourseConfig`.  
2. The system sends a **Welcome Email**:
   - Explains that the pathway uses partner content + Elevate support  
   - Shows key steps and deadlines  
   - Gives a login link to the Elevate dashboard  

3. (Optional, future) If partner API exists:
   - Auto-enroll student into partner LMS via API/LTI  

### 4.2 Dashboard View

Student's course dashboard shows:

- Progress bar for entire course  
- List of blocks in order:
  - Partner blocks: "Launch Partner Course" button  
  - Free blocks: "View Resource" button  
  - Live sessions: schedule + join link + countdown  
  - Quizzes: "Start Quiz" button  
  - Admin tasks: upload buttons/forms  

Each block shows status:
- Not started / In progress / Pending verification / Complete

### 4.3 Emails & Reminders

Key automations:

- `on_enroll` → Welcome / "Let's get started"  
- `on_inactive_X_days` → Nudge  
- `before_live_session_24h` → Reminder with link  
- `on_completion` → Congrats + certificate link  

Per course config, we store:
- Which templates to use  
- After how many inactive days to nudge

---

## 5. How Completion Is Verified

Partners issue **their own credentials**.

Elevate recognizes completion of partner blocks via:

- Manual instructor mark (e.g., "I checked Milady / Choice portal – they're done")  
- Student uploads partner certificate → instructor verifies  
- (Future) Partner webhook calls Elevate API when student finishes  

When the system sees that:
- All required partner blocks are verified  
- All required Elevate quizzes are passed  
- All admin tasks are done  
- Any live session requirements are met  

→ It marks the `StudentCourseProgress` as `completed` and triggers:

- Create Elevate Certificate of Completion  
- Email the student  
- Flag record for workforce report (WorkOne, EmployIndy, etc.)

---

## 6. Data Model (Conceptual)

### 6.1 CourseConfig

- `id` – string  
- `title` – string  
- `description` – string  
- `total_hours` – number  
- `tags` – string[] (e.g., ["WRG", "Apprenticeship"])  
- `blocks` – `CourseBlock[]`  
- `completionRules` – rules object  
- `emailAutomation` – email triggers object  

### 6.2 CourseBlock (discriminated union)

Common:

- `id` – string  
- `type` – `"partner_course" | "free_online" | "live_session" | "quiz" | "admin_task"`  
- `displayTitle` – string  
- `required` – boolean  

Each type then adds its own fields (see TS section).

### 6.3 StudentCourseProgress

Per student per course:

- `id`  
- `studentId`  
- `courseId`  
- `status`: `"not_started" | "in_progress" | "completed" | "dropped"`  
- `blocks`: array of:
  - `blockId`
  - `status`: `"not_started" | "in_progress" | "pending_verification" | "completed"`
  - `score` (if quiz)
  - `evidenceUrl` (certificate upload, etc.)
- `createdAt`, `updatedAt`

---

## 7. Universal For Any Program Holder

Any program holder (HVAC, Barber, CNA, CDL, etc.) can use this orchestrator by:

1. Creating a `CourseConfig` with:
   - Partner blocks (Milady, Choice, Certiport, etc.)  
   - Free blocks (if needed)  
   - Their own live sessions  
   - Elevate quizzes  

2. Letting Elevate's system handle:
   - Email communication  
   - Progress tracking  
   - Basic reporting  

3. Using their own teaching style inside:
   - Live sessions  
   - Partner LMS methods  

Elevate remains the **hub** that keeps everything organized and compliant.

---

## 8. Future Enhancements (Nice-to-Have)

- Webhook integration with partners for auto-completion  
- Calendar sync for live sessions (Google/Outlook)  
- Agency dashboards (WorkOne/EmployIndy) to view client progress in real time  
- SMS reminders (opt-in)  

---

# END OF SPEC
