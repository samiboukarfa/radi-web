export interface Sensor {
  id: string;
  type: 'soil_moisture' | 'temperature' | 'humidity' | 'ph' | 'nutrients';
  position: [number, number];
  status: 'online' | 'offline' | 'battery_low' | 'maintenance';
  lastReading: number;
  timestamp: string;
  batteryLevel: number;
}

export interface Plot {
  id: number;
  name: string;
  crop: string;
  area: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  color: string;
  coordinates: [number, number][];
  sensors: Sensor[];
  plantingDate: string;
  expectedHarvest: string;
  soilType: string;
  irrigationMethod: string;
  lastYield: number;
  riskScore: number;
  ndviTrend: number[];
  moistureLevels: number[];
}

export interface WeatherAlert {
  type: 'heat' | 'cold' | 'drought' | 'flood' | 'storm' | 'frost';
  severity: 'low' | 'medium' | 'high';
  message: string;
  startDate: string;
  endDate: string;
}

export interface WeatherData {
  current: {
    temperature: number;
    humidity: number;
    windSpeed: number;
    condition: string;
    pressure: number;
    uvIndex: number;
  };
  forecast: Array<{
    date: string;
    high: number;
    low: number;
    condition: string;
    precipitation: number;
    windSpeed: number;
  }>;
  alerts: WeatherAlert[];
}

export interface FarmerProfile {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    farmAddress: string;
    coordinates: [number, number];
    nationalId: string;
    farmRegistration: string;
    emergencyContact: string;
  };
  preferences: {
    language: 'en' | 'fr' | 'ar';
    notifications: {
      weather: boolean;
      risk: boolean;
      sensors: boolean;
      system: boolean;
    };
    deliveryMethods: {
      email: boolean;
      sms: boolean;
      push: boolean;
    };
    quietHours: {
      start: string;
      end: string;
    };
  };
  subscription: {
    plan: 'premium' | 'basic' | 'enterprise';
    status: 'active' | 'expired' | 'trial';
  };
}

// Enhanced demo data for current farmer profile
export const getEnhancedFarmerData = () => {
  const plots: Plot[] = [
    {
      id: 1,
      name: "North Field",
      crop: "Wheat",
      area: 25.5,
      riskLevel: 'Low',
      color: '#10B981',
      coordinates: [[36.3665, 6.6157], [36.3675, 6.6167], [36.3670, 6.6171], [36.3660, 6.6161]],
      sensors: [
        {
          id: "sensor_001",
          type: "soil_moisture",
          position: [36.3668, 6.6164],
          status: "online",
          lastReading: 45,
          timestamp: "2024-02-15T10:30:00Z",
          batteryLevel: 85
        },
        {
          id: "sensor_002",
          type: "temperature",
          position: [36.3670, 6.6166],
          status: "online",
          lastReading: 22,
          timestamp: "2024-02-15T10:30:00Z",
          batteryLevel: 92
        }
      ],
      plantingDate: "2023-11-15",
      expectedHarvest: "2024-06-15",
      soilType: "Clay Loam",
      irrigationMethod: "Drip Irrigation",
      lastYield: 4.2,
      riskScore: 25,
      ndviTrend: [0.6, 0.65, 0.7, 0.68, 0.72, 0.75, 0.73],
      moistureLevels: [45, 42, 48, 50, 47, 45, 43]
    },
    {
      id: 2,
      name: "South Field",
      crop: "Barley",
      area: 18.3,
      riskLevel: 'Medium',
      color: '#F59E0B',
      coordinates: [[36.3620, 6.6097], [36.3630, 6.6107], [36.3625, 6.6111], [36.3615, 6.6101]],
      sensors: [
        {
          id: "sensor_003",
          type: "ph",
          position: [36.3622, 6.6104],
          status: "online",
          lastReading: 6.8,
          timestamp: "2024-02-15T10:30:00Z",
          batteryLevel: 78
        }
      ],
      plantingDate: "2023-12-01",
      expectedHarvest: "2024-07-01",
      soilType: "Sandy Loam",
      irrigationMethod: "Sprinkler",
      lastYield: 3.8,
      riskScore: 55,
      ndviTrend: [0.4, 0.42, 0.38, 0.35, 0.37, 0.39, 0.36],
      moistureLevels: [35, 32, 38, 40, 37, 35, 33]
    },
    {
      id: 3,
      name: "East Plot",
      crop: "Corn",
      area: 12.7,
      riskLevel: 'High',
      color: '#EF4444',
      coordinates: [[36.3700, 6.6197], [36.3710, 6.6207], [36.3705, 6.6211], [36.3695, 6.6201]],
      sensors: [
        {
          id: "sensor_004",
          type: "humidity",
          position: [36.3702, 6.6204],
          status: "battery_low",
          lastReading: 68,
          timestamp: "2024-02-15T08:15:00Z",
          batteryLevel: 15
        }
      ],
      plantingDate: "2024-01-15",
      expectedHarvest: "2024-08-15",
      soilType: "Silt Loam",
      irrigationMethod: "Flood Irrigation",
      lastYield: 2.1,
      riskScore: 78,
      ndviTrend: [0.3, 0.28, 0.25, 0.22, 0.24, 0.26, 0.23],
      moistureLevels: [25, 22, 28, 30, 27, 25, 23]
    },
    {
      id: 4,
      name: "West Garden",
      crop: "Vegetables",
      area: 8.9,
      riskLevel: 'Low',
      color: '#10B981',
      coordinates: [[36.3580, 6.6047], [36.3590, 6.6057], [36.3585, 6.6061], [36.3575, 6.6051]],
      sensors: [
        {
          id: "sensor_005",
          type: "nutrients",
          position: [36.3582, 6.6054],
          status: "online",
          lastReading: 85,
          timestamp: "2024-02-15T10:30:00Z",
          batteryLevel: 95
        }
      ],
      plantingDate: "2024-02-01",
      expectedHarvest: "2024-05-01",
      soilType: "Organic Rich",
      irrigationMethod: "Drip Irrigation",
      lastYield: 5.5,
      riskScore: 20,
      ndviTrend: [0.8, 0.82, 0.85, 0.83, 0.87, 0.89, 0.86],
      moistureLevels: [55, 52, 58, 60, 57, 55, 53]
    }
  ];

  const weather: WeatherData = {
    current: {
      temperature: 24,
      humidity: 65,
      windSpeed: 12,
      condition: "Partly Cloudy",
      pressure: 1013,
      uvIndex: 6
    },
    forecast: [
      {
        date: "2024-02-16",
        high: 26,
        low: 18,
        condition: "Sunny",
        precipitation: 0,
        windSpeed: 10
      },
      {
        date: "2024-02-17",
        high: 28,
        low: 20,
        condition: "Partly Cloudy",
        precipitation: 5,
        windSpeed: 15
      }
    ],
    alerts: [
      {
        type: "heat",
        severity: "medium",
        message: "High temperatures expected this week",
        startDate: "2024-02-16",
        endDate: "2024-02-20"
      }
    ]
  };

  return {
    plots,
    weather,
    profile: {
      personalInfo: {
        fullName: "Ahmed Ben Salem",
        email: "ahmed.bensalem@example.com",
        phone: "+213 555 0123",
        farmAddress: "Route Nationale 3, Constantine 25000, Algeria",
        coordinates: [36.3650, 6.6147] as [number, number],
        nationalId: "199012345678",
        farmRegistration: "FARM-CST-2020-001",
        emergencyContact: "+213 555 0124"
      },
      preferences: {
        language: 'en' as const,
        notifications: {
          weather: true,
          risk: true,
          sensors: true,
          system: false
        },
        deliveryMethods: {
          email: true,
          sms: true,
          push: false
        },
        quietHours: {
          start: "22:00",
          end: "06:00"
        }
      },
      subscription: {
        plan: 'premium' as const,
        status: 'active' as const
      }
    },
    alerts: weather.alerts,
    recentActivity: [
      {
        timestamp: "2024-02-15T10:30:00Z",
        message: "Soil moisture reading updated for North Field",
        type: "sensor"
      },
      {
        timestamp: "2024-02-15T08:15:00Z",
        message: "Battery low alert for East Plot humidity sensor",
        type: "maintenance"
      }
    ]
  };
};
