
export interface User {
  email: string;
  name: string;
  userType: 'farmer' | 'insurer' | 'institution' | 'admin';
  phone?: string;
  location?: string;
}

// Preset demo credentials
const DEMO_CREDENTIALS = {
  'admin@radi.app': {
    password: 'password123',
    userType: 'admin' as const,
    name: 'Admin User'
  },
  'farmer@radi.app': {
    password: 'farmer123',
    userType: 'farmer' as const,
    name: 'Demo Farmer'
  },
  'insurer@radi.app': {
    password: 'insurer123',
    userType: 'insurer' as const,
    name: 'Demo Insurer'
  },
  'institution@radi.app': {
    password: 'institution123',
    userType: 'institution' as const,
    name: 'Demo Institution'
  }
};

export const authenticateUser = (email: string, password: string): User | null => {
  const credential = DEMO_CREDENTIALS[email as keyof typeof DEMO_CREDENTIALS];
  
  if (credential && credential.password === password) {
    return {
      email,
      name: credential.name,
      userType: credential.userType
    };
  }
  
  return null;
};

export const setUserSession = (user: User): void => {
  localStorage.setItem('radiUser', JSON.stringify(user));
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
