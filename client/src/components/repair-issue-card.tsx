import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { RepairIssue } from "@shared/schema";
import AlmaAnalysis from "./alma-analysis";

const repairIssueSchema = z.object({
  roomNumber: z.number().min(1, "Room number is required"),
  roomName: z.string().min(1, "Room name is required"),
  area: z.string().min(1, "Area/amenity is required"),
  status: z.enum(["urgent", "priority", "non-urgent"]),
  issueDescription: z.string().min(10, "Please provide a detailed description"),
  proposedRemediation: z.string().optional(),
  firstRequestDate: z.string().optional(),
  issueBegan: z.string().optional(),
});

type RepairIssueFormData = z.infer<typeof repairIssueSchema>;

interface RepairIssueCardProps {
  issue: RepairIssue | null;
  isNew?: boolean;
  onCancel?: () => void;
}

const roomOptions = [
  { value: "kitchen", label: "Kitchen" },
  { value: "bathroom", label: "Bathroom" },
  { value: "bedroom", label: "Bedroom" },
  { value: "living-room", label: "Living Room" },
  { value: "hallway", label: "Hallway" },
  { value: "foyer", label: "Foyer" },
  { value: "other", label: "Other" },
];

const areaOptions = [
  { value: "ceiling", label: "Ceiling" },
  { value: "window", label: "Window" },
  { value: "radiator", label: "Radiator" },
  { value: "floor", label: "Floor" },
  { value: "wall", label: "Wall" },
  { value: "appliance", label: "Appliance" },
  { value: "plumbing", label: "Plumbing" },
  { value: "electrical", label: "Electrical" },
  { value: "other", label: "Other" },
];

export default function RepairIssueCard({ issue, isNew = false, onCancel }: RepairIssueCardProps) {
  const [isEditing, setIsEditing] = useState(isNew);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<RepairIssueFormData>({
    resolver: zodResolver(repairIssueSchema),
    defaultValues: {
      roomNumber: issue?.roomNumber || 1,
      roomName: issue?.roomName || "",
      area: issue?.area || "",
      status: issue?.status as "urgent" | "priority" | "non-urgent" || "non-urgent",
      issueDescription: issue?.issueDescription || "",
      proposedRemediation: issue?.proposedRemediation || "",
      firstRequestDate: issue?.firstRequestDate || "",
      issueBegan: issue?.issueBegan || "",
    },
  });

  // Create/Update repair issue mutation
  const saveMutation = useMutation({
    mutationFn: async (data: RepairIssueFormData) => {
      if (issue?.id) {
        // Update existing issue (not implemented in this MVP)
        throw new Error("Update functionality not implemented");
      } else {
        // Create new issue
        const response = await apiRequest("POST", "/api/repair-issues", data);
        return response.json();
      }
    },
    onSuccess: () => {
      toast({
        title: "Repair Issue Saved",
        description: "Your repair issue has been documented successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/repair-issues"] });
      setIsEditing(false);
      if (onCancel) onCancel();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Delete repair issue mutation
  const deleteMutation = useMutation({
    mutationFn: async () => {
      if (!issue?.id) throw new Error("No issue ID");
      await apiRequest("DELETE", `/api/repair-issues/${issue.id}`);
    },
    onSuccess: () => {
      toast({
        title: "Repair Issue Deleted",
        description: "The repair issue has been removed.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/repair-issues"] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: RepairIssueFormData) => {
    saveMutation.mutate(data);
  };

  const handleCancel = () => {
    if (isNew && onCancel) {
      onCancel();
    } else {
      setIsEditing(false);
      form.reset();
    }
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this repair issue?")) {
      deleteMutation.mutate();
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "urgent":
        return "border-status-urgent";
      case "priority":
        return "border-status-priority";
      case "non-urgent":
        return "border-status-non-urgent";
      default:
        return "border-gray-200";
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "urgent":
        return "status-urgent";
      case "priority":
        return "status-priority";
      case "non-urgent":
        return "status-non-urgent";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <Card className={`border-l-4 ${issue ? getStatusColor(issue.status) : "border-gray-200"}`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            {issue && (
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeClass(issue.status)}`}>
                {issue.status.toUpperCase()}
              </div>
            )}
            <h4 className="text-lg font-semibold text-gray-900">
              {issue ? `${issue.roomName} - ${issue.area}` : "New Repair Issue"}
            </h4>
          </div>
          <div className="flex items-center space-x-2">
            {!isNew && !isEditing && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                  className="text-gray-400 hover:text-primary"
                >
                  <i className="fas fa-edit"></i>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDelete}
                  className="text-gray-400 hover:text-red-600"
                  disabled={deleteMutation.isPending}
                >
                  <i className="fas fa-trash"></i>
                </Button>
              </>
            )}
          </div>
        </div>

        {isEditing ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="roomNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Room #</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min={1}
                              {...field}
                              onChange={(e) => field.onChange(parseInt(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="roomName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Room Name</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select room" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {roomOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="area"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Area/Amenity</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select area" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {areaOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="flex space-x-4"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="urgent" id="urgent" />
                              <Label htmlFor="urgent">Urgent</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="priority" id="priority" />
                              <Label htmlFor="priority">Priority</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="non-urgent" id="non-urgent" />
                              <Label htmlFor="non-urgent">Non-Urgent</Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="firstRequestDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Request Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="issueDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Issue Description</FormLabel>
                        <FormControl>
                          <Textarea
                            rows={4}
                            placeholder="Describe the repair issue in detail..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="proposedRemediation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Proposed Remediation</FormLabel>
                        <FormControl>
                          <Textarea
                            rows={3}
                            placeholder="Suggest how this should be fixed..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-primary hover:bg-blue-700"
                  disabled={saveMutation.isPending}
                >
                  <i className="fas fa-save mr-2"></i>
                  {saveMutation.isPending ? "Saving..." : "Save Issue"}
                </Button>
              </div>
            </form>
          </Form>
        ) : (
          issue && (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-4">
                <div className="space-y-2">
                  <p><strong>Room:</strong> #{issue.roomNumber} - {issue.roomName}</p>
                  <p><strong>Area:</strong> {issue.area}</p>
                  <p><strong>First Request:</strong> {issue.firstRequestDate || "Not specified"}</p>
                </div>
                <div className="space-y-2">
                  <div>
                    <strong>Issue Description:</strong>
                    <p className="text-gray-700 mt-1">{issue.issueDescription}</p>
                  </div>
                  {issue.proposedRemediation && (
                    <div>
                      <strong>Proposed Remediation:</strong>
                      <p className="text-gray-700 mt-1">{issue.proposedRemediation}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* AI Analysis */}
              {(issue.hpdViolationClass || issue.aiAnalysis) && (
                <AlmaAnalysis
                  violationClass={issue.hpdViolationClass}
                  deadline={issue.correctionDeadline}
                  analysis={issue.aiAnalysis}
                />
              )}
            </>
          )
        )}
      </CardContent>
    </Card>
  );
}
