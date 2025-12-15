#!/bin/bash
# EFH LICENSE ENGINE v1 - Complete Installation Script
# This installs the technical license system into your codebase

echo "🔒 Installing EFH License Engine v1..."
echo ""

# 1) Create config directory and license.json
echo "📄 Creating config/license.json..."
mkdir -p config
cat > config/license.json <<'EOF'
{
  "licenseHolder": "ELEVATE FOR HUMANITY (MASTER)",
  "licenseId": "EFH-2025-MASTER-000",
  "licenseType": "master",
  "issuedAt": "2025-01-01",
  "validDomains": ["localhost", "elevateforhumanity.org", "*.elevateforhumanity.org"],
  "status": "active",
  "notes": "This is the master license. Client licenses will have unique IDs."
}
EOF
echo "✅ config/license.json created"
echo ""

# 2) Create lib/license.ts
echo "📄 Creating lib/license.ts..."
cat > lib/license.ts <<'EOF'
import fs from "fs";
import path from "path";

export type EFHLicense = {
  licenseHolder: string;
  licenseId: string;
  licenseType: "master" | "single-org" | "white-label" | "acquisition";
  issuedAt: string;
  validDomains: string[];
  status: "active" | "suspended" | "expired";
  notes?: string;
};

let _license: EFHLicense | null = null;

/**
 * Get the current license information
 * This is called server-side only
 */
export function getLicense(): EFHLicense {
  if (_license) return _license;

  const filePath = path.join(process.cwd(), "config/license.json");

  try {
    const raw = fs.readFileSync(filePath, "utf8");
    _license = JSON.parse(raw) as EFHLicense;
    return _license!;
  } catch (err) {
    console.error("⚠️ EFH License file missing or corrupted.");
    // Return a default suspended license
    return {
      licenseHolder: "UNKNOWN",
      licenseId: "UNKNOWN",
      licenseType: "single-org",
      issuedAt: "1970-01-01",
      validDomains: ["localhost"],
      status: "suspended",
      notes: "License file not found"
    };
  }
}

/**
 * Check if the current domain is authorized
 */
export function isDomainAuthorized(hostname: string): boolean {
  const license = getLicense();
  
  // Always allow localhost
  if (hostname === "localhost" || hostname.startsWith("127.0.0.1")) {
    return true;
  }

  // Check exact matches
  if (license.validDomains.includes(hostname)) {
    return true;
  }

  // Check wildcard matches
  for (const domain of license.validDomains) {
    if (domain.startsWith("*.")) {
      const baseDomain = domain.slice(2);
      if (hostname.endsWith(baseDomain)) {
        return true;
      }
    }
  }

  return false;
}

/**
 * Log license warning (for EFH monitoring)
 */
export function logLicenseWarning(message: string, data?: any) {
  const license = getLicense();
  console.warn(`[EFH LICENSE WARNING] ${license.licenseId}: ${message}`, data || "");
  
  // In production, you could send this to an external logging service
  // Example: sendToLoggingService({ licenseId: license.licenseId, message, data });
}
EOF
echo "✅ lib/license.ts created"
echo ""

# 3) Create middleware.ts
echo "📄 Creating middleware.ts..."
cat > middleware.ts <<'EOF'
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getLicense, isDomainAuthorized, logLicenseWarning } from "./lib/license";

export function middleware(req: NextRequest) {
  const license = getLicense();
  const hostname = req.nextUrl.hostname;

  // Check domain authorization
  if (!isDomainAuthorized(hostname)) {
    logLicenseWarning(`Unauthorized domain access`, { 
      hostname, 
      path: req.nextUrl.pathname 
    });
    
    // Don't block - just log for now
    // In the future, you could add a banner or redirect
  }

  // Check license status
  if (license.status === "suspended") {
    logLicenseWarning(`Suspended license in use`, { hostname });
    req.headers.set("X-EFH-License-Suspended", "true");
  }

  if (license.status === "expired") {
    logLicenseWarning(`Expired license in use`, { hostname });
    req.headers.set("X-EFH-License-Expired", "true");
  }

  // Add license ID to response headers (for your tracking)
  const response = NextResponse.next();
  response.headers.set("X-EFH-License-ID", license.licenseId);
  
  return response;
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
EOF
echo "✅ middleware.ts created"
echo ""

# 4) Create admin license page
echo "📄 Creating app/admin/license/page.tsx..."
mkdir -p app/admin/license
cat > app/admin/license/page.tsx <<'EOF'
import { getLicense } from "@/lib/license";

export const dynamic = "force-dynamic";

export default function LicensePage() {
  const license = getLicense();

  const statusColor = {
    active: "bg-green-50 text-green-700 ring-green-600/20",
    suspended: "bg-red-50 text-red-700 ring-red-600/20",
    expired: "bg-orange-50 text-orange-700 ring-orange-600/20",
  }[license.status] || "bg-slate-50 text-slate-700 ring-slate-600/20";

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-8">
          <h1 className="text-2xl font-bold text-slate-900">License Information</h1>
          <p className="mt-2 text-sm text-slate-700">
            This installation includes a unique Elevate For Humanity license.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-8">
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                License Holder
              </label>
              <p className="mt-1 text-lg font-semibold text-slate-900">
                {license.licenseHolder}
              </p>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                License ID
              </label>
              <p className="mt-1 font-mono text-sm text-slate-900">
                {license.licenseId}
              </p>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                License Type
              </label>
              <p className="mt-1 text-sm capitalize text-slate-900">
                {license.licenseType.replace("-", " ")}
              </p>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Issued Date
              </label>
              <p className="mt-1 text-sm text-slate-900">{license.issuedAt}</p>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Status
              </label>
              <div className="mt-1">
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ring-1 ${statusColor}`}
                >
                  {license.status.toUpperCase()}
                </span>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Authorized Domains
              </label>
              <div className="mt-1 space-y-1">
                {license.validDomains.map((domain) => (
                  <p key={domain} className="font-mono text-xs text-slate-700">
                    {domain}
                  </p>
                ))}
              </div>
            </div>

            {license.notes && (
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Notes
                </label>
                <p className="mt-1 text-sm text-slate-700">{license.notes}</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 rounded-xl bg-slate-100 p-4">
          <p className="text-xs text-slate-600">
            <strong>License Protection:</strong> This installation of the Elevate Workforce
            Platform includes a unique license fingerprint. Unauthorized redistribution,
            resale, or use outside the licensed scope is prohibited and may result in
            license termination.
          </p>
        </div>

        <div className="mt-4 text-center">
          <p className="text-xs text-slate-500">
            Questions about your license?{" "}
            <a
              href="mailto:licensing@elevateforhumanity.org"
              className="font-semibold text-orange-600 hover:text-orange-700"
            >
              Contact EFH Licensing
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
EOF
echo "✅ app/admin/license/page.tsx created"
echo ""

# 5) Add fingerprints to key files
echo "🔐 Adding license fingerprints..."

# Add to app/layout.tsx if it exists
if [ -f "app/layout.tsx" ]; then
  if ! grep -q "EFH LICENSE FINGERPRINT" app/layout.tsx; then
    sed -i '1i // EFH LICENSE FINGERPRINT: EFH-2025-MASTER-000' app/layout.tsx
    echo "✅ Fingerprint added to app/layout.tsx"
  else
    echo "⚠️ Fingerprint already exists in app/layout.tsx"
  fi
fi

# Add to lib/utils.ts if it exists
if [ -f "lib/utils.ts" ]; then
  if ! grep -q "EFH LICENSE FINGERPRINT" lib/utils.ts; then
    sed -i '1i // EFH LICENSE FINGERPRINT: EFH-2025-MASTER-000' lib/utils.ts
    echo "✅ Fingerprint added to lib/utils.ts"
  else
    echo "⚠️ Fingerprint already exists in lib/utils.ts"
  fi
fi

# Add to next.config.js if it exists
if [ -f "next.config.js" ]; then
  if ! grep -q "EFH LICENSE FINGERPRINT" next.config.js; then
    sed -i '1i // EFH LICENSE FINGERPRINT: EFH-2025-MASTER-000' next.config.js
    echo "✅ Fingerprint added to next.config.js"
  else
    echo "⚠️ Fingerprint already exists in next.config.js"
  fi
fi

echo ""

# 6) Create client repo generation script
echo "📄 Creating scripts/generate-client-repo.sh..."
mkdir -p scripts
cat > scripts/generate-client-repo.sh <<'EOF'
#!/bin/bash
# Generate a licensed client repository
# Usage: ./scripts/generate-client-repo.sh "Client Name" "client-slug" "EFH-2025-CLIENT-001"

if [ $# -lt 3 ]; then
  echo "Usage: $0 <client-name> <client-slug> <license-id>"
  echo "Example: $0 'Acme Workforce Board' 'acme' 'EFH-2025-ACME-001'"
  exit 1
fi

CLIENT_NAME=$1
CLIENT_SLUG=$2
LICENSE_ID=$3
NEW_REPO="efh-${CLIENT_SLUG}-platform"
TODAY=$(date +%Y-%m-%d)

echo "🔒 Generating licensed repository for: $CLIENT_NAME"
echo "License ID: $LICENSE_ID"
echo "Repository: $NEW_REPO"
echo ""

# Create temp directory
TEMP_DIR=$(mktemp -d)
echo "📁 Creating temporary directory: $TEMP_DIR"

# Clone current repo
echo "📦 Cloning base repository..."
git clone . "$TEMP_DIR"
cd "$TEMP_DIR"

# Remove .git directory
rm -rf .git

# Update license.json
echo "📝 Updating license.json..."
cat > config/license.json <<LICEOF
{
  "licenseHolder": "$CLIENT_NAME",
  "licenseId": "$LICENSE_ID",
  "licenseType": "single-org",
  "issuedAt": "$TODAY",
  "validDomains": ["localhost", "${CLIENT_SLUG}.com"],
  "status": "active",
  "notes": "Licensed to $CLIENT_NAME on $TODAY"
}
LICEOF

# Update fingerprints
echo "🔐 Updating license fingerprints..."
find . -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.js" \) -exec sed -i "s/EFH-2025-MASTER-000/$LICENSE_ID/g" {} +

# Initialize new git repo
echo "🔧 Initializing new repository..."
git init
git add .
git commit -m "Initialize licensed repository for $CLIENT_NAME

License ID: $LICENSE_ID
License Type: Single Organization
Issued: $TODAY

This repository is licensed to $CLIENT_NAME and includes
unique license fingerprints for IP protection."

# Create GitHub repo (requires gh CLI)
if command -v gh &> /dev/null; then
  echo "📤 Creating GitHub repository..."
  gh repo create "elevateforhumanity/$NEW_REPO" --private --source=. --remote=origin --push
  echo "✅ Repository created: https://github.com/elevateforhumanity/$NEW_REPO"
else
  echo "⚠️ GitHub CLI not found. Repository created locally at: $TEMP_DIR"
  echo "   To push manually:"
  echo "   1. Create repo on GitHub: https://github.com/new"
  echo "   2. cd $TEMP_DIR"
  echo "   3. git remote add origin git@github.com:elevateforhumanity/$NEW_REPO.git"
  echo "   4. git push -u origin main"
fi

echo ""
echo "🎉 Licensed repository generated successfully!"
echo ""
echo "Next steps:"
echo "1. Grant client access to the repository"
echo "2. Provide them with deployment instructions"
echo "3. Update your license tracking spreadsheet"
echo ""
EOF

chmod +x scripts/generate-client-repo.sh
echo "✅ scripts/generate-client-repo.sh created and made executable"
echo ""

# 7) Create README for license system
echo "📄 Creating LICENSE_SYSTEM_README.md..."
cat > LICENSE_SYSTEM_README.md <<'EOF'
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

EOF
echo "✅ LICENSE_SYSTEM_README.md created"
echo ""

echo "🎉 EFH License Engine v1 installation complete!"
echo ""
echo "📋 Summary of changes:"
echo "  ✅ config/license.json - License metadata"
echo "  ✅ lib/license.ts - License functions"
echo "  ✅ middleware.ts - Domain monitoring"
echo "  ✅ app/admin/license/page.tsx - Admin panel"
echo "  ✅ License fingerprints added to key files"
echo "  ✅ scripts/generate-client-repo.sh - Client repo generator"
echo "  ✅ LICENSE_SYSTEM_README.md - Documentation"
echo ""
echo "🔍 Next steps:"
echo "  1. Review config/license.json"
echo "  2. Test admin panel: /admin/license"
echo "  3. Test client repo generation script"
echo "  4. Set up external logging (optional)"
echo ""
echo "📚 Documentation:"
echo "  - LICENSE_SYSTEM_README.md - Technical docs"
echo "  - LICENSE_SUMMARY.md - Client-facing summary"
echo ""
EOF

chmod +x LICENSE_ENGINE_PATCH.sh
echo "✅ LICENSE_ENGINE_PATCH.sh created and ready to execute"
