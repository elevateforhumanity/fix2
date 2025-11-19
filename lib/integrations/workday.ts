// lib/integrations/workday.ts
import { logger } from '@/lib/logger';
const WORKDAY_BASE_URL = process.env.WORKDAY_BASE_URL; // e.g. https://wd5.myworkday.com/ccx/
const WORKDAY_TENANT = process.env.WORKDAY_TENANT;
const WORKDAY_USERNAME = process.env.WORKDAY_USERNAME;
const WORKDAY_PASSWORD = process.env.WORKDAY_PASSWORD;

function getAuthHeader() {
  const token = Buffer.from(
    `${WORKDAY_USERNAME}:${WORKDAY_PASSWORD}`
  ).toString("base64");
  return `Basic ${token}`;
}

// Example: pull employees for sync
export async function fetchWorkdayEmployees() {
  if (!WORKDAY_BASE_URL || !WORKDAY_TENANT) {
    logger.warn("Workday not configured");
    return [];
  }

  const url = `${WORKDAY_BASE_URL}service/customreport2/${WORKDAY_TENANT}/public/EFH_Employee_Sync?format=json`;

  const res = await fetch(url, {
    headers: {
      Authorization: getAuthHeader(),
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    const text = await res.text();
    logger.error("Workday fetch error", new Error(text), { status: res.status });
    throw new Error("Failed to fetch Workday employees");
  }

  const data = await res.json();
  return data?.Report_Entry ?? [];
}
