# Final SQL Migrations - Ready to Run

Run these in order in your Supabase SQL Editor.

---

## Step 1: Check Your Badges Table Schema

First, run this to see what columns your badges table has:

```sql
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_schema = 'public' AND table_name = 'badges' 
ORDER BY ordinal_position;
```

**You'll see one of two schemas:**
- **Schema A:** `id`, `key`, `label`, `description`, `criteria`
- **Schema B:** `id`, `org_id`, `key`, `name`, `description`

---

## Step 2: Run Migration 1 - Complete Infrastructure

**Time:** 2 minutes

```sql
-- ============================================================
-- COMPLETE WORKFORCE INFRASTRUCTURE
-- ============================================================

create extension if not exists pgcrypto;

create index if not exists idx_tenant_memberships_tenant on tenant_memberships(tenant_id);
create index if not exists idx_tenant_memberships_user on tenant_memberships(user_id);
create index if not exists idx_tenant_licenses_tenant on tenant_licenses(tenant_id);

create or replace function public.create_tenant_with_owner(
  tenant_name text,
  tenant_slug text
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  new_tenant_id uuid;
  existing_tenant_id uuid;
begin
  if auth.uid() is null then
    raise exception 'Not authenticated';
  end if;

  select id into existing_tenant_id from public.tenants where slug = tenant_slug limit 1;

  if existing_tenant_id is not null then
    new_tenant_id := existing_tenant_id;
  else
    insert into public.tenants(name, slug)
    values (tenant_name, tenant_slug)
    returning id into new_tenant_id;
  end if;

  insert into public.tenant_memberships(tenant_id, user_id, role)
  values (new_tenant_id, auth.uid(), 'owner')
  on conflict (tenant_id, user_id) do update
    set role = excluded.role;

  insert into public.tenant_licenses(
    tenant_id,
    plan,
    max_employers,
    max_apprentices,
    active
  )
  values (
    new_tenant_id,
    'starter',
    5,
    25,
    true
  )
  on conflict (tenant_id) do nothing;

  return new_tenant_id;
end;
$$;

grant execute on function public.create_tenant_with_owner(text, text) to authenticated;

create table if not exists public.push_tokens (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  token text not null,
  platform text not null check (platform in ('ios', 'android')),
  device_id text not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(user_id, device_id)
);

create index if not exists idx_push_tokens_user on public.push_tokens(user_id);
create index if not exists idx_push_tokens_token on public.push_tokens(token);

alter table public.push_tokens enable row level security;

do $$
begin
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='push_tokens' and policyname='Users can view own tokens') then
    create policy "Users can view own tokens" on public.push_tokens for select using (auth.uid() = user_id);
  end if;

  if not exists (select 1 from pg_policies where schemaname='public' and tablename='push_tokens' and policyname='Users can insert own tokens') then
    create policy "Users can insert own tokens" on public.push_tokens for insert with check (auth.uid() = user_id);
  end if;

  if not exists (select 1 from pg_policies where schemaname='public' and tablename='push_tokens' and policyname='Users can update own tokens') then
    create policy "Users can update own tokens" on public.push_tokens for update using (auth.uid() = user_id);
  end if;

  if not exists (select 1 from pg_policies where schemaname='public' and tablename='push_tokens' and policyname='Users can delete own tokens') then
    create policy "Users can delete own tokens" on public.push_tokens for delete using (auth.uid() = user_id);
  end if;

  if not exists (select 1 from pg_policies where schemaname='public' and tablename='push_tokens' and policyname='Service role can manage all tokens') then
    create policy "Service role can manage all tokens" on public.push_tokens for all using ((auth.jwt() ->> 'role') = 'service_role');
  end if;
end $$;

create or replace function public.update_push_tokens_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists push_tokens_updated_at on public.push_tokens;
create trigger push_tokens_updated_at
before update on public.push_tokens
for each row execute function public.update_push_tokens_updated_at();

create table if not exists public.notification_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  body text not null,
  data jsonb,
  type text not null,
  status text not null check (status in ('sent', 'failed', 'pending')),
  error_message text,
  sent_at timestamptz,
  created_at timestamptz default now()
);

create index if not exists idx_notification_logs_user on public.notification_logs(user_id);
create index if not exists idx_notification_logs_type on public.notification_logs(type);
create index if not exists idx_notification_logs_status on public.notification_logs(status);
create index if not exists idx_notification_logs_created on public.notification_logs(created_at desc);

alter table public.notification_logs enable row level security;

do $$
begin
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='notification_logs' and policyname='Users can view own notification logs') then
    create policy "Users can view own notification logs" on public.notification_logs for select using (auth.uid() = user_id);
  end if;

  if not exists (select 1 from pg_policies where schemaname='public' and tablename='notification_logs' and policyname='Service role can manage notification logs') then
    create policy "Service role can manage notification logs" on public.notification_logs for all using ((auth.jwt() ->> 'role') = 'service_role');
  end if;
end $$;

create or replace function public.upsert_license_from_stripe(
  p_tenant_id uuid,
  p_stripe_customer_id text,
  p_stripe_subscription_id text,
  p_stripe_price_id text,
  p_status text,
  p_plan_name text
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if (auth.jwt() ->> 'role') <> 'service_role' then
    raise exception 'Service role required';
  end if;

  update public.tenant_licenses
  set
    stripe_customer_id = p_stripe_customer_id,
    stripe_subscription_id = p_stripe_subscription_id,
    plan = coalesce(p_plan_name, plan),
    active = (p_status = 'active' or p_status = 'trialing'),
    updated_at = now()
  where tenant_id = p_tenant_id;

  if not found then
    insert into public.tenant_licenses(
      tenant_id,
      stripe_customer_id,
      stripe_subscription_id,
      plan,
      max_employers,
      max_apprentices,
      active
    )
    values (
      p_tenant_id,
      p_stripe_customer_id,
      p_stripe_subscription_id,
      coalesce(p_plan_name, 'starter'),
      5,
      25,
      (p_status = 'active' or p_status = 'trialing')
    );
  end if;
end;
$$;

grant execute on function public.upsert_license_from_stripe(uuid, text, text, text, text, text) to service_role;
```

---

## Step 3: Run Migration 2 - Badge Triggers

**Time:** 2 minutes

```sql
-- ============================================================
-- BADGE AWARDING AUTOMATION
-- ============================================================

CREATE OR REPLACE FUNCTION public.award_badge_by_key(
  p_user_id uuid,
  p_badge_key text
)
RETURNS void
LANGUAGE plpgsql
SECURITY definer
SET search_path = public
AS $$
DECLARE
  v_badge_id uuid;
BEGIN
  SELECT id INTO v_badge_id FROM public.badges WHERE key = p_badge_key LIMIT 1;
  
  IF v_badge_id IS NULL THEN
    RAISE NOTICE 'Badge with key % not found', p_badge_key;
    RETURN;
  END IF;

  INSERT INTO public.user_badges (user_id, badge_id, earned_at)
  VALUES (p_user_id, v_badge_id, NOW())
  ON CONFLICT (user_id, badge_id) DO NOTHING;
END;
$$;

CREATE OR REPLACE FUNCTION public.check_first_course_badge()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'completed' AND (OLD.status IS NULL OR OLD.status != 'completed') THEN
    IF (SELECT COUNT(*) FROM public.course_enrollments WHERE user_id = NEW.user_id AND status = 'completed') = 1 THEN
      PERFORM public.award_badge_by_key(NEW.user_id, 'first-course');
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_first_course_badge ON public.course_enrollments;
CREATE TRIGGER trigger_first_course_badge
AFTER INSERT OR UPDATE ON public.course_enrollments
FOR EACH ROW
EXECUTE FUNCTION public.check_first_course_badge();

CREATE OR REPLACE FUNCTION public.check_five_courses_badge()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'completed' AND (OLD.status IS NULL OR OLD.status != 'completed') THEN
    IF (SELECT COUNT(*) FROM public.course_enrollments WHERE user_id = NEW.user_id AND status = 'completed') = 5 THEN
      PERFORM public.award_badge_by_key(NEW.user_id, 'five-courses');
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_five_courses_badge ON public.course_enrollments;
CREATE TRIGGER trigger_five_courses_badge
AFTER INSERT OR UPDATE ON public.course_enrollments
FOR EACH ROW
EXECUTE FUNCTION public.check_five_courses_badge();

CREATE OR REPLACE FUNCTION public.check_ten_courses_badge()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'completed' AND (OLD.status IS NULL OR OLD.status != 'completed') THEN
    IF (SELECT COUNT(*) FROM public.course_enrollments WHERE user_id = NEW.user_id AND status = 'completed') = 10 THEN
      PERFORM public.award_badge_by_key(NEW.user_id, 'ten-courses');
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_ten_courses_badge ON public.course_enrollments;
CREATE TRIGGER trigger_ten_courses_badge
AFTER INSERT OR UPDATE ON public.course_enrollments
FOR EACH ROW
EXECUTE FUNCTION public.check_ten_courses_badge();

CREATE OR REPLACE FUNCTION public.check_perfect_score_badge()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.score = 100 AND (OLD.score IS NULL OR OLD.score != 100) THEN
    PERFORM public.award_badge_by_key(NEW.user_id, 'perfect-score');
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_perfect_score_badge ON public.assessment_submissions;
CREATE TRIGGER trigger_perfect_score_badge
AFTER INSERT OR UPDATE ON public.assessment_submissions
FOR EACH ROW
EXECUTE FUNCTION public.check_perfect_score_badge();

CREATE TABLE IF NOT EXISTS public.user_streaks (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  current_streak int DEFAULT 0,
  longest_streak int DEFAULT 0,
  last_login_date date,
  created_at timestamptz DEFAULT NOW(),
  updated_at timestamptz DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_user_streaks_user ON public.user_streaks(user_id);

ALTER TABLE public.user_streaks ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='user_streaks' AND policyname='Users can view own streaks') THEN
    CREATE POLICY "Users can view own streaks" ON public.user_streaks FOR SELECT USING (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='user_streaks' AND policyname='Service role can manage streaks') THEN
    CREATE POLICY "Service role can manage streaks" ON public.user_streaks FOR ALL USING ((auth.jwt() ->> 'role') = 'service_role');
  END IF;
END $$;

CREATE OR REPLACE FUNCTION public.update_user_streak(p_user_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY definer
SET search_path = public
AS $$
DECLARE
  v_last_login date;
  v_current_streak int;
  v_longest_streak int;
  v_today date := CURRENT_DATE;
BEGIN
  SELECT last_login_date, current_streak, longest_streak
  INTO v_last_login, v_current_streak, v_longest_streak
  FROM public.user_streaks
  WHERE user_id = p_user_id;

  IF NOT FOUND THEN
    INSERT INTO public.user_streaks (user_id, current_streak, longest_streak, last_login_date)
    VALUES (p_user_id, 1, 1, v_today);
    RETURN;
  END IF;

  IF v_last_login = v_today THEN
    RETURN;
  END IF;

  IF v_last_login = v_today - INTERVAL '1 day' THEN
    v_current_streak := v_current_streak + 1;
    v_longest_streak := GREATEST(v_longest_streak, v_current_streak);
    
    IF v_current_streak = 7 THEN
      PERFORM public.award_badge_by_key(p_user_id, 'seven-day-streak');
    ELSIF v_current_streak = 30 THEN
      PERFORM public.award_badge_by_key(p_user_id, 'thirty-day-streak');
    END IF;
  ELSE
    v_current_streak := 1;
  END IF;

  UPDATE public.user_streaks
  SET 
    current_streak = v_current_streak,
    longest_streak = v_longest_streak,
    last_login_date = v_today,
    updated_at = NOW()
  WHERE user_id = p_user_id;
END;
$$;

GRANT EXECUTE ON FUNCTION public.update_user_streak(uuid) TO authenticated;

CREATE OR REPLACE FUNCTION public.check_time_badges(p_user_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY definer
SET search_path = public
AS $$
DECLARE
  v_hour int := EXTRACT(HOUR FROM NOW());
BEGIN
  IF v_hour < 8 THEN
    PERFORM public.award_badge_by_key(p_user_id, 'early-bird');
  END IF;

  IF v_hour >= 22 THEN
    PERFORM public.award_badge_by_key(p_user_id, 'night-owl');
  END IF;
END;
$$;

GRANT EXECUTE ON FUNCTION public.check_time_badges(uuid) TO authenticated;
```

---

## Step 4: Insert Badges (Choose Based on Your Schema)

**If you have Schema A** (key, label, description, criteria):

```sql
INSERT INTO public.badges (key, label, description, criteria)
VALUES 
  ('first-course', 'First Course Completed', 'Complete your first course', '{"type": "course_completion", "count": 1}'::jsonb),
  ('five-courses', '5 Courses Completed', 'Complete 5 courses', '{"type": "course_completion", "count": 5}'::jsonb),
  ('ten-courses', '10 Courses Completed', 'Complete 10 courses', '{"type": "course_completion", "count": 10}'::jsonb),
  ('seven-day-streak', '7-Day Streak', 'Login for 7 consecutive days', '{"type": "login_streak", "days": 7}'::jsonb),
  ('thirty-day-streak', '30-Day Streak', 'Login for 30 consecutive days', '{"type": "login_streak", "days": 30}'::jsonb),
  ('perfect-score', 'Perfect Score', 'Score 100% on an assessment', '{"type": "assessment_score", "score": 100}'::jsonb),
  ('early-bird', 'Early Bird', 'Login before 8am', '{"type": "time_based", "hour": 8, "before": true}'::jsonb),
  ('night-owl', 'Night Owl', 'Login after 10pm', '{"type": "time_based", "hour": 22, "before": false}'::jsonb)
ON CONFLICT (key) DO UPDATE SET
  label = EXCLUDED.label,
  description = EXCLUDED.description,
  criteria = EXCLUDED.criteria;
```

**If you have Schema B** (org_id, key, name, description):

First, get your org_id:
```sql
SELECT id FROM public.orgs LIMIT 1;
```

Then insert (replace `YOUR_ORG_ID` with the UUID from above):

```sql
INSERT INTO public.badges (org_id, key, name, description)
VALUES 
  ('YOUR_ORG_ID'::uuid, 'first-course', 'First Course Completed', 'Complete your first course'),
  ('YOUR_ORG_ID'::uuid, 'five-courses', '5 Courses Completed', 'Complete 5 courses'),
  ('YOUR_ORG_ID'::uuid, 'ten-courses', '10 Courses Completed', 'Complete 10 courses'),
  ('YOUR_ORG_ID'::uuid, 'seven-day-streak', '7-Day Streak', 'Login for 7 consecutive days'),
  ('YOUR_ORG_ID'::uuid, 'thirty-day-streak', '30-Day Streak', 'Login for 30 consecutive days'),
  ('YOUR_ORG_ID'::uuid, 'perfect-score', 'Perfect Score', 'Score 100% on an assessment'),
  ('YOUR_ORG_ID'::uuid, 'early-bird', 'Early Bird', 'Login before 8am'),
  ('YOUR_ORG_ID'::uuid, 'night-owl', 'Night Owl', 'Login after 10pm');
```

---

## Step 5: Run Migration 3 - Leaderboards

**Time:** 3 minutes

```sql
-- ============================================================
-- LEADERBOARD AGGREGATION VIEWS
-- ============================================================

DROP MATERIALIZED VIEW IF EXISTS public.leaderboard_weekly CASCADE;
DROP MATERIALIZED VIEW IF EXISTS public.leaderboard_monthly CASCADE;
DROP MATERIALIZED VIEW IF EXISTS public.leaderboard_all_time CASCADE;

CREATE MATERIALIZED VIEW public.leaderboard_weekly AS
SELECT 
  u.id as user_id,
  u.raw_user_meta_data->>'full_name' as name,
  u.raw_user_meta_data->>'avatar_url' as avatar_url,
  tm.tenant_id,
  COALESCE(COUNT(DISTINCT ub.badge_id), 0) as badges_count,
  COALESCE(COUNT(DISTINCT ce.course_id) FILTER (WHERE ce.status = 'completed'), 0) as courses_completed,
  COALESCE(us.current_streak, 0) as streak_days,
  ROW_NUMBER() OVER (PARTITION BY tm.tenant_id ORDER BY COUNT(DISTINCT ub.badge_id) DESC) as rank
FROM auth.users u
INNER JOIN public.tenant_memberships tm ON u.id = tm.user_id
LEFT JOIN public.user_badges ub ON u.id = ub.user_id AND ub.earned_at >= NOW() - INTERVAL '7 days'
LEFT JOIN public.course_enrollments ce ON u.id = ce.user_id AND ce.updated_at >= NOW() - INTERVAL '7 days'
LEFT JOIN public.user_streaks us ON u.id = us.user_id
GROUP BY u.id, u.raw_user_meta_data, tm.tenant_id, us.current_streak;

CREATE UNIQUE INDEX idx_leaderboard_weekly_user_tenant ON public.leaderboard_weekly(user_id, tenant_id);
CREATE INDEX idx_leaderboard_weekly_tenant_rank ON public.leaderboard_weekly(tenant_id, rank);

CREATE MATERIALIZED VIEW public.leaderboard_monthly AS
SELECT 
  u.id as user_id,
  u.raw_user_meta_data->>'full_name' as name,
  u.raw_user_meta_data->>'avatar_url' as avatar_url,
  tm.tenant_id,
  COALESCE(COUNT(DISTINCT ub.badge_id), 0) as badges_count,
  COALESCE(COUNT(DISTINCT ce.course_id) FILTER (WHERE ce.status = 'completed'), 0) as courses_completed,
  COALESCE(us.current_streak, 0) as streak_days,
  ROW_NUMBER() OVER (PARTITION BY tm.tenant_id ORDER BY COUNT(DISTINCT ub.badge_id) DESC) as rank
FROM auth.users u
INNER JOIN public.tenant_memberships tm ON u.id = tm.user_id
LEFT JOIN public.user_badges ub ON u.id = ub.user_id AND ub.earned_at >= NOW() - INTERVAL '30 days'
LEFT JOIN public.course_enrollments ce ON u.id = ce.user_id AND ce.updated_at >= NOW() - INTERVAL '30 days'
LEFT JOIN public.user_streaks us ON u.id = us.user_id
GROUP BY u.id, u.raw_user_meta_data, tm.tenant_id, us.current_streak;

CREATE UNIQUE INDEX idx_leaderboard_monthly_user_tenant ON public.leaderboard_monthly(user_id, tenant_id);
CREATE INDEX idx_leaderboard_monthly_tenant_rank ON public.leaderboard_monthly(tenant_id, rank);

CREATE MATERIALIZED VIEW public.leaderboard_all_time AS
SELECT 
  u.id as user_id,
  u.raw_user_meta_data->>'full_name' as name,
  u.raw_user_meta_data->>'avatar_url' as avatar_url,
  tm.tenant_id,
  COALESCE(COUNT(DISTINCT ub.badge_id), 0) as badges_count,
  COALESCE(COUNT(DISTINCT ce.course_id) FILTER (WHERE ce.status = 'completed'), 0) as courses_completed,
  COALESCE(us.current_streak, 0) as streak_days,
  COALESCE(us.longest_streak, 0) as longest_streak,
  ROW_NUMBER() OVER (PARTITION BY tm.tenant_id ORDER BY COUNT(DISTINCT ub.badge_id) DESC) as rank
FROM auth.users u
INNER JOIN public.tenant_memberships tm ON u.id = tm.user_id
LEFT JOIN public.user_badges ub ON u.id = ub.user_id
LEFT JOIN public.course_enrollments ce ON u.id = ce.user_id
LEFT JOIN public.user_streaks us ON u.id = us.user_id
GROUP BY u.id, u.raw_user_meta_data, tm.tenant_id, us.current_streak, us.longest_streak;

CREATE UNIQUE INDEX idx_leaderboard_all_time_user_tenant ON public.leaderboard_all_time(user_id, tenant_id);
CREATE INDEX idx_leaderboard_all_time_tenant_rank ON public.leaderboard_all_time(tenant_id, rank);

CREATE OR REPLACE FUNCTION public.refresh_leaderboards()
RETURNS void
LANGUAGE plpgsql
SECURITY definer
SET search_path = public
AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY public.leaderboard_weekly;
  REFRESH MATERIALIZED VIEW CONCURRENTLY public.leaderboard_monthly;
  REFRESH MATERIALIZED VIEW CONCURRENTLY public.leaderboard_all_time;
END;
$$;

GRANT EXECUTE ON FUNCTION public.refresh_leaderboards() TO service_role;

CREATE OR REPLACE VIEW public.leaderboard_weekly_view AS
SELECT * FROM public.leaderboard_weekly
WHERE tenant_id = (
  SELECT tenant_id FROM public.tenant_memberships 
  WHERE user_id = auth.uid() 
  LIMIT 1
);

CREATE OR REPLACE VIEW public.leaderboard_monthly_view AS
SELECT * FROM public.leaderboard_monthly
WHERE tenant_id = (
  SELECT tenant_id FROM public.tenant_memberships 
  WHERE user_id = auth.uid() 
  LIMIT 1
);

CREATE OR REPLACE VIEW public.leaderboard_all_time_view AS
SELECT * FROM public.leaderboard_all_time
WHERE tenant_id = (
  SELECT tenant_id FROM public.tenant_memberships 
  WHERE user_id = auth.uid() 
  LIMIT 1
);

GRANT SELECT ON public.leaderboard_weekly_view TO authenticated;
GRANT SELECT ON public.leaderboard_monthly_view TO authenticated;
GRANT SELECT ON public.leaderboard_all_time_view TO authenticated;

SELECT public.refresh_leaderboards();
```

---

## Verify Everything Works

```sql
-- Check functions
SELECT proname FROM pg_proc WHERE proname IN (
  'create_tenant_with_owner',
  'upsert_license_from_stripe',
  'award_badge_by_key',
  'update_user_streak',
  'check_time_badges',
  'refresh_leaderboards'
);

-- Check tables
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('push_tokens', 'notification_logs', 'user_streaks');

-- Check badges
SELECT key, COALESCE(label, name) as name FROM public.badges ORDER BY key;

-- Check leaderboards
SELECT COUNT(*) FROM public.leaderboard_all_time;
```

---

## Step 6: Application Claiming (Optional but Recommended)

**Time:** 1 minute  
**What it does:** Allows users to claim applications they submitted before logging in

```sql
-- ============================================================
-- CLAIM APPLICATIONS FOR AUTHENTICATED USER
-- ============================================================

CREATE OR REPLACE FUNCTION public.claim_applications_for_current_user()
RETURNS void
LANGUAGE plpgsql
SECURITY definer
SET search_path = public
AS $$
DECLARE
  v_user_id uuid;
  v_user_email text;
  v_claimed_count int;
BEGIN
  v_user_id := auth.uid();
  
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  SELECT email INTO v_user_email
  FROM auth.users
  WHERE id = v_user_id;

  IF v_user_email IS NULL THEN
    RAISE EXCEPTION 'User email not found';
  END IF;

  UPDATE public.applications
  SET 
    user_id = v_user_id,
    updated_at = NOW()
  WHERE 
    email = v_user_email
    AND user_id IS NULL;

  GET DIAGNOSTICS v_claimed_count = ROW_COUNT;

  IF v_claimed_count > 0 THEN
    RAISE NOTICE 'Claimed % application(s) for user %', v_claimed_count, v_user_id;
  END IF;
END;
$$;

GRANT EXECUTE ON FUNCTION public.claim_applications_for_current_user() TO authenticated;
```

---

## ✅ Done!

Your platform now has:
- ✅ Tenant bootstrap automation
- ✅ Stripe license activation
- ✅ Push notification infrastructure
- ✅ Badge awarding triggers
- ✅ Leaderboard aggregation

**Platform is 100% automated.**
