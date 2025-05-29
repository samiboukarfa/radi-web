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

export interface Sensor {
  id: string;
  type: 'soil_moisture' | 'temperature' | 'ph' | 'humidity';
  position: [number, number];
  status: 'online' | 'offline' | 'battery_low';
  lastReading: number;
  timestamp: string;
  batteryLevel: number;
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
  alerts: Array<{
    type: 'heat' | 'frost' | 'drought' | 'storm';
    severity: 'low' | 'medium' | 'high';
    message: string;
    startDate: string;
    endDate: string;
  }>;
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
    profilePhoto?: string;
  };
  preferences: {
    language: 'en' | 'ar' | 'fr';
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
    plan: 'basic' | 'premium' | 'enterprise';
    status: 'active' | 'expired' | 'trial';
    nextBilling: string;
    paymentMethod: string;
  };
}

// Enhanced demo data for Skikda region, Algeria
export const getEnhancedFarmerData = () => ({
  plots: [
    {
      id: 1,
      name: 'North Field',
      crop: 'Wheat',
      area: 15.5,
      riskLevel: 'Medium' as const,
      color: '#F59E0B',
      coordinates: [
        [36.8756, 6.9147],
        [36.8776, 6.9167],
        [36.8796, 6.9187],
        [36.8796, 6.9147],
        [36.8776, 6.9127]
      ] as [number, number][],
      sensors: [
        {
          id: 'SM001',
          type: 'soil_moisture' as const,
          position: [36.8766, 6.9147] as [number, number],
          status: 'online' as const,
          lastReading: 45.2,
          timestamp: '2024-01-15T10:30:00Z',
          batteryLevel: 87
        },
        {
          id: 'TMP001',
          type: 'temperature' as const,
          position: [36.8786, 6.9157] as [number, number],
          status: 'online' as const,
          lastReading: 28.5,
          timestamp: '2024-01-15T10:30:00Z',
          batteryLevel: 62
        }
      ],
      plantingDate: '2023-11-15',
      expectedHarvest: '2024-06-20',
      soilType: 'Clay Loam',
      irrigationMethod: 'Drip Irrigation',
      lastYield: 4.2,
      riskScore: 65,
      ndviTrend: [0.3, 0.35, 0.42, 0.48, 0.52, 0.49, 0.46],
      moistureLevels: [42, 45, 47, 44, 41, 45, 48]
    },
    {
      id: 2,
      name: 'Olive Grove',
      crop: 'Olives',
      area: 8.2,
      riskLevel: 'Low' as const,
      color: '#10B981',
      coordinates: [
        [36.8726, 6.9187],
        [36.8746, 6.9207],
        [36.8766, 6.9227],
        [36.8766, 6.9187],
        [36.8746, 6.9167]
      ] as [number, number][],
      sensors: [
        {
          id: 'SM002',
          type: 'soil_moisture' as const,
          position: [36.8746, 6.9187] as [number, number],
          status: 'online' as const,
          lastReading: 38.7,
          timestamp: '2024-01-15T10:25:00Z',
          batteryLevel: 94
        }
      ],
      plantingDate: '2020-03-10',
      expectedHarvest: '2024-10-15',
      soilType: 'Sandy Loam',
      irrigationMethod: 'Drip Irrigation',
      lastYield: 2.8,
      riskScore: 25,
      ndviTrend: [0.65, 0.68, 0.71, 0.69, 0.72, 0.74, 0.71],
      moistureLevels: [36, 38, 40, 37, 39, 38, 41]
    },
    {
      id: 3,
      name: 'Vegetable Garden',
      crop: 'Tomatoes',
      area: 3.7,
      riskLevel: 'High' as const,
      color: '#EF4444',
      coordinates: [
        [36.8696, 6.9157],
        [36.8716, 6.9177],
        [36.8736, 6.9197],
        [36.8736, 6.9157],
        [36.8716, 6.9137]
      ] as [number, number][],
      sensors: [
        {
          id: 'SM003',
          type: 'soil_moisture' as const,
          position: [36.8716, 6.9157] as [number, number],
          status: 'battery_low' as const,
          lastReading: 52.1,
          timestamp: '2024-01-15T09:45:00Z',
          batteryLevel: 15
        },
        {
          id: 'PH001',
          type: 'ph' as const,
          position: [36.8726, 6.9167] as [number, number],
          status: 'offline' as const,
          lastReading: 6.8,
          timestamp: '2024-01-14T15:20:00Z',
          batteryLevel: 0
        }
      ],
      plantingDate: '2024-01-05',
      expectedHarvest: '2024-04-20',
      soilType: 'Loam',
      irrigationMethod: 'Sprinkler',
      lastYield: 12.5,
      riskScore: 82,
      ndviTrend: [0.2, 0.25, 0.18, 0.22, 0.19, 0.16, 0.14],
      moistureLevels: [48, 52, 55, 51, 49, 52, 54]
    },
    {
      id: 4,
      name: 'Barley Field',
      crop: 'Barley',
      area: 22.1,
      riskLevel: 'Low' as const,
      color: '#10B981',
      coordinates: [
        [36.8666, 6.9127],
        [36.8686, 6.9147],
        [36.8706, 6.9167],
        [36.8726, 6.9147],
        [36.8706, 6.9107],
        [36.8686, 6.9107]
      ] as [number, number][],
      sensors: [
        {
          id: 'SM004',
          type: 'soil_moisture' as const,
          position: [36.8686, 6.9127] as [number, number],
          status: 'online' as const,
          lastReading: 41.8,
          timestamp: '2024-01-15T10:35:00Z',
          batteryLevel: 78
        },
        {
          id: 'HUM001',
          type: 'humidity' as const,
          position: [36.8696, 6.9137] as [number, number],
          status: 'online' as const,
          lastReading: 67.3,
          timestamp: '2024-01-15T10:35:00Z',
          batteryLevel: 83
        }
      ],
      plantingDate: '2023-12-01',
      expectedHarvest: '2024-07-10',
      soilType: 'Sandy Clay',
      irrigationMethod: 'Flood Irrigation',
      lastYield: 3.8,
      riskScore: 30,
      ndviTrend: [0.4, 0.43, 0.46, 0.49, 0.51, 0.53, 0.55],
      moistureLevels: [38, 41, 43, 40, 42, 41, 44]
    }
  ] as Plot[],
  
  weather: {
    current: {
      temperature: 28,
      humidity: 65,
      windSpeed: 12,
      condition: 'Partly Cloudy',
      pressure: 1013,
      uvIndex: 6
    },
    forecast: [
      { date: '2024-01-16', high: 30, low: 18, condition: 'Sunny', precipitation: 0, windSpeed: 8 },
      { date: '2024-01-17', high: 32, low: 20, condition: 'Hot', precipitation: 0, windSpeed: 10 },
      { date: '2024-01-18', high: 29, low: 17, condition: 'Partly Cloudy', precipitation: 5, windSpeed: 15 },
      { date: '2024-01-19', high: 26, low: 15, condition: 'Cloudy', precipitation: 20, windSpeed: 18 },
      { date: '2024-01-20', high: 24, low: 14, condition: 'Rainy', precipitation: 45, windSpeed: 22 },
      { date: '2024-01-21', high: 27, low: 16, condition: 'Partly Cloudy', precipitation: 10, windSpeed: 12 },
      { date: '2024-01-22', high: 29, low: 18, condition: 'Sunny', precipitation: 0, windSpeed: 9 }
    ],
    alerts: [
      {
        type: 'heat' as const,
        severity: 'medium' as const,
        message: 'High temperature warning for next 48 hours. Monitor irrigation levels.',
        startDate: '2024-01-16',
        endDate: '2024-01-18'
      }
    ]
  } as WeatherData,
  
  profile: {
    personalInfo: {
      fullName: 'Ahmed Benali',
      email: 'farmer@radi.app',
      phone: '+213 555 123 456',
      farmAddress: 'Route Nationale 3, Skikda 21000, Algeria',
      coordinates: [36.8756, 6.9147] as [number, number],
      nationalId: 'DZ12345678901',
      farmRegistration: 'SKK-2023-0456',
      emergencyContact: '+213 555 987 654'
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
        push: true
      },
      quietHours: {
        start: '22:00',
        end: '06:00'
      }
    },
    subscription: {
      plan: 'premium' as const,
      status: 'active' as const,
      nextBilling: '2024-02-15',
      paymentMethod: 'Credit Card ending in 4532'
    }
  } as FarmerProfile,
  
  alerts: [
    { 
      id: 1, 
      title: 'High Temperature Warning', 
      severity: 'high' as const, 
      time: '2 hours ago', 
      plot: 'Vegetable Garden',
      type: 'weather',
      description: 'Temperature expected to exceed 35°C for extended period'
    },
    { 
      id: 2, 
      title: 'Sensor Battery Low', 
      severity: 'medium' as const, 
      time: '4 hours ago', 
      plot: 'Vegetable Garden',
      type: 'sensor',
      description: 'Soil moisture sensor SM003 battery at 15%'
    },
    { 
      id: 3, 
      title: 'pH Sensor Offline', 
      severity: 'high' as const, 
      time: '1 day ago', 
      plot: 'Vegetable Garden',
      type: 'sensor',
      description: 'pH sensor PH001 not responding - requires maintenance'
    }
  ],
  
  recentActivity: [
    'Plot "North Field" risk level updated to Medium',
    'New weather alert: High temperature warning issued',
    'Sensor data received from Olive Grove - all systems normal',
    'Weekly performance report generated successfully',
    'Plot "Vegetable Garden" boundaries updated via mobile app',
    'Irrigation schedule optimized for Barley Field',
    'Soil analysis results uploaded for North Field'
  ]
});
