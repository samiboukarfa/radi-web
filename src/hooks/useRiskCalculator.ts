import { useState, useEffect, useCallback, useMemo } from 'react';
import { RiskParameters, ClimateHazard, calculateRiskScore, RiskCalculationResult } from '@/utils/riskScore';
import { toast } from '@/hooks/use-toast';

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
  const [parameters, setParameters] = useState<RiskParameters>(initialParameters);
  const [hazard, setHazard] = useState<ClimateHazard>('Drought');
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    
    if (saveToProfile && onParametersUpdate) {
      onParametersUpdate(newParameters);
      toast({
        title: "Parameters Saved",
        description: "Risk parameters have been saved and risk scores recalculated.",
      });
    } else if (!saveToProfile) {
      toast({
        title: "Risk Score Updated",
        description: "Risk assessment updated with new parameters.",
      });
    }
  }, [onParametersUpdate]);

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
    
    toast({
      title: "Parameters Reset",
      description: "All parameters have been reset to original values.",
    });
  }, [initialParameters]);

  const refreshData = useCallback(() => {
    setParameters(initialParameters);
    setLastUpdated(new Date());
    
    toast({
      title: "Data Refreshed",
      description: "Risk parameters have been refreshed from latest sensor data.",
    });
  }, [initialParameters]);

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