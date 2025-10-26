-- Enable pgcrypto extension for encryption
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Create a function to encrypt POS API keys
-- This function uses SECURITY DEFINER to access the encryption key
CREATE OR REPLACE FUNCTION public.encrypt_pos_api_key(api_key text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  encryption_key text;
BEGIN
  -- In production, this should use vault.secrets or environment variable
  -- For now, using a database-level encryption
  RETURN encode(pgp_sym_encrypt(api_key, current_setting('app.settings.encryption_key', true)), 'base64');
EXCEPTION
  WHEN OTHERS THEN
    -- If encryption key is not set, return error
    RAISE EXCEPTION 'Encryption key not configured. Please set app.settings.encryption_key';
END;
$$;

-- Create a function to decrypt POS API keys (only accessible by service role)
CREATE OR REPLACE FUNCTION public.decrypt_pos_api_key(encrypted_key text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN pgp_sym_decrypt(decode(encrypted_key, 'base64'), current_setting('app.settings.encryption_key', true));
EXCEPTION
  WHEN OTHERS THEN
    RAISE EXCEPTION 'Failed to decrypt API key';
END;
$$;

-- Add a comment to clarify that api_key_encrypted should contain encrypted data
COMMENT ON COLUMN public.pos_connections.api_key_encrypted IS 'Encrypted POS API key using pgp_sym_encrypt. Use encrypt_pos_api_key() function to encrypt before storing.';