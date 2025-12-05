import { cookies, headers } from "next/headers";
import { createSupabaseServerClient } from "./supabaseServer";
import integrations from "../config/integrations.json";

export type AuthProviderType = "supabase" | "oidc" | "azure-ad" | "custom-jwt";

export type AuthUser = {
  id: string;
  email: string | null;
  name?: string | null;
  roles: string[];
  raw?: unknown;
};

export type AuthAdapter = {
  getCurrentUser(): Promise<AuthUser | null>;
  requireUser(): Promise<AuthUser>;
  signInRedirectUrl(params?: { returnTo?: string }): string;
  signOutRedirectUrl(params?: { returnTo?: string }): string;
};

function getAuthProviderType(): AuthProviderType {
  const t = (integrations.authProvider || "supabase") as AuthProviderType;
  return t;
}

/**
 * Default Supabase-backed Auth Adapter
 */
async function getSupabaseUser(): Promise<AuthUser | null> {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) return null;

  const user = data.user;
  const roles =
    (user.user_metadata?.roles as string[]) ||
    (user.user_metadata?.role ? [user.user_metadata.role] : []);

  return {
    id: user.id,
    email: user.email,
    name:
      (user.user_metadata?.full_name as string | undefined) ||
      (user.user_metadata?.name as string | undefined) ||
      undefined,
    roles,
    raw: user
  };
}

const supabaseAuthAdapter: AuthAdapter = {
  async getCurrentUser() {
    return getSupabaseUser();
  },
  async requireUser() {
    const user = await getSupabaseUser();
    if (!user) {
      throw new Error("Not authenticated");
    }
    return user;
  },
  signInRedirectUrl(params) {
    const returnTo = params?.returnTo || "/";
    return `/auth/sign-in?returnTo=${encodeURIComponent(returnTo)}`;
  },
  signOutRedirectUrl(params) {
    const returnTo = params?.returnTo || "/";
    return `/auth/sign-out?returnTo=${encodeURIComponent(returnTo)}`;
  }
};

/**
 * Placeholder for OIDC / OpenID Connect
 */
const oidcAuthAdapter: AuthAdapter = {
  async getCurrentUser() {
    console.warn("[EFH AUTH] OIDC adapter not implemented yet.");
    return null;
  },
  async requireUser() {
    throw new Error("OIDC auth adapter not implemented yet.");
  },
  signInRedirectUrl(params) {
    const returnTo = params?.returnTo || "/";
    return `/auth/oidc/login?returnTo=${encodeURIComponent(returnTo)}`;
  },
  signOutRedirectUrl(params) {
    const returnTo = params?.returnTo || "/";
    return `/auth/oidc/logout?returnTo=${encodeURIComponent(returnTo)}`;
  }
};

/**
 * Placeholder for Azure AD
 */
const azureAdAuthAdapter: AuthAdapter = {
  async getCurrentUser() {
    console.warn("[EFH AUTH] Azure AD adapter not implemented yet.");
    return null;
  },
  async requireUser() {
    throw new Error("Azure AD auth adapter not implemented yet.");
  },
  signInRedirectUrl(params) {
    const returnTo = params?.returnTo || "/";
    return `/auth/azure/login?returnTo=${encodeURIComponent(returnTo)}`;
  },
  signOutRedirectUrl(params) {
    const returnTo = params?.returnTo || "/";
    return `/auth/azure/logout?returnTo=${encodeURIComponent(returnTo)}`;
  }
};

/**
 * Placeholder for Custom JWT
 */
const customJwtAuthAdapter: AuthAdapter = {
  async getCurrentUser() {
    console.warn("[EFH AUTH] Custom JWT adapter not implemented yet.");
    const h = headers();
    const authHeader = h.get("authorization");
    if (!authHeader) return null;
    return null;
  },
  async requireUser() {
    throw new Error("Custom JWT auth adapter not implemented yet.");
  },
  signInRedirectUrl(params) {
    const returnTo = params?.returnTo || "/";
    return `/auth/login?returnTo=${encodeURIComponent(returnTo)}`;
  },
  signOutRedirectUrl(params) {
    const returnTo = params?.returnTo || "/";
    return `/auth/logout?returnTo=${encodeURIComponent(returnTo)}`;
  }
};

export function getAuthAdapter(): AuthAdapter {
  const type = getAuthProviderType();
  switch (type) {
    case "supabase":
      return supabaseAuthAdapter;
    case "oidc":
      return oidcAuthAdapter;
    case "azure-ad":
      return azureAdAuthAdapter;
    case "custom-jwt":
      return customJwtAuthAdapter;
    default:
      return supabaseAuthAdapter;
  }
}
