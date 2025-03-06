
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { FileText, Download, Calendar, Printer, Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import TaxComplianceService from '@/services/TaxComplianceService';

interface TaxDocument {
  id: string;
  name: string;
  type: 'donation_summary' | 'form_8283' | 'receipt' | 'waste_report';
  period: string;
  createdDate: string;
  downloadUrl: string;
  size: string;
}

const TaxReports: React.FC = () => {
  const [documents, setDocuments] = useState<TaxDocument[]>([]);
  const [loading, setLoading] = useState(false);
  const [showGenerateDialog, setShowGenerateDialog] = useState(false);
  const [newReport, setNewReport] = useState({
    type: 'donation_summary',
    period: 'Q4 2023',
    year: '2023'
  });
  
  const taxService = TaxComplianceService.getInstance();

  useEffect(() => {
    // Load documents
    loadDocuments();
  }, []);

  const loadDocuments = () => {
    const docs = taxService.getDocuments();
    setDocuments(docs);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewReport(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setNewReport(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGenerateReport = async () => {
    setLoading(true);
    try {
      let newDocument: TaxDocument;
      
      // Mock data for demonstration
      const mockDonations = [
        {
          id: '1',
          organization: 'City Food Bank',
          items: 'Bread, Vegetables',
          quantity: '10 kg',
          status: 'completed',
          date: '2023-11-10',
          address: '123 Main St, City',
          estimatedValue: 45.50
        },
        {
          id: '3',
          organization: 'Community Pantry',
          items: 'Canned Goods',
          quantity: '15 kg',
          status: 'completed',
          date: '2023-11-01',
          address: '789 Pine Rd, City',
          estimatedValue: 60.25
        },
      ];
      
      // Generate the appropriate document based on type
      if (newReport.type === 'donation_summary') {
        newDocument = await taxService.generateDonationSummary(mockDonations, newReport.period);
      } else if (newReport.type === 'form_8283') {
        newDocument = await taxService.generateForm8283(mockDonations, newReport.year);
      } else {
        // Waste report or receipt - simplified for demo
        newDocument = {
          id: `doc_${Date.now()}`,
          name: `${newReport.type === 'waste_report' ? 'Waste Analysis' : 'Donation Receipt'} - ${newReport.period}`,
          type: newReport.type as any,
          period: newReport.period,
          createdDate: new Date().toISOString().split('T')[0],
          downloadUrl: '#',
          size: `${Math.floor(Math.random() * 500 + 100)} KB`
        };
      }
      
      setDocuments(prev => [newDocument, ...prev]);
      setShowGenerateDialog(false);
      toast.success('Report generated successfully');
    } catch (error) {
      console.error('Error generating report:', error);
      toast.error('Failed to generate report');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (documentId: string) => {
    setLoading(true);
    try {
      await taxService.downloadDocument(documentId);
      toast.success('Document download started');
    } catch (error) {
      console.error('Error downloading document:', error);
      toast.error('Failed to download document');
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = async (documentId: string) => {
    setLoading(true);
    try {
      // Simulate printing
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Document sent to printer');
    } catch (error) {
      console.error('Error printing document:', error);
      toast.error('Failed to print document');
    } finally {
      setLoading(false);
    }
  };
  
  const filterDocuments = (type: 'donation_summary' | 'form_8283' | 'receipt' | 'waste_report') => {
    return documents.filter(doc => doc.type === type);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-wastewise-dark-gray">Tax Reports</h2>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => {
              // This would open a date picker in a full implementation
              toast.info('Period selection would open here');
            }}
          >
            <Calendar size={16} /> Select Period
          </Button>
          <Dialog open={showGenerateDialog} onOpenChange={setShowGenerateDialog}>
            <DialogTrigger asChild>
              <Button className="bg-wastewise-green text-white hover:bg-wastewise-dark-green flex items-center gap-2">
                <FileText size={16} /> Generate New Report
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Generate New Report</DialogTitle>
                <DialogDescription>
                  Select the type of report you want to generate.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="report-type">Report Type</Label>
                  <Select 
                    value={newReport.type} 
                    onValueChange={(value) => handleSelectChange('type', value)}
                  >
                    <SelectTrigger id="report-type">
                      <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="donation_summary">Donation Summary</SelectItem>
                      <SelectItem value="form_8283">IRS Form 8283</SelectItem>
                      <SelectItem value="waste_report">Waste Analysis</SelectItem>
                      <SelectItem value="receipt">Donation Receipt</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {newReport.type === 'form_8283' ? (
                  <div className="space-y-2">
                    <Label htmlFor="year">Tax Year</Label>
                    <Input 
                      id="year" 
                      name="year"
                      value={newReport.year}
                      onChange={handleInputChange}
                    />
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Label htmlFor="period">Reporting Period</Label>
                    <Input 
                      id="period" 
                      name="period"
                      value={newReport.period}
                      onChange={handleInputChange}
                    />
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowGenerateDialog(false)}>Cancel</Button>
                <Button 
                  className="bg-wastewise-green text-white hover:bg-wastewise-dark-green"
                  onClick={handleGenerateReport}
                  disabled={loading}
                >
                  {loading ? 'Generating...' : 'Generate Report'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="donations" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="donations">Donation Reports</TabsTrigger>
          <TabsTrigger value="waste">Waste Reports</TabsTrigger>
          <TabsTrigger value="forms">Tax Forms</TabsTrigger>
        </TabsList>

        <TabsContent value="donations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Donation Records</CardTitle>
              <CardDescription>
                Documentation of all food donations for tax deduction purposes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filterDocuments('donation_summary').length > 0 ? (
                  filterDocuments('donation_summary').map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-4 border border-wastewise-light-gray rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="h-6 w-6 text-wastewise-green" />
                        <div>
                          <h3 className="font-medium text-wastewise-dark-gray">{doc.name}</h3>
                          <p className="text-sm text-wastewise-gray">Generated: {doc.createdDate} • Size: {doc.size}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex items-center gap-1"
                          onClick={() => handlePrint(doc.id)}
                          disabled={loading}
                        >
                          <Printer size={14} /> Print
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex items-center gap-1"
                          onClick={() => handleDownload(doc.id)}
                          disabled={loading}
                        >
                          <Download size={14} /> Download PDF
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10 text-wastewise-gray">
                    <FileText className="h-10 w-10 mx-auto mb-3 text-wastewise-gray/50" />
                    <p>No donation reports found</p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => {
                        setNewReport({
                          type: 'donation_summary',
                          period: 'Q4 2023',
                          year: '2023'
                        });
                        setShowGenerateDialog(true);
                      }}
                    >
                      <Plus size={14} className="mr-2" /> Generate Donation Report
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="waste" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Waste Documentation</CardTitle>
              <CardDescription>
                Records of food waste for sustainability reporting
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filterDocuments('waste_report').length > 0 ? (
                  filterDocuments('waste_report').map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-4 border border-wastewise-light-gray rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="h-6 w-6 text-wastewise-green" />
                        <div>
                          <h3 className="font-medium text-wastewise-dark-gray">{doc.name}</h3>
                          <p className="text-sm text-wastewise-gray">Generated: {doc.createdDate} • Size: {doc.size}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex items-center gap-1"
                          onClick={() => handlePrint(doc.id)}
                          disabled={loading}
                        >
                          <Printer size={14} /> Print
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex items-center gap-1"
                          onClick={() => handleDownload(doc.id)}
                          disabled={loading}
                        >
                          <Download size={14} /> Download PDF
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10 text-wastewise-gray">
                    <FileText className="h-10 w-10 mx-auto mb-3 text-wastewise-gray/50" />
                    <p>No waste reports found</p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => {
                        setNewReport({
                          type: 'waste_report',
                          period: 'Q4 2023',
                          year: '2023'
                        });
                        setShowGenerateDialog(true);
                      }}
                    >
                      <Plus size={14} className="mr-2" /> Generate Waste Report
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="forms" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tax Forms</CardTitle>
              <CardDescription>
                Pre-filled tax forms for donation tax deductions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filterDocuments('form_8283').length > 0 ? (
                  filterDocuments('form_8283').map((form) => (
                    <div key={form.id} className="flex items-center justify-between p-4 border border-wastewise-light-gray rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="h-6 w-6 text-wastewise-green" />
                        <div>
                          <h3 className="font-medium text-wastewise-dark-gray">{form.name}</h3>
                          <p className="text-sm text-wastewise-gray">Generated: {form.createdDate} • Size: {form.size}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex items-center gap-1"
                          onClick={() => handlePrint(form.id)}
                          disabled={loading}
                        >
                          <Printer size={14} /> Print
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex items-center gap-1"
                          onClick={() => handleDownload(form.id)}
                          disabled={loading}
                        >
                          <Download size={14} /> Download PDF
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10 text-wastewise-gray">
                    <FileText className="h-10 w-10 mx-auto mb-3 text-wastewise-gray/50" />
                    <p>No tax forms generated yet</p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => {
                        setNewReport({
                          type: 'form_8283',
                          period: '',
                          year: '2023'
                        });
                        setShowGenerateDialog(true);
                      }}
                    >
                      <Plus size={14} className="mr-2" /> Generate IRS Form 8283
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Tax Compliance Dashboard</CardTitle>
          <CardDescription>
            Track your donation tax benefits and compliance status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-wastewise-green/5 p-6 rounded-lg border border-wastewise-green/20">
              <h3 className="text-lg font-medium text-wastewise-dark-green mb-2">Estimated Tax Benefits</h3>
              <div className="text-3xl font-bold text-wastewise-green">$482</div>
              <p className="text-sm text-wastewise-gray mt-2">Based on your current donations</p>
            </div>
            
            <div className="bg-wastewise-light-gray/10 p-6 rounded-lg border border-wastewise-light-gray">
              <h3 className="text-lg font-medium text-wastewise-dark-gray mb-2">Documentation Status</h3>
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                <span className="font-medium">Complete</span>
              </div>
              <p className="text-sm text-wastewise-gray mt-2">All required forms are up to date</p>
            </div>
            
            <div className="bg-wastewise-light-gray/10 p-6 rounded-lg border border-wastewise-light-gray">
              <h3 className="text-lg font-medium text-wastewise-dark-gray mb-2">Next Steps</h3>
              <ul className="text-sm text-wastewise-gray space-y-1 mt-2">
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full border border-wastewise-gray flex items-center justify-center text-xs mr-2 flex-shrink-0">1</div>
                  <span>Generate Q4 donation summary</span>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full border border-wastewise-gray flex items-center justify-center text-xs mr-2 flex-shrink-0">2</div>
                  <span>Complete Form 8283 for annual filing</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaxReports;
