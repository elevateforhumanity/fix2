# Manual Durable.co Setup Instructions

## Quick Setup (5 minutes)

### Step 1: Log into Durable.co

1. Go to https://durable.co/login
2. Email: Elevateforhumanity@gmail.com
3. Password: Elijah1$

### Step 2: Navigate to Your Site Settings

1. Select "www.elevateforhumanity.org" from your sites
2. Click "Settings" or "Edit Site"
3. Look for "Custom Code", "Advanced Settings", or "Head Scripts"

### Step 3: Add Bridge Script to Head Section

Add this code to the **HEAD** section (before `</head>`):

```html
<script
  src="https://elevateforhumanityfix2.netlify.app/efh-bridge.js"
  data-efh-org="elevate-for-humanity"
  data-env="prod"
  defer
></script>
```

### Step 4: Add Enrollment Programs Section

Find where you want the enrollment programs to appear (probably on the homepage after the hero section) and add:

```html
<!-- Enrollment Programs Section -->
<div data-efh-slot="enrollment-programs"></div>
```

### Step 5: Save and Publish

1. Click "Save" or "Publish"
2. Wait 30-60 seconds for changes to propagate
3. Visit https://www.elevateforhumanity.org to see your enrollment programs!

## What This Does

The bridge script will automatically inject your enrollment programs (AI & Machine Learning, Data Science Bootcamp, Cybersecurity Specialist) into the Durable.co site wherever you place the `data-efh-slot` divs.

## Troubleshooting

If you don't see the programs after 60 seconds:

1. Hard refresh the page (Ctrl+Shift+R or Cmd+Shift+R)
2. Check browser console for errors (F12 → Console tab)
3. Verify the bridge script URL is accessible: https://elevateforhumanityfix2.netlify.app/efh-bridge.js

## Need Help?

The enrollment programs are already coded in your React app at `/workspaces/fix2/src/pages/Home.jsx` - they just need the bridge to display on Durable.co.
