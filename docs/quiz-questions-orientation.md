# Orientation Quiz Questions

### For Course Orchestrator System

---

## Barber Pathway Orientation Quiz

**Quiz ID:** `barber_orientation_001`  
**Passing Score:** 70%  
**Total Questions:** 10

---

### Question 1

**Question:** Who provides the official barbering curriculum in this pathway?

**Type:** Multiple Choice

**Options:**

- A. Elevate
- B. Milady ✓
- C. WorkOne
- D. The barbershop

**Correct Answer:** B

**Explanation:** Milady provides the industry-standard barbering curriculum that prepares you for state licensing.

---

### Question 2

**Question:** Who issues your Barber License?

**Type:** Multiple Choice

**Options:**

- A. Elevate
- B. Your instructor
- C. The State Board ✓
- D. WorkOne

**Correct Answer:** C

**Explanation:** Your state's barber board issues the official barber license after you pass the state exam.

---

### Question 3

**Question:** What certificate does Elevate issue?

**Type:** Multiple Choice

**Options:**

- A. Barber License
- B. Milady Diploma
- C. Elevate Certificate of Completion ✓
- D. Cosmetology Certificate

**Correct Answer:** C

**Explanation:** Elevate issues a Certificate of Completion when you finish all pathway requirements.

---

### Question 4

**Question:** What must you upload to verify Milady completion?

**Type:** Multiple Choice

**Options:**

- A. Haircut video
- B. Certificate from Milady ✓
- C. Pay stub
- D. None

**Correct Answer:** B

**Explanation:** You need to upload your Milady completion certificate as proof you finished their program.

---

### Question 5

**Question:** Are weekly Q&A sessions required?

**Type:** Multiple Choice

**Options:**

- A. Yes ✓
- B. No

**Correct Answer:** A

**Explanation:** Weekly live Q&A sessions are required to provide you with ongoing support and guidance.

---

### Question 6

**Question:** If you miss a live Q&A, what can you watch?

**Type:** Multiple Choice

**Options:**

- A. TikTok
- B. Shop camera
- C. Recording in the LMS ✓
- D. Nothing

**Correct Answer:** C

**Explanation:** All live sessions are recorded and posted in your LMS dashboard within 24 hours.

---

### Question 7

**Question:** Who verifies your completion?

**Type:** Multiple Choice

**Options:**

- A. Elevate staff ✓
- B. Milady
- C. Your employer
- D. Your classmate

**Correct Answer:** A

**Explanation:** Elevate staff reviews all your completed blocks and issues your Certificate of Completion.

---

### Question 8

**Question:** Where do you take theory modules?

**Type:** Multiple Choice

**Options:**

- A. Elevate LMS
- B. Milady platform ✓
- C. WorkOne site
- D. State Board website

**Correct Answer:** B

**Explanation:** Theory modules are delivered through the Milady platform, which you access from your Elevate dashboard.

---

### Question 9

**Question:** Uploading ID and intake forms is:

**Type:** Multiple Choice

**Options:**

- A. Optional
- B. Required ✓

**Correct Answer:** B

**Explanation:** ID and intake forms are required for compliance with workforce funding and agency partners.

---

### Question 10

**Question:** To finish the pathway, you must:

**Type:** Multiple Choice

**Options:**

- A. Complete all required blocks
- B. Pass Elevate quizzes
- C. Attend live sessions
- D. All of the above ✓

**Correct Answer:** D

**Explanation:** Pathway completion requires finishing all required blocks, passing quizzes, and attending live sessions.

---

## CNA Orientation Quiz

**Quiz ID:** `cna_orientation_001`  
**Passing Score:** 70%  
**Total Questions:** 10

---

### Question 1

**Question:** Who delivers the official CNA curriculum?

**Type:** Multiple Choice

**Options:**

- A. Elevate
- B. Choice Medical Institute ✓
- C. WorkOne
- D. The hospital

**Correct Answer:** B

**Explanation:** Choice Medical Institute provides the CNA theory and clinical training curriculum.

---

### Question 2

**Question:** Who issues your CNA credential?

**Type:** Multiple Choice

**Options:**

- A. Elevate
- B. Choice Medical
- C. The State after passing your exam ✓
- D. Your employer

**Correct Answer:** C

**Explanation:** Your state issues the official CNA credential after you pass the state certification exam.

---

### Question 3

**Question:** What certificate does Elevate issue?

**Type:** Multiple Choice

**Options:**

- A. CNA License
- B. Choice Medical Diploma
- C. Elevate Certificate of Completion ✓
- D. Nursing Degree

**Correct Answer:** C

**Explanation:** Elevate issues a Certificate of Completion when you finish all pathway requirements.

---

### Question 4

**Question:** Where do you complete CNA theory modules?

**Type:** Multiple Choice

**Options:**

- A. Elevate LMS only
- B. Partner platform (Choice Medical) ✓
- C. WorkOne site
- D. State Board website

**Correct Answer:** B

**Explanation:** CNA theory modules are delivered through the Choice Medical platform.

---

### Question 5

**Question:** Where do you complete live Q&A?

**Type:** Multiple Choice

**Options:**

- A. Choice Medical campus
- B. Elevate live sessions ✓
- C. Hospital
- D. WorkOne office

**Correct Answer:** B

**Explanation:** Elevate provides weekly live Q&A sessions to support your learning journey.

---

### Question 6

**Question:** What documents must be uploaded before beginning?

**Type:** Multiple Choice

**Options:**

- A. Nothing
- B. ID and intake documents ✓
- C. High school diploma only
- D. Resume

**Correct Answer:** B

**Explanation:** ID and intake documents are required for compliance and funding eligibility.

---

### Question 7

**Question:** Is attending Elevate live CNA sessions required?

**Type:** Multiple Choice

**Options:**

- A. Yes ✓
- B. No

**Correct Answer:** A

**Explanation:** Live sessions are required to provide ongoing support and ensure your success.

---

### Question 8

**Question:** What is the final assessment?

**Type:** Multiple Choice

**Options:**

- A. State CNA exam
- B. Choice Medical final
- C. Elevate final CNA quiz ✓
- D. Hospital interview

**Correct Answer:** C

**Explanation:** The Elevate final CNA quiz is the last assessment before pathway completion.

---

### Question 9

**Question:** How do you prove partner completion?

**Type:** Multiple Choice

**Options:**

- A. Email from instructor
- B. Upload your CNA theory/clinical certificates ✓
- C. Verbal confirmation
- D. Nothing needed

**Correct Answer:** B

**Explanation:** You must upload certificates from Choice Medical to verify completion of their program.

---

### Question 10

**Question:** After Elevate completion, what's your next step?

**Type:** Multiple Choice

**Options:**

- A. Apply for jobs
- B. Schedule the state CNA exam ✓
- C. Take a vacation
- D. Start another program

**Correct Answer:** B

**Explanation:** After completing the Elevate pathway, you schedule and take the state CNA certification exam.

---

## Quiz Implementation Notes

### For Developers:

1. **Quiz Storage:** Store questions in `quiz_questions` table with:
   - `quiz_id` (references the quiz block)
   - `question_text`
   - `question_type` (multiple_choice, true_false, short_answer)
   - `options` (JSON array)
   - `correct_answer`
   - `explanation`

2. **Scoring Logic:**
   - Calculate percentage: (correct_answers / total_questions) × 100
   - Compare to `passingScore` from quiz block
   - Allow retakes if failed

3. **Progress Tracking:**
   - Update `StudentCourseBlockProgress` when quiz is completed
   - Store score in `score` field
   - Mark status as `completed` if passed, `in_progress` if failed

4. **UI Display:**
   - Show one question at a time
   - Provide immediate feedback after submission
   - Show explanation for each answer
   - Display final score and pass/fail status
