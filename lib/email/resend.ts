import { Resend } from "resend";

function must(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

export const resend = new Resend(must("RESEND_API_KEY"));

export const notifyTo = () => must("NOTIFY_EMAIL_TO");
export const notifyFrom = () => must("NOTIFY_EMAIL_FROM");
