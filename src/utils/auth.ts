
// User types
export interface User {
  id: string;
  name: string;
  email: string;
  userType: 'farmer' | 'insurer' | 'admin' | 'institution';
  location: string;
}

// Session management
export const setUserSession = (user: User) => {
  localStorage.setItem('userSession', JSON.stringify(user));
};

export const getUserSession = (): User | null => {
  const session = localStorage.getItem('userSession');
  return session ? JSON.parse(session) : null;
};

export const clearUserSession = () => {
  localStorage.removeItem('userSession');
  localStorage.removeItem('currentProfile');
};

export const isAuthenticated = (): boolean => {
  return getUserSession() !== null;
};

// Authentication
export const authenticateUser = (email: string, password: string): User | null => {
  // Demo authentication - in real app this would be API call
  const demoUsers: User[] = [
    {
      id: '1',
      name: 'Admin',
      email: 'admin@radi.app',
      userType: 'admin',
      location: 'Algeria'
    },
    {
      id: '2',
      name: 'Ahmed Benali',
      email: 'farmer@radi.app',
      userType: 'farmer',
      location: 'Skikda, Algeria'
    },
    {
      id: '3',
      name: 'Salem Khrobi',
      email: 'salem@radi.app',
      userType: 'farmer',
      location: 'Constantine, Algeria'
    },
    {
      id: '4',
      name: 'Hamza Dawdi',
      email: 'hamza@radi.app',
      userType: 'farmer',
      location: 'Constantine, Algeria'
    },
    {
      id: '5',
      name: 'CRMA Insurance',
      email: 'crma@radi.app',
      userType: 'insurer',
      location: 'Algiers, Algeria'
    },
    {
      id: '6',
      name: 'Institution User',
      email: 'institution@radi.app',
      userType: 'institution',
      location: 'Algeria'
    }
  ];

  const validPasswords = ['admin123', 'farmer123', 'insurer123', 'institution123'];
  const user = demoUsers.find(user => user.email === email);
  
  if (user && validPasswords.includes(password)) {
    return user;
  }
  
  return null;
};

// Dashboard routing
export const getDashboardRoute = (userType: string): string => {
  switch (userType) {
    case 'farmer':
      return '/farmer-dashboard';
    case 'insurer':
      return '/insurer-dashboard';
    case 'admin':
      return '/admin-dashboard';
    case 'institution':
      return '/institution-dashboard';
    default:
      return '/';
  }
};

// Farmer profile management
export const getCurrentProfile = (): string => {
  return localStorage.getItem('currentProfile') || 'ahmed';
};

export const switchFarmerProfile = (profileId: string) => {
  localStorage.setItem('currentProfile', profileId);
  // Trigger page refresh to update data
  window.location.reload();
};

export const getDemoInsurerData = () => {
  return {
    company: {
      name: "CRMA",
      fullName: "La Caisse Régionale de Mutualité Agricole",
      license: "INS-DZ-2019-001",
      office: "Algiers Head Office",
      marketShare: "34% Market Leader",
      ranking: "#1 Agricultural Insurer"
    },
    kpis: {
      totalFarmers: 2847,
      totalArea: 45680,
      riskDistribution: {
        low: 45,
        medium: 35,
        high: 20
      }
    },
    farmers: [
      {
        id: 1,
        name: "Ahmed Benali",
        location: "Skikda Province",
        crop: "Mixed Crops",
        area: 27.4,
        risk: "Medium",
        riskScore: "6.5/10",
        documentation: "Complete profile with 4 monitored plots",
        validation: "RADI Validated",
        policy: "AGR-2024-001",
        lastUpdate: "2024-01-15"
      },
      {
        id: 2,
        name: "Salem Khrobi",
        location: "Constantine, Lkhrob",
        crop: "Olives",
        area: 10,
        risk: "High",
        riskScore: "8.2/10",
        documentation: "Drought monitoring active, satellite confirmed",
        validation: "RADI Validated",
        policy: "AGR-2024-002",
        lastUpdate: "2024-06-03"
      },
      {
        id: 3,
        name: "Hamza Dawdi",
        location: "Constantine, Mezaguet Roha",
        crop: "Durum Wheat",
        area: 9,
        risk: "Low",
        riskScore: "3.1/10",
        documentation: "Hailstorm damage validated, claim processed",
        validation: "RADI Validated",
        policy: "AGR-2023-003",
        lastUpdate: "2023-05-20"
      }
    ],
    alerts: [
      {
        id: 1,
        title: "High LST Anomaly Detected",
        farmer: "Salem Khrobi",
        location: "Constantine",
        severity: "high",
        time: "3 hours ago"
      },
      {
        id: 2,
        title: "Irrigation Schedule Optimization",
        farmer: "Ahmed Benali", 
        location: "Skikda",
        severity: "medium",
        time: "6 hours ago"
      },
      {
        id: 3,
        title: "Post-Storm Recovery Assessment",
        farmer: "Hamza Dawdi",
        location: "Constantine",
        severity: "low",
        time: "2 days ago"
      }
    ],
    recentActivity: [
      "Salem Khrobi profile updated with high drought risk assessment",
      "Hamza Dawdi claim settlement completed for hailstorm damage",
      "Ahmed Benali irrigation optimization recommendations generated",
      "New weather monitoring alerts configured for Constantine region",
      "Monthly risk assessment reports generated for all active policies"
    ],
    documentation: [
      {
        id: 1,
        type: "Hailstorm Damage Assessment",
        farmer: "Hamza Dawdi",
        location: "Constantine, Mezaguet Roha",
        date: "2023-05-19",
        status: "Validated",
        documentId: "CRMA-DOC-2023-001",
        evidence: "Sentinel-2 satellite imagery confirms crop damage pattern consistent with hailstorm. NDVI drop from 0.22 to 0.18 in affected areas.",
        weatherData: "CAPE: 2850 J/kg, Lifted Index: -5.8°C, confirming severe hailstorm conditions on May 19, 2023."
      },
      {
        id: 2,
        type: "Drought Risk Assessment",
        farmer: "Salem Khrobi",
        location: "Constantine, Lkhrob",
        date: "2024-06-03",
        status: "Under Review",
        evidence: "LST anomaly +4.3°C detected via MODIS data. Precipitation deficit of 38mm below seasonal average.",
        weatherData: "Extended dry period confirmed through meteorological station data and satellite precipitation estimates."
      },
      {
        id: 3,
        type: "Routine Monitoring",
        farmer: "Ahmed Benali",
        location: "Skikda Province",
        date: "2024-01-15",
        status: "Validated"
      }
    ]
  };
};
