
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { FileText, Download, Calendar, Printer } from 'lucide-react';

const TaxReports: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-wastewise-dark-gray">Tax Reports</h2>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Calendar size={16} /> Select Period
          </Button>
          <Button className="bg-wastewise-green text-white hover:bg-wastewise-dark-green flex items-center gap-2">
            <FileText size={16} /> Generate New Report
          </Button>
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
                {[
                  { id: '1', name: 'Q3 2023 Donation Summary', date: '2023-10-01', format: 'PDF' },
                  { id: '2', name: 'Q2 2023 Donation Summary', date: '2023-07-01', format: 'PDF' },
                  { id: '3', name: 'Q1 2023 Donation Summary', date: '2023-04-01', format: 'PDF' },
                ].map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-4 border border-wastewise-light-gray rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="h-6 w-6 text-wastewise-green" />
                      <div>
                        <h3 className="font-medium text-wastewise-dark-gray">{report.name}</h3>
                        <p className="text-sm text-wastewise-gray">Generated: {report.date}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <Printer size={14} /> Print
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <Download size={14} /> Download {report.format}
                      </Button>
                    </div>
                  </div>
                ))}
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
                {[
                  { id: '1', name: 'Q3 2023 Waste Analysis', date: '2023-10-01', format: 'PDF' },
                  { id: '2', name: 'Q2 2023 Waste Analysis', date: '2023-07-01', format: 'PDF' },
                  { id: '3', name: 'Q1 2023 Waste Analysis', date: '2023-04-01', format: 'PDF' },
                ].map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-4 border border-wastewise-light-gray rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="h-6 w-6 text-wastewise-green" />
                      <div>
                        <h3 className="font-medium text-wastewise-dark-gray">{report.name}</h3>
                        <p className="text-sm text-wastewise-gray">Generated: {report.date}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <Printer size={14} /> Print
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <Download size={14} /> Download {report.format}
                      </Button>
                    </div>
                  </div>
                ))}
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
                {[
                  { id: '1', name: 'IRS Form 8283 (2023)', date: '2023-10-05', format: 'PDF' },
                  { id: '2', name: 'State Tax Credit Form (2023)', date: '2023-10-05', format: 'PDF' },
                  { id: '3', name: 'Donation Receipt Templates', date: '2023-01-10', format: 'DOCX' },
                ].map((form) => (
                  <div key={form.id} className="flex items-center justify-between p-4 border border-wastewise-light-gray rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="h-6 w-6 text-wastewise-green" />
                      <div>
                        <h3 className="font-medium text-wastewise-dark-gray">{form.name}</h3>
                        <p className="text-sm text-wastewise-gray">Last updated: {form.date}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <Printer size={14} /> Print
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <Download size={14} /> Download {form.format}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TaxReports;
