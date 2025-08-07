import { useState, useEffect, useCallback, useMemo } from 'react';
import { RiskParameters, ClimateHazard, calculateRiskScore, RiskCalculationResult } from '@/utils/riskScore';
import { toast } from '@/hooks/use-toast';
import { saveRiskParameters, loadRiskParameters, hasCustomParameters } from '@/utils/riskParametersStorage';
import { getCurrentProfile } from '@/utils/auth';

interface UseRiskCalculatorProps {
  initialParameters: RiskParameters;
  onParametersUpdate?: (parameters: RiskParameters) => void;
}

interface UseRiskCalculatorReturn {
  parameters: RiskParameters;
  hazard: ClimateHazard;
  result: RiskCalculationResult;
  lastUpdated: Date;
  isEditorOpen: boolean;
  isModalOpen: boolean;
  updateParameters: (newParameters: RiskParameters, saveToProfile?: boolean) => void;
  updateHazard: (newHazard: ClimateHazard) => void;
  resetParameters: () => void;
  openEditor: () => void;
  closeEditor: () => void;
  openModal: () => void;
  closeModal: () => void;
  refreshData: () => void;
}

export const useRiskCalculator = ({
  initialParameters,
  onParametersUpdate
}: UseRiskCalculatorProps): UseRiskCalculatorReturn => {
  const currentProfile = getCurrentProfile();
  
  // Load saved parameters or use initial ones
  const getInitialParameters = useCallback(() => {
    const savedParameters = loadRiskParameters(currentProfile);
    return savedParameters || initialParameters;
  }, [currentProfile, initialParameters]);

  const [parameters, setParameters] = useState<RiskParameters>(getInitialParameters);
  const [hazard, setHazard] = useState<ClimateHazard>('Drought');
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Update parameters when profile changes
  useEffect(() => {
    const newParameters = getInitialParameters();
    setParameters(newParameters);
    setLastUpdated(new Date());
    console.log(`Profile changed to ${currentProfile}, loaded parameters:`, newParameters);
  }, [currentProfile, getInitialParameters]);

  // Calculate risk score whenever parameters or hazard changes
  const result = useMemo(() => {
    console.log('Recalculating risk score with parameters:', parameters, 'hazard:', hazard);
    return calculateRiskScore(parameters, hazard);
  }, [parameters, hazard]);

  // Update timestamp when calculation changes
  useEffect(() => {
    setLastUpdated(new Date());
  }, [parameters, hazard]);

  const updateParameters = useCallback((newParameters: RiskParameters, saveToProfile = false) => {
    console.log('Updating parameters:', newParameters, 'saveToProfile:', saveToProfile);
    setParameters(newParameters);
    
    // Always save to localStorage for persistence
    saveRiskParameters(newParameters, currentProfile);
    
    if (saveToProfile && onParametersUpdate) {
      onParametersUpdate(newParameters);
      toast({
        title: "Parameters Saved & Persisted",
        description: "Risk parameters saved to your profile and will persist across sessions.",
      });
    } else {
      toast({
        title: "Risk Score Updated",
        description: "Parameters updated and saved locally.",
      });
    }
  }, [onParametersUpdate, currentProfile]);

  const updateHazard = useCallback((newHazard: ClimateHazard) => {
    setHazard(newHazard);
    
    toast({
      title: "Hazard Changed",
      description: `Risk assessment updated for ${newHazard}.`,
    });
  }, []);

  const resetParameters = useCallback(() => {
    setParameters(initialParameters);
    setLastUpdated(new Date());
    
    // Clear saved parameters from localStorage
    saveRiskParameters(initialParameters, currentProfile);
    
    toast({
      title: "Parameters Reset",
      description: "All parameters have been reset to original values and saved.",
    });
  }, [initialParameters, currentProfile]);

  const refreshData = useCallback(() => {
    const refreshedParameters = getInitialParameters();
    setParameters(refreshedParameters);
    setLastUpdated(new Date());
    
    toast({
      title: "Data Refreshed",
      description: "Risk parameters refreshed from latest sensor data and saved.",
    });
  }, [getInitialParameters]);

  const openEditor = useCallback(() => setIsEditorOpen(true), []);
  const closeEditor = useCallback(() => setIsEditorOpen(false), []);
  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  return {
    parameters,
    hazard,
    result,
    lastUpdated,
    isEditorOpen,
    isModalOpen,
    updateParameters,
    updateHazard,
    resetParameters,
    openEditor,
    closeEditor,
    openModal,
    closeModal,
    refreshData
  };
};