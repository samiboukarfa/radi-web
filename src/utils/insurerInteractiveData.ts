
import { getDemoInsurerData } from './auth';

export interface FilteredData {
  farmers: any[];
  regionalRisks: any[];
  weatherData: any;
  riskFactors: any[];
  overallRiskScore: number;
  alerts: any[];
  claims: any[];
}

export const getFilteredInsurerData = (
  selectedFarmer: string = '',
  selectedRegion: string = '',
  timeframe: string = '6months'
): FilteredData => {
  const baseData = getDemoInsurerData();
  
  // Filter farmers based on selection
  let filteredFarmers = baseData.farmers;
  if (selectedFarmer) {
    filteredFarmers = baseData.farmers.filter(farmer => 
      farmer.name.toLowerCase().includes(selectedFarmer.toLowerCase())
    );
  }
  if (selectedRegion) {
    filteredFarmers = filteredFarmers.filter(farmer => 
      farmer.location.toLowerCase().includes(selectedRegion.toLowerCase())
    );
  }

  // Calculate dynamic risk factors based on selected farmer
  const getFarmerSpecificRiskFactors = (farmerName: string) => {
    switch (farmerName.toLowerCase()) {
      case 'salem khrobi':
        return [
          { name: 'Drought Risk', value: 72, trend: 'up', color: 'text-red-600' },
          { name: 'Soil Quality', value: 68, trend: 'stable', color: 'text-yellow-600' },
          { name: 'Olive Tree Health', value: 31, trend: 'stable', color: 'text-green-600' },
          { name: 'Irrigation Efficiency', value: 85, trend: 'up', color: 'text-green-600' }
        ];
      case 'hamza dawdi':
        return [
          { name: 'Hail Risk', value: 89, trend: 'down', color: 'text-red-600' },
          { name: 'Crop Recovery', value: 25, trend: 'up', color: 'text-yellow-600' },
          { name: 'Wheat Vulnerability', value: 78, trend: 'stable', color: 'text-red-600' },
          { name: 'Weather Sensitivity', value: 92, trend: 'up', color: 'text-red-600' }
        ];
      case 'ahmed ben ahmed':
        return [
          { name: 'Weather Risk', value: 45, trend: 'stable', color: 'text-yellow-600' },
          { name: 'Soil Quality', value: 52, trend: 'down', color: 'text-yellow-600' },
          { name: 'Mixed Crop Diversity', value: 68, trend: 'up', color: 'text-green-600' },
          { name: 'Overall Stability', value: 55, trend: 'stable', color: 'text-yellow-600' }
        ];
      default:
        return [
          { name: 'Weather Risk', value: 58, trend: 'up', color: 'text-yellow-600' },
          { name: 'Soil Quality', value: 45, trend: 'down', color: 'text-yellow-600' },
          { name: 'Historical Performance', value: 52, trend: 'stable', color: 'text-green-600' },
          { name: 'Crop Diversity', value: 61, trend: 'up', color: 'text-yellow-600' }
        ];
    }
  };

  // Get region-specific data
  const getRegionSpecificData = (region: string) => {
    const baseRegionalRisks = [
      { region: 'Skikda', riskScore: 68, farmers: 15, avgYield: 85, trend: 'increasing' },
      { region: 'Constantine', riskScore: 45, farmers: 22, avgYield: 92, trend: 'stable' },
      { region: 'Setif', riskScore: 78, farmers: 8, avgYield: 78, trend: 'increasing' },
      { region: 'Batna', riskScore: 42, farmers: 18, avgYield: 88, trend: 'decreasing' },
      { region: 'Tlemcen', riskScore: 52, farmers: 12, avgYield: 90, trend: 'stable' }
    ];

    if (region === 'Constantine') {
      return [
        { 
          region: 'Constantine', 
          riskScore: 45, 
          farmers: 2, // Salem and Hamza
          avgYield: 85, 
          trend: 'stable',
          details: 'Includes Salem Khrobi (Low Risk - Olives) and Hamza Dawdi (High Risk - Wheat)'
        }
      ];
    }

    return region ? baseRegionalRisks.filter(r => 
      r.region.toLowerCase() === region.toLowerCase()
    ) : baseRegionalRisks;
  };

  // Calculate overall risk score based on selections
  const calculateOverallRisk = () => {
    if (selectedFarmer) {
      const farmer = baseData.farmers.find(f => 
        f.name.toLowerCase().includes(selectedFarmer.toLowerCase())
      );
      return farmer ? farmer.riskScore * 10 : 58;
    }
    if (selectedRegion === 'Constantine') return 45;
    return 58;
  };

  // Get weather data based on region
  const getRegionalWeather = (region: string) => {
    if (region === 'Constantine') {
      return {
        temperature: { current: 26, forecast: [24, 27, 29, 25, 23], risk: 'medium' },
        precipitation: { current: 8, forecast: [5, 12, 18, 15, 7], risk: 'high' },
        humidity: { current: 58, forecast: [55, 62, 68, 65, 52], risk: 'low' },
        windSpeed: { current: 18, forecast: [15, 20, 22, 16, 14], risk: 'medium' }
      };
    }
    return {
      temperature: { current: 28, forecast: [26, 29, 31, 27, 25], risk: 'medium' },
      precipitation: { current: 12, forecast: [8, 15, 22, 18, 10], risk: 'low' },
      humidity: { current: 65, forecast: [62, 68, 75, 70, 60], risk: 'low' },
      windSpeed: { current: 15, forecast: [12, 18, 20, 14, 16], risk: 'low' }
    };
  };

  // Filter alerts based on selection
  const getFilteredAlerts = () => {
    let alerts = baseData.alerts;
    if (selectedFarmer) {
      alerts = alerts.filter(alert => 
        alert.farmer.toLowerCase().includes(selectedFarmer.toLowerCase())
      );
    }
    if (selectedRegion) {
      alerts = alerts.filter(alert => 
        alert.location.toLowerCase().includes(selectedRegion.toLowerCase())
      );
    }
    return alerts;
  };

  // Filter claims based on selection
  const getFilteredClaims = () => {
    let claims = baseData.claims;
    if (selectedFarmer) {
      claims = claims.filter(claim => 
        claim.farmer.toLowerCase().includes(selectedFarmer.toLowerCase())
      );
    }
    if (selectedRegion) {
      claims = claims.filter(claim => 
        claim.location && claim.location.toLowerCase().includes(selectedRegion.toLowerCase())
      );
    }
    return claims;
  };

  return {
    farmers: filteredFarmers,
    regionalRisks: getRegionSpecificData(selectedRegion),
    weatherData: getRegionalWeather(selectedRegion),
    riskFactors: selectedFarmer ? getFarmerSpecificRiskFactors(selectedFarmer) : [
      { name: 'Weather Risk', value: 58, trend: 'up', color: 'text-yellow-600' },
      { name: 'Soil Quality', value: 45, trend: 'down', color: 'text-yellow-600' },
      { name: 'Historical Performance', value: 52, trend: 'stable', color: 'text-green-600' },
      { name: 'Crop Diversity', value: 61, trend: 'up', color: 'text-yellow-600' }
    ],
    overallRiskScore: calculateOverallRisk(),
    alerts: getFilteredAlerts(),
    claims: getFilteredClaims()
  };
};
