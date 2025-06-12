import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import React, { useState } from 'react';
import { Card, H2, H4, Button, TextArea, FormGroup, InputGroup, HTMLSelect, Intent } from '@blueprintjs/core';

interface HarassmentReport {
  id: string;
  date: string;
  type: string;
  description: string;
  status: 'pending' | 'investigating' | 'resolved';
}

export default function HarassmentReporting() {
  const [reports, setReports] = useState<HarassmentReport[]>([
    {
      id: '1',
      date: '2024-12-10',
      type: 'Verbal Harassment',
      description: 'Landlord threatened eviction for requesting repairs',
      status: 'investigating'
    }
  ]);
  const [showNewReportForm, setShowNewReportForm] = useState(false);
  const [newReport, setNewReport] = useState({
    type: '',
    description: '',
    date: new Date().toISOString().split('T')[0]
  });

  const handleSubmitReport = () => {
    const report: HarassmentReport = {
      id: Date.now().toString(),
      ...newReport,
      status: 'pending'
    };
    setReports([...reports, report]);
    setNewReport({ type: '', description: '', date: new Date().toISOString().split('T')[0] });
    setShowNewReportForm(false);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-main">
        <div className="dashboard-header">
          <div>
            <h1 className="dashboard-title">Harassment Reporting</h1>
            <p className="dashboard-subtitle">Document and track harassment incidents</p>
          </div>
          <Button
            intent="primary"
            icon="plus"
            onClick={() => setShowNewReportForm(true)}
          >
            Report Incident
          </Button>
        </div>

        {/* Emergency Contacts */}
        <Card style={{ marginBottom: '1.5rem', padding: '1.5rem', background: 'linear-gradient(135deg, var(--danger) 0%, #a31358 100%)', color: 'white' }}>
          <H4 style={{ color: 'white', marginBottom: '1rem' }}>Emergency Contacts</H4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div>
              <strong>911</strong> - Emergency Services
            </div>
            <div>
              <strong>311</strong> - City Services
            </div>
            <div>
              <strong>(212) 577-3300</strong> - Legal Aid Society
            </div>
          </div>
        </Card>

        {/* New Report Form */}
        {showNewReportForm && (
          <Card style={{ marginBottom: '1.5rem', padding: '1.5rem' }}>
            <H4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Report New Incident</H4>
            <FormGroup label="Type of Harassment" labelInfo="(required)">
              <HTMLSelect
                value={newReport.type}
                onChange={(e) => setNewReport({ ...newReport, type: e.target.value })}
                options={[
                  { label: 'Select type...', value: '' },
                  { label: 'Verbal Harassment', value: 'Verbal Harassment' },
                  { label: 'Threats', value: 'Threats' },
                  { label: 'Discrimination', value: 'Discrimination' },
                  { label: 'Retaliation', value: 'Retaliation' },
                  { label: 'Other', value: 'Other' }
                ]}
              />
            </FormGroup>
            <FormGroup label="Date of Incident">
              <InputGroup
                type="date"
                value={newReport.date}
                onChange={(e) => setNewReport({ ...newReport, date: e.target.value })}
              />
            </FormGroup>
            <FormGroup label="Description" labelInfo="(required)">
              <TextArea
                value={newReport.description}
                onChange={(e) => setNewReport({ ...newReport, description: e.target.value })}
                rows={4}
                placeholder="Describe the incident in detail..."
              />
            </FormGroup>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <Button
                intent="primary"
                onClick={handleSubmitReport}
                disabled={!newReport.type || !newReport.description}
              >
                Submit Report
              </Button>
              <Button onClick={() => setShowNewReportForm(false)}>
                Cancel
              </Button>
            </div>
          </Card>
        )}

        {/* Reports List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {reports.map((report) => (
            <Card key={report.id} style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                  <H4 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{report.type}</H4>
                  <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Reported on {report.date}</p>
                </div>
                <Button
                  intent={
                    report.status === 'resolved' ? 'success' :
                    report.status === 'investigating' ? 'warning' : 'primary'
                  }
                  small
                >
                  {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                </Button>
              </div>
              <p style={{ color: 'var(--text-primary)', lineHeight: '1.6' }}>{report.description}</p>
            </Card>
          ))}
        </div>

        {reports.length === 0 && !showNewReportForm && (
          <Card style={{ padding: '3rem', textAlign: 'center' }}>
            <H4 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>No Reports Yet</H4>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              If you experience harassment, document it here for your records and legal protection.
            </p>
            <Button intent="primary" onClick={() => setShowNewReportForm(true)}>
              Report First Incident
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const harassmentSchema = z.object({
  harassmentTypes: z.array(z.string()).min(1, "Please select at least one type of harassment"),
  additionalDetails: z.string().min(10, "Please provide detailed information about the harassment"),
});

type HarassmentFormData = z.infer<typeof harassmentSchema>;

const harassmentTypes = [
  {
    id: "threats",
    label: "Threats or Intimidation",
    description: "Verbal or written threats, aggressive behavior, intimidating language",
  },
  {
    id: "services",
    label: "Denial of Services",
    description: "Refusing to make repairs, cutting off utilities, denying access",
  },
  {
    id: "retaliation",
    label: "Legal Retaliation",
    description: "Retaliation for complaints, rent increases after complaints",
  },
  {
    id: "frivolous",
    label: "Frivolous Court Filings",
    description: "Baseless eviction proceedings, unnecessary legal actions",
  },
  {
    id: "privacy",
    label: "Privacy Violations",
    description: "Entering apartment without notice, excessive inspections",
  },
  {
    id: "discrimination",
    label: "Discrimination",
    description: "Based on race, religion, family status, or other protected characteristics",
  },
];

export default function HarassmentReporting() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<HarassmentFormData>({
    resolver: zodResolver(harassmentSchema),
    defaultValues: {
      harassmentTypes: [],
      additionalDetails: "",
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (data: HarassmentFormData) => {
      const response = await apiRequest("POST", "/api/harassment-reports", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Report Submitted",
        description: "Your harassment report has been documented. Consider contacting legal aid for assistance.",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/harassment-reports"] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: HarassmentFormData) => {
    submitMutation.mutate(data);
  };

  const saveDraftMutation = useMutation({
    mutationFn: async (data: HarassmentFormData) => {
      // For now, just save to local storage
      localStorage.setItem("harassment-draft", JSON.stringify(data));
    },
    onSuccess: () => {
      toast({
        title: "Draft Saved",
        description: "Your report has been saved locally.",
      });
    },
  });

  const handleSaveDraft = () => {
    const values = form.getValues();
    saveDraftMutation.mutate(values);
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Harassment & Eviction Reporting
          </h3>
          <p className="text-gray-600">
            Document any harassment or intimidation tactics to help surface abuse trends and protect your rights.
          </p>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
            <div className="flex items-start space-x-3">
              <i className="fas fa-exclamation-triangle text-yellow-600 mt-1"></i>
              <div>
                <h4 className="font-semibold text-yellow-800">Important Notice</h4>
                <p className="text-sm text-yellow-700">
                  This information helps track patterns of harassment. If you're in immediate danger, 
                  contact 911. For legal assistance, contact tenant organizations or Legal Aid.
                </p>
              </div>
            </div>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="harassmentTypes"
              render={() => (
                <FormItem>
                  <FormLabel className="text-lg font-medium text-gray-900 mb-4">
                    Types of Harassment Experienced
                  </FormLabel>
                  <div className="space-y-3">
                    {harassmentTypes.map((type) => (
                      <FormField
                        key={type.id}
                        control={form.control}
                        name="harassmentTypes"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(type.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, type.id])
                                      : field.onChange(
                                          field.value?.filter((value) => value !== type.id)
                                        );
                                  }}
                                />
                              </FormControl>
                              <div className="flex-1">
                                <FormLabel className="font-medium text-gray-900 cursor-pointer">
                                  {type.label}
                                </FormLabel>
                                <p className="text-sm text-gray-600">{type.description}</p>
                              </div>
                            </div>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="additionalDetails"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Details</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={6}
                      placeholder="Please provide specific details about the harassment you've experienced, including dates, times, witnesses, and any documentation you may have..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h5 className="font-semibold text-blue-900 mb-2">Resources for Immediate Help</h5>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <i className="fas fa-phone text-blue-600"></i>
                  <span><strong>Tenant Harassment Hotline:</strong> 311</span>
                </div>
                <div className="flex items-center space-x-2">
                  <i className="fas fa-gavel text-blue-600"></i>
                  <span><strong>Legal Aid Society:</strong> (212) 577-3300</span>
                </div>
                <div className="flex items-center space-x-2">
                  <i className="fas fa-shield-alt text-blue-600"></i>
                  <span><strong>Emergency:</strong> 911</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Button 
                type="button" 
                variant="outline"
                onClick={handleSaveDraft}
                disabled={saveDraftMutation.isPending}
              >
                {saveDraftMutation.isPending ? "Saving..." : "Save as Draft"}
              </Button>
              <Button 
                type="submit" 
                className="bg-primary hover:bg-blue-700"
                disabled={submitMutation.isPending}
              >
                <i className="fas fa-paper-plane mr-2"></i>
                {submitMutation.isPending ? "Submitting..." : "Submit Report"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
