// src/lib/api.ts
const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL ?? "https://www.elevateforhumanity.org";

async function request<T>(path: string, opts: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(opts.headers || {}),
    },
    ...opts,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Request failed with status ${res.status}`);
  }

  return res.json() as Promise<T>;
}

export type MobileCourseSummary = {
  id: string;
  title: string;
  shortDescription: string;
  thumbnailUrl?: string;
  progressPercent: number; // 0-100
  nextLessonTitle?: string;
};

export type MobileProfile = {
  name: string;
  email: string;
  avatarUrl?: string;
  totalCourses: number;
  completedCourses: number;
  streakDays: number;
  certificatesCount: number;
};

export type LoginResponse = {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
};

export const api = {
  // POST /api/mobile/login
  async login(email: string, password: string) {
    return request<LoginResponse>("/api/mobile/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },

  // GET /api/mobile/courses
  async getMyCourses(token: string) {
    return request<MobileCourseSummary[]>("/api/mobile/courses", {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  // GET /api/mobile/profile
  async getProfile(token: string) {
    return request<MobileProfile>("/api/mobile/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};
