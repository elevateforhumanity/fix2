# Line-by-Line Diagnostic Report

**Generated:** Sun Dec 28 18:35:33 UTC 2025
**Total Files Scanned:** 2163

---

## 🔴 1. UNSAFE WINDOW ACCESS (320 instances)

### Every Instance with Line Numbers:

```
app/onboarding/start/OnboardingFlow.tsx:194:                  window.location.reload();
app/shop/reports/page.tsx:54:        const url = window.URL.createObjectURL(blob);
app/shop/reports/page.tsx:60:        window.URL.revokeObjectURL(url);
app/enroll/PayNowSection.tsx:96:        window.location.href = data.url;
app/verify-email/page.tsx:19:    const params = new URLSearchParams(window.location.search);
app/verify-email/page.tsx:113:            onClick={() => window.location.reload()}
app/student/courses/scorm/[courseId]/SCORMPlayer.tsx:52:    window.addEventListener('message', handleMessage);
app/student/courses/scorm/[courseId]/SCORMPlayer.tsx:53:    return () => window.removeEventListener('message', handleMessage);
app/student/courses/[courseId]/external/[moduleId]/ExternalModuleClient.tsx:83:      window.open(module.launch_url, '_blank', 'noopener,noreferrer');
app/student/dashboard/PartnerEnrollmentsSection.tsx:129:                    window.open(
app/diagnostic/page.tsx:20:      windowSize: `${window.innerWidth}x${window.innerHeight}`,
app/diagnostic/page.tsx:22:      url: window.location.href,
app/diagnostic/page.tsx:31:    window.addEventListener('error', errorHandler);
app/diagnostic/page.tsx:35:      window.removeEventListener('error', errorHandler);
app/apply/track/page.tsx:69:    const params = new URLSearchParams(window.location.search);
app/apply/QuickApplyFormClient.tsx:125:        window.location.href = `/apply/success?${params.toString()}`;
app/apply/ApplyFormClient.tsx:27:    const params = new URLSearchParams(window.location.search);
app/apply/ApplyFormClient.tsx:69:        window.location.href = `/apply/success?${params.toString()}`;
app/apply/full/WIOAApplicationForm.tsx:222:      window.scrollTo({ top: 0, behavior: 'smooth' });
app/apply/full/WIOAApplicationForm.tsx:230:    window.scrollTo({ top: 0, behavior: 'smooth' });
app/apply/full/WIOAApplicationForm.tsx:256:      window.location.href = `/apply/success?ref=${data.referenceNumber}`;
app/layout-analytics.tsx:37:            window.dataLayer = window.dataLayer || [];
app/layout-analytics.tsx:41:              page_path: window.location.pathname,
app/program-holder/onboarding/setup/page.tsx:49:      window.location.href = '/program-holder/verify-identity';
app/program-holder/verify-identity/IdentityVerificationFlow.tsx:67:      window.location.href = url;
app/courses/[courseId]/learn/LessonContent.tsx:47:        window.location.reload();
app/courses/hsi/[courseType]/learn/HSICoursePlayer.tsx:132:                window. Complete the training, then return here to mark it as
app/courses/partners/[courseId]/enroll/page.tsx:103:        window.location.href = course.enrollment_url;
app/signup/SignupForm.tsx:61:          emailRedirectTo: `${window.location.origin}/auth/callback`,
app/signup/SignupForm.tsx:72:        const searchParams = new URLSearchParams(window.location.search);
app/signup/SignupForm.tsx:96:          redirectTo: `${window.location.origin}/auth/callback`,
app/marketplace/product/[id]/ProductCheckoutButton.tsx:45:      window.location.href = url;
app/api/funding/admin/confirm/route.ts:53:          <p>You can close this window.</p>
app/api/funding/admin/confirm/route.ts:146:          <p style="margin-top: 24px; color: #6b7280; font-size: 14px;">You can close this window.</p>
app/components/AIInstructor.tsx:63:        const voices = window.speechSynthesis.getVoices();
app/components/AIInstructor.tsx:79:        window.speechSynthesis.speak(utterance);
app/components/AIInstructor.tsx:87:    window.speechSynthesis.cancel();
app/store/subscriptions/page.tsx:146:        window.location.href = data.url;
app/store/subscriptions/page.tsx:176:        window.location.href = data.url;
app/store/licenses/checkout/[slug]/page.tsx:48:        return_url: `${window.location.origin}/store/licenses/success?product=${product.slug}`,
app/store/checkout/[slug]/page.tsx:42:        return_url: `${window.location.origin}/store/success?product=${product.slug}`,
app/not-found.tsx:16:      window.gtag('event', 'exception', {
app/checkout/student/page.tsx:26:        window.location.href = data.url;
app/checkout/career/page.tsx:28:        window.location.href = data.url;
app/certificates/verify/[certificateId]/page.tsx:417:                  navigator.clipboard.writeText(window.location.href);
app/auth/signup/SignUpForm.tsx:79:          emailRedirectTo: `${window.location.origin}/auth/callback`,
app/auth/signup/SignUpForm.tsx:115:          redirectTo: `${window.location.origin}/auth/callback`,
app/auth/signin/SignInForm.tsx:62:          redirectTo: `${window.location.origin}/auth/callback`,
app/auth/forgot-password/ForgotPasswordForm.tsx:29:          redirectTo: `${window.location.origin}/auth/reset-password`,
app/admin/next-steps/page.tsx:72:    window.open(url, '_blank');
app/admin/students/export/page.tsx:54:      const url = window.URL.createObjectURL(blob);
app/admin/students/export/page.tsx:60:      window.URL.revokeObjectURL(url);
app/admin/hours-export/page.tsx:47:      const url = window.URL.createObjectURL(blob);
app/admin/hours-export/page.tsx:53:      window.URL.revokeObjectURL(url);
app/admin/transfer-hours/transfer-hours-table.tsx:88:      window.location.reload();
app/admin/transfer-hours/transfer-hours-table.tsx:104:      window.location.reload();
app/admin/media-studio/page.tsx:327:                      onClick={() => window.open(file.url, '_blank')}
app/admin/video-manager/page.tsx:21:    const fullUrl = `${window.location.origin}${url}`;
app/admin/store/clones/page.tsx:377:                      window.open('/store/codebase-clone', '_blank')
app/admin/store/clones/page.tsx:386:                    onClick={() => window.open(product.demo.url, '_blank')}
app/admin/audit-logs/page.tsx:90:    const url = window.URL.createObjectURL(blob);
app/admin/audit-logs/page.tsx:96:    window.URL.revokeObjectURL(url);
app/admin/test-funding/page.tsx:36:        window.open(data.url, '_blank');
app/admin/dev-studio/page.tsx:135:      const url = new URL('/api/github/tree', window.location.origin);
app/admin/dev-studio/page.tsx:163:      const url = new URL('/api/github/file', window.location.origin);
app/drug-testing/page.tsx:296:            Hair follicle testing provides 90-day detection window. Ideal for
app/login/LoginForm.tsx:68:          redirectTo: `${window.location.origin}/auth/callback`,
app/apprenticeships/apply/page.tsx:69:    window.location.href = '/apprenticeships/apply/success';
app/verify/[certificateId]/page.tsx:305:                onClick={() => window.print()}
app/pay/AffirmWidget.tsx:29:      if (window.affirm?.ui?.refresh) {
app/pay/AffirmWidget.tsx:30:        window.affirm.ui.refresh();
app/pay/AffirmWidget.tsx:41:        if (window.affirm && publicKey) {
app/pay/AffirmWidget.tsx:42:          window.affirm.config({
app/pay/AffirmWidget.tsx:47:        if (window.affirm?.ui?.refresh) {
app/pay/AffirmWidget.tsx:48:          window.affirm.ui.refresh();
app/pay/PayPageClient.tsx:63:          window.affirm.ui.refresh();
app/pay/PayPageClient.tsx:80:          if (window.affirm && publicKey) {
app/pay/PayPageClient.tsx:81:            window.affirm.config({
app/pay/PayPageClient.tsx:88:            window.affirm &&
app/pay/PayPageClient.tsx:91:            window.affirm.ui.refresh();
app/pay/PaymentOptionsClient.tsx:52:          if (window.affirm?.ui?.refresh) {
app/pay/PaymentOptionsClient.tsx:53:            window.affirm.ui.refresh();
app/pay/PaymentOptionsClient.tsx:67:            if (window.affirm?.ui?.refresh) {
app/pay/PaymentOptionsClient.tsx:68:              window.affirm.ui.refresh();
app/pay/PaymentOptionsClient.tsx:87:    if (affirmLoaded && window.affirm?.ui?.refresh) {
app/pay/PaymentOptionsClient.tsx:90:        window.affirm.ui.refresh();
app/pay/PaymentOptionsClient.tsx:200:            if (window.affirm) {
app/pay/PaymentOptionsClient.tsx:201:              window.affirm.checkout({
app/pay/PaymentOptionsClient.tsx:203:                  user_confirmation_url: `${window.location.origin}/payment/affirm/confirm`,
app/pay/PaymentOptionsClient.tsx:204:                  user_cancel_url: `${window.location.origin}/payment/affirm/cancel`,
app/pay/PaymentOptionsClient.tsx:224:              window.affirm.checkout.open();
components/compliance/FERPATrainingForm.tsx:227:          ip_address: window.location.hostname,
components/compliance/FERPATrainingDashboard.tsx:424:            onClick={() => window.print()}
components/student/ProgramOrientationVideo.tsx:108:                    Orientation completed! You can close this window.
components/TextToSpeech.tsx:25:        const availableVoices = window.speechSynthesis.getVoices();
components/TextToSpeech.tsx:37:      window.speechSynthesis.onvoiceschanged = loadVoices;
components/TextToSpeech.tsx:40:        window.speechSynthesis.cancel();
components/TextToSpeech.tsx:53:      window.speechSynthesis.resume();
components/TextToSpeech.tsx:59:    window.speechSynthesis.cancel();
components/TextToSpeech.tsx:83:    window.speechSynthesis.speak(utterance);
```

## 🔴 2. UNHANDLED PROMISES (71 instances)

### Every Instance with Line Numbers:

```
app/staff-portal/campaigns/page.tsx:26:      .then((res) => res.json())
app/staff-portal/campaigns/page.tsx:27:      .then((data) => setTemplates(data.templates || []));
app/staff-portal/campaigns/page.tsx:31:      .then((res) => res.json())
app/staff-portal/campaigns/page.tsx:32:      .then((data) => setMyStudents(data.students || []));
app/verify-email/page.tsx:26:      supabase.auth.getUser().then(({ data }) => {
app/student/dashboard/PartnerEnrollmentsSection.tsx:15:const fetcher = (url: string) => fetch(url).then((r) => r.json());
app/program-holder/campaigns/page.tsx:26:      .then((res) => res.json())
app/program-holder/campaigns/page.tsx:27:      .then((data) => setTemplates(data.templates || []));
app/program-holder/campaigns/page.tsx:31:      .then((res) => res.json())
app/program-holder/campaigns/page.tsx:32:      .then((data) => setMyStudents(data.students || []));
app/test-enrollment/page.tsx:19:      .then((r) => r.json())
app/test-enrollment/page.tsx:20:      .then((data) => setStudents(data.students || []));
app/courses/[courseId]/learn/ResourceSection.tsx:26:      .then((res) => res.json())
app/courses/[courseId]/learn/ResourceSection.tsx:27:      .then((data) => setResources(data.resources || []));
app/courses/[courseId]/lessons/[lessonId]/quiz/take/page.tsx:28:      .then((res) => res.json())
app/courses/[courseId]/lessons/[lessonId]/quiz/take/page.tsx:29:      .then((data) => {
app/lms/(app)/dashboard/page.tsx:79:    .then((res) => res)
app/lms/(app)/dashboard/page.tsx:87:    .then((res) => res)
app/lms/(app)/layout.tsx:22:    supabase.auth.getUser().then(({ data, error }) => {
app/lms/(app)/layout.tsx:35:        .then(({ data: profileData }) => {
app/marketplace/thank-you/page.tsx:27:      .then((res) => res.json())
app/marketplace/thank-you/page.tsx:28:      .then((data) => {
app/instructor/campaigns/page.tsx:26:      .then((res) => res.json())
app/instructor/campaigns/page.tsx:27:      .then((data) => setTemplates(data.templates || []));
app/instructor/campaigns/page.tsx:31:      .then((res) => res.json())
app/instructor/campaigns/page.tsx:32:      .then((data) => setMyStudents(data.students || []));
app/store/checkout/[slug]/page.tsx:115:      .then((res) => res.json())
app/store/checkout/[slug]/page.tsx:116:      .then((data) => {
app/admin/media-studio/page.tsx:40:      .then((res) => res.json())
app/admin/media-studio/page.tsx:41:      .then((data) => {
app/admin/live-chat/page.tsx:28:      .then((res) => res.json())
app/admin/live-chat/page.tsx:29:      .then((data) => {
app/admin/autopilots/page.tsx:110:      .then((res) => res.json())
app/admin/autopilots/page.tsx:111:      .then((data) => {
app/admin/editor/page.tsx:62:      .then(res => res.json())
app/admin/editor/page.tsx:63:      .then(data => {
app/admin/social-media/campaigns/new/page.tsx:29:      .then((res) => res.json())
app/admin/social-media/campaigns/new/page.tsx:30:      .then((data) => {
app/admin/social-media/page.tsx:46:      .then((res) => res.json())
app/admin/social-media/page.tsx:47:      .then((data) => {
app/admin/crm/campaigns/new/page.tsx:27:      .then(res => res.json())
app/admin/crm/campaigns/new/page.tsx:28:      .then(data => setTemplates(data.templates || []));
app/admin/dev-studio/BranchSelector.tsx:11:      .then((r) => r.json())
app/admin/dev-studio/BranchSelector.tsx:12:      .then(setBranches);
app/admin/dev-studio/FileTreeSimple.tsx:11:      .then((r) => r.json())
app/admin/dev-studio/FileTreeSimple.tsx:12:      .then((d) => setFiles(d.files));
app/admin/dev-studio/page.tsx:39:      .then((res) => res.json())
app/admin/dev-studio/page.tsx:40:      .then((data) => {
app/admin/dev-studio/RepoSelector.tsx:11:      .then((r) => r.json())
app/admin/dev-studio/RepoSelector.tsx:12:      .then(setRepos);
app/admin/email-marketing/campaigns/new/page.tsx:31:      .then((res) => res.json())
app/admin/email-marketing/campaigns/new/page.tsx:32:      .then((data) => {
app/admin/email-marketing/page.tsx:25:      .then((res) => res.json())
app/admin/email-marketing/page.tsx:26:      .then((data) => {
app/admin/email-marketing/automation/new/page.tsx:41:      .then((res) => res.json())
app/admin/email-marketing/automation/new/page.tsx:42:      .then((data) => {
app/admin/email-marketing/automation/page.tsx:41:      .then((res) => res.json())
app/admin/email-marketing/automation/page.tsx:42:      .then((data) => {
app/admin/email-marketing/analytics/page.tsx:65:      .then((res) => res.json())
app/admin/email-marketing/analytics/page.tsx:66:      .then((data) => {
components/proof/RealOutcomes.tsx:20:      .then((res) => res.json())
components/proof/RealOutcomes.tsx:21:      .then((data) => {
components/student/ExternalModuleLauncher.tsx:112:                .then(() => {
components/SelfHostedAnalytics.tsx:29:      import('web-vitals').then(({ onCLS, onFID, onFCP, onLCP, onTTFB }) => {
components/ProgramPaymentOptions.tsx:47:        const stripe = await import('@stripe/stripe-js').then((m) =>
components/service-worker-init.tsx:12:      .then((registration) => {
components/WelcomeAudio.tsx:18:          .then(() => {
components/hero/HeroMedia.tsx:62:      .then(() => {
components/auth/ProtectedRoute.tsx:23:      .then(setUser)
components/admin/AnalyticsDashboard.tsx:9:}).then((r) => r.json());
components/ServiceWorkerRegistration.tsx:10:        .then((registration) => {
```

## 🔴 3. UNSAFE LOCALSTORAGE (42 instances)

### Every Instance with Line Numbers:

```
app/components/FeatureTour.tsx:13:    const hasSeenTour = localStorage.getItem('hasSeenFeatureTour');
app/components/FeatureTour.tsx:46:    localStorage.setItem('hasSeenFeatureTour', 'true');
app/admin/dev-studio/page.tsx:71:  // Load GitHub token from localStorage
app/admin/dev-studio/page.tsx:73:    const storedToken = localStorage.getItem('gh_token');
app/admin/dev-studio/page.tsx:100:      localStorage.setItem('gh_token', newToken);
components/onboarding/OnboardingTour.tsx:27:    const hasSeenTour = localStorage.getItem(`tour_${tourKey}_completed`);
components/onboarding/OnboardingTour.tsx:49:    localStorage.setItem(`tour_${tourKey}_completed`, 'true');
components/onboarding/OnboardingTour.tsx:55:    localStorage.setItem(`tour_${tourKey}_completed`, 'true');
components/compliance/CookieConsentBanner.tsx:28:    const consent = localStorage.getItem('cookie_consent');
components/compliance/CookieConsentBanner.tsx:61:    localStorage.setItem('cookie_consent', JSON.stringify(prefs));
components/compliance/CookieConsentBanner.tsx:62:    localStorage.setItem('cookie_consent_date', new Date().toISOString());
components/NotificationPrompt.tsx:19:      const wasDismissed = localStorage.getItem(
components/NotificationPrompt.tsx:44:    localStorage.setItem('notification-prompt-dismissed', 'true');
components/InvisibleWatermark.tsx:74:    // Method 4: Add to localStorage (persists across sessions)
components/InvisibleWatermark.tsx:76:      localStorage.setItem('site_original_owner', owner);
components/InvisibleWatermark.tsx:77:      localStorage.setItem('site_original_id', siteId);
components/InvisibleWatermark.tsx:78:      localStorage.setItem('site_original_timestamp', clientTimestamp);
components/InvisibleWatermark.tsx:80:      // Ignore if localStorage is disabled
components/programs/ProgramBanner.tsx:65:    const raw = localStorage.getItem(key);
components/programs/ProgramBanner.tsx:83:    localStorage.setItem(key, JSON.stringify(next));
components/CookieConsent.tsx:14:    const consent = localStorage.getItem('cookie-consent');
components/CookieConsent.tsx:25:    localStorage.setItem('cookie-consent', 'accepted');
components/CookieConsent.tsx:26:    localStorage.setItem('cookie-consent-date', new Date().toISOString());
components/CookieConsent.tsx:39:    localStorage.setItem('cookie-consent', 'rejected');
components/CookieConsent.tsx:40:    localStorage.setItem('cookie-consent-date', new Date().toISOString());
components/CookieConsent.tsx:138:  const consent = localStorage.getItem('cookie-consent');
components/PWAInstallPrompt.tsx:18:    const dismissed = localStorage.getItem('pwa-install-dismissed');
components/PWAInstallPrompt.tsx:49:    localStorage.setItem('pwa-install-dismissed', new Date().toISOString());
components/enrollment/ComprehensiveEnrollmentWizard.tsx:198:    const saved = localStorage.getItem(`enrollment_${programId}`);
components/enrollment/ComprehensiveEnrollmentWizard.tsx:220:      localStorage.setItem(`enrollment_${programId}`, JSON.stringify(formData));
components/enrollment/ComprehensiveEnrollmentWizard.tsx:324:      localStorage.removeItem(`enrollment_${programId}`);
components/apprenticeship/HourTracker.tsx:25:  // Load saved data from localStorage
components/apprenticeship/HourTracker.tsx:27:    const savedData = localStorage.getItem(`hourTracker_${programName}`);
components/apprenticeship/HourTracker.tsx:64:    // Save to localStorage
components/apprenticeship/HourTracker.tsx:70:    localStorage.setItem(`hourTracker_${programName}`, JSON.stringify(data));
components/apprenticeship/HourTracker.tsx:94:    // Save to localStorage
components/apprenticeship/HourTracker.tsx:100:    localStorage.setItem(`hourTracker_${programName}`, JSON.stringify(data));
components/AdvancedVideoPlayer.tsx:163:          localStorage.setItem(`lesson_${lessonId}_progress`, currentTime.toString());
components/CookieBanner.tsx:14:    const accepted = window.localStorage.getItem('cookie-consent');
components/CookieBanner.tsx:22:    window.localStorage.setItem('cookie-consent', 'accepted');
components/CookieBanner.tsx:23:    window.localStorage.setItem('cookie-consent-date', new Date().toISOString());
components/CookieBanner.tsx:28:    window.localStorage.setItem('cookie-consent', 'declined');
components/CookieBanner.tsx:29:    window.localStorage.setItem('cookie-consent-date', new Date().toISOString());
components/ui/FundingToast.tsx:13:    const dismissed = window.localStorage.getItem(STORAGE_KEY);
components/ui/FundingToast.tsx:23:      window.localStorage.setItem(STORAGE_KEY, 'true');
components/ElevateChatWidget.tsx:15:    const interacted = localStorage.getItem('elevate-chat-interacted');
components/ElevateChatWidget.tsx:33:    localStorage.setItem('elevate-chat-interacted', 'true');
components/ElevateChatWidget.tsx:39:    localStorage.setItem('elevate-chat-interacted', 'true');
```

## 🔴 4. UNSAFE JSON.PARSE (17 instances)

### Every Instance with Line Numbers:

```
app/api/preview/render/route.ts:128:        const parsed = JSON.parse(raw);
app/api/webhooks/partners/[partner]/route.ts:55:    const payload: WebhookPayload = JSON.parse(rawBody);
app/api/courses/metadata/route.ts:42:    const metadata = JSON.parse(raw);
app/api/autopilot/route.ts:38:    const parsed = JSON.parse(raw);
app/api/media/enhance-video/route.ts:125:    const metadata = JSON.parse(stdout);
app/api/autopilots/build-courses/route.ts:24:      parsed = typeof output === 'string' ? JSON.parse(output) : output;
app/api/social-media/generate/route.ts:124:      posts = JSON.parse(content);
app/api/recaps/generate/route.ts:93:    const data = JSON.parse(completion.choices[0]?.message?.content || '{}');
app/api/ai/generate-course/route.ts:74:      parsedOutput = JSON.parse(cleanOutput || '{}');
app/api/analytics/dropout-risk/route.ts:108:      parsed = JSON.parse(text);
app/api/analytics/dropout-risk/route.ts:113:        parsed = JSON.parse(match[1]);
app/api/export/route.ts:55:      filters: filters ? JSON.parse(filters) : undefined,
components/compliance/CookieConsentBanner.tsx:35:        const saved = JSON.parse(consent);
components/upload/AdvancedFileUpload.tsx:134:          const response = JSON.parse(xhr.responseText);
components/programs/ProgramBanner.tsx:67:      ? JSON.parse(raw)
components/enrollment/ComprehensiveEnrollmentWizard.tsx:201:        const data = JSON.parse(saved);
components/apprenticeship/HourTracker.tsx:29:      const data = JSON.parse(savedData);
```

## 🟡 5. CONSOLE.LOG USAGE (76 instances)

### Every Instance with Line Numbers:

```
app/booking/page.tsx:63:      console.error('Failed to load instructors:', error);
app/diagnostic/page.tsx:11:    const originalError = console.error;
app/diagnostic/page.tsx:12:    console.error = (...args: any[]) => {
app/diagnostic/page.tsx:34:      console.error = originalError;
app/apply/QuickApplyFormClient.tsx:138:      console.error('Application submission error:', err);
app/apply/ApplyFormClient.tsx:86:      console.error('Inquiry submission error:', error);
app/program-holder/onboarding/setup/page.tsx:51:      console.error('Submission error:', error);
app/program-holder/documents/page.tsx:63:        console.error('Error loading documents:', fetchError);
app/program-holder/documents/page.tsx:70:      console.error('Error:', err);
app/program-holder/documents/page.tsx:126:      console.error('Upload error:', err);
app/program-holder/settings/notifications/NotificationPreferencesForm.tsx:52:      console.error('Error saving preferences:', error);
app/program-holder/error.tsx:17:    console.error('Program Holder Portal Error:', error);
app/(dashboard)/org/invites/page.tsx:87:      console.error('Failed to load invites:', err);
app/(dashboard)/org/invites/page.tsx:119:      console.error('Failed to send invite:', err);
app/(dashboard)/org/invites/page.tsx:140:      console.error('Failed to resend invite:', err);
app/(dashboard)/org/invites/page.tsx:161:      console.error('Failed to revoke invite:', err);
app/(dashboard)/org/create/page.tsx:52:      console.error('Failed to create organization:', err);
app/api/staff/campaigns/send/route.ts:75:    console.error("Error:", error);
app/api/program-holder/apply/route.ts:104:      console.error('Insert error:', insertError);
app/api/program-holder/apply/route.ts:116:      console.error('[Email] Program holder confirmation failed:', err)
app/api/program-holder/apply/route.ts:124:    ).catch((err) => console.error('[Email] Admin notification failed:', err));
app/api/program-holder/apply/route.ts:131:    console.error('Application error:', error);
app/api/program-holder/students/decline/route.ts:88:      console.error('Student decline error:', updateError);
app/api/program-holder/students/decline/route.ts:129:        console.error('[Email] Student decline notification failed:', err)
app/api/program-holder/students/decline/route.ts:142:    console.error('Unexpected error in student decline:', error);
app/api/program-holder/students/accept/route.ts:87:      console.error('Student acceptance error:', updateError);
app/api/program-holder/students/accept/route.ts:126:        console.error('[Email] Student acceptance notification failed:', err)
app/api/program-holder/students/accept/route.ts:139:    console.error('Unexpected error in student acceptance:', error);
app/api/applications/route.ts:86:      console.error('Supabase insert error:', {
app/api/applications/route.ts:179:      console.error('Email notification error:', emailError);
app/api/applications/route.ts:194:    console.error('Application submission error:', err);
app/api/instructor/campaigns/send/route.ts:103:    console.error("Error:", error);
app/api/program-owner/campaigns/send/route.ts:103:    console.error("Error:", error);
app/api/inquiries/route.ts:84:      console.error('Supabase insert error:', {
app/api/inquiries/route.ts:158:      console.error('Email notification error:', emailError);
app/api/inquiries/route.ts:172:    console.error('Inquiry submission error:', err);
app/api/cron/weekly-verdicts/route.ts:165:    console.error("Error:", error);
app/supersonic-fast-cash/book-appointment/page.tsx:160:      console.error('Booking error:', error);
app/store/subscriptions/page.tsx:94:      console.error('Error loading plans:', error);
app/store/subscriptions/page.tsx:149:      console.error('Subscription err:', err);
app/store/subscriptions/page.tsx:179:      console.error('Portal err:', err);
app/store/licenses/checkout/[slug]/page.tsx:148:      console.error('Error creating payment intent:', error);
app/store/checkout/[slug]/page.tsx:121:        console.error('Error creating payment intent:', err);
app/(auth)/invite/[token]/page.tsx:68:      console.error('Failed to load invite:', err);
app/(auth)/invite/[token]/page.tsx:105:      console.error('Failed to accept invite:', err);
app/careers/page.tsx:25:    console.error('Error loading positions:', error);
app/checkout/page.tsx:117:    console.error('Checkout error:', error);
app/tax/supersonicfastcash/documents/page.tsx:81:        console.error('Upload error:', error);
app/auth/verify-email/page.tsx:30:      console.error('Resend error:', error);
app/auth/signin/SignInForm.tsx:42:          console.error('Error claiming applications:', claimError);
app/auth/callback/route.ts:19:        console.error('Error claiming applications:', claimError);
app/admin/program-holder-documents/page.tsx:80:        console.error('Error loading documents:', error);
app/admin/program-holder-documents/page.tsx:85:      console.error('Error:', err);
app/admin/program-holder-documents/page.tsx:110:        console.error('Error updating document:', error);
app/admin/program-holder-documents/page.tsx:118:      console.error('Error:', err);
app/ai/job-match/page.tsx:24:      console.error('Error matching jobs:', error);
app/apprenticeships/ipla-exam/page.tsx:64:      console.error('Payment error:', error);
components/ClaimApplications.tsx:31:          console.error('Error claiming applications:', error);
components/ClaimApplications.tsx:35:        console.error('Unexpected error claiming applications:', err);
components/forums/DiscussionForums.tsx:138:      console.error('Error loading categories:', err);
components/forums/DiscussionForums.tsx:169:      console.error('Error loading threads:', err);
components/forums/DiscussionForums.tsx:196:      console.error('Error loading posts:', err);
components/forums/DiscussionForums.tsx:234:      console.error('Error creating thread:', err);
components/forums/DiscussionForums.tsx:263:      console.error('Error creating post:', err);
components/programs/ProgramPaymentButton.tsx:50:      console.error('Payment error:', error);
components/layout/SiteHeader.tsx:321:    console.error('SiteHeader render failed:', error);
components/layout/SiteFooter.tsx:370:    console.error('SiteFooter render failed:', error);
components/public/LiveMetrics.tsx:59:        console.error('Metrics error:', err);
components/ProgramPaymentOptions.tsx:56:      console.error('Payment error:', error);
components/dashboard/DashboardUpload.tsx:75:      console.error('Upload error:', err);
components/dashboard/DashboardUpload.tsx:95:      console.error('Failed to save to database:', err);
components/SecurityMonitor.tsx:57:      const originalLog = console.log;
components/SecurityMonitor.tsx:58:      console.log = (...args: unknown[]) => {
components/ErrorBoundary.tsx:26:    console.error('Error caught by boundary:', error, errorInfo);
components/drug-testing/CheckoutButton.tsx:51:      console.error('Checkout error:', error);
components/OptimizedVideo.tsx:36:        console.log('Autoplay blocked:', error);
```

## 🔴 6. MISSING ERROR BOUNDARIES

### Existing Error Boundaries:

```
app/program-holder/error.tsx
app/courses/error.tsx
app/programs/error.tsx
app/admin/error.tsx
app/error.tsx
```
