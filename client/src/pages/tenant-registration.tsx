
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
  firstName: z.string().min(1, "First name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last name is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  phone: z.string().min(1, "Phone is required"),
  housenumber: z.string().min(1, "Building number is required"),
  streetname: z.string().min(1, "Street name is required"),
  unit: z.string().min(1, "Unit number is required"),
  zip: z.string().min(5, "ZIP code is required").max(10, "Invalid ZIP code"),
  housingType: z.enum(["rent_stabilized", "rent_controlled", "nycha", "private"]),
  knowsOrganizer: z.boolean(),
  organizerName: z.string().optional(),
  organizerPhone: z.string().optional(),
  organizerEmail: z.string().optional(),
  organizerCompany: z.string().optional(),
  threatened: z.boolean(),
  evictionCase: z.boolean(),
  hasHpProceeding: z.boolean(),
  registeredWithNonProfit: z.boolean(),
  nonProfitName: z.string().optional(),
  nonProfitPhone: z.string().optional(),
  nonProfitEmail: z.string().optional(),
  receivedCitySupport: z.boolean(),
  cityAgencyName: z.string().optional(),
  cityAgencyPhone: z.string().optional(),
  cityAgencyEmail: z.string().optional(),
  receivedElectedSupport: z.boolean(),
  electedOfficialName: z.string().optional(),
  electedOfficialPhone: z.string().optional(),
  electedOfficialEmail: z.string().optional(),
  atRiskHomelessness: z.boolean(),
});

type TenantRegistrationData = z.infer<typeof tenantRegistrationSchema>;

export default function TenantRegistration() {
  const { toast } = useToast();
  
  const form = useForm<TenantRegistrationData>({
    resolver: zodResolver(tenantRegistrationSchema),
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      dateOfBirth: "",
      phone: "",
      housenumber: "",
      streetname: "",
      unit: "",
      zip: "",
      housingType: "private",
      knowsOrganizer: false,
      organizerName: "",
      organizerPhone: "",
      organizerEmail: "",
      organizerCompany: "",
      threatened: false,
      evictionCase: false,
      hasHpProceeding: false,
      registeredWithNonProfit: false,
      nonProfitName: "",
      nonProfitPhone: "",
      nonProfitEmail: "",
      receivedCitySupport: false,
      cityAgencyName: "",
      cityAgencyPhone: "",
      cityAgencyEmail: "",
      receivedElectedSupport: false,
      electedOfficialName: "",
      electedOfficialPhone: "",
      electedOfficialEmail: "",
      atRiskHomelessness: false,
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
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-gray-900">Personal Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="First Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="middleName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Middle Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Middle Name (Optional)" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Last Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
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

              {/* Housing Type moved here - right after address */}
              <FormField
                control={form.control}
                name="housingType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700 mb-3">
                      What is your housing type? *
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

              {/* Conditional fields for organizer contact info */}
              {form.watch("knowsOrganizer") && (
                <div className="ml-6 space-y-4 border-l-2 border-blue-200 pl-4">
                  <h5 className="text-sm font-medium text-gray-700">Organizer Contact Information</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="organizerName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Organizer name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="organizerCompany"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company/Organization</FormLabel>
                          <FormControl>
                            <Input placeholder="Organization name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="organizerPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input placeholder="(555) 123-4567" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="organizerEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="organizer@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              )}

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
                name="hasHpProceeding"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700 mb-3">
                      Do you have an active HP Proceeding in Housing Court to get your landlord to do repairs?
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={(value) => field.onChange(value === "true")}
                        value={field.value ? "true" : "false"}
                        className="flex space-x-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="true" id="hp-proceeding-yes" />
                          <Label htmlFor="hp-proceeding-yes">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="false" id="hp-proceeding-no" />
                          <Label htmlFor="hp-proceeding-no">No</Label>
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

              {/* Conditional fields for non-profit contact info */}
              {form.watch("registeredWithNonProfit") && (
                <div className="ml-6 space-y-4 border-l-2 border-green-200 pl-4">
                  <h5 className="text-sm font-medium text-gray-700">Non-Profit Contact Information</h5>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="nonProfitName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Organization Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Legal Aid Society" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="nonProfitPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input placeholder="(555) 123-4567" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="nonProfitEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="contact@nonprofit.org" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              )}

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
                          <RadioGroupItem value="true" id="city-support-yes" />
                          <Label htmlFor="city-support-yes">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="false" id="city-support-no" />
                          <Label htmlFor="city-support-no">No</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Conditional fields for city agency contact info */}
              {form.watch("receivedCitySupport") && (
                <div className="ml-6 space-y-4 border-l-2 border-orange-200 pl-4">
                  <h5 className="text-sm font-medium text-gray-700">City Agency Contact Information</h5>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="cityAgencyName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Agency Name</FormLabel>
                          <FormControl>
                            <Input placeholder="HPD, NYCHA, etc." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="cityAgencyPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input placeholder="(555) 123-4567" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="cityAgencyEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="contact@agency.nyc.gov" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              )}

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
                          <RadioGroupItem value="true" id="elected-support-yes" />
                          <Label htmlFor="elected-support-yes">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="false" id="elected-support-no" />
                          <Label htmlFor="elected-support-no">No</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Conditional fields for elected official contact info */}
              {form.watch("receivedElectedSupport") && (
                <div className="ml-6 space-y-4 border-l-2 border-red-200 pl-4">
                  <h5 className="text-sm font-medium text-gray-700">Elected Official Contact Information</h5>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="electedOfficialName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Official Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Council Member, Senator, etc." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="electedOfficialPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input placeholder="(555) 123-4567" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="electedOfficialEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="office@official.gov" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              )}

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
                          <RadioGroupItem value="true" id="homelessness-yes" />
                          <Label htmlFor="homelessness-yes">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="false" id="homelessness-no" />
                          <Label htmlFor="homelessness-no">No</Label>
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
