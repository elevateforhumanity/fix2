# Application Process Setup

## Overview

**Indiana Career Connect is the first step** for all state and federal workforce programs. All "Apply Now" buttons throughout the site link to Indiana Career Connect by default, which is the official gateway for:

- WIOA (Workforce Innovation and Opportunity Act) funding
- WRG (Workforce Ready Grant) programs
- State apprenticeship programs
- Federal workforce development initiatives

You can optionally configure a Google Form for additional pre-screening or information gathering.

## Setup Instructions

### 1. Create Your Google Form

1. Go to [Google Forms](https://forms.google.com)
2. Create a new form for program applications
3. Add fields like:
   - Name
   - Email
   - Phone
   - Program of Interest (dropdown with all programs)
   - Additional questions as needed

### 2. Get the Form URL

1. Click the "Send" button in your Google Form
2. Copy the link (it will look like: `https://docs.google.com/forms/d/e/1FAIpQLSc.../viewform`)

### 3. Configure the Environment Variable

#### For Local Development

1. Create a `.env` file in the project root (if it doesn't exist)
2. Add the following line:
   ```
   VITE_APPLICATION_FORM_URL=https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform
   ```
3. Replace `YOUR_FORM_ID` with your actual form ID

#### For Netlify Deployment

1. Go to your Netlify dashboard
2. Navigate to: **Site Settings → Environment Variables**
3. Click **Add a variable**
4. Set:
   - **Key:** `VITE_APPLICATION_FORM_URL`
   - **Value:** Your Google Form URL
5. Click **Save**
6. Trigger a new deployment

## Default Behavior (Recommended)

**By default**, all "Apply Now" buttons link to:

```
https://www.indianacareerconnect.com
```

**This is the required first step** for applicants to:

1. Create an Indiana Career Connect account
2. Access state and federal funding (WIOA, WRG, etc.)
3. Connect with workforce development resources
4. Begin the official enrollment process

**This default should remain unchanged** unless you have a specific pre-screening process.

## Where the Apply Button Appears

The "Apply Now" button appears in:

- Homepage hero section
- Programs page (on each program card)
- Individual program detail pages

## Testing

After configuration:

1. Build the site locally: `npm run build`
2. Preview: `npm run preview`
3. Click any "Apply Now" button
4. Verify it opens your Google Form in a new tab

## Troubleshooting

### Button still links to Indiana Career Connect

- Verify the environment variable is set correctly
- Rebuild the site after adding the variable
- Check browser console for any errors

### Form doesn't open

- Ensure the Google Form is set to "Anyone with the link can respond"
- Check that the URL is complete and correct
- Test the URL directly in a browser

## Example Google Form URL

```
https://docs.google.com/forms/d/e/1FAIpQLSc_example123/viewform
```

## Security Note

The Google Form URL is safe to expose publicly as it's meant to be accessed by applicants. However, ensure your form has appropriate spam protection enabled in Google Forms settings.
