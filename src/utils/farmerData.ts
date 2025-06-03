
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

// Enhanced demo data for current farmer profile
export const getEnhancedFarmerData = () => {
  const currentProfileId = getCurrentProfile();
  const profile = getFarmerProfile(currentProfileId);
  
  return {
    plots: profile.plots,
    weather: profile.weather,
    profile: profile.profile,
    alerts: profile.alerts,
    recentActivity: profile.recentActivity,
    claims: profile.claims || []
  };
};

import { getFarmerProfile } from './farmerProfiles';
import { getCurrentProfile } from './auth';
