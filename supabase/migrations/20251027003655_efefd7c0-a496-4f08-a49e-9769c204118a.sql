-- Fix charity contact information public exposure
-- Change RLS policy to require authentication

DROP POLICY IF EXISTS "Anyone can view verified charities" ON public.charity_organizations;

CREATE POLICY "Authenticated users can view verified charities" 
  ON public.charity_organizations
  FOR SELECT
  USING (verified = true AND auth.uid() IS NOT NULL);