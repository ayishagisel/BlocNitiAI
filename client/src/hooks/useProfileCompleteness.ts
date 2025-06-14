
import { User } from "@shared/schema";

export function useProfileCompleteness(user: User | null) {
  if (!user) return { isComplete: false, missingFields: [] };

  const requiredFields = [
    'firstName',
    'lastName', 
    'dateOfBirth',
    'phone',
    'address',
    'unit',
    'housingType'
  ];

  const requiredBooleanFields = [
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

  // Check required boolean fields (they should not be null/undefined)
  requiredBooleanFields.forEach(field => {
    if (user[field as keyof User] === null || user[field as keyof User] === undefined) {
      missingFields.push(field);
    }
  });

  return {
    isComplete: missingFields.length === 0,
    missingFields
  };
}
