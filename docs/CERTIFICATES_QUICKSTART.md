# Certificates & Role-Based Access - Quick Start

## 🚀 What's New

You now have a complete certificate management system with role-based access control and magic link authentication!

## ✨ Features

### Magic Link Authentication

- **No passwords needed** - Users sign in via email link
- Secure and user-friendly
- Automatic redirect to intended page

### Role-Based Access

- **Student** - View their own certificates
- **Staff** - Issue certificates to students
- **Admin** - Full system access

### Certificate Management

- Issue certificates with verification codes
- Upload PDF certificates
- Public verification links
- Student certificate dashboard

## 📋 Quick Setup (5 minutes)

### 1. Run Database Migrations

In Supabase SQL Editor, run these files:

```
supabase/migrations/001_user_roles.sql
supabase/migrations/002_certificates.sql
```

### 2. Create Storage Bucket

Supabase Console → Storage → Create bucket `certificates` (public)

### 3. Assign Your First Staff Role

```sql
-- Get your user ID from Supabase Auth → Users
INSERT INTO public.user_roles (user_id, role)
VALUES ('your-user-id-here', 'staff');
```

### 4. Test It Out

1. Sign in at `/login` with magic link
2. Go to `/staff` to issue a certificate
3. View certificates at `/my-certificates`
4. Verify publicly at `/verify/{code}`

## 🎯 Key Routes

| Route              | Access        | Purpose                         |
| ------------------ | ------------- | ------------------------------- |
| `/login`           | Public        | Magic link sign-in              |
| `/auth/callback`   | Public        | Magic link redirect handler     |
| `/my-certificates` | Authenticated | View your certificates          |
| `/staff`           | Staff/Admin   | Issue certificates              |
| `/verify/:code`    | Public        | Verify certificate authenticity |
| `/not-authorized`  | Public        | Access denied page              |

## 👥 Role Assignment

### Quick (for testing)

Supabase Console → Auth → Users → Edit user_metadata:

```json
{ "role": "staff" }
```

### Production (recommended)

```sql
INSERT INTO public.user_roles (user_id, role)
VALUES ('user-uuid', 'staff');
```

## 📝 Issue a Certificate

1. Navigate to `/staff`
2. Enter:
   - Student email (must be registered)
   - Program ID (e.g., `digital-literacy-101`)
   - Program Name (e.g., `Digital Literacy 101`)
   - PDF file (optional)
3. Click "Issue Certificate"
4. Share verification link with student

## 🔍 Verify a Certificate

Share the link: `https://yoursite.com/verify/ABC12345

Anyone can verify:

- Certificate is authentic
- Program name
- Issue date
- Download PDF (if available)

## 🎨 UI Updates

### Navigation

- Shows user role badge
- "My Certificates" link for authenticated users
- "Staff Panel" link for staff/admin
- Sign out button

### Mobile-Friendly

- All features work on mobile
- Responsive design
- Touch-friendly interface

## 📚 Full Documentation

See [AUTHENTICATION_SETUP.md](./AUTHENTICATION_SETUP.md) for:

- Detailed setup instructions
- Security considerations
- Troubleshooting guide
- Advanced configuration

## 🐛 Troubleshooting

**Magic link not working?**

- Check Supabase email settings
- Verify site URL in Supabase config
- Check spam folder

**Can't access /staff?**

- Verify role is assigned in database
- Sign out and back in
- Check browser console for errors

**Certificate upload fails?**

- Ensure `certificates` bucket exists
- Verify bucket is public
- Check file is valid PDF

## 🔐 Security

- ✅ Row Level Security (RLS) on all tables
- ✅ Role-based route protection
- ✅ Secure magic link authentication
- ✅ Public verification without exposing sensitive data

## 🎉 Next Steps

- [ ] Customize email templates
- [ ] Add certificate PDF generation
- [ ] Create admin dashboard
- [ ] Set up production email provider
- [ ] Add certificate templates

---

**Need help?** Check the full documentation or contact the development team.
