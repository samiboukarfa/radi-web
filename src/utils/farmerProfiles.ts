
import { Plot, Sensor, WeatherData, FarmerProfile } from './farmerData';

export interface FarmerProfileData {
  personalInfo: {
    id: number;
    fullName: string;
    email: string;
    phone: string;
    farmAddress: string;
    coordinates: [number, number];
    nationalId: string;
    farmRegistration: string;
    emergencyContact: string;
  };
  plots: Plot[];
  weather: WeatherData;
  profile: FarmerProfile;
  alerts: Array<{
    id: number;
    title: string;
    severity: 'low' | 'medium' | 'high';
    time: string;
    plot: string;
    type: string;
    description: string;
  }>;
  recentActivity: string[];
  claims?: Array<{
    id: string;
    date: string;
    event: string;
    status: string;
    payout: number;
    evidence: string;
    insurer: string;
  }>;
}

// Ahmed Benali - Original Skikda farmer (Enhanced)
const ahmedProfile: FarmerProfileData = {
  personalInfo: {
    id: 123456788,
    fullName: 'Ahmed Benali',
    email: 'farmer@radi.app',
    phone: '+213 555 123 456',
    farmAddress: 'Route Nationale 3, Skikda 21000, Algeria',
    coordinates: [36.8756, 6.9147],
    nationalId: 'DZ12345678901',
    farmRegistration: 'SKK-2023-0456',
    emergencyContact: '+213 555 987 654'
  },
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
        [36.8706, 6.9127],
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
  ],
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
  },
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
  },
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
      title: 'Irrigation Schedule Reminder', 
      severity: 'medium' as const, 
      time: '4 hours ago', 
      plot: 'North Field',
      type: 'irrigation',
      description: 'Scheduled irrigation due for wheat field'
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
};

// Salem Khrobi - Constantine olive farmer (Case Study 1)
const salemProfile: FarmerProfileData = {
  personalInfo: {
    id: 123456789,
    fullName: 'Salem Khrobi',
    email: 'salem@radi.app',
    phone: '+213 555 0123',
    farmAddress: 'Lkhrob, Constantine 25000, Algeria',
    coordinates: [36.3650, 6.6147],
    nationalId: 'DZ98765432109',
    farmRegistration: 'CST-2023-0789',
    emergencyContact: '+213 555 987 321'
  },
  plots: [
    {
      id: 5,
      name: 'Zighod Yousef',
      crop: 'Olives',
      area: 10,
      riskLevel: 'Low' as const,
      color: '#10B981',
      coordinates: [
        [36.3650, 6.6147],
        [36.3670, 6.6167],
        [36.3690, 6.6147],
        [36.3670, 6.6127]
      ] as [number, number][],
      sensors: [
        {
          id: 'SM005',
          type: 'soil_moisture' as const,
          position: [36.3660, 6.6147] as [number, number],
          status: 'online' as const,
          lastReading: 42.3,
          timestamp: '2024-06-03T10:30:00Z',
          batteryLevel: 91
        },
        {
          id: 'TMP005',
          type: 'temperature' as const,
          position: [36.3680, 6.6157] as [number, number],
          status: 'online' as const,
          lastReading: 31.2,
          timestamp: '2024-06-03T10:30:00Z',
          batteryLevel: 85
        }
      ],
      plantingDate: '2018-03-15',
      expectedHarvest: '2024-10-20',
      soilType: 'Mediterranean Clay',
      irrigationMethod: 'Drip Irrigation',
      lastYield: 3.2,
      riskScore: 80,
      ndviTrend: [0.31, 0.33, 0.29, 0.31, 0.32, 0.30, 0.31],
      moistureLevels: [40, 42, 44, 41, 43, 42, 45]
    }
  ],
  weather: {
    current: {
      temperature: 31,
      humidity: 58,
      windSpeed: 8,
      condition: 'Sunny',
      pressure: 1015,
      uvIndex: 8
    },
    forecast: [
      { date: '2024-06-04', high: 33, low: 19, condition: 'Sunny', precipitation: 0, windSpeed: 6 },
      { date: '2024-06-05', high: 35, low: 21, condition: 'Hot', precipitation: 0, windSpeed: 4 },
      { date: '2024-06-06', high: 32, low: 18, condition: 'Partly Cloudy', precipitation: 2, windSpeed: 10 },
      { date: '2024-06-07', high: 29, low: 16, condition: 'Cloudy', precipitation: 15, windSpeed: 12 },
      { date: '2024-06-08', high: 27, low: 15, condition: 'Light Rain', precipitation: 25, windSpeed: 15 },
      { date: '2024-06-09', high: 30, low: 17, condition: 'Partly Cloudy', precipitation: 5, windSpeed: 8 },
      { date: '2024-06-10', high: 32, low: 19, condition: 'Sunny', precipitation: 0, windSpeed: 6 }
    ],
    alerts: [
      {
        type: 'drought' as const,
        severity: 'medium' as const,
        message: 'Moderate drought conditions in Constantine region. Consider irrigation optimization.',
        startDate: '2024-06-01',
        endDate: '2024-06-15'
      },
      {
        type: 'heat' as const,
        severity: 'high' as const,
        message: 'High LST anomaly (+4.3°C) detected. Monitor olive trees for heat stress.',
        startDate: '2024-06-03',
        endDate: '2024-06-05'
      }
    ]
  },
  profile: {
    personalInfo: {
      fullName: 'Salem Khrobi',
      email: 'salem@radi.app',
      phone: '+213 555 0123',
      farmAddress: 'Lkhrob, Constantine 25000, Algeria',
      coordinates: [36.3650, 6.6147] as [number, number],
      nationalId: 'DZ98765432109',
      farmRegistration: 'CST-2023-0789',
      emergencyContact: '+213 555 987 321'
    },
    preferences: {
      language: 'fr' as const,
      notifications: {
        weather: true,
        risk: true,
        sensors: true,
        system: true
      },
      deliveryMethods: {
        email: true,
        sms: true,
        push: false
      },
      quietHours: {
        start: '21:00',
        end: '07:00'
      }
    },
    subscription: {
      plan: 'premium' as const,
      status: 'active' as const,
      nextBilling: '2024-07-01',
      paymentMethod: 'Bank Transfer'
    }
  },
  alerts: [
    { 
      id: 3, 
      title: 'Moderate Drought Alert', 
      severity: 'medium' as const, 
      time: '1 hour ago', 
      plot: 'Zighod Yousef',
      type: 'drought',
      description: 'Rainfall anomaly of -38mm detected in Constantine region'
    },
    { 
      id: 4, 
      title: 'High LST Anomaly', 
      severity: 'high' as const, 
      time: '3 hours ago', 
      plot: 'Zighod Yousef',
      type: 'temperature',
      description: 'Land Surface Temperature +4.3°C above normal - consider irrigation'
    }
  ],
  recentActivity: [
    'Case study profile activated for Salem Khrobi',
    'NDVI reading stable at 0.31 for olive grove',
    'Drought monitoring alert issued for Constantine',
    'Soil moisture sensors reporting normal levels',
    'CNMA policy CNMA-AGR-2024-002 renewed successfully',
    'Irrigation schedule optimized for drought conditions'
  ]
};

// Hamza Dawdi - Constantine wheat farmer with hailstorm claim (Case Study 2)
const hamzaProfile: FarmerProfileData = {
  personalInfo: {
    id: 123456779,
    fullName: 'Hamza Dawdi',
    email: 'hamza@radi.app',
    phone: '+213 555 0124',
    farmAddress: 'Mezaguet Roha, Constantine 25000, Algeria',
    coordinates: [36.2500, 6.5500],
    nationalId: 'DZ11223344556',
    farmRegistration: 'CST-2022-0321',
    emergencyContact: '+213 555 654 987'
  },
  plots: [
    {
      id: 6,
      name: 'Mezaguet Roha Field',
      crop: 'Durum Wheat',
      area: 9,
      riskLevel: 'High' as const,
      color: '#EF4444',
      coordinates: [
        [36.2500, 6.5500],
        [36.2520, 6.5520],
        [36.2540, 6.5500],
        [36.2520, 6.5480]
      ] as [number, number][],
      sensors: [
        {
          id: 'SM006',
          type: 'soil_moisture' as const,
          position: [36.2510, 6.5500] as [number, number],
          status: 'online' as const,
          lastReading: 38.9,
          timestamp: '2023-05-20T08:15:00Z',
          batteryLevel: 76
        },
        {
          id: 'TMP006',
          type: 'temperature' as const,
          position: [36.2530, 6.5510] as [number, number],
          status: 'online' as const,
          lastReading: 24.1,
          timestamp: '2023-05-20T08:15:00Z',
          batteryLevel: 82
        }
      ],
      plantingDate: '2022-11-10',
      expectedHarvest: '2023-06-15',
      soilType: 'Clay Loam',
      irrigationMethod: 'Rain-fed',
      lastYield: 2.1,
      riskScore: 30,
      ndviTrend: [0.22, 0.25, 0.28, 0.30, 0.22, 0.18, 0.15],
      moistureLevels: [45, 42, 38, 35, 32, 38, 40]
    }
  ],
  weather: {
    current: {
      temperature: 24,
      humidity: 72,
      windSpeed: 18,
      condition: 'Overcast',
      pressure: 998,
      uvIndex: 3
    },
    forecast: [
      { date: '2023-05-20', high: 26, low: 14, condition: 'Cloudy', precipitation: 35, windSpeed: 20 },
      { date: '2023-05-21', high: 23, low: 12, condition: 'Thunderstorms', precipitation: 65, windSpeed: 25 },
      { date: '2023-05-22', high: 25, low: 13, condition: 'Partly Cloudy', precipitation: 10, windSpeed: 15 },
      { date: '2023-05-23', high: 27, low: 15, condition: 'Sunny', precipitation: 0, windSpeed: 8 },
      { date: '2023-05-24', high: 29, low: 16, condition: 'Sunny', precipitation: 0, windSpeed: 6 }
    ],
    alerts: [
      {
        type: 'storm' as const,
        severity: 'high' as const,
        message: 'Severe hailstorm warning. CAPE: 2850 J/kg, Lifted Index: -5.8°C. Take protective measures.',
        startDate: '2023-05-19',
        endDate: '2023-05-19'
      }
    ]
  },
  profile: {
    personalInfo: {
      fullName: 'Hamza Dawdi',
      email: 'hamza@radi.app',
      phone: '+213 555 0124',
      farmAddress: 'Mezaguet Roha, Constantine 25000, Algeria',
      coordinates: [36.2500, 6.5500] as [number, number],
      nationalId: 'DZ11223344556',
      farmRegistration: 'CST-2022-0321',
      emergencyContact: '+213 555 654 987'
    },
    preferences: {
      language: 'ar' as const,
      notifications: {
        weather: true,
        risk: true,
        sensors: true,
        system: true
      },
      deliveryMethods: {
        email: false,
        sms: true,
        push: true
      },
      quietHours: {
        start: '23:00',
        end: '05:00'
      }
    },
    subscription: {
      plan: 'basic' as const,
      status: 'active' as const,
      nextBilling: '2024-06-15',
      paymentMethod: 'Cash Payment'
    }
  },
  alerts: [
    { 
      id: 5, 
      title: 'Hailstorm Damage Confirmed', 
      severity: 'high' as const, 
      time: '1 day ago', 
      plot: 'Mezaguet Roha Field',
      type: 'damage',
      description: 'Satellite imagery confirms crop damage from May 19 hailstorm'
    },
    { 
      id: 6, 
      title: 'NDVI Drop Detected', 
      severity: 'high' as const, 
      time: '1 day ago', 
      plot: 'Mezaguet Roha Field',
      type: 'vegetation',
      description: 'NDVI decreased from 0.22 to 0.18 indicating crop damage'
    }
  ],
  recentActivity: [
    'Hailstorm damage assessment completed using satellite data',
    'CNMA claim CNMA-CLM-2023-001 approved for 45,000 DZD',
    'Post-storm NDVI analysis shows crop damage confirmation',
    'Weather data validated: CAPE 2850 J/kg, Lifted Index -5.8°C',
    'Insurance payout processed for hailstorm damage',
    'Case study documentation completed for RADI validation'
  ],
  claims: [
    {
      id: 'CNMA-CLM-2023-001',
      date: '2023-05-19',
      event: 'Hailstorm',
      status: 'Approved',
      payout: 45000,
      evidence: 'Satellite-confirmed crop damage, NDVI drop from 0.22 to 0.18',
      insurer: 'CNMA'
    }
  ]
};

export const farmerProfiles = {
  ahmed: ahmedProfile,
  salem: salemProfile,
  hamza: hamzaProfile
};

export const getFarmerProfile = (profileId: string): FarmerProfileData => {
  return farmerProfiles[profileId as keyof typeof farmerProfiles] || farmerProfiles.ahmed;
};

export const getAllProfiles = () => farmerProfiles;
