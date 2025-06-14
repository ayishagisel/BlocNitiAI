
import { useAuth } from "@/hooks/useAuth";
import { useProfileCompleteness } from "@/hooks/useProfileCompleteness";
import { useLocation } from "wouter";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export function ProfileIncompleteBanner() {
  const { user } = useAuth();
  const { isComplete, missingFields } = useProfileCompleteness(user);
  const [location, setLocation] = useLocation();

  if (!user || isComplete || location === '/profile') {
    return null;
  }

  return (
    <Alert className="mb-4 border-orange-200 bg-orange-50">
      <i className="fas fa-exclamation-triangle text-orange-600 mr-2"></i>
      <AlertDescription className="flex items-center justify-between">
        <span>
          Your profile is incomplete. Please complete all required questions to access all features.
          {missingFields.length > 0 && (
            <span className="text-sm text-gray-600 ml-2">
              Missing: {missingFields.length} field{missingFields.length > 1 ? 's' : ''}
            </span>
          )}
        </span>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setLocation('/profile')}
          className="ml-4"
        >
          Complete Profile
        </Button>
      </AlertDescription>
    </Alert>
  );
}
