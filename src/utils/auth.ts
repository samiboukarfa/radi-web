export interface User {
  email: string;
  name: string;
  userType: 'farmer' | 'insurer' | 'institution' | 'admin';
  phone?: string;
  location?: string;
  lastLogin?: string;
}

// Preset demo credentials with detailed farmer data
const DEMO_CREDENTIALS = {
  'admin@radi.app': {
    password: 'password123',
    userType: 'admin' as const,
    name: 'Admin User',
    location: 'Algiers, Algeria'
  },
  'farmer@radi.app': {
    password: 'farmer123',
    userType: 'farmer' as const,
    name: 'Ahmed Benali',
    location: 'Skikda, Algeria',
    phone: '+213 555 123 456'
  },
  'insurer@radi.app': {
    password: 'insurer123',
    userType: 'insurer' as const,
    name: 'Insurance Manager',
    location: 'Algiers Office',
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
      phone: credential.phone || undefined,
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

// Demo farmer data
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

// Demo insurer data
export const getDemoInsurerData = () => ({
  company: {
    name: 'Assurance Agricole Algérie',
    license: 'AAA-2024-001',
    office: 'Algiers Office',
    manager: 'Insurance Manager'
  },
  kpis: {
    totalFarmers: 127,
    totalArea: 2847,
    activePolicies: 89,
    pendingClaims: 12,
    monthlyPremium: 245000,
    riskDistribution: { low: 45, medium: 35, high: 20 }
  },
  farmers: [
    { id: 1, name: 'Ahmed Benali', location: 'Skikda', area: 15.5, risk: 'Medium', policy: 'Active', lastUpdate: '2024-01-15' },
    { id: 2, name: 'Fatima Kaddour', location: 'Constantine', area: 22.3, risk: 'Low', policy: 'Active', lastUpdate: '2024-01-14' },
    { id: 3, name: 'Mohamed Brahim', location: 'Setif', area: 8.7, risk: 'High', policy: 'Pending', lastUpdate: '2024-01-13' },
    { id: 4, name: 'Aicha Meziane', location: 'Batna', area: 18.9, risk: 'Low', policy: 'Active', lastUpdate: '2024-01-12' },
    { id: 5, name: 'Omar Belhaj', location: 'Tlemcen', area: 12.4, risk: 'Medium', policy: 'Active', lastUpdate: '2024-01-11' }
  ],
  claims: [
    { id: 1, farmer: 'Ahmed Benali', type: 'Drought Damage', amount: 45000, status: 'Under Review', date: '2024-01-10' },
    { id: 2, farmer: 'Mohamed Brahim', type: 'Hail Damage', amount: 32000, status: 'Approved', date: '2024-01-08' },
    { id: 3, farmer: 'Fatima Kaddour', type: 'Pest Infestation', amount: 18000, status: 'Investigating', date: '2024-01-05' }
  ],
  alerts: [
    { id: 1, title: 'High Risk Detected - Setif Region', severity: 'high', farmer: 'Mohamed Brahim', time: '2 hours ago' },
    { id: 2, title: 'New Claim Filed - Drought Damage', severity: 'medium', farmer: 'Ahmed Benali', time: '4 hours ago' },
    { id: 3, title: 'Weather Warning - Hail Expected', severity: 'high', farmer: 'Multiple Farmers', time: '6 hours ago' }
  ],
  recentActivity: [
    'New farmer registration: Aicha Meziane from Batna',
    'Risk level updated: Mohamed Brahim - Medium to High',
    'Claim approved: Fatima Kaddour - 18,000 DZD',
    'Policy renewal: Omar Belhaj - Annual Premium',
    'Weather alert issued for Setif region'
  ]
});
