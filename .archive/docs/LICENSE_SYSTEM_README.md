# EFH License Engine v1

## Overview

The EFH License Engine is a technical protection system that:
- Embeds unique license IDs into each client repository
- Tracks domain usage and unauthorized deployments
- Provides visibility into license status
- Protects intellectual property without breaking client systems

## Components

### 1. License Configuration (`config/license.json`)
Contains license metadata for each installation.

### 2. License Library (`lib/license.ts`)
Server-side functions for reading and validating licenses.

### 3. Middleware (`middleware.ts`)
Monitors domain usage and logs warnings for unauthorized access.

### 4. Admin Panel (`app/admin/license/page.tsx`)
Displays license information to administrators.

### 5. License Fingerprints
Invisible markers embedded in key files for IP tracing.

## Generating Client Repositories

Use the provided script to create licensed client repos:

```bash
./scripts/generate-client-repo.sh "Client Name" "client-slug" "EFH-2025-CLIENT-001"
```

This will:
1. Clone the base repository
2. Insert client-specific license metadata
3. Update all fingerprints
4. Create a new private GitHub repository
5. Push the licensed code

## License Types

- **master**: Your internal development version
- **single-org**: Licensed to one organization
- **white-label**: Licensed for multi-org deployment
- **acquisition**: Full codebase ownership

## Monitoring

The system logs warnings for:
- Unauthorized domain usage
- Suspended licenses
- Expired licenses

In production, these logs can be sent to an external monitoring service.

## Security Notes

- License files are server-side only (never exposed to client)
- Fingerprints are non-intrusive comments
- System does NOT break client functionality
- Provides legal evidence for IP protection

## Support

For questions about the license system:
- Email: licensing@elevateforhumanity.org
- Documentation: See LICENSE_SUMMARY.md

