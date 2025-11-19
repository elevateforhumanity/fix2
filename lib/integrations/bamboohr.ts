// lib/integrations/bamboohr.ts
import { logger } from '@/lib/logger';
const BAMBOOHR_API_KEY = process.env.BAMBOOHR_API_KEY;
const BAMBOOHR_SUBDOMAIN = process.env.BAMBOOHR_SUBDOMAIN;

export async function fetchBambooHREmployees() {
  if (!BAMBOOHR_API_KEY || !BAMBOOHR_SUBDOMAIN) {
    logger.warn("BambooHR not configured");
    return [];
  }

  const res = await fetch(
    `https://api.bamboohr.com/api/gateway.php/${BAMBOOHR_SUBDOMAIN}/v1/employees/directory`,
    {
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(`${BAMBOOHR_API_KEY}:x`).toString("base64"),
        Accept: "application/json",
      },
    }
  );

  if (!res.ok) {
    const text = await res.text();
    logger.error("BambooHR error", new Error(text), { status: res.status });
    throw new Error("Failed to fetch BambooHR employees");
  }

  const data = await res.json();
  return data?.employees ?? [];
}
