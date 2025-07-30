export interface RiskParameters {
  // Vegetation Indices
  NDVI: number;
  EVI: number;
  NDMI: number;
  
  // Temperature Data
  LST: number;
  LSTAnomaly: number;
  
  // Rainfall Data
  totalRainfall: number;
  rainfallAnomaly: number;
  
  // Atmospheric Conditions
  liftedIndex: number;
  CAPE: number;
  windShear: number;
  
  // Evapotranspiration
  ETa: number;
  
  // Government Alerts
  weatherAlerts: number;
}

export interface RiskWeights {
  NDVI: number;
  EVI: number;
  NDMI: number;
  LST: number;
  LSTAnomaly: number;
  totalRainfall: number;
  rainfallAnomaly: number;
  liftedIndex: number;
  CAPE: number;
  windShear: number;
  ETa: number;
  weatherAlerts: number;
}

export type ClimateHazard = 'Drought' | 'Heavy Rainfall' | 'Hailstorm';

// Parameter scoring functions (0-10 scale)
export const getNDVIScore = (value: number): number => {
  // Higher NDVI is better (less risk)
  if (value >= 0.8) return 0;
  if (value >= 0.6) return 2;
  if (value >= 0.4) return 4;
  if (value >= 0.3) return 6;
  if (value >= 0.2) return 8;
  return 10;
};

export const getEVIScore = (value: number): number => {
  // Higher EVI is better (less risk)
  if (value >= 0.6) return 0;
  if (value >= 0.4) return 2;
  if (value >= 0.3) return 4;
  if (value >= 0.2) return 6;
  if (value >= 0.1) return 8;
  return 10;
};

export const getNDMIScore = (value: number): number => {
  // Higher NDMI indicates more moisture (less drought risk)
  if (value >= 0.4) return 0;
  if (value >= 0.2) return 2;
  if (value >= 0.0) return 4;
  if (value >= -0.2) return 6;
  if (value >= -0.4) return 8;
  return 10;
};

export const getLSTScore = (value: number): number => {
  // Lower LST is better (less heat stress)
  if (value <= 25) return 0;
  if (value <= 30) return 2;
  if (value <= 35) return 4;
  if (value <= 40) return 6;
  if (value <= 45) return 8;
  return 10;
};

export const getLSTAnomalyScore = (value: number): number => {
  // Negative anomaly is good, positive is bad
  if (value <= -2) return 0;
  if (value <= 0) return 2;
  if (value <= 2) return 4;
  if (value <= 4) return 6;
  if (value <= 6) return 8;
  return 10;
};

export const getTotalRainfallScore = (value: number, hazard: ClimateHazard): number => {
  if (hazard === 'Drought') {
    // For drought: more rainfall is better
    if (value >= 50) return 0;
    if (value >= 30) return 2;
    if (value >= 20) return 4;
    if (value >= 10) return 6;
    if (value >= 5) return 8;
    return 10;
  } else if (hazard === 'Heavy Rainfall') {
    // For heavy rainfall: extreme amounts are bad
    if (value <= 10) return 2;
    if (value <= 30) return 0;
    if (value <= 50) return 4;
    if (value <= 80) return 6;
    if (value <= 100) return 8;
    return 10;
  } else {
    // For hailstorm: moderate rainfall preferred
    if (value >= 10 && value <= 30) return 0;
    if (value >= 5 && value <= 50) return 2;
    if (value >= 2 && value <= 70) return 4;
    if (value <= 100) return 6;
    return 8;
  }
};

export const getRainfallAnomalyScore = (value: number): number => {
  // Negative anomaly indicates below normal rainfall (bad for drought)
  if (value >= 20) return 2;
  if (value >= 0) return 0;
  if (value >= -20) return 4;
  if (value >= -40) return 6;
  if (value >= -60) return 8;
  return 10;
};

export const getLiftedIndexScore = (value: number): number => {
  // Higher lifted index = more stable atmosphere (less convective activity)
  if (value >= 6) return 0;
  if (value >= 2) return 2;
  if (value >= 0) return 4;
  if (value >= -2) return 6;
  if (value >= -6) return 8;
  return 10;
};

export const getCAPEScore = (value: number): number => {
  // Higher CAPE = more convective potential (higher storm risk)
  if (value <= 1000) return 0;
  if (value <= 2000) return 2;
  if (value <= 3000) return 4;
  if (value <= 4000) return 6;
  if (value <= 5000) return 8;
  return 10;
};

export const getWindShearScore = (value: number): number => {
  // Moderate wind shear can suppress hail, but extreme values are problematic
  if (value >= 10 && value <= 20) return 2;
  if (value >= 5 && value <= 25) return 4;
  if (value >= 0 && value <= 30) return 6;
  if (value <= 40) return 8;
  return 10;
};

export const getETaScore = (value: number): number => {
  // Higher ETa during drought indicates stress
  if (value <= 2) return 0;
  if (value <= 4) return 2;
  if (value <= 6) return 4;
  if (value <= 8) return 6;
  if (value <= 10) return 8;
  return 10;
};

export const getWeatherAlertsScore = (value: number): number => {
  // More alerts = higher risk
  if (value === 0) return 0;
  if (value === 1) return 3;
  if (value === 2) return 6;
  if (value === 3) return 8;
  return 10;
};

// Hazard-specific weights (should sum to 100%)
export const hazardWeights: Record<ClimateHazard, RiskWeights> = {
  Drought: {
    NDVI: 0.15,
    EVI: 0.12,
    NDMI: 0.18,
    LST: 0.10,
    LSTAnomaly: 0.15,
    totalRainfall: 0.12,
    rainfallAnomaly: 0.10,
    liftedIndex: 0.02,
    CAPE: 0.01,
    windShear: 0.01,
    ETa: 0.03,
    weatherAlerts: 0.01
  },
  'Heavy Rainfall': {
    NDVI: 0.08,
    EVI: 0.06,
    NDMI: 0.10,
    LST: 0.05,
    LSTAnomaly: 0.05,
    totalRainfall: 0.25,
    rainfallAnomaly: 0.15,
    liftedIndex: 0.10,
    CAPE: 0.10,
    windShear: 0.03,
    ETa: 0.02,
    weatherAlerts: 0.01
  },
  Hailstorm: {
    NDVI: 0.10,
    EVI: 0.08,
    NDMI: 0.06,
    LST: 0.08,
    LSTAnomaly: 0.07,
    totalRainfall: 0.12,
    rainfallAnomaly: 0.08,
    liftedIndex: 0.15,
    CAPE: 0.15,
    windShear: 0.08,
    ETa: 0.02,
    weatherAlerts: 0.01
  }
};

export interface RiskCalculationResult {
  finalScore: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  breakdown: Array<{
    parameter: string;
    rawValue: number;
    normalizedScore: number;
    weight: number;
    weightedScore: number;
  }>;
}

export const calculateRiskScore = (
  parameters: RiskParameters,
  hazard: ClimateHazard
): RiskCalculationResult => {
  const weights = hazardWeights[hazard];
  const breakdown: RiskCalculationResult['breakdown'] = [];
  
  // Calculate normalized scores for each parameter
  const scores = {
    NDVI: getNDVIScore(parameters.NDVI),
    EVI: getEVIScore(parameters.EVI),
    NDMI: getNDMIScore(parameters.NDMI),
    LST: getLSTScore(parameters.LST),
    LSTAnomaly: getLSTAnomalyScore(parameters.LSTAnomaly),
    totalRainfall: getTotalRainfallScore(parameters.totalRainfall, hazard),
    rainfallAnomaly: getRainfallAnomalyScore(parameters.rainfallAnomaly),
    liftedIndex: getLiftedIndexScore(parameters.liftedIndex),
    CAPE: getCAPEScore(parameters.CAPE),
    windShear: getWindShearScore(parameters.windShear),
    ETa: getETaScore(parameters.ETa),
    weatherAlerts: getWeatherAlertsScore(parameters.weatherAlerts)
  };
  
  // Calculate weighted scores and build breakdown
  let totalWeightedScore = 0;
  
  Object.entries(scores).forEach(([param, normalizedScore]) => {
    const weight = weights[param as keyof RiskWeights];
    const weightedScore = normalizedScore * weight;
    totalWeightedScore += weightedScore;
    
    breakdown.push({
      parameter: param,
      rawValue: parameters[param as keyof RiskParameters],
      normalizedScore,
      weight: weight * 100, // Convert to percentage
      weightedScore
    });
  });
  
  // Determine risk level
  let riskLevel: 'Low' | 'Medium' | 'High';
  if (totalWeightedScore <= 3) {
    riskLevel = 'Low';
  } else if (totalWeightedScore <= 6) {
    riskLevel = 'Medium';
  } else {
    riskLevel = 'High';
  }
  
  return {
    finalScore: Math.round(totalWeightedScore * 10) / 10, // Round to 1 decimal
    riskLevel,
    breakdown
  };
};

export const getRiskScoreColor = (score: number): string => {
  if (score <= 3) return 'text-green-600';
  if (score <= 6) return 'text-yellow-600';
  return 'text-red-600';
};

export const getRiskScoreBgColor = (score: number): string => {
  if (score <= 3) return 'bg-green-100';
  if (score <= 6) return 'bg-yellow-100';
  return 'bg-red-100';
};