# Application Form - Exact Problem Found

## THE ISSUE:
Form field names don't match API expectations, causing submission to fail silently.

## FIELD MISMATCHES:

### Form sends → API expects
- `program` → `programInterest`
- `zip` → `zipCode`  
- `mathAnswer` → `captchaAnswer`

## THE FIX:
Change form field names in `/app/apply/page.tsx` to match API:

Line 29: `program: string;` → `programInterest: string;`
Line 57: `program: "",` → `programInterest: "",`
Line 148: `program: "",` → `programInterest: "",`
Line 294-295: `formData.program` → `formData.programInterest`

Similar changes for `zip` → `zipCode` and `mathAnswer` → `captchaAnswer`

## RESULT:
Form will submit successfully to `/api/applications` route.

## DO YOU WANT ME TO FIX THIS?
Reply YES and I will make ONE commit with this fix only.
Reply NO and tell me what else to check.
