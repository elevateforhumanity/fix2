// app/api/auth/register/route.ts
// User registration with password complexity enforcement
import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseClient } from '@/lib/supabase-api';
import { logAuditEvent, AuditActions, getRequestMetadata } from '@/lib/audit';
import { rateLimit } from '@/lib/rateLimiter';

/**
 * Password complexity requirements:
 * - Minimum 8 characters
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one digit
 * - At least one special character
 */
function isStrongPassword(password: string): {
  valid: boolean;
  message?: string;
} {
  if (password.length < 8) {
    return {
      valid: false,
      message: 'Password must be at least 8 characters long',
    };
  }

  if (!/[A-Z]/.test(password)) {
    return {
      valid: false,
      message: 'Password must contain at least one uppercase letter',
    };
  }

  if (!/[a-z]/.test(password)) {
    return {
      valid: false,
      message: 'Password must contain at least one lowercase letter',
    };
  }

  if (!/\d/.test(password)) {
    return {
      valid: false,
      message: 'Password must contain at least one number',
    };
  }

  if (!/[@$!%*?&#^()[\]{}+_=<>|/~`.,;-]/.test(password)) {
    return {
      valid: false,
      message: 'Password must contain at least one special character',
    };
  }

  return { valid: true };
}

export async function POST(req: NextRequest) {
  const supabase = createSupabaseClient();
  // Rate limiting
  const limited = await rateLimit(req, 'auth-register', {
    requests: 5,
    windowSeconds: 300, // 5 requests per 5 minutes
  });
  if (limited) return limited;

  try {
    const { email, password, tenantId, firstName, lastName, role } =
      await req.json();

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Check password complexity
    const passwordCheck = isStrongPassword(password);
    if (!passwordCheck.valid) {
      return NextResponse.json(
        { error: passwordCheck.message },
        { status: 400 }
      );
    }

    // Create user in Supabase Auth
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        tenant_id: tenantId,
        first_name: firstName,
        last_name: lastName,
        role: role || 'student',
      },
    });

    if (error) {
      // Log failed registration attempt
      const { ipAddress, userAgent } = getRequestMetadata(req);
      await logAuditEvent({
        tenantId,
        userId: null,
        action: `${AuditActions.USER_CREATED}_failed`,
        resourceType: 'user',
        metadata: { email, error: error.message },
        ipAddress,
        userAgent,
      });

      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // Log successful registration
    const { ipAddress, userAgent } = getRequestMetadata(req);
    await logAuditEvent({
      tenantId,
      userId: data.user?.id || null,
      action: AuditActions.USER_CREATED,
      resourceType: 'user',
      resourceId: data.user?.id || null,
      metadata: { email, role: role || 'student' },
      ipAddress,
      userAgent,
    });

    return NextResponse.json(
      {
        user: {
          id: data.user?.id,
          email: data.user?.email,
          role: data.user?.user_metadata?.role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
