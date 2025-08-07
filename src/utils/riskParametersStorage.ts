import { RiskParameters } from './riskScore';

const STORAGE_KEY_PREFIX = 'radi_risk_parameters';

interface StoredRiskParameters {
  parameters: RiskParameters;
  timestamp: string;
  profileId: string;
}

/**
 * Get the storage key for a specific farmer profile
 */
const getStorageKey = (profileId: string): string => {
  return `${STORAGE_KEY_PREFIX}_${profileId}`;
};

/**
 * Save risk parameters to localStorage for a specific profile
 */
export const saveRiskParameters = (parameters: RiskParameters, profileId: string): void => {
  try {
    const storageData: StoredRiskParameters = {
      parameters,
      timestamp: new Date().toISOString(),
      profileId
    };
    
    const key = getStorageKey(profileId);
    localStorage.setItem(key, JSON.stringify(storageData));
    
    console.log(`Risk parameters saved for profile ${profileId}:`, parameters);
  } catch (error) {
    console.error('Failed to save risk parameters:', error);
  }
};

/**
 * Load risk parameters from localStorage for a specific profile
 */
export const loadRiskParameters = (profileId: string): RiskParameters | null => {
  try {
    const key = getStorageKey(profileId);
    const stored = localStorage.getItem(key);
    
    if (!stored) {
      console.log(`No stored risk parameters found for profile ${profileId}`);
      return null;
    }
    
    const storageData: StoredRiskParameters = JSON.parse(stored);
    
    // Validate that the data belongs to the correct profile
    if (storageData.profileId !== profileId) {
      console.warn(`Profile mismatch in stored data. Expected: ${profileId}, Found: ${storageData.profileId}`);
      return null;
    }
    
    console.log(`Risk parameters loaded for profile ${profileId}:`, storageData.parameters);
    return storageData.parameters;
  } catch (error) {
    console.error('Failed to load risk parameters:', error);
    return null;
  }
};

/**
 * Check if custom risk parameters exist for a profile
 */
export const hasCustomParameters = (profileId: string): boolean => {
  const key = getStorageKey(profileId);
  return localStorage.getItem(key) !== null;
};

/**
 * Clear custom risk parameters for a profile
 */
export const clearRiskParameters = (profileId: string): void => {
  try {
    const key = getStorageKey(profileId);
    localStorage.removeItem(key);
    console.log(`Risk parameters cleared for profile ${profileId}`);
  } catch (error) {
    console.error('Failed to clear risk parameters:', error);
  }
};

/**
 * Get all profiles with custom risk parameters
 */
export const getProfilesWithCustomParameters = (): string[] => {
  try {
    const profiles: string[] = [];
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(STORAGE_KEY_PREFIX)) {
        const profileId = key.replace(`${STORAGE_KEY_PREFIX}_`, '');
        profiles.push(profileId);
      }
    }
    
    return profiles;
  } catch (error) {
    console.error('Failed to get profiles with custom parameters:', error);
    return [];
  }
};