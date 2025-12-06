# API Documentation

## Authentication

All endpoints require Bearer token in Authorization header.

## Endpoints

### Profiles

- GET /api/profiles/{org_id} - Get profile
- PATCH /api/profiles/{org_id} - Update profile
- GET /api/profiles/{org_id}/history - Get history

### Packets

- GET /api/packets - List packets
- POST /api/packets - Create packet
- GET /api/packets/{id} - Get packet
- PATCH /api/packets/{id} - Update packet
- POST /api/packets/{id}/approve - Approve
- POST /api/packets/{id}/submit - Submit

### Injection

- POST /api/inject/packets/{id}/inject - Inject data
- POST /api/inject/profiles/{org_id}/inject - Inject profile

### Audit

- GET /api/audit - List logs
- GET /api/audit/{id} - Get log
- GET /api/audit/packet/{id} - Get packet trail
