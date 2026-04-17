export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      ai_insights: {
        Row: {
          content: string
          created_at: string | null
          id: string
          insight_type: string
          recommendations: Json | null
          title: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          insight_type: string
          recommendations?: Json | null
          title: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          insight_type?: string
          recommendations?: Json | null
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      charity_organizations: {
        Row: {
          accepts_categories: string[] | null
          address: string
          capacity_notes: string | null
          contact_person: string | null
          created_at: string
          email: string | null
          id: string
          latitude: number | null
          longitude: number | null
          name: string
          operating_hours: Json | null
          phone: string | null
          type: string
          updated_at: string
          verified: boolean | null
        }
        Insert: {
          accepts_categories?: string[] | null
          address: string
          capacity_notes?: string | null
          contact_person?: string | null
          created_at?: string
          email?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          name: string
          operating_hours?: Json | null
          phone?: string | null
          type: string
          updated_at?: string
          verified?: boolean | null
        }
        Update: {
          accepts_categories?: string[] | null
          address?: string
          capacity_notes?: string | null
          contact_person?: string | null
          created_at?: string
          email?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          name?: string
          operating_hours?: Json | null
          phone?: string | null
          type?: string
          updated_at?: string
          verified?: boolean | null
        }
        Relationships: []
      }
      donation_requests: {
        Row: {
          charity_id: string
          completed_at: string | null
          created_at: string
          estimated_value: number | null
          expiry_date: string | null
          id: string
          item_name: string
          notes: string | null
          notification_sent: boolean | null
          pickup_scheduled_at: string | null
          quantity: number
          status: string
          unit: string
          updated_at: string
          user_id: string
        }
        Insert: {
          charity_id: string
          completed_at?: string | null
          created_at?: string
          estimated_value?: number | null
          expiry_date?: string | null
          id?: string
          item_name: string
          notes?: string | null
          notification_sent?: boolean | null
          pickup_scheduled_at?: string | null
          quantity: number
          status?: string
          unit: string
          updated_at?: string
          user_id: string
        }
        Update: {
          charity_id?: string
          completed_at?: string | null
          created_at?: string
          estimated_value?: number | null
          expiry_date?: string | null
          id?: string
          item_name?: string
          notes?: string | null
          notification_sent?: boolean | null
          pickup_scheduled_at?: string | null
          quantity?: number
          status?: string
          unit?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "donation_requests_charity_id_fkey"
            columns: ["charity_id"]
            isOneToOne: false
            referencedRelation: "charity_organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      donation_tax_details: {
        Row: {
          appraisal_required: boolean | null
          charity_ein: string | null
          created_at: string
          deduction_amount: number
          donation_id: string
          fair_market_value: number
          id: string
          receipt_number: string | null
          tax_document_id: string | null
        }
        Insert: {
          appraisal_required?: boolean | null
          charity_ein?: string | null
          created_at?: string
          deduction_amount: number
          donation_id: string
          fair_market_value: number
          id?: string
          receipt_number?: string | null
          tax_document_id?: string | null
        }
        Update: {
          appraisal_required?: boolean | null
          charity_ein?: string | null
          created_at?: string
          deduction_amount?: number
          donation_id?: string
          fair_market_value?: number
          id?: string
          receipt_number?: string | null
          tax_document_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "donation_tax_details_donation_id_fkey"
            columns: ["donation_id"]
            isOneToOne: false
            referencedRelation: "donations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "donation_tax_details_tax_document_id_fkey"
            columns: ["tax_document_id"]
            isOneToOne: false
            referencedRelation: "tax_documents"
            referencedColumns: ["id"]
          },
        ]
      }
      donations: {
        Row: {
          created_at: string | null
          donation_date: string
          estimated_value: number | null
          id: string
          item_name: string
          notes: string | null
          quantity: number
          recipient_name: string
          recipient_type: string
          status: string | null
          tax_deductible: boolean | null
          unit: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          donation_date?: string
          estimated_value?: number | null
          id?: string
          item_name: string
          notes?: string | null
          quantity: number
          recipient_name: string
          recipient_type: string
          status?: string | null
          tax_deductible?: boolean | null
          unit: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          donation_date?: string
          estimated_value?: number | null
          id?: string
          item_name?: string
          notes?: string | null
          quantity?: number
          recipient_name?: string
          recipient_type?: string
          status?: string | null
          tax_deductible?: boolean | null
          unit?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      pos_connections: {
        Row: {
          api_key_encrypted: string
          created_at: string
          id: string
          last_synced_at: string | null
          provider: string
          status: string
          store_id: string | null
          sync_frequency: string
          updated_at: string
          user_id: string
        }
        Insert: {
          api_key_encrypted: string
          created_at?: string
          id?: string
          last_synced_at?: string | null
          provider: string
          status?: string
          store_id?: string | null
          sync_frequency?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          api_key_encrypted?: string
          created_at?: string
          id?: string
          last_synced_at?: string | null
          provider?: string
          status?: string
          store_id?: string | null
          sync_frequency?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      pos_sync_logs: {
        Row: {
          connection_id: string
          errors: Json | null
          id: string
          items_synced: number
          synced_at: string
        }
        Insert: {
          connection_id: string
          errors?: Json | null
          id?: string
          items_synced?: number
          synced_at?: string
        }
        Update: {
          connection_id?: string
          errors?: Json | null
          id?: string
          items_synced?: number
          synced_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "pos_sync_logs_connection_id_fkey"
            columns: ["connection_id"]
            isOneToOne: false
            referencedRelation: "pos_connections"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          address: string | null
          business_name: string | null
          business_type: string | null
          company_size: string | null
          created_at: string | null
          email: string | null
          id: string
          industry: string | null
          phone: string | null
          subscription_tier: string | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          business_name?: string | null
          business_type?: string | null
          company_size?: string | null
          created_at?: string | null
          email?: string | null
          id: string
          industry?: string | null
          phone?: string | null
          subscription_tier?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          business_name?: string | null
          business_type?: string | null
          company_size?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          industry?: string | null
          phone?: string | null
          subscription_tier?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      rate_limits: {
        Row: {
          created_at: string | null
          endpoint: string
          id: string
          request_count: number | null
          user_id: string
          window_start: string | null
        }
        Insert: {
          created_at?: string | null
          endpoint: string
          id?: string
          request_count?: number | null
          user_id: string
          window_start?: string | null
        }
        Update: {
          created_at?: string | null
          endpoint?: string
          id?: string
          request_count?: number | null
          user_id?: string
          window_start?: string | null
        }
        Relationships: []
      }
      social_posts: {
        Row: {
          content: string
          created_at: string | null
          engagement_metrics: Json | null
          id: string
          platform: string
          scheduled_date: string | null
          status: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          engagement_metrics?: Json | null
          id?: string
          platform: string
          scheduled_date?: string | null
          status?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          engagement_metrics?: Json | null
          id?: string
          platform?: string
          scheduled_date?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      tax_documents: {
        Row: {
          created_at: string
          document_type: string
          generated_at: string | null
          id: string
          pdf_url: string | null
          period: string | null
          status: string
          tax_year: number
          total_deduction: number | null
          total_donation_value: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          document_type: string
          generated_at?: string | null
          id?: string
          pdf_url?: string | null
          period?: string | null
          status?: string
          tax_year: number
          total_deduction?: number | null
          total_donation_value?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          document_type?: string
          generated_at?: string | null
          id?: string
          pdf_url?: string | null
          period?: string | null
          status?: string
          tax_year?: number
          total_deduction?: number | null
          total_donation_value?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      waste_entries: {
        Row: {
          category: string
          cost: number | null
          created_at: string | null
          date: string
          id: string
          item_name: string
          notes: string | null
          quantity: number
          reason: string | null
          unit: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          category: string
          cost?: number | null
          created_at?: string | null
          date?: string
          id?: string
          item_name: string
          notes?: string | null
          quantity: number
          reason?: string | null
          unit: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          category?: string
          cost?: number | null
          created_at?: string | null
          date?: string
          id?: string
          item_name?: string
          notes?: string | null
          quantity?: number
          reason?: string | null
          unit?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_rate_limit: {
        Args: {
          _endpoint: string
          _max_requests: number
          _user_id: string
          _window_minutes: number
        }
        Returns: boolean
      }
      decrypt_pos_api_key: { Args: { encrypted_key: string }; Returns: string }
      encrypt_pos_api_key: { Args: { api_key: string }; Returns: string }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
