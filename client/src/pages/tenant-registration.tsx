
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

const tenantRegistrationSchema = z.object({
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  phone: z.string().min(1, "Phone is required"),
  address: z.string().min(1, "Address is required"),
  unit: z.string().min(1, "Unit number is required"),
  knowsOrganizer: z.boolean(),
  threatened: z.boolean(),
  evictionCase: z.boolean(),
});

type TenantRegistrationData = z.infer<typeof tenantRegistrationSchema>;

export default function TenantRegistration() {
  const { toast } = useToast();
  
  const form = useForm<TenantRegistrationData>({
    resolver: zodResolver(tenantRegistrationSchema),
    defaultValues: {
      dateOfBirth: "",
      phone: "",
      address: "",
      unit: "",
      knowsOrganizer: false,
      threatened: false,
      evictionCase: false,
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (data: TenantRegistrationData) => {
      const response = await apiRequest("POST", "/api/register/tenant", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Registration Complete",
        description: "Your tenant account has been created successfully.",
      });
      window.location.href = "/api/login";
    },
    onError: (error) => {
      toast({
        title: "Registration Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: TenantRegistrationData) => {
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
            src="./BlocNiti-LogoNB_1749709973044.png" 
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
            Tenant Registration
          </H1>
          <Text style={{ color: "#6c757d" }}>
            Register as a tenant to document housing issues and access legal resources
          </Text>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" style={{ textAlign: "left" }}>
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth *</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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

            {/* Address Information */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-gray-900">Address Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Street Address *</FormLabel>
                        <FormControl>
                          <Input placeholder="123 Main Street" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name="unit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Unit Number *</FormLabel>
                        <FormControl>
                          <Input placeholder="Apt 1A" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            {/* Legal Context Questions */}
            <div className="space-y-6 bg-gray-50 p-6 rounded-lg">
              <h4 className="text-lg font-medium text-gray-900">Legal Context Assessment</h4>
              
              <FormField
                control={form.control}
                name="knowsOrganizer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700 mb-3">
                      Do you know your tenant organizer, building captain, or block association?
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={(value) => field.onChange(value === "true")}
                        value={field.value ? "true" : "false"}
                        className="flex space-x-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="true" id="organizer-yes" />
                          <Label htmlFor="organizer-yes">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="false" id="organizer-no" />
                          <Label htmlFor="organizer-no">No</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="threatened"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700 mb-3">
                      Have you been threatened by your landlord?
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={(value) => field.onChange(value === "true")}
                        value={field.value ? "true" : "false"}
                        className="flex space-x-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="true" id="threatened-yes" />
                          <Label htmlFor="threatened-yes">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="false" id="threatened-no" />
                          <Label htmlFor="threatened-no">No</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="evictionCase"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700 mb-3">
                      Do you have an open eviction case?
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={(value) => field.onChange(value === "true")}
                        value={field.value ? "true" : "false"}
                        className="flex space-x-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="true" id="eviction-yes" />
                          <Label htmlFor="eviction-yes">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="false" id="eviction-no" />
                          <Label htmlFor="eviction-no">No</Label>
                        </div>
                      </RadioGroup>
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
