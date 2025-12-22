# Forms Verification Checklist

## Overview

This checklist verifies all forms in the application are functional, accessible, and properly validated.

## Forms Inventory

### 1. Contact Form

**Location**: `/app/contact/page.tsx`
**Purpose**: General inquiries and program information requests

**Fields**:

- [ ] Name (required)
- [ ] Email (required, validated)
- [ ] Phone (optional, formatted)
- [ ] Program interest (dropdown)
- [ ] Message (required, textarea)

**Validation**:

- [ ] Email format validation
- [ ] Phone number formatting
- [ ] Required field indicators
- [ ] Character limits enforced
- [ ] Error messages display correctly

**Submission**:

- [ ] Form submits successfully
- [ ] Loading state shows during submission
- [ ] Success message displays
- [ ] Form clears after submission
- [ ] Email notification sent
- [ ] Data stored in database

**Accessibility**:

- [ ] All fields have labels
- [ ] Error messages announced to screen readers
- [ ] Keyboard navigation works
- [ ] Focus indicators visible

---

### 2. Application Form (Quick Apply)

**Location**: `/app/apply/page.tsx`
**Purpose**: Quick program application

**Fields**:

- [ ] Full name (required)
- [ ] Email (required, validated)
- [ ] Phone (required, formatted)
- [ ] Program selection (required)
- [ ] Funding source (dropdown)
- [ ] Additional information (textarea)

**Validation**:

- [ ] All required fields validated
- [ ] Email format checked
- [ ] Phone number formatted
- [ ] Program selection required
- [ ] Error messages clear

**Submission**:

- [ ] Form submits to correct endpoint
- [ ] Application ID generated
- [ ] Confirmation email sent
- [ ] Redirect to success page
- [ ] Application trackable

---

### 3. Full Application Form (WIOA)

**Location**: `/app/apply/full/page.tsx`
**Purpose**: Complete WIOA application with all required fields

**Sections**:

1. **Personal Information**
   - [ ] First name, middle initial, last name
   - [ ] Date of birth
   - [ ] Social Security Number (encrypted)
   - [ ] Gender
   - [ ] Race/ethnicity
   - [ ] Veteran status

2. **Contact Information**
   - [ ] Address (street, city, state, zip)
   - [ ] Phone number
   - [ ] Email address
   - [ ] Emergency contact

3. **Education**
   - [ ] Highest education level
   - [ ] High school/GED status
   - [ ] School name and graduation date

4. **Employment**
   - [ ] Current employment status
   - [ ] Income information
   - [ ] Work history

5. **Program Selection**
   - [ ] Program choice
   - [ ] Start date preference
   - [ ] Schedule preference

6. **Barriers**
   - [ ] Disability status
   - [ ] Justice involvement
   - [ ] Public assistance
   - [ ] Other barriers

7. **Consent**
   - [ ] WIOA consent checkbox
   - [ ] Background check consent
   - [ ] Data sharing consent
   - [ ] Electronic signature

**Validation**:

- [ ] Multi-step validation
- [ ] Progress saved between steps
- [ ] Can navigate back without losing data
- [ ] SSN validation and encryption
- [ ] Date validations (age requirements)
- [ ] Required fields enforced per section

**Submission**:

- [ ] Complete application submitted
- [ ] PDF generated
- [ ] Confirmation email sent
- [ ] Application stored securely
- [ ] Counselor notified

---

### 4. Enrollment Form

**Location**: `/app/enroll/page.tsx`
**Purpose**: Student enrollment after acceptance

**Fields**:

- [ ] Student information (pre-filled from application)
- [ ] Program confirmation
- [ ] Payment method selection
- [ ] Funding source documentation
- [ ] Emergency contact
- [ ] Medical information (optional)
- [ ] Consent forms

**Validation**:

- [ ] Pre-filled data editable
- [ ] Payment method required
- [ ] Funding documentation uploaded
- [ ] All consents checked

**Submission**:

- [ ] Enrollment confirmed
- [ ] Student account created
- [ ] Welcome email sent
- [ ] LMS access granted
- [ ] Payment processed (if applicable)

---

### 5. Shop Application Form

**Location**: `/app/shop/apply/page.tsx`
**Purpose**: Barber apprenticeship shop placement application

**Fields**:

- [ ] Applicant information
- [ ] Shop preferences
- [ ] Availability
- [ ] Transportation
- [ ] Background check consent

**Validation**:

- [ ] All required fields
- [ ] Availability schedule valid
- [ ] Consent checkboxes required

**Submission**:

- [ ] Application submitted
- [ ] Shop matching initiated
- [ ] Confirmation sent

---

### 6. Admin Forms

#### Program Form

**Location**: `/app/admin/programs/program-form.tsx`
**Purpose**: Create/edit training programs

**Fields**:

- [ ] Program name
- [ ] Description
- [ ] Duration
- [ ] Price
- [ ] Funding options
- [ ] Requirements
- [ ] Outcomes

**Validation**:

- [ ] Required fields enforced
- [ ] Price validation (numeric)
- [ ] Duration format validated

**Submission**:

- [ ] Program created/updated
- [ ] Changes reflected immediately
- [ ] Audit log created

#### Module Form

**Location**: `/app/admin/modules/module-form.tsx`
**Purpose**: Create/edit course modules

**Fields**:

- [ ] Module title
- [ ] Description
- [ ] Content
- [ ] Duration
- [ ] Prerequisites
- [ ] Assessments

**Validation**:

- [ ] Title required
- [ ] Content validated
- [ ] Duration numeric

**Submission**:

- [ ] Module saved
- [ ] Associated with program
- [ ] Available in LMS

---

## Testing Procedures

### Manual Testing

#### 1. Field Validation

For each form:

```
1. Leave required fields empty → Submit
   Expected: Error messages display, form doesn't submit

2. Enter invalid email format → Submit
   Expected: Email validation error shows

3. Enter invalid phone format → Submit
   Expected: Phone validation error or auto-formatting

4. Fill all fields correctly → Submit
   Expected: Form submits successfully
```

#### 2. Error Handling

```
1. Disconnect internet → Submit form
   Expected: Network error message, can retry

2. Submit with server error (500)
   Expected: User-friendly error message, form data preserved

3. Submit duplicate application
   Expected: Appropriate message (duplicate detected or allowed)
```

#### 3. Success Flow

```
1. Complete form → Submit
   Expected: Success message, redirect, or confirmation

2. Check email
   Expected: Confirmation email received

3. Check database
   Expected: Data stored correctly

4. Check admin dashboard
   Expected: New submission appears
```

### Automated Testing

#### Unit Tests

```typescript
// Example: Contact form validation
describe('ContactForm', () => {
  it('validates email format', () => {
    const { getByLabelText, getByText } = render(<ContactForm />);
    const emailInput = getByLabelText('Email');

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.blur(emailInput);

    expect(getByText('Please enter a valid email')).toBeInTheDocument();
  });

  it('submits form with valid data', async () => {
    const { getByLabelText, getByText } = render(<ContactForm />);

    fireEvent.change(getByLabelText('Name'), { target: { value: 'John Doe' } });
    fireEvent.change(getByLabelText('Email'), { target: { value: 'john@example.com' } });
    fireEvent.change(getByLabelText('Message'), { target: { value: 'Test message' } });

    fireEvent.click(getByText('Submit'));

    await waitFor(() => {
      expect(getByText('Thank you for contacting us')).toBeInTheDocument();
    });
  });
});
```

#### Integration Tests

```typescript
// Example: End-to-end application flow
describe('Application Flow', () => {
  it('completes full application process', async () => {
    // Navigate to application page
    await page.goto('/apply');

    // Fill out form
    await page.fill('[name="name"]', 'Jane Smith');
    await page.fill('[name="email"]', 'jane@example.com');
    await page.fill('[name="phone"]', '317-555-0123');
    await page.selectOption('[name="program"]', 'barber-apprenticeship');

    // Submit
    await page.click('button[type="submit"]');

    // Verify success
    await expect(page).toHaveURL('/apply/success');
    await expect(page.locator('text=Application Submitted')).toBeVisible();
  });
});
```

---

## Accessibility Checklist

For each form, verify:

### Keyboard Navigation

- [ ] Tab through all fields in logical order
- [ ] Shift+Tab navigates backwards
- [ ] Enter submits form
- [ ] Escape closes modals/dropdowns
- [ ] Arrow keys navigate dropdowns

### Screen Reader Support

- [ ] All fields have associated labels
- [ ] Error messages announced
- [ ] Required fields indicated
- [ ] Form instructions read aloud
- [ ] Success/error states announced

### Visual Indicators

- [ ] Focus indicators visible
- [ ] Error states clearly marked (color + icon)
- [ ] Required fields marked with asterisk
- [ ] Disabled fields visually distinct
- [ ] Loading states visible

### ARIA Attributes

- [ ] `aria-label` or `aria-labelledby` on all inputs
- [ ] `aria-required` on required fields
- [ ] `aria-invalid` on fields with errors
- [ ] `aria-describedby` for error messages
- [ ] `role="alert"` for error announcements

---

## Mobile Responsiveness

Test each form on:

- [ ] iPhone (Safari)
- [ ] Android (Chrome)
- [ ] iPad (Safari)
- [ ] Small screens (320px width)

Verify:

- [ ] All fields visible and usable
- [ ] Keyboard doesn't obscure fields
- [ ] Dropdowns work correctly
- [ ] Date pickers mobile-friendly
- [ ] Submit button always accessible
- [ ] Error messages readable

---

## Performance

### Load Time

- [ ] Form loads in < 2 seconds
- [ ] No layout shift during load
- [ ] Fields immediately interactive

### Submission Time

- [ ] Form submits in < 3 seconds
- [ ] Loading indicator shows immediately
- [ ] No double submissions possible

### Data Persistence

- [ ] Form data saved on navigation away
- [ ] Can resume incomplete forms
- [ ] No data loss on browser refresh

---

## Security

### Data Protection

- [ ] Sensitive data encrypted (SSN, payment info)
- [ ] HTTPS enforced
- [ ] No sensitive data in URLs
- [ ] No sensitive data in console logs

### Input Sanitization

- [ ] XSS prevention (HTML escaped)
- [ ] SQL injection prevention (parameterized queries)
- [ ] File upload validation (type, size)
- [ ] Rate limiting on submissions

### CSRF Protection

- [ ] CSRF tokens on all forms
- [ ] Tokens validated server-side
- [ ] Tokens expire appropriately

---

## Browser Compatibility

Test in:

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Chrome (1 version back)
- [ ] Firefox (1 version back)

---

## Known Issues

Document any known issues:

| Form        | Issue                                   | Severity | Status |
| ----------- | --------------------------------------- | -------- | ------ |
| Contact     | Phone formatting inconsistent on mobile | Low      | Open   |
| Application | Date picker doesn't work in Safari 14   | Medium   | Fixed  |
| Enrollment  | File upload fails for files > 10MB      | High     | Open   |

---

## Test Results

| Form             | Manual Test | Automated Test | Accessibility | Mobile     | Status |
| ---------------- | ----------- | -------------- | ------------- | ---------- | ------ |
| Contact          | ⏳ Pending  | ⏳ Pending     | ⏳ Pending    | ⏳ Pending | ⏳     |
| Quick Apply      | ⏳ Pending  | ⏳ Pending     | ⏳ Pending    | ⏳ Pending | ⏳     |
| Full Application | ⏳ Pending  | ⏳ Pending     | ⏳ Pending    | ⏳ Pending | ⏳     |
| Enrollment       | ⏳ Pending  | ⏳ Pending     | ⏳ Pending    | ⏳ Pending | ⏳     |
| Shop Application | ⏳ Pending  | ⏳ Pending     | ⏳ Pending    | ⏳ Pending | ⏳     |
| Program Form     | ⏳ Pending  | ⏳ Pending     | ⏳ Pending    | ⏳ Pending | ⏳     |
| Module Form      | ⏳ Pending  | ⏳ Pending     | ⏳ Pending    | ⏳ Pending | ⏳     |

---

## Maintenance

### Regular Checks

- [ ] Monthly: Test all forms end-to-end
- [ ] After deployments: Smoke test critical forms
- [ ] After dependency updates: Full regression test
- [ ] Quarterly: Accessibility audit

### Monitoring

- [ ] Track form submission success rate
- [ ] Monitor form abandonment rate
- [ ] Alert on submission failures
- [ ] Log validation errors

### Updates

- [ ] Keep validation libraries updated
- [ ] Review and update error messages
- [ ] Improve based on user feedback
- [ ] Add new fields as requirements change
