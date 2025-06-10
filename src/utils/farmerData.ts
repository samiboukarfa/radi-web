
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
