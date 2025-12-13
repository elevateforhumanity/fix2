import { redirect } from "next/navigation"
import type { ReactNode } from "react"
import { createClient } from "@/lib/supabase/server"

export default async function LmsAppLayout({ children }: { children: ReactNode }) {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    redirect("/login?next=/lms/dashboard")
  }

  return <div className="min-h-screen">{children}</div>
}
