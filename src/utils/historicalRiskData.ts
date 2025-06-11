
export interface HistoricalRiskEntry {
  date: string;
  riskScore: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  indicators: {
    ndvi: number;
    cape: number;
    windShear: number;
    temperature: number;
    precipitation: number;
    soilMoisture: number;
  };
  interpretation: string;
  weatherEvent?: string;
}

export interface FarmerHistoricalData {
  farmerId: string;
  farmerName: string;
  location: string;
  entries: HistoricalRiskEntry[];
}

export const getHistoricalRiskData = (farmerId: string): FarmerHistoricalData | null => {
  const historicalData: Record<string, FarmerHistoricalData> = {
    'salem': {
      farmerId: 'salem',
      farmerName: 'Salem Khrobi',
      location: 'Lkhrob, Constantine',
      entries: [
        {
          date: '2024-02-15',
          riskScore: 3.1,
          riskLevel: 'Low',
          indicators: {
            ndvi: 0.31,
            cape: 1200,
            windShear: 8,
            temperature: 24,
            precipitation: -38,
            soilMoisture: 45
          },
          interpretation: 'Stable vegetation health despite drought conditions. Effective irrigation management maintaining low risk.',
          weatherEvent: 'Drought monitoring'
        },
        {
          date: '2024-01-20',
          riskScore: 2.8,
          riskLevel: 'Low',
          indicators: {
            ndvi: 0.33,
            cape: 1100,
            windShear: 6,
            temperature: 22,
            precipitation: -25,
            soilMoisture: 48
          },
          interpretation: 'Olive cultivation showing resilience to moderate drought conditions.',
          weatherEvent: 'Moderate drought'
        },
        {
          date: '2023-12-15',
          riskScore: 2.2,
          riskLevel: 'Low',
          indicators: {
            ndvi: 0.35,
            cape: 950,
            windShear: 4,
            temperature: 18,
            precipitation: 15,
            soilMoisture: 52
          },
          interpretation: 'Optimal conditions for olive cultivation. Low risk maintained.',
          weatherEvent: 'Normal conditions'
        }
      ]
    },
    'hamza': {
      farmerId: 'hamza',
      farmerName: 'Hamza Dawdi',
      location: 'Mezaguet Roha, Constantine',
      entries: [
        {
          date: '2024-02-15',
          riskScore: 8.2,
          riskLevel: 'High',
          indicators: {
            ndvi: 0.18,
            cape: 2850,
            windShear: 15,
            temperature: 28,
            precipitation: 0,
            soilMoisture: 25
          },
          interpretation: 'High risk conditions detected. Weather monitoring shows potential for severe weather events.',
          weatherEvent: 'High instability detected'
        },
        {
          date: '2023-05-19',
          riskScore: 9.1,
          riskLevel: 'High',
          indicators: {
            ndvi: 0.22,
            cape: 2850,
            windShear: 18,
            temperature: 32,
            precipitation: 0,
            soilMoisture: 20
          },
          interpretation: 'Confirmed hail damage. CAPE values and atmospheric instability correctly predicted severe hailstorm.',
          weatherEvent: 'Hailstorm event - Claim processed: 45,000 DZD'
        },
        {
          date: '2023-05-18',
          riskScore: 8.8,
          riskLevel: 'High',
          indicators: {
            ndvi: 0.24,
            cape: 2650,
            windShear: 16,
            temperature: 30,
            precipitation: 0,
            soilMoisture: 22
          },
          interpretation: 'Pre-storm conditions showing high atmospheric instability. RADI correctly predicted high risk.',
          weatherEvent: 'Pre-hailstorm warning'
        }
      ]
    }
  };

  return historicalData[farmerId] || null;
};

export const getDateRangeData = (farmerId: string, startDate: string, endDate: string): HistoricalRiskEntry[] => {
  const data = getHistoricalRiskData(farmerId);
  if (!data) return [];

  const start = new Date(startDate);
  const end = new Date(endDate);

  return data.entries.filter(entry => {
    const entryDate = new Date(entry.date);
    return entryDate >= start && entryDate <= end;
  });
};
