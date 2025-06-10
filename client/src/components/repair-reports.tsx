import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import RepairIssueCard from "./repair-issue-card";
import VoiceRecorder from "./voice-recorder";
import { RepairIssue } from "@shared/schema";
import { generateRepairPDF } from "@/lib/pdfGenerator";

export default function RepairReports() {
  const [showVoiceRecorder, setShowVoiceRecorder] = useState(false);
  const [showNewIssueForm, setShowNewIssueForm] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch repair issues
  const { data: repairIssues = [], isLoading } = useQuery({
    queryKey: ["/api/repair-issues"],
  });

  // Generate PDF mutation
  const generatePDFMutation = useMutation({
    mutationFn: async () => {
      if (repairIssues.length === 0) {
        throw new Error("No repair issues to generate PDF");
      }
      return generateRepairPDF(repairIssues);
    },
    onSuccess: () => {
      toast({
        title: "PDF Generated",
        description: "Your repair report has been downloaded.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleAddNewIssue = () => {
    setShowNewIssueForm(true);
  };

  const handleVoiceRecord = () => {
    setShowVoiceRecorder(true);
  };

  const handleGeneratePDF = () => {
    generatePDFMutation.mutate();
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="h-20 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Repair Report Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                Repair Report Documentation
              </h3>
              <p className="text-gray-600">
                Document repair issues room by room. Alma will help categorize violations and deadlines.
              </p>
            </div>
            <div className="flex space-x-2">
              <Button
                onClick={handleVoiceRecord}
                variant="outline"
                className="hover:bg-primary/10"
              >
                <i className="fas fa-microphone mr-2"></i>
                Voice Input
              </Button>
              <Button
                onClick={handleAddNewIssue}
                className="bg-secondary hover:bg-green-700"
              >
                <i className="fas fa-plus mr-2"></i>
                Add Issue
              </Button>
              <Button
                onClick={handleGeneratePDF}
                className="bg-primary hover:bg-blue-700"
                disabled={repairIssues.length === 0 || generatePDFMutation.isPending}
              >
                <i className="fas fa-download mr-2"></i>
                {generatePDFMutation.isPending ? "Generating..." : "Generate PDF"}
              </Button>
            </div>
          </div>

          {/* Status Legend */}
          <div className="flex flex-wrap gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-600 rounded-full"></div>
              <span className="text-sm font-medium">Urgent (24-72 hours)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: "hsl(25, 85%, 53%)" }}></div>
              <span className="text-sm font-medium">Priority (30 days)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: "hsl(215, 13%, 42%)" }}></div>
              <span className="text-sm font-medium">Non-Urgent (90 days)</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Voice Recorder Interface */}
      {showVoiceRecorder && (
        <VoiceRecorder onClose={() => setShowVoiceRecorder(false)} />
      )}

      {/* Repair Issues List */}
      <div className="space-y-4">
        {repairIssues.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <div className="alma-bg w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-tools text-primary text-2xl"></i>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">No Repair Issues Yet</h4>
              <p className="text-gray-600 mb-4">
                Start documenting your housing issues to build a comprehensive repair report.
              </p>
              <Button onClick={handleAddNewIssue} className="bg-primary hover:bg-blue-700">
                <i className="fas fa-plus mr-2"></i>
                Add Your First Issue
              </Button>
            </CardContent>
          </Card>
        ) : (
          repairIssues.map((issue: RepairIssue) => (
            <RepairIssueCard 
              key={issue.id} 
              issue={issue}
              isNew={showNewIssueForm && !issue.id}
              onCancel={() => setShowNewIssueForm(false)}
            />
          ))
        )}

        {/* New Issue Form */}
        {showNewIssueForm && (
          <RepairIssueCard 
            issue={null}
            isNew={true}
            onCancel={() => setShowNewIssueForm(false)}
          />
        )}
      </div>
    </div>
  );
}
