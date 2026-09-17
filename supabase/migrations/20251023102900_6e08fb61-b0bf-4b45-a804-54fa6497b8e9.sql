-- Phase 1.1: POS Integration Tables
CREATE TABLE public.pos_connections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  provider TEXT NOT NULL CHECK (provider IN ('square', 'toast', 'lightspeed', 'clover', 'shopify')),
  api_key_encrypted TEXT NOT NULL,
  store_id TEXT,
  sync_frequency TEXT NOT NULL DEFAULT 'hourly' CHECK (sync_frequency IN ('realtime', 'hourly', 'daily')),
  last_synced_at TIMESTAMP WITH TIME ZONE,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'error', 'disconnected')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.pos_sync_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  connection_id UUID NOT NULL REFERENCES public.pos_connections(id) ON DELETE CASCADE,
  items_synced INTEGER NOT NULL DEFAULT 0,
  errors JSONB,
  synced_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Phase 1.2: Geolocation & Donation Matching Tables
CREATE TABLE public.charity_organizations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('food_bank', 'shelter', 'community_kitchen', 'composting_facility', 'animal_shelter')),
  address TEXT NOT NULL,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  contact_person TEXT,
  phone TEXT,
  email TEXT,
  accepts_categories TEXT[] DEFAULT ARRAY[]::TEXT[],
  operating_hours JSONB DEFAULT '{}'::jsonb,
  capacity_notes TEXT,
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.donation_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  charity_id UUID NOT NULL REFERENCES public.charity_organizations(id) ON DELETE CASCADE,
  item_name TEXT NOT NULL,
  quantity DECIMAL NOT NULL,
  unit TEXT NOT NULL,
  expiry_date DATE,
  estimated_value DECIMAL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'in_transit', 'completed', 'declined', 'cancelled')),
  notification_sent BOOLEAN DEFAULT false,
  pickup_scheduled_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Phase 1.3: Tax Compliance Tables
CREATE TABLE public.tax_documents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  document_type TEXT NOT NULL CHECK (document_type IN ('irs_8283', 'donation_summary', 'receipt', 'waste_report', 'eu_vat', 'annual_summary')),
  tax_year INTEGER NOT NULL,
  period TEXT,
  total_donation_value DECIMAL DEFAULT 0,
  total_deduction DECIMAL DEFAULT 0,
  pdf_url TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'finalized', 'filed', 'archived')),
  generated_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.donation_tax_details (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  donation_id UUID NOT NULL REFERENCES public.donations(id) ON DELETE CASCADE,
  tax_document_id UUID REFERENCES public.tax_documents(id) ON DELETE SET NULL,
  fair_market_value DECIMAL NOT NULL,
  deduction_amount DECIMAL NOT NULL,
  charity_ein TEXT,
  receipt_number TEXT,
  appraisal_required BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.pos_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pos_sync_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.charity_organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donation_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tax_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donation_tax_details ENABLE ROW LEVEL SECURITY;

-- RLS Policies for pos_connections
CREATE POLICY "Users can view their own POS connections"
  ON public.pos_connections FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own POS connections"
  ON public.pos_connections FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own POS connections"
  ON public.pos_connections FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own POS connections"
  ON public.pos_connections FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies for pos_sync_logs
CREATE POLICY "Users can view their own sync logs"
  ON public.pos_sync_logs FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.pos_connections
      WHERE pos_connections.id = pos_sync_logs.connection_id
      AND pos_connections.user_id = auth.uid()
    )
  );

-- RLS Policies for charity_organizations (authenticated read of verified records, admin write)
CREATE POLICY "Anyone can view verified charities"
  ON public.charity_organizations FOR SELECT
  USING (verified = true AND auth.uid() IS NOT NULL);

-- RLS Policies for donation_requests
CREATE POLICY "Users can view their own donation requests"
  ON public.donation_requests FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own donation requests"
  ON public.donation_requests FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own donation requests"
  ON public.donation_requests FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own donation requests"
  ON public.donation_requests FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies for tax_documents
CREATE POLICY "Users can view their own tax documents"
  ON public.tax_documents FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own tax documents"
  ON public.tax_documents FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own tax documents"
  ON public.tax_documents FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own tax documents"
  ON public.tax_documents FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies for donation_tax_details
CREATE POLICY "Users can view their own donation tax details"
  ON public.donation_tax_details FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.donations
      WHERE donations.id = donation_tax_details.donation_id
      AND donations.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert their own donation tax details"
  ON public.donation_tax_details FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.donations
      WHERE donations.id = donation_tax_details.donation_id
      AND donations.user_id = auth.uid()
    )
  );

-- Create indexes for performance
CREATE INDEX idx_pos_connections_user_id ON public.pos_connections(user_id);
CREATE INDEX idx_pos_sync_logs_connection_id ON public.pos_sync_logs(connection_id);
CREATE INDEX idx_charity_orgs_location ON public.charity_organizations(latitude, longitude);
CREATE INDEX idx_charity_orgs_type ON public.charity_organizations(type);
CREATE INDEX idx_donation_requests_user_id ON public.donation_requests(user_id);
CREATE INDEX idx_donation_requests_charity_id ON public.donation_requests(charity_id);
CREATE INDEX idx_donation_requests_status ON public.donation_requests(status);
CREATE INDEX idx_tax_documents_user_id ON public.tax_documents(user_id);
CREATE INDEX idx_tax_documents_year ON public.tax_documents(tax_year);
CREATE INDEX idx_donation_tax_details_donation_id ON public.donation_tax_details(donation_id);

-- Triggers for updated_at
CREATE TRIGGER update_pos_connections_updated_at
  BEFORE UPDATE ON public.pos_connections
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_charity_organizations_updated_at
  BEFORE UPDATE ON public.charity_organizations
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_donation_requests_updated_at
  BEFORE UPDATE ON public.donation_requests
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_tax_documents_updated_at
  BEFORE UPDATE ON public.tax_documents
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Seed some charity organizations for demo
INSERT INTO public.charity_organizations (name, type, address, latitude, longitude, contact_person, phone, email, accepts_categories, operating_hours, verified) VALUES
  ('City Food Bank', 'food_bank', '123 Main St, San Francisco, CA 94102', 37.7749, -122.4194, 'John Smith', '415-555-0101', 'john@cityfoodbank.org', ARRAY['produce', 'dairy', 'bakery', 'meat'], '{"mon":"9am-5pm","tue":"9am-5pm","wed":"9am-5pm","thu":"9am-5pm","fri":"9am-5pm"}', true),
  ('Community Kitchen', 'community_kitchen', '456 Oak Ave, San Francisco, CA 94103', 37.7699, -122.4234, 'Sarah Johnson', '415-555-0102', 'sarah@communitykitchen.org', ARRAY['produce', 'bakery', 'canned'], '{"mon":"8am-8pm","tue":"8am-8pm","wed":"8am-8pm","thu":"8am-8pm","fri":"8am-8pm","sat":"10am-6pm"}', true),
  ('Homeless Shelter Network', 'shelter', '789 Pine St, San Francisco, CA 94104', 37.7909, -122.4018, 'Michael Brown', '415-555-0103', 'michael@shelternetwork.org', ARRAY['produce', 'dairy', 'meat', 'bakery', 'prepared_meals'], '{"mon":"24/7","tue":"24/7","wed":"24/7","thu":"24/7","fri":"24/7","sat":"24/7","sun":"24/7"}', true),
  ('Green Composting Co', 'composting_facility', '321 Elm Rd, San Francisco, CA 94105', 37.7849, -122.3918, 'Emily Davis', '415-555-0104', 'emily@greencompost.org', ARRAY['produce', 'organic_waste'], '{"mon":"7am-6pm","tue":"7am-6pm","wed":"7am-6pm","thu":"7am-6pm","fri":"7am-6pm","sat":"9am-3pm"}', true);