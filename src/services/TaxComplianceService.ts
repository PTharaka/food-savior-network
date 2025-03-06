
import { toast } from "sonner";

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
  type: 'donation_summary' | 'form_8283' | 'receipt' | 'waste_report';
  period: string;
  createdDate: string;
  downloadUrl: string;
  size: string;
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

  generateDonationSummary(donationRecords: DonationRecord[], period: string): Promise<TaxDocument> {
    // Mock implementation - would actually generate a PDF document
    return new Promise((resolve) => {
      setTimeout(() => {
        const completedDonations = donationRecords.filter(d => d.status === 'completed');
        
        // Calculate total donation value
        const totalValue = completedDonations.reduce((sum, d) => sum + (d.estimatedValue || 0), 0);
        
        const newDocument: TaxDocument = {
          id: `doc_${Date.now()}`,
          name: `${period} Donation Summary`,
          type: 'donation_summary',
          period,
          createdDate: new Date().toISOString().split('T')[0],
          downloadUrl: '#',
          size: `${Math.floor(Math.random() * 900 + 100)} KB`
        };
        
        this.documents.push(newDocument);
        console.log('Generated donation summary', newDocument, 'with total value', totalValue);
        toast.success('Donation summary generated');
        resolve(newDocument);
      }, 2000);
    });
  }

  generateForm8283(donationRecords: DonationRecord[], year: string): Promise<TaxDocument> {
    // Mock implementation - would actually generate a Form 8283 document
    return new Promise((resolve) => {
      setTimeout(() => {
        const newDocument: TaxDocument = {
          id: `doc_${Date.now()}`,
          name: `IRS Form 8283 (${year})`,
          type: 'form_8283',
          period: year,
          createdDate: new Date().toISOString().split('T')[0],
          downloadUrl: '#',
          size: `${Math.floor(Math.random() * 500 + 100)} KB`
        };
        
        this.documents.push(newDocument);
        console.log('Generated IRS Form 8283', newDocument);
        toast.success('IRS Form 8283 generated');
        resolve(newDocument);
      }, 2500);
    });
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
