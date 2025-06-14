
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import {
  Card,
  Elevation,
  Button,
  Intent,
  H1,
  H3,
  Text,
  Classes,
} from "@blueprintjs/core";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const stakeholderRegistrationSchema = z.object({
  organization: z.string().min(1, "Organization is required"),
  position: z.string().min(1, "Position is required"),
  phone: z.string().min(1, "Phone is required"),
  stakeholderType: z.enum(["organizer", "official", "liaison", "media"]),
  jurisdiction: z.string().min(1, "Jurisdiction/Coverage area is required"),
  licenseNumber: z.string().optional(),
});

type StakeholderRegistrationData = z.infer<typeof stakeholderRegistrationSchema>;

export default function StakeholderRegistration() {
  const { toast } = useToast();
  
  const form = useForm<StakeholderRegistrationData>({
    resolver: zodResolver(stakeholderRegistrationSchema),
    defaultValues: {
      organization: "",
      position: "",
      phone: "",
      stakeholderType: "organizer",
      jurisdiction: "",
      licenseNumber: "",
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (data: StakeholderRegistrationData) => {
      const response = await apiRequest("POST", "/api/register/stakeholder", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Registration Complete",
        description: "Your stakeholder account has been created successfully.",
      });
      window.location.href = "/api/login?redirect=/stakeholder";
    },
    onError: (error) => {
      toast({
        title: "Registration Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: StakeholderRegistrationData) => {
    registerMutation.mutate(data);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 50%, #dee2e6 100%)",
      }}
    >
      <Card
        elevation={Elevation.FOUR}
        style={{
          maxWidth: "800px",
          padding: "40px",
          textAlign: "center",
        }}
      >
        <div style={{ marginBottom: "30px" }}>
          <img 
            src="/BlocNiti-LogoNB_1749709973044.png" 
            alt="BlocNiti AI Logo" 
            style={{ 
              width: "300px", 
              height: "auto", 
              marginBottom: "10px",
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
              clipPath: "inset(15% 10% 15% 10%)",
              transform: "scale(1.3)"
            }} 
          />
          <H1 style={{ color: "#215db0", marginBottom: "20px" }}>
            Stakeholder Registration
          </H1>
          <Text style={{ color: "#6c757d" }}>
            Register as a stakeholder to access analytics and coordinate housing advocacy
          </Text>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" style={{ textAlign: "left" }}>
            {/* Professional Information */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-gray-900">Professional Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="organization"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Organization *</FormLabel>
                      <FormControl>
                        <Input placeholder="Community Housing Coalition" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Position/Title *</FormLabel>
                      <FormControl>
                        <Input placeholder="Community Organizer" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone *</FormLabel>
                    <FormControl>
                      <Input placeholder="(555) 123-4567" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Stakeholder Type */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-gray-900">Stakeholder Type</h4>
              <FormField
                control={form.control}
                name="stakeholderType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select your role *</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="grid grid-cols-2 gap-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="organizer" id="type-organizer" />
                          <Label htmlFor="type-organizer" className="text-sm">
                            <div>
                              <div className="font-medium">Community Organizer</div>
                              <div className="text-gray-500">Grassroots advocacy and tenant organizing</div>
                            </div>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="official" id="type-official" />
                          <Label htmlFor="type-official" className="text-sm">
                            <div>
                              <div className="font-medium">Elected Official</div>
                              <div className="text-gray-500">Policy maker and public representative</div>
                            </div>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="liaison" id="type-liaison" />
                          <Label htmlFor="type-liaison" className="text-sm">
                            <div>
                              <div className="font-medium">Agency Liaison</div>
                              <div className="text-gray-500">Inter-agency coordination and services</div>
                            </div>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="media" id="type-media" />
                          <Label htmlFor="type-media" className="text-sm">
                            <div>
                              <div className="font-medium">Media/Journalist</div>
                              <div className="text-gray-500">Public interest reporting</div>
                            </div>
                          </Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Coverage Area */}
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="jurisdiction"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jurisdiction/Coverage Area *</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Bronx District 12, Manhattan Community Board 3" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="licenseNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>License/ID Number (if applicable)</FormLabel>
                    <FormControl>
                      <Input placeholder="Professional license or ID number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-between">
              <Button 
                intent={Intent.NONE}
                onClick={() => window.location.href = "/"}
              >
                Back to Landing
              </Button>
              <Button 
                type="submit" 
                intent={Intent.PRIMARY}
                disabled={registerMutation.isPending}
              >
                {registerMutation.isPending ? "Registering..." : "Complete Registration"}
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
}
