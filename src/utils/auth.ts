
export interface User {
  id: string;
  name: string;
  email: string;
  userType: 'farmer' | 'insurer' | 'institution' | 'admin';
  location: string;
  farmSize?: number;
  profilePicture?: string;
}

// Demo farmer data
export const getDemoFarmerData = () => ({
  personalInfo: {
    name: "Ahmed Ben Salem",
    farmerId: "FARM-SKD-2024-001",
    email: "ahmed.bensalem@example.com",
    phone: "+213 555 0123",
    location: "Skikda, Algeria",
    farmSize: 65.4,
    coordinates: [36.8765, 6.9811] as [number, number],
    joinDate: "2023-03-15",
    lastLogin: "2024-02-15T09:30:00Z"
  },
  farmDetails: {
    totalArea: 65.4,
    cultivatedArea: 58.2,
    irrigatedArea: 42.1,
    primaryCrops: ["Wheat", "Barley", "Olives", "Vegetables"],
    soilTypes: ["Clay Loam", "Sandy Loam", "Organic Rich"],
    waterSources: ["Groundwater", "Drip Irrigation"],
    equipment: ["Tractor", "Harvester", "Irrigation System"]
  },
  riskProfile: {
    overallScore: 65,
    weatherRisk: 70,
    soilRisk: 45,
    cropRisk: 60,
    locationRisk: 55,
    historicalLosses: [
      { year: 2023, type: "Drought", severity: "Medium", area: 12.5 },
      { year: 2022, type: "Hail", severity: "Low", area: 5.2 }
    ]
  },
  alerts: [
    {
      id: 1,
      type: "weather",
      severity: "medium",
      title: "High Temperature Alert",
      message: "Temperatures expected to reach 38°C this week",
      timestamp: "2024-02-15T08:00:00Z",
      location: "North Field"
    },
    {
      id: 2,
      type: "soil",
      severity: "low",
      title: "Soil Moisture Low",
      message: "North field soil moisture below optimal levels",
      timestamp: "2024-02-14T14:30:00Z",
      location: "North Field"
    }
  ],
  recentActivity: [
    "Risk assessment updated for wheat crop",
    "Weather alert resolved for south field",
    "Sensor data synchronized for all plots",
    "Documentation submitted for storm damage",
    "Risk score recalculated based on recent data"
  ]
});

// Demo insurer data
export const getDemoInsurerData = () => ({
  company: {
    name: "CRMA",
    fullName: "La Caisse Régionale de Mutualité Agricole",
    license: "INS-ALG-2020-CRMA",
    office: "Skikda Regional Office",
    marketShare: "Leading Regional Provider",
    ranking: "#1 in Eastern Algeria"
  },
  kpis: {
    totalFarmers: 75,
    totalArea: 4250,
    riskDistribution: {
      low: 45,
      medium: 35,
      high: 20
    }
  },
  farmers: [
    {
      id: 1,
      name: "Ahmed Ben Salem",
      location: "Skikda",
      crop: "Wheat & Olives",
      area: 65.4,
      risk: "Low",
      riskScore: 2.5,
      documentation: "Complete Profile",
      validation: "RADI Verified",
      policy: "Active",
      lastUpdate: "2024-02-15"
    },
    {
      id: 2,
      name: "Fatima Kaddour",
      location: "Constantine",
      crop: "Barley & Vegetables",
      area: 42.1,
      risk: "Medium",
      riskScore: 5.8,
      documentation: "Profile Updated",
      validation: "Assessment Complete",
      policy: "Active",
      lastUpdate: "2024-02-14"
    },
    {
      id: 3,
      name: "Hamza Dawdi",
      location: "Setif",
      crop: "Wheat",
      area: 28.5,
      risk: "High",
      riskScore: 8.2,
      documentation: "Documentation Submitted",
      validation: "Under Review",
      policy: "Pending",
      lastUpdate: "2024-02-13"
    }
  ],
  alerts: [
    {
      id: 1,
      title: "High Risk Weather Pattern Detected",
      severity: "high",
      farmer: "Hamza Dawdi",
      location: "Setif",
      time: "2 hours ago"
    },
    {
      id: 2,
      title: "Sensor Battery Low - Maintenance Required",
      severity: "medium",
      farmer: "Ahmed Ben Salem",
      location: "Skikda",
      time: "4 hours ago"
    },
    {
      id: 3,
      title: "Risk Assessment Update Required",
      severity: "low",
      farmer: "Fatima Kaddour",
      location: "Constantine",
      time: "1 day ago"
    }
  ],
  documentation: [
    {
      id: 1,
      farmer: "Hamza Dawdi",
      type: "Hailstorm Damage Assessment",
      status: "Validated",
      date: "2024-01-20",
      location: "Setif",
      documentId: "DOC-2024-001",
      evidence: "Satellite imagery confirms 15% crop damage in northern section. NDVI analysis shows significant vegetation stress patterns consistent with hail impact.",
      weatherData: "Meteorological data confirms severe hailstorm on January 19, 2024, with hail diameter 2-3cm recorded at nearby weather station."
    },
    {
      id: 2,
      farmer: "Ahmed Ben Salem",
      type: "Drought Impact Documentation",
      status: "Under Review",
      date: "2024-01-18",
      location: "Skikda",
      documentId: "DOC-2024-002",
      evidence: "NDVI trending analysis shows declining vegetation health over 3-week period. Soil moisture sensors confirm extended dry conditions.",
      weatherData: "Regional precipitation 65% below seasonal average. Temperature consistently 3-4°C above normal for January period."
    },
    {
      id: 3,
      farmer: "Fatima Kaddour",
      type: "Preventive Assessment",
      status: "Completed",
      date: "2024-01-15",
      location: "Constantine",
      documentId: "DOC-2024-003"
    }
  ],
  recentActivity: [
    "Risk assessment completed for Hamza Dawdi (Setif region)",
    "Documentation validated for hailstorm damage using satellite data",
    "Weather alert system activated for high-risk areas",
    "Farmer profile updated with latest RADI scores",
    "Regional risk analysis updated with new meteorological data"
  ]
});

// Demo institution data
export const getDemoInstitutionData = () => ({
  organization: {
    name: "Ministry of Agriculture and Rural Development",
    department: "Agricultural Risk Management Division",
    location: "Algiers, Algeria",
    jurisdiction: "National"
  },
  metrics: {
    totalFarmers: 2500000,
    insuredFarmers: 185000,
    coverage: 7.4,
    registeredInsurers: 12,
    activePrograms: 8
  },
  recentActivity: [
    "New agricultural risk framework published",
    "RADI methodology validation completed",
    "Regional insurer licensing updated",
    "Farmer registration system upgraded",
    "Weather monitoring network expanded"
  ]
});

// User session management
let currentUser: User | null = null;

export const setUserSession = (user: User) => {
  currentUser = user;
  localStorage.setItem('currentUser', JSON.stringify(user));
};

export const getUserSession = (): User | null => {
  if (currentUser) return currentUser;
  
  const stored = localStorage.getItem('currentUser');
  if (stored) {
    currentUser = JSON.parse(stored);
    return currentUser;
  }
  
  return null;
};

export const clearUserSession = () => {
  currentUser = null;
  localStorage.removeItem('currentUser');
};

// Current farmer profile management
let currentProfile = 'ahmed';

export const switchFarmerProfile = (profileId: string) => {
  currentProfile = profileId;
  localStorage.setItem('currentProfile', profileId);
};

export const getCurrentProfile = (): string => {
  const stored = localStorage.getItem('currentProfile');
  return stored || 'ahmed';
};

// Authentication helper functions
export const isAuthenticated = (): boolean => {
  return getUserSession() !== null;
};

export const getDashboardRoute = (userType: string): string => {
  switch (userType) {
    case 'farmer':
      return '/farmer-dashboard';
    case 'insurer':
      return '/insurer-dashboard';
    case 'institution':
      return '/institution-dashboard';
    case 'admin':
      return '/admin-dashboard';
    default:
      return '/';
  }
};

// Demo login function
export const authenticateUser = (email: string, password: string): User | null => {
  // Demo users for different roles
  const demoUsers: User[] = [
    {
      id: "farmer-001",
      name: "Ahmed Ben Salem",
      email: "farmer@radi.app",
      userType: "farmer",
      location: "Skikda, Algeria",
      farmSize: 65.4
    },
    {
      id: "insurer-001", 
      name: "CRMA Representative",
      email: "crma@radi.app",
      userType: "insurer",
      location: "Skikda Regional Office"
    },
    {
      id: "institution-001",
      name: "Ministry Official",
      email: "institution@radi.app", 
      userType: "institution",
      location: "Algiers, Algeria"
    },
    {
      id: "admin-001",
      name: "System Administrator",
      email: "admin@radi.app",
      userType: "admin", 
      location: "System Admin"
    }
  ];

  const user = demoUsers.find(u => u.email === email);
  if (user && (password === "farmer123" || password === "insurer123" || password === "institution123" || password === "admin123")) {
    setUserSession(user);
    return user;
  }
  
  return null;
};

export const loginUser = authenticateUser;
