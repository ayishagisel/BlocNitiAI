
import { User } from "@shared/schema";

export function useProfileCompleteness(user: User | null) {
  if (!user) return { isComplete: false, missingFields: [], loading: false };

  const requiredFields = [
    'firstName',
    'lastName', 
    'dateOfBirth',
    'phone',
    'address',
    'unit',
    'housingType'
  ];

  // Make boolean fields optional for now - they can be null/undefined
  const optionalBooleanFields = [
    'knowsOrganizer',
    'threatened',
    'evictionCase',
    'hasTenantLeader',
    'registeredWithNonProfit',
    'receivedCitySupport',
    'receivedElectedSupport',
    'atRiskHomelessness'
  ];

  const missingFields: string[] = [];

  // Check required string fields
  requiredFields.forEach(field => {
    if (!user[field as keyof User] || user[field as keyof User] === '') {
      missingFields.push(field);
    }
  });

  // For debugging: log the current state
  console.log('Profile completeness check:', {
    user: user.email,
    missingFields,
    allFields: requiredFields.map(f => ({ [f]: user[f as keyof User] }))
  });

  const isComplete = missingFields.length === 0;

  return {
    isComplete,
    missingFields,
    loading: false
  };
}
