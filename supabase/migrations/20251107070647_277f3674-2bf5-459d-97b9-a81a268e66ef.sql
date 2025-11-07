-- Create a secure configuration table for storing encryption keys
CREATE TABLE IF NOT EXISTS public.secure_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  config_key TEXT UNIQUE NOT NULL,
  config_value TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on secure_config table
ALTER TABLE public.secure_config ENABLE ROW LEVEL SECURITY;

-- Only service role can read/write to this table (no public access)
CREATE POLICY "Service role only access" ON public.secure_config
  FOR ALL
  USING (false);

-- Generate and insert a strong encryption key (64 character random hex string)
INSERT INTO public.secure_config (config_key, config_value)
VALUES ('pos_encryption_key', encode(gen_random_bytes(32), 'hex'))
ON CONFLICT (config_key) DO NOTHING;

-- Update the encrypt_pos_api_key function to use the secure_config table
CREATE OR REPLACE FUNCTION public.encrypt_pos_api_key(api_key TEXT)
RETURNS TEXT AS $$
DECLARE
  encryption_key TEXT;
BEGIN
  -- Retrieve encryption key from secure_config table
  SELECT config_value INTO encryption_key
  FROM public.secure_config
  WHERE config_key = 'pos_encryption_key';
  
  IF encryption_key IS NULL THEN
    RAISE EXCEPTION 'Encryption key not configured';
  END IF;
  
  -- Encrypt the API key using AES-256
  RETURN encode(
    encrypt(
      api_key::bytea,
      encryption_key::bytea,
      'aes'
    ),
    'base64'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp;

-- Update the decrypt_pos_api_key function to use the secure_config table
CREATE OR REPLACE FUNCTION public.decrypt_pos_api_key(encrypted_key TEXT)
RETURNS TEXT AS $$
DECLARE
  encryption_key TEXT;
BEGIN
  -- Retrieve encryption key from secure_config table
  SELECT config_value INTO encryption_key
  FROM public.secure_config
  WHERE config_key = 'pos_encryption_key';
  
  IF encryption_key IS NULL THEN
    RAISE EXCEPTION 'Encryption key not configured';
  END IF;
  
  -- Decrypt the API key using AES-256
  RETURN convert_from(
    decrypt(
      decode(encrypted_key, 'base64'),
      encryption_key::bytea,
      'aes'
    ),
    'UTF8'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp;

-- Add trigger for updated_at on secure_config
CREATE OR REPLACE FUNCTION public.update_secure_config_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_secure_config_updated_at
BEFORE UPDATE ON public.secure_config
FOR EACH ROW
EXECUTE FUNCTION public.update_secure_config_updated_at();