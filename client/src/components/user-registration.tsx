import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useAuth } from "@/hooks/useAuth";

const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last name is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  phone: z.string().min(1, "Phone is required"),
  address: z.string().min(1, "Address is required"),
  unit: z.string().min(1, "Unit number is required"),
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

type ProfileFormData = z.infer<typeof profileSchema>;

export default function UserRegistration() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isEditMode, setIsEditMode] = useState(false);

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user?.firstName || "",
      middleName: user?.middleName || "",
      lastName: user?.lastName || "",
      dateOfBirth: user?.dateOfBirth || "",
      phone: user?.phone || "",
      address: user?.address || "",
      unit: user?.unit || "",
      housingType: user?.housingType as any || "rent_stabilized",
      knowsOrganizer: user?.knowsOrganizer ?? false,
      organizerName: user?.organizerName || "",
      organizerPhone: user?.organizerPhone || "",
      organizerEmail: user?.organizerEmail || "",
      organizerCompany: user?.organizerCompany || "",
      threatened: user?.threatened ?? false,
      evictionCase: user?.evictionCase ?? false,
      hasHpProceeding: user?.hasHpProceeding ?? false,
      registeredWithNonProfit: user?.registeredWithNonProfit ?? false,
      nonProfitName: user?.nonProfitName || "",
      nonProfitPhone: user?.nonProfitPhone || "",
      nonProfitEmail: user?.nonProfitEmail || "",
      receivedCitySupport: user?.receivedCitySupport ?? false,
      cityAgencyName: user?.cityAgencyName || "",
      cityAgencyPhone: user?.cityAgencyPhone || "",
      cityAgencyEmail: user?.cityAgencyEmail || "",
      receivedElectedSupport: user?.receivedElectedSupport ?? false,
      electedOfficialName: user?.electedOfficialName || "",
      electedOfficialPhone: user?.electedOfficialPhone || "",
      electedOfficialEmail: user?.electedOfficialEmail || "",
      atRiskHomelessness: user?.atRiskHomelessness ?? false,
    },
  });

  // Update form when user data changes
  useEffect(() => {
    if (user) {
      form.reset({
        firstName: user.firstName || "",
        middleName: user.middleName || "",
        lastName: user.lastName || "",
        dateOfBirth: user.dateOfBirth || "",
        phone: user.phone || "",
        address: user.address || "",
        unit: user.unit || "",
        housingType: user.housingType as any || "rent_stabilized",
        knowsOrganizer: user.knowsOrganizer ?? false,
        organizerName: user.organizerName || "",
        organizerPhone: user.organizerPhone || "",
        organizerEmail: user.organizerEmail || "",
        organizerCompany: user.organizerCompany || "",
        threatened: user.threatened ?? false,
        evictionCase: user.evictionCase ?? false,
        hasHpProceeding: user.hasHpProceeding ?? false,
        registeredWithNonProfit: user.registeredWithNonProfit ?? false,
        nonProfitName: user.nonProfitName || "",
        nonProfitPhone: user.nonProfitPhone || "",
        nonProfitEmail: user.nonProfitEmail || "",
        receivedCitySupport: user.receivedCitySupport ?? false,
        cityAgencyName: user.cityAgencyName || "",
        cityAgencyPhone: user.cityAgencyPhone || "",
        cityAgencyEmail: user.cityAgencyEmail || "",
        receivedElectedSupport: user.receivedElectedSupport ?? false,
        electedOfficialName: user.electedOfficialName || "",
        electedOfficialPhone: user.electedOfficialPhone || "",
        electedOfficialEmail: user.electedOfficialEmail || "",
        atRiskHomelessness: user.atRiskHomelessness ?? false,
      });
    }
  }, [user, form]);

  const updateProfileMutation = useMutation({
    mutationFn: async (data: ProfileFormData) => {
      const response = await apiRequest("PUT", "/api/user/profile", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Profile Updated",
        description: "Your registration information has been saved successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ProfileFormData) => {
    updateProfileMutation.mutate(data);
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            User Registration & Legal Context
          </h3>
          <p className="text-gray-600">
            Please provide your information to get started with documenting your housing issues.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name *</FormLabel>
                    <FormControl>
                      <Input {...field} readOnly={!isEditMode} className={!isEditMode ? "bg-gray-50" : ""} />
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
                      <Input {...field} readOnly={!isEditMode} className={!isEditMode ? "bg-gray-50" : ""} />
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
                      <Input {...field} readOnly={!isEditMode} className={!isEditMode ? "bg-gray-50" : ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth *</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} readOnly={!isEditMode} className={!isEditMode ? "bg-gray-50" : ""} />
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
                      <Input placeholder="(555) 123-4567" {...field} readOnly={!isEditMode} className={!isEditMode ? "bg-gray-50" : ""} />
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
                          <Input placeholder="123 Main Street" {...field} readOnly={!isEditMode} className={!isEditMode ? "bg-gray-50" : ""} />
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
                          <Input placeholder="Apt 1A" {...field} readOnly={!isEditMode} className={!isEditMode ? "bg-gray-50" : ""} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Housing Type moved here */}
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
                          <RadioGroupItem value="rent_stabilized" id="rent-stabilized" disabled={!isEditMode} />
                          <Label htmlFor="rent-stabilized">Rent Stabilized</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="rent_controlled" id="rent-controlled" disabled={!isEditMode}/>
                          <Label htmlFor="rent-controlled">Rent Controlled</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="nycha" id="nycha" disabled={!isEditMode}/>
                          <Label htmlFor="nycha">NYCHA (Public Housing)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="private" id="private" disabled={!isEditMode}/>
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
                        disabled={!isEditMode}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="true" id="organizer-yes" disabled={!isEditMode}/>
                          <Label htmlFor="organizer-yes">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="false" id="organizer-no" disabled={!isEditMode}/>
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
                            <Input placeholder="Organizer name" {...field} readOnly={!isEditMode} className={!isEditMode ? "bg-gray-50" : ""} />
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
                            <Input placeholder="Organization name" {...field} readOnly={!isEditMode} className={!isEditMode ? "bg-gray-50" : ""} />
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
                            <Input placeholder="(555) 123-4567" {...field} readOnly={!isEditMode} className={!isEditMode ? "bg-gray-50" : ""} />
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
                            <Input placeholder="organizer@example.com" {...field} readOnly={!isEditMode} className={!isEditMode ? "bg-gray-50" : ""} />
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
                        disabled={!isEditMode}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="true" id="threatened-yes" disabled={!isEditMode}/>
                          <Label htmlFor="threatened-yes">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="false" id="threatened-no" disabled={!isEditMode}/>
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
                        disabled={!isEditMode}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="true" id="eviction-yes" disabled={!isEditMode}/>
                          <Label htmlFor="eviction-yes">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="false" id="eviction-no" disabled={!isEditMode}/>
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
                        disabled={!isEditMode}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="true" id="hp-proceeding-yes" disabled={!isEditMode}/>
                          <Label htmlFor="hp-proceeding-yes">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="false" id="hp-proceeding-no" disabled={!isEditMode}/>
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
                        disabled={!isEditMode}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="true" id="nonprofit-yes" disabled={!isEditMode}/>
                          <Label htmlFor="nonprofit-yes">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="false" id="nonprofit-no" disabled={!isEditMode}/>
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
                            <Input placeholder="Legal Aid Society" {...field} readOnly={!isEditMode} className={!isEditMode ? "bg-gray-50" : ""} />
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
                            <Input placeholder="(555) 123-4567" {...field} readOnly={!isEditMode} className={!isEditMode ? "bg-gray-50" : ""} />
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
                            <Input placeholder="contact@nonprofit.org" {...field} readOnly={!isEditMode} className={!isEditMode ? "bg-gray-50" : ""} />
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
                        disabled={!isEditMode}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="true" id="city-support-yes" disabled={!isEditMode}/>
                          <Label htmlFor="city-support-yes">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="false" id="city-support-no" disabled={!isEditMode}/>
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
                            <Input placeholder="HPD, NYCHA, etc." {...field} readOnly={!isEditMode} className={!isEditMode ? "bg-gray-50" : ""} />
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
                            <Input placeholder="(555) 123-4567" {...field} readOnly={!isEditMode} className={!isEditMode ? "bg-gray-50" : ""} />
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
                            <Input placeholder="contact@agency.nyc.gov" {...field} readOnly={!isEditMode} className={!isEditMode ? "bg-gray-50" : ""} />
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
                        disabled={!isEditMode}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="true" id="elected-support-yes" disabled={!isEditMode}/>
                          <Label htmlFor="elected-support-yes">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="false" id="elected-support-no" disabled={!isEditMode}/>
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
                            <Input placeholder="Council Member, Senator, etc." {...field} readOnly={!isEditMode} className={!isEditMode ? "bg-gray-50" : ""} />
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
                            <Input placeholder="(555) 123-4567" {...field} readOnly={!isEditMode} className={!isEditMode ? "bg-gray-50" : ""} />
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
                            <Input placeholder="office@official.gov" {...field} readOnly={!isEditMode} className={!isEditMode ? "bg-gray-50" : ""} />
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
                        disabled={!isEditMode}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="true" id="homelessness-yes" disabled={!isEditMode}/>
                          <Label htmlFor="homelessness-yes">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="false" id="homelessness-no" disabled={!isEditMode}/>
                          <Label htmlFor="homelessness-no">No</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end">
              {isEditMode ? (
                <Button
                  type="submit"
                  className="bg-primary hover:bg-blue-700"
                  disabled={updateProfileMutation.isPending}
                >
                  <i className="fas fa-save mr-2"></i>
                  {updateProfileMutation.isPending ? "Saving..." : "Save Registration"}
                </Button>
              ) : (
                <Button
                  type="button"
                  className="bg-secondary hover:bg-gray-300 text-gray-900"
                  onClick={() => setIsEditMode(true)}
                >
                  <i className="fas fa-edit mr-2"></i>
                  Edit Profile
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}