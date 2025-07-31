import { useState, useEffect, useCallback } from 'react';
import { Plot } from '@/utils/farmerData';
import { RiskParameters } from '@/utils/riskScore';
import { toast } from '@/hooks/use-toast';

interface PlotRiskIntegrationProps {
  plots: Plot[];
  baseRiskParameters: RiskParameters;
  onRiskParametersUpdate: (parameters: RiskParameters) => void;
}

interface PlotUpdate {
  plotId: number;
  field: keyof Plot;
  value: any;
  timestamp: Date;
}

export const usePlotRiskIntegration = ({
  plots,
  baseRiskParameters,
  onRiskParametersUpdate
}: PlotRiskIntegrationProps) => {
  const [plotUpdates, setPlotUpdates] = useState<PlotUpdate[]>([]);
  const [adjustedRiskParameters, setAdjustedRiskParameters] = useState<RiskParameters>(baseRiskParameters);

  // Function to calculate how plot changes affect risk parameters
  const calculatePlotImpactOnRisk = useCallback((updatedPlots: Plot[]): RiskParameters => {
    // Calculate weighted averages based on plot areas and conditions
    const totalArea = updatedPlots.reduce((sum, plot) => sum + plot.area, 0);
    
    let adjustedParameters = { ...baseRiskParameters };
    
    // Adjust NDVI based on plot health
    const avgNDVI = updatedPlots.reduce((sum, plot) => {
      const plotWeight = plot.area / totalArea;
      const plotNDVI = plot.ndviTrend ? plot.ndviTrend[plot.ndviTrend.length - 1] : 0.4;
      return sum + (plotNDVI * plotWeight);
    }, 0);
    
    adjustedParameters.NDVI = avgNDVI;
    
    // Adjust moisture parameters based on soil moisture
    const avgMoisture = updatedPlots.reduce((sum, plot) => {
      const plotWeight = plot.area / totalArea;
      const plotMoisture = plot.moistureLevels ? plot.moistureLevels[plot.moistureLevels.length - 1] : 40;
      return sum + (plotMoisture * plotWeight);
    }, 0);
    
    // Adjust NDMI based on moisture levels
    adjustedParameters.NDMI = (avgMoisture - 40) / 100; // Normalize to NDMI range
    
    // Adjust rainfall based on irrigation methods
    const irrigationEfficiency = updatedPlots.reduce((sum, plot) => {
      const plotWeight = plot.area / totalArea;
      const efficiency = plot.irrigationMethod === 'Drip Irrigation' ? 1.2 : 
                        plot.irrigationMethod === 'Sprinkler' ? 1.0 : 0.8;
      return sum + (efficiency * plotWeight);
    }, 0);
    
    adjustedParameters.totalRainfall = baseRiskParameters.totalRainfall * irrigationEfficiency;
    
    return adjustedParameters;
  }, [baseRiskParameters]);

  // Update plot data and recalculate risk parameters
  const updatePlot = useCallback((plotId: number, field: keyof Plot, value: any) => {
    const update: PlotUpdate = {
      plotId,
      field,
      value,
      timestamp: new Date()
    };
    
    setPlotUpdates(prev => [...prev, update]);
    
    // Apply the update to the plots array
    const updatedPlots = plots.map(plot => 
      plot.id === plotId ? { ...plot, [field]: value } : plot
    );
    
    // Recalculate risk parameters based on updated plots
    const newRiskParameters = calculatePlotImpactOnRisk(updatedPlots);
    setAdjustedRiskParameters(newRiskParameters);
    onRiskParametersUpdate(newRiskParameters);
    
    toast({
      title: "Plot Updated",
      description: `${field} updated for plot. Risk parameters recalculated.`,
    });
  }, [plots, calculatePlotImpactOnRisk, onRiskParametersUpdate]);

  // Simulate plot condition changes (for demo purposes)
  const simulateDataUpdate = useCallback((plotId: number) => {
    const plot = plots.find(p => p.id === plotId);
    if (!plot) return;
    
    // Simulate NDVI change
    const currentNDVI = plot.ndviTrend?.[plot.ndviTrend.length - 1] || 0.4;
    const ndviChange = (Math.random() - 0.5) * 0.1; // ±0.05 change
    const newNDVI = Math.max(0, Math.min(1, currentNDVI + ndviChange));
    
    // Simulate moisture change
    const currentMoisture = plot.moistureLevels?.[plot.moistureLevels.length - 1] || 40;
    const moistureChange = (Math.random() - 0.5) * 10; // ±5% change
    const newMoisture = Math.max(0, Math.min(100, currentMoisture + moistureChange));
    
    // Update both parameters
    updatePlot(plotId, 'ndviTrend', [...(plot.ndviTrend || []), newNDVI]);
    updatePlot(plotId, 'moistureLevels', [...(plot.moistureLevels || []), newMoisture]);
    
    toast({
      title: "Sensor Data Updated",
      description: `New readings received for ${plot.name}`,
    });
  }, [plots, updatePlot]);

  // Reset to base parameters
  const resetToBaseParameters = useCallback(() => {
    setAdjustedRiskParameters(baseRiskParameters);
    setPlotUpdates([]);
    onRiskParametersUpdate(baseRiskParameters);
    
    toast({
      title: "Parameters Reset",
      description: "Risk parameters reset to baseline values.",
    });
  }, [baseRiskParameters, onRiskParametersUpdate]);

  // Effect to recalculate when plots change
  useEffect(() => {
    const newRiskParameters = calculatePlotImpactOnRisk(plots);
    setAdjustedRiskParameters(newRiskParameters);
  }, [plots, calculatePlotImpactOnRisk]);

  return {
    adjustedRiskParameters,
    plotUpdates,
    updatePlot,
    simulateDataUpdate,
    resetToBaseParameters,
    hasUpdates: plotUpdates.length > 0
  };
};