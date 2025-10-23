
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface DonationRecord {
  id: string;
  organization: string;
  items: string;
  quantity: string;
  status: 'pending' | 'scheduled' | 'completed' | 'cancelled';
  date: string;
  address: string;
  estimatedValue?: number;
}

interface TaxDocument {
  id: string;
  name: string;
  type: 'donation_summary' | 'form_8283' | 'receipt' | 'waste_report' | 'irs_8283' | 'eu_vat' | 'annual_summary';
  period: string;
  createdDate: string;
  downloadUrl: string;
  size: string;
  status?: string;
  tax_year?: number;
  total_donation_value?: number;
  total_deduction?: number;
}

class TaxComplianceService {
  private static instance: TaxComplianceService;
  private documents: TaxDocument[] = [
    {
      id: 'doc_1',
      name: 'Q3 2023 Donation Summary',
      type: 'donation_summary',
      period: 'Q3 2023',
      createdDate: '2023-10-01',
      downloadUrl: '#',
      size: '1.2 MB'
    },
    {
      id: 'doc_2',
      name: 'IRS Form 8283 (2023)',
      type: 'form_8283',
      period: '2023',
      createdDate: '2023-10-05',
      downloadUrl: '#',
      size: '420 KB'
    },
    {
      id: 'doc_3',
      name: 'Q2 2023 Waste Analysis',
      type: 'waste_report',
      period: 'Q2 2023',
      createdDate: '2023-07-01',
      downloadUrl: '#',
      size: '980 KB'
    }
  ];

  private constructor() {}

  public static getInstance(): TaxComplianceService {
    if (!TaxComplianceService.instance) {
      TaxComplianceService.instance = new TaxComplianceService();
    }
    return TaxComplianceService.instance;
  }

  getDocuments(type?: 'donation_summary' | 'form_8283' | 'receipt' | 'waste_report'): TaxDocument[] {
    if (type) {
      return this.documents.filter(doc => doc.type === type);
    }
    return this.documents;
  }

  async generateDonationSummary(donationRecords: DonationRecord[], period: string): Promise<TaxDocument> {
    try {
      const taxYear = new Date().getFullYear();
      
      const { data, error } = await supabase.functions.invoke('generate-tax-document', {
        body: { 
          documentType: 'donation_summary',
          taxYear,
          period
        }
      });

      if (error) throw error;

      const newDocument: TaxDocument = {
        id: data.document.id,
        name: `${period} Donation Summary`,
        type: 'donation_summary',
        period,
        createdDate: new Date(data.document.created_at).toISOString().split('T')[0],
        downloadUrl: data.document.pdf_url || '#',
        size: '850 KB',
        status: data.document.status,
        tax_year: data.document.tax_year,
        total_donation_value: data.document.total_donation_value,
        total_deduction: data.document.total_deduction
      };
      
      console.log('Generated donation summary', newDocument);
      toast.success('Donation summary generated');
      return newDocument;
    } catch (error: any) {
      console.error('Failed to generate donation summary:', error);
      toast.error('Failed to generate donation summary');
      throw error;
    }
  }

  async generateForm8283(donationRecords: DonationRecord[], year: string): Promise<TaxDocument> {
    try {
      const { data, error } = await supabase.functions.invoke('generate-tax-document', {
        body: { 
          documentType: 'irs_8283',
          taxYear: parseInt(year),
          period: year
        }
      });

      if (error) throw error;

      const newDocument: TaxDocument = {
        id: data.document.id,
        name: `IRS Form 8283 (${year})`,
        type: 'form_8283',
        period: year,
        createdDate: new Date(data.document.created_at).toISOString().split('T')[0],
        downloadUrl: data.document.pdf_url || '#',
        size: '420 KB',
        status: data.document.status,
        tax_year: data.document.tax_year,
        total_donation_value: data.document.total_donation_value,
        total_deduction: data.document.total_deduction
      };
      
      console.log('Generated IRS Form 8283', newDocument);
      toast.success('IRS Form 8283 generated');
      return newDocument;
    } catch (error: any) {
      console.error('Failed to generate Form 8283:', error);
      toast.error('Failed to generate Form 8283');
      throw error;
    }
  }

  generateDonationReceipt(donationId: string): Promise<TaxDocument> {
    // Mock implementation - would actually generate a donation receipt
    return new Promise((resolve) => {
      setTimeout(() => {
        const newDocument: TaxDocument = {
          id: `doc_${Date.now()}`,
          name: `Donation Receipt - ${donationId}`,
          type: 'receipt',
          period: new Date().toISOString().split('T')[0],
          createdDate: new Date().toISOString().split('T')[0],
          downloadUrl: '#',
          size: `${Math.floor(Math.random() * 300 + 50)} KB`
        };
        
        this.documents.push(newDocument);
        console.log('Generated donation receipt', newDocument);
        toast.success('Donation receipt generated');
        resolve(newDocument);
      }, 1500);
    });
  }

  downloadDocument(documentId: string): Promise<boolean> {
    // Mock implementation - would actually trigger a file download
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Downloading document ${documentId}`);
        toast.success('Document downloading...');
        resolve(true);
      }, 1000);
    });
  }
}

export default TaxComplianceService;
