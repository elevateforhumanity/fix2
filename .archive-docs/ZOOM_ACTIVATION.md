# Zoom Integration Activation Guide

## Overview

Your Zoom integration is **fully built** and ready to activate. The system supports:

- Scheduled meetings
- Instant meetings
- Meeting recordings
- Participant tracking
- Webinar support

---

## What's Built

### ✅ Complete Zoom API Integration

**Integration File:** `/lib/integrations/zoom.ts`

**Features:**

- Server-to-Server OAuth authentication
- Create scheduled meetings
- Create instant meetings
- Update/delete meetings
- List meetings
- Get meeting participants
- Access meeting recordings
- Full meeting management

### ✅ API Endpoints

1. **`/api/meetings/create`** - Create meetings for courses
2. **`/api/live/zoom/route.ts`** - Schedule live sessions
3. **`/api/live-classes/route.ts`** - Manage live classes

### ✅ Frontend Integration

- Booking pages with Zoom integration
- Live class scheduling
- Meeting management UI

---

## Required Credentials

The Zoom integration needs these environment variables:

```bash
# Server-to-Server OAuth (Recommended)
ZOOM_ACCOUNT_ID=your_account_id
ZOOM_CLIENT_ID=your_client_id
ZOOM_CLIENT_SECRET=your_client_secret

# Optional
ZOOM_USER_ID=me  # or specific user email
```

---

## Setup Instructions

### Step 1: Create Zoom App (10 minutes)

1. **Go to Zoom App Marketplace:**
   - Visit: https://marketplace.zoom.us/
   - Click "Develop" → "Build App"

2. **Choose App Type:**
   - Select **"Server-to-Server OAuth"**
   - This is the recommended method for backend integrations

3. **App Information:**
   - **App Name:** Elevate LMS Integration
   - **Short Description:** Learning management system integration
   - **Company Name:** Elevate for Humanity
   - **Developer Contact:** Your email

4. **App Credentials:**
   - After creation, you'll see:
     - **Account ID**
     - **Client ID**
     - **Client Secret**
   - Copy these - you'll need them for Vercel

5. **Add Scopes:**
   Required scopes for the integration:
   - ✅ `meeting:write:admin` - Create meetings
   - ✅ `meeting:read:admin` - Read meeting details
   - ✅ `meeting:update:admin` - Update meetings
   - ✅ `meeting:delete:admin` - Delete meetings
   - ✅ `recording:read:admin` - Access recordings
   - ✅ `user:read:admin` - Read user info
   - ✅ `report:read:admin` - Get participant reports

6. **Activation:**
   - Click "Continue"
   - Review and activate the app

---

### Step 2: Add Credentials to Vercel

#### Option A: Via Vercel Dashboard (Recommended)

1. **Go to Environment Variables:**
   - Visit: https://vercel.com/team_wnZ7iyQz1kUNni7yIDVUnhZf/fix2/settings/environment-variables

2. **Add Variables:**

   **Variable 1:**
   - Name: `ZOOM_ACCOUNT_ID`
   - Value: [Your Account ID from Step 1]
   - Environment: ✅ Production, ✅ Preview, ✅ Development

   **Variable 2:**
   - Name: `ZOOM_CLIENT_ID`
   - Value: [Your Client ID from Step 1]
   - Environment: ✅ Production, ✅ Preview, ✅ Development

   **Variable 3:**
   - Name: `ZOOM_CLIENT_SECRET`
   - Value: [Your Client Secret from Step 1]
   - Environment: ✅ Production, ✅ Preview, ✅ Development

   **Variable 4 (Optional):**
   - Name: `ZOOM_USER_ID`
   - Value: `me` (or specific user email)
   - Environment: ✅ Production, ✅ Preview, ✅ Development

3. **Redeploy:**
   - Go to Deployments tab
   - Click "Redeploy" on latest deployment

#### Option B: Via Vercel CLI

```bash
# Login to Vercel
vercel login

# Navigate to project
cd /workspaces/fix2

# Add credentials
echo "your_account_id" | vercel env add ZOOM_ACCOUNT_ID production
echo "your_client_id" | vercel env add ZOOM_CLIENT_ID production
echo "your_client_secret" | vercel env add ZOOM_CLIENT_SECRET production
echo "me" | vercel env add ZOOM_USER_ID production

# Deploy
vercel --prod
```

---

### Step 3: Test the Integration

Once deployed, test the Zoom integration:

#### Test 1: Create a Meeting

```bash
curl -X POST https://elevateforhumanity.org/api/meetings/create \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_AUTH_TOKEN" \
  -d '{
    "courseId": "test-course-id",
    "topic": "Test Meeting",
    "start": "2025-01-15T10:00:00Z",
    "provider": "zoom",
    "durationMinutes": 60
  }'
```

#### Test 2: Create Live Session

```bash
curl -X POST https://elevateforhumanity.org/api/live/zoom \
  -H "Content-Type: application/json" \
  -d '{
    "courseId": "test-course-id",
    "topic": "Live Class Session",
    "startTime": "2025-01-15T14:00:00Z",
    "durationMinutes": 90,
    "instructorZoomId": "instructor@elevateforhumanity.org"
  }'
```

---

## Features Available After Activation

### 1. Scheduled Meetings

- Instructors can schedule Zoom meetings for courses
- Automatic meeting creation with join links
- Calendar integration
- Email notifications with meeting links

### 2. Live Classes

- Schedule live class sessions
- Automatic Zoom room creation
- Student access via LMS
- Recording available after class

### 3. Meeting Management

- View all scheduled meetings
- Update meeting details
- Cancel meetings
- Reschedule meetings

### 4. Recordings

- Automatic cloud recording
- Access recordings from LMS
- Download recordings
- Share recordings with students

### 5. Attendance Tracking

- Track meeting participants
- Join/leave times
- Attendance reports
- Integration with LMS gradebook

---

## Usage Examples

### For Instructors

**Schedule a Live Class:**

1. Go to Course → Live Classes
2. Click "Schedule Live Session"
3. Enter topic, date, time
4. System creates Zoom meeting automatically
5. Students receive join link

**Start a Meeting:**

1. Go to scheduled meeting
2. Click "Start Meeting"
3. Opens Zoom with host controls
4. Students can join via LMS

### For Students

**Join a Live Class:**

1. Go to Course → Live Classes
2. See upcoming sessions
3. Click "Join Meeting"
4. Opens Zoom in browser or app

**Access Recordings:**

1. Go to Course → Recordings
2. View past sessions
3. Click to watch recording
4. Playback in browser

---

## Advanced Configuration

### Custom Meeting Settings

Edit `/lib/integrations/zoom.ts` to customize default settings:

```typescript
settings: {
  host_video: true,              // Host video on by default
  participant_video: true,       // Participant video on
  join_before_host: false,       // Require host to start
  mute_upon_entry: true,         // Mute participants on join
  waiting_room: true,            // Enable waiting room
  auto_recording: 'cloud',       // Auto-record to cloud
  approval_type: 0,              // Auto-approve participants
}
```

### Timezone Configuration

Default timezone is `America/Indiana/Indianapolis`. To change:

```typescript
timezone: 'America/New_York'; // or your preferred timezone
```

### Meeting Duration

Default is 60 minutes. Customize per meeting:

```typescript
duration: 90; // 90 minutes
```

---

## Database Schema

The integration uses these tables:

### `meetings` table

```sql
CREATE TABLE meetings (
  id UUID PRIMARY KEY,
  course_id UUID REFERENCES courses(id),
  provider TEXT DEFAULT 'zoom',
  topic TEXT NOT NULL,
  join_url TEXT,
  start_time TIMESTAMPTZ,
  duration_minutes INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### `live_sessions` table

```sql
CREATE TABLE live_sessions (
  id UUID PRIMARY KEY,
  course_id UUID REFERENCES courses(id),
  tenant_id UUID,
  topic TEXT NOT NULL,
  start_time TIMESTAMPTZ,
  duration_minutes INTEGER,
  join_url TEXT,
  start_url TEXT,
  provider TEXT DEFAULT 'zoom',
  provider_meeting_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## Troubleshooting

### Issue: "Zoom credentials not configured"

**Solution:**

1. Verify environment variables are set in Vercel
2. Check variable names match exactly:
   - `ZOOM_ACCOUNT_ID`
   - `ZOOM_CLIENT_ID`
   - `ZOOM_CLIENT_SECRET`
3. Redeploy after adding variables

### Issue: "Failed to get Zoom access token"

**Solution:**

1. Verify credentials are correct
2. Check app is activated in Zoom Marketplace
3. Ensure all required scopes are added
4. Check Zoom app status (not suspended)

### Issue: "Zoom API error: 401"

**Solution:**

1. Token may be expired
2. Regenerate Client Secret in Zoom app
3. Update `ZOOM_CLIENT_SECRET` in Vercel
4. Redeploy

### Issue: "Meeting creation fails"

**Solution:**

1. Check user has Zoom license (not Basic)
2. Verify `ZOOM_USER_ID` is correct
3. Check meeting time is in future
4. Ensure timezone is valid

---

## Security Best Practices

### ✅ Implemented

- Server-to-Server OAuth (no user tokens)
- Credentials stored in environment variables
- Never exposed to client
- Waiting room enabled by default
- Password protection available

### 🔒 Recommendations

- Enable two-factor authentication on Zoom account
- Regularly rotate Client Secret
- Monitor API usage in Zoom dashboard
- Review meeting participants
- Enable recording encryption

---

## API Rate Limits

Zoom API rate limits:

- **Light:** 10 requests/second
- **Medium:** 5 requests/second
- **Heavy:** 1 request/second

The integration handles rate limiting automatically.

---

## Cost Considerations

### Zoom Plans

**Free Plan:**

- ❌ Limited to 40-minute meetings
- ❌ No cloud recording
- ❌ Not suitable for production

**Pro Plan ($14.99/month):**

- ✅ Unlimited meeting duration
- ✅ Cloud recording (1 GB)
- ✅ Recommended for small teams

**Business Plan ($19.99/month):**

- ✅ Everything in Pro
- ✅ Cloud recording (unlimited)
- ✅ Dedicated support
- ✅ Recommended for production

**Enterprise Plan (Custom):**

- ✅ Unlimited cloud storage
- ✅ Dedicated account manager
- ✅ Advanced security features

---

## Support Resources

### Zoom Documentation

- API Reference: https://marketplace.zoom.us/docs/api-reference/zoom-api
- OAuth Guide: https://marketplace.zoom.us/docs/guides/auth/oauth
- Best Practices: https://marketplace.zoom.us/docs/guides/best-practices

### Elevate Support

- Check Vercel logs for errors
- Review integration code: `/lib/integrations/zoom.ts`
- Test endpoints: `/api/meetings/create`, `/api/live/zoom`

---

## Next Steps After Activation

1. **Test Meeting Creation** - Create a test meeting
2. **Schedule Live Class** - Test instructor workflow
3. **Join as Student** - Test student experience
4. **Check Recording** - Verify cloud recording works
5. **Train Instructors** - Show them how to use Zoom features
6. **Monitor Usage** - Track API calls and meeting stats

---

## Quick Activation Checklist

- [ ] Create Zoom Server-to-Server OAuth app
- [ ] Copy Account ID, Client ID, Client Secret
- [ ] Add credentials to Vercel environment variables
- [ ] Redeploy application
- [ ] Test meeting creation endpoint
- [ ] Schedule test live session
- [ ] Verify recordings work
- [ ] Train instructors on usage

---

**Status:** Ready to activate! 🚀

**Time to Activate:** 15-20 minutes

**Impact:** Enable live virtual classes, meetings, and recordings for all courses.
