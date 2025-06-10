import { useEffect } from "react";
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
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  phone: z.string().min(1, "Phone is required"),
  address: z.string().min(1, "Address is required"),
  unit: z.string().min(1, "Unit number is required"),
  knowsOrganizer: z.boolean(),
  threatened: z.boolean(),
  evictionCase: z.boolean(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function UserRegistration() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      dateOfBirth: user?.dateOfBirth || "",
      phone: user?.phone || "",
      address: user?.address || "",
      unit: user?.unit || "",
      knowsOrganizer: user?.knowsOrganizer ?? false,
      threatened: user?.threatened ?? false,
      evictionCase: user?.evictionCase ?? false,
    },
  });

  // Update form when user data changes
  useEffect(() => {
    if (user) {
      form.reset({
        dateOfBirth: user.dateOfBirth || "",
        phone: user.phone || "",
        address: user.address || "",
        unit: user.unit || "",
        knowsOrganizer: user.knowsOrganizer ?? false,
        threatened: user.threatened ?? false,
        evictionCase: user.evictionCase ?? false,
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="text-sm font-medium text-gray-700">First Name</Label>
                <Input 
                  value={user?.firstName || ""} 
                  disabled 
                  className="bg-gray-50"
                  placeholder="From your Replit account" 
                />
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">Last Name</Label>
                <Input 
                  value={user?.lastName || ""} 
                  disabled 
                  className="bg-gray-50"
                  placeholder="From your Replit account" 
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

            <div className="flex justify-end">
              <Button 
                type="submit" 
                className="bg-primary hover:bg-blue-700"
                disabled={updateProfileMutation.isPending}
              >
                <i className="fas fa-save mr-2"></i>
                {updateProfileMutation.isPending ? "Saving..." : "Save Registration"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
