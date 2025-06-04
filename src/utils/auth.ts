export interface User {
  email: string;
  name: string;
  userType: 'farmer' | 'insurer' | 'institution' | 'admin';
  phone?: string;
  location?: string;
  lastLogin?: string;
  profileId?: string;
}

// Enhanced demo credentials with new case study profiles
const DEMO_CREDENTIALS = {
  'admin@radi.app': {
    password: 'admin123',
    userType: 'admin' as const,
    name: 'Admin User',
    location: 'Algiers, Algeria'
  },
  'farmer@radi.app': {
    password: 'farmer123',
    userType: 'farmer' as const,
    name: 'Ahmed Benali',
    location: 'Skikda, Algeria',
    phone: '+213 555 123 456',
    profileId: 'ahmed'
  },
  'salem@radi.app': {
    password: 'farmer123',
    userType: 'farmer' as const,
    name: 'Salem Khrobi',
    location: 'Lkhrob, Constantine, Algeria',
    phone: '+213 555 0123',
    profileId: 'salem'
  },
  'hamza@radi.app': {
    password: 'farmer123',
    userType: 'farmer' as const,
    name: 'Hamza Dawdi',
    location: 'Mezaguet Roha, Constantine, Algeria',
    phone: '+213 555 0124',
    profileId: 'hamza'
  },
  'crma@radi.app': {
    password: 'insurer123',
    userType: 'insurer' as const,
    name: 'Insurance Manager',
    location: 'CRMA Alger Office',
    phone: '+213 555 789 012'
  },
  'institution@radi.app': {
    password: 'institution123',
    userType: 'institution' as const,
    name: 'Demo Institution',
    location: 'Oran, Algeria'
  }
};

export const authenticateUser = (email: string, password: string): User | null => {
  const credential = DEMO_CREDENTIALS[email as keyof typeof DEMO_CREDENTIALS];
  
  if (credential && credential.password === password) {
    return {
      email,
      name: credential.name,
      userType: credential.userType,
      location: credential.location,
      phone: 'phone' in credential ? credential.phone : undefined,
      profileId: 'profileId' in credential ? credential.profileId : undefined,
      lastLogin: new Date().toLocaleString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      })
    };
  }
  
  return null;
};

export const setUserSession = (user: User): void => {
  const sessionData = {
    ...user,
    lastLogin: new Date().toLocaleString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  };
  localStorage.setItem('radiUser', JSON.stringify(sessionData));
};

export const getUserSession = (): User | null => {
  const userString = localStorage.getItem('radiUser');
  if (userString) {
    try {
      return JSON.parse(userString);
    } catch {
      return null;
    }
  }
  return null;
};

export const clearUserSession = (): void => {
  localStorage.removeItem('radiUser');
  localStorage.removeItem('farmerDashboardPreferences');
  localStorage.removeItem('currentProfile');
};

export const isAuthenticated = (): boolean => {
  return getUserSession() !== null;
};

export const getDashboardRoute = (userType: string): string => {
  switch (userType) {
    case 'admin':
      return '/admin-dashboard';
    case 'farmer':
      return '/farmer-dashboard';
    case 'insurer':
      return '/insurer-dashboard';
    case 'institution':
      return '/institution-dashboard';
    default:
      return '/';
  }
};

// Profile switching functionality
export const switchFarmerProfile = (profileId: string): void => {
  const currentUser = getUserSession();
  if (!currentUser || currentUser.userType !== 'farmer') return;

  const profiles = {
    'ahmed': {
      email: 'farmer@radi.app',
      name: 'Ahmed Benali',
      location: 'Skikda, Algeria',
      phone: '+213 555 123 456'
    },
    'salem': {
      email: 'salem@radi.app',
      name: 'Salem Khrobi',
      location: 'Lkhrob, Constantine, Algeria',
      phone: '+213 555 0123'
    },
    'hamza': {
      email: 'hamza@radi.app',
      name: 'Hamza Dawdi',
      location: 'Mezaguet Roha, Constantine, Algeria',
      phone: '+213 555 0124'
    }
  };

  const profile = profiles[profileId as keyof typeof profiles];
  if (profile) {
    const updatedUser = {
      ...currentUser,
      ...profile,
      profileId
    };
    setUserSession(updatedUser);
    localStorage.setItem('currentProfile', profileId);
    window.location.reload();
  }
};

export const getCurrentProfile = (): string => {
  const user = getUserSession();
  if (user?.profileId) return user.profileId;
  return localStorage.getItem('currentProfile') || 'ahmed';
};

// Enhanced demo farmer data - legacy support
export const getDemoFarmerData = () => ({
  plots: [
    { id: 1, name: 'North Field', crop: 'Wheat', area: 15.5, riskLevel: 'Medium', color: '#F59E0B' },
    { id: 2, name: 'Olive Grove', crop: 'Olives', area: 8.2, riskLevel: 'Low', color: '#10B981' },
    { id: 3, name: 'Vegetable Garden', crop: 'Tomatoes', area: 3.7, riskLevel: 'High', color: '#EF4444' },
    { id: 4, name: 'Barley Field', crop: 'Barley', area: 22.1, riskLevel: 'Low', color: '#10B981' }
  ],
  alerts: [
    { id: 1, title: 'High Temperature Warning', severity: 'high', time: '2 hours ago', plot: 'Vegetable Garden' },
    { id: 2, title: 'Irrigation Schedule Reminder', severity: 'medium', time: '4 hours ago', plot: 'North Field' }
  ],
  recentActivity: [
    'Plot "North Field" risk level updated to Medium',
    'New weather alert: High temperature warning',
    'Sensor data received from Olive Grove',
    'Weekly report generated',
    'Plot "Vegetable Garden" boundaries updated'
  ],
  weather: {
    location: 'Skikda, Algeria',
    temperature: 28,
    condition: 'Partly Cloudy',
    humidity: 65,
    windSpeed: 12
  }
});

// Enhanced demo insurer data with CRMA
export const getDemoInsurerData = () => ({
  company: {
    name: 'CRMA - Caisse Régionale de Mutualité Agricole',
    fullName: 'Caisse Régionale de Mutualité Agricole',
    license: 'CRMA-2024-001',
    office: 'CRMA Alger Office',
    manager: 'Insurance Manager',
    location: '24, boulevard Victor Hugo, Alger, Algeria',
    description: 'Leader in agricultural insurance in Algeria with 77% market share',
    tagline: 'Mutualité Agricole – حقكم أمانة',
    marketShare: '77% of agricultural sector premiums',
    ranking: '5th in Algerian property insurance market'
  },
  kpis: {
    totalFarmers: 129,
    totalArea: 2856.5,
    activePolicies: 91,
    pendingClaims: 13,
    riskDistribution: { low: 45, medium: 35, high: 20 }
  },
  farmers: [
    { 
      id: 123456788, 
      name: 'Ahmed Benali', 
      location: 'Skikda', 
      crop: 'Mixed (Wheat, Olives)', 
      area: 49.5, 
      risk: 'Medium', 
      riskScore: 6.5,
      policy: 'Active', 
      policyNumber: 'CRMA-AGR-2024-001',
      lastUpdate: '2024-01-15',
      claims: []
    },
    { 
      id: 123456789, 
      name: 'Salem Khrobi', 
      location: 'Lkhrob, Constantine', 
      crop: 'Olives', 
      area: 10, 
      risk: 'Low', 
      riskScore: 8.0,
      policy: 'Active', 
      policyNumber: 'CRMA-AGR-2024-002',
      lastUpdate: '2024-01-14',
      claims: []
    },
    { 
      id: 123456779, 
      name: 'Hamza Dawdi', 
      location: 'Mezaguet Roha, Constantine', 
      crop: 'Durum Wheat', 
      area: 9, 
      risk: 'High', 
      riskScore: 3.0,
      policy: 'Claim Approved', 
      policyNumber: 'CRMA-AGR-2023-001',
      lastUpdate: '2024-01-13',
      claims: [{
        date: '2023-05-19',
        amount: 45000,
        status: 'Paid',
        cause: 'Hailstorm damage',
        claimId: 'CRMA-CLM-2023-001'
      }]
    }
  ],
  claims: [
    { 
      id: 1, 
      farmer: 'Hamza Dawdi', 
      type: 'Hailstorm Damage', 
      amount: 45000, 
      status: 'Paid', 
      date: '2023-05-19', 
      location: 'Mezaguet Roha, Constantine', 
      riskScore: 3.0,
      claimId: 'CRMA-CLM-2023-001',
      evidence: 'Satellite-confirmed crop damage, NDVI drop from 0.22 to 0.18',
      weatherData: 'CAPE: 2850 J/kg, Lifted Index: -5.8°C'
    },
    { 
      id: 2, 
      farmer: 'Ahmed Benali', 
      type: 'Drought Damage', 
      amount: 32000, 
      status: 'Under Review', 
      date: '2024-01-08', 
      location: 'Skikda', 
      riskScore: 6.5 
    }
  ],
  alerts: [
    { 
      id: 1, 
      title: 'Moderate Drought Alert - Constantine Region', 
      severity: 'medium', 
      farmer: 'Salem Khrobi', 
      time: '2 hours ago', 
      location: 'Constantine' 
    },
    { 
      id: 2, 
      title: 'High LST Anomaly Detected', 
      severity: 'high', 
      farmer: 'Salem Khrobi', 
      time: '4 hours ago', 
      location: 'Lkhrob, Constantine' 
    },
    { 
      id: 3, 
      title: 'Weather Warning - High Temperature', 
      severity: 'high', 
      farmer: 'Multiple Farmers', 
      time: '6 hours ago', 
      location: 'Multiple Regions' 
    }
  ],
  recentActivity: [
    'New farmer registration: Salem Khrobi from Constantine',
    'Risk level updated: Ahmed Benali - Medium',
    'Weather alert issued for Constantine region'
  ]
});
