
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
    name: 'Demo Insurer',
    location: 'Algiers, Algeria'
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
      phone: credential.phone,
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
