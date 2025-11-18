# Admin Guide – Elevate for Humanity LMS

## 1. Overview

This guide explains how to administer tenants, programs, and users in the Elevate for Humanity platform.

## 2. Key Concepts

- **Tenant** – A training provider, school, or employer partner
- **Program** – A structured course (e.g., HVAC, Barber, Medical Assistant)
- **User Roles** – Student, Instructor, Partner Admin, EFH Super Admin

## 3. Common Tasks

### 3.1 Provision a New Tenant

1. Navigate to `/admin/tenants`
2. Click "Provision New Tenant"
3. Enter tenant details:
   - Name
   - Slug (URL-friendly identifier)
   - Primary domain (optional)
   - Resource quotas
4. Click "Create Tenant"

### 3.2 Configure Programs and Cohorts

1. Access tenant dashboard
2. Navigate to "Programs"
3. Create new program with:
   - Program name
   - Description
   - Duration
   - Prerequisites
4. Set up cohorts with start/end dates

### 3.3 Invite Instructors and Students

1. Go to "Users" section
2. Click "Invite User"
3. Enter email and select role
4. User receives invitation email
5. They complete registration

### 3.4 Run Compliance and Funding Reports

1. Navigate to `/admin/compliance`
2. Select report type:
   - WIOA quarterly reports
   - Enrollment reports
   - Completion reports
3. Choose date range
4. Download CSV

## 4. Compliance Management

### 4.1 WIOA Reporting

- Access `/admin/compliance`
- Download quarterly reports
- Submit to DOL/state agencies

### 4.2 Data Privacy Requests

- Review deletion requests at `/admin/compliance/deletions`
- View export history at `/admin/compliance/exports`
- Process requests within 30 days (GDPR)

### 4.3 Audit Logs

- All administrative actions are logged
- View recent logs on compliance dashboard
- Export logs for compliance audits

## 5. Monitoring and Operations

### 5.1 System Health

- Monitor at `/admin/monitoring`
- Check Grafana dashboards
- Review Prometheus alerts

### 5.2 Backup and Recovery

- Automated daily backups to S3
- Retention: 30 days
- Restore process documented in runbooks

## 6. Support and Resources

- Technical support: support@elevateforhumanity.org
- Documentation: `/docs`
- Runbooks: `/docs/runbooks`

## 7. Best Practices

1. **Regular Audits**: Review user access quarterly
2. **Data Hygiene**: Archive inactive tenants
3. **Compliance**: Stay current with WIOA/FERPA requirements
4. **Security**: Enable MFA for all admin accounts
5. **Monitoring**: Check dashboards daily

## 8. Troubleshooting

### Common Issues

**Issue**: Tenant quota exceeded  
**Solution**: Increase quota or upgrade plan

**Issue**: User can't login  
**Solution**: Check SSO configuration, verify email

**Issue**: Report generation fails  
**Solution**: Check date range, verify data exists

## 9. Advanced Topics

- Custom branding per tenant
- API access and integrations
- Webhook configuration
- Custom compliance flags

---

**Last Updated**: 2025-11-18  
**Version**: 2.0
