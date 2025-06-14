
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
  housenumber: z.string().min(1, "Building number is required"),
  streetname: z.string().min(1, "Street name is required"),
  unit: z.string().min(1, "Unit number is required"),
  zip: z.string().min(5, "ZIP code is required").max(10, "Invalid ZIP code"),
  knowsOrganizer: z.boolean(),
  threatened: z.boolean(),
  evictionCase: z.boolean(),
  hasTenantLeader: z.boolean(),
  registeredWithNonProfit: z.boolean(),
  receivedCitySupport: z.boolean(),
  receivedElectedSupport: z.boolean(),
  atRiskHomelessness: z.boolean(),
  housingType: z.enum(["rent_stabilized", "rent_controlled", "nycha", "private"]),
});

type TenantRegistrationData = z.infer<typeof tenantRegistrationSchema>;

export default function TenantRegistration() {
  const { toast } = useToast();
  
  const form = useForm<TenantRegistrationData>({
    resolver: zodResolver(tenantRegistrationSchema),
    defaultValues: {
      dateOfBirth: "",
      phone: "",
      housenumber: "",
      streetname: "",
      unit: "",
      zip: "",
      knowsOrganizer: false,
      threatened: false,
      evictionCase: false,
      hasTenantLeader: false,
      registeredWithNonProfit: false,
      receivedCitySupport: false,
      receivedElectedSupport: false,
      atRiskHomelessness: false,
      housingType: "private",
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
              <p className="text-sm text-gray-600">
                Please enter your address details to match with NYC Housing database
              </p>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <FormField
                    control={form.control}
                    name="housenumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Building # *</FormLabel>
                        <FormControl>
                          <Input placeholder="123" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="md:col-span-2">
                  <FormField
                    control={form.control}
                    name="streetname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Street Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Main Street" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name="zip"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ZIP Code *</FormLabel>
                        <FormControl>
                          <Input placeholder="10001" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

              <FormField
                control={form.control}
                name="hasTenantLeader"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700 mb-3">
                      Does your building have a tenant leader, building captain or organizer?
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={(value) => field.onChange(value === "true")}
                        value={field.value ? "true" : "false"}
                        className="flex space-x-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="true" id="leader-yes" />
                          <Label htmlFor="leader-yes">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="false" id="leader-no" />
                          <Label htmlFor="leader-no">No</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="registeredWithNonProfit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700 mb-3">
                      Is your building registered with a non-profit/legal aid?
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={(value) => field.onChange(value === "true")}
                        value={field.value ? "true" : "false"}
                        className="flex space-x-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="true" id="nonprofit-yes" />
                          <Label htmlFor="nonprofit-yes">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="false" id="nonprofit-no" />
                          <Label htmlFor="nonprofit-no">No</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="receivedCitySupport"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700 mb-3">
                      Has your building received support from any city agency?
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={(value) => field.onChange(value === "true")}
                        value={field.value ? "true" : "false"}
                        className="flex space-x-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="true" id="city-yes" />
                          <Label htmlFor="city-yes">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="false" id="city-no" />
                          <Label htmlFor="city-no">No</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="receivedElectedSupport"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700 mb-3">
                      Has your building received support from any elected official?
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={(value) => field.onChange(value === "true")}
                        value={field.value ? "true" : "false"}
                        className="flex space-x-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="true" id="elected-yes" />
                          <Label htmlFor="elected-yes">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="false" id="elected-no" />
                          <Label htmlFor="elected-no">No</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="atRiskHomelessness"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700 mb-3">
                      Are you at risk for homelessness?
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={(value) => field.onChange(value === "true")}
                        value={field.value ? "true" : "false"}
                        className="flex space-x-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="true" id="homeless-yes" />
                          <Label htmlFor="homeless-yes">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="false" id="homeless-no" />
                          <Label htmlFor="homeless-no">No</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="housingType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700 mb-3">
                      What is your housing type?
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="flex flex-col space-y-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="rent_stabilized" id="rent-stabilized" />
                          <Label htmlFor="rent-stabilized">Rent Stabilized</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="rent_controlled" id="rent-controlled" />
                          <Label htmlFor="rent-controlled">Rent Controlled</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="nycha" id="nycha" />
                          <Label htmlFor="nycha">NYCHA (Public Housing)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="private" id="private" />
                          <Label htmlFor="private">Private Housing</Label>
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
