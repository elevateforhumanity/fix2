-- ============================================================
-- CLAIM APPLICATIONS FOR AUTHENTICATED USER
-- Allows users to claim applications they submitted before logging in
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
  -- Get current user
  v_user_id := auth.uid();
  
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  -- Get user email
  SELECT email INTO v_user_email
  FROM auth.users
  WHERE id = v_user_id;

  IF v_user_email IS NULL THEN
    RAISE EXCEPTION 'User email not found';
  END IF;

  -- Claim applications by email where user_id is null
  UPDATE public.applications
  SET 
    user_id = v_user_id,
    updated_at = NOW()
  WHERE 
    email = v_user_email
    AND user_id IS NULL;

  GET DIAGNOSTICS v_claimed_count = ROW_COUNT;

  -- Log the claim (optional)
  IF v_claimed_count > 0 THEN
    RAISE NOTICE 'Claimed % application(s) for user %', v_claimed_count, v_user_id;
  END IF;
END;
$$;

GRANT EXECUTE ON FUNCTION public.claim_applications_for_current_user() TO authenticated;

COMMENT ON FUNCTION public.claim_applications_for_current_user IS 'Claims applications submitted before login by matching email address';
