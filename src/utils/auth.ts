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
    farmerId: "FARM-CST-2024-001",
    email: "ahmed.bensalem@example.com",
    phone: "+213 555 0123",
    location: "Constantine, Algeria",
    farmSize: 65.4,
    coordinates: [36.3650, 6.6147] as [number, number],
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

// Demo insurer data - Ahmed removed, only Salem and Hamza
export const getDemoInsurerData = () => ({
  company: {
    name: "CRMA",
    fullName: "La Caisse Régionale de Mutualité Agricole",
    license: "INS-ALG-2020-CRMA",
    office: "Constantine Regional Office",
    marketShare: "Leading Regional Provider",
    ranking: "#1 in Eastern Algeria"
  },
  kpis: {
    totalFarmers: 2,
    totalArea: 70.6,
    riskDistribution: {
      low: 50,
      medium: 0,
      high: 50
    }
  },
  farmers: [
    {
      id: 2,
      name: "Salem Khrobi",
      location: "Constantine",
      crop: "Olives",
      area: 42.1,
      risk: "Low",
      riskScore: 3.1,
      documentation: "Profile Updated",
      validation: "Assessment Complete",
      policy: "Active",
      lastUpdate: "2024-02-14"
    },
    {
      id: 3,
      name: "Hamza Dawdi",
      location: "Constantine",
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
      location: "Constantine",
      time: "2 hours ago"
    },
    {
      id: 2,
      title: "Risk Assessment Update Required",
      severity: "low",
      farmer: "Salem Khrobi",
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
      location: "Constantine",
      documentId: "DOC-2024-001",
      evidence: "Satellite imagery confirms 15% crop damage in northern section. NDVI analysis shows significant vegetation stress patterns consistent with hail impact.",
      weatherData: "Meteorological data confirms severe hailstorm on January 19, 2024, with hail diameter 2-3cm recorded at nearby weather station."
    },
    {
      id: 3,
      farmer: "Salem Khrobi",
      type: "Preventive Assessment",
      status: "Completed",
      date: "2024-01-15",
      location: "Constantine",
      documentId: "DOC-2024-003"
    }
  ],
  recentActivity: [
    "Risk assessment completed for Hamza Dawdi (Constantine region)",
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
  const demoUsers: User[] = [
    {
      id: "farmer-001",
      name: "Ahmed Ben Salem",
      email: "farmer@radi.app",
      userType: "farmer",
      location: "Constantine, Algeria",
      farmSize: 65.4
    },
    {
      id: "farmer-002",
      name: "Salem Khrobi",
      email: "salem@radi.app",
      userType: "farmer",
      location: "Constantine, Algeria",
      farmSize: 42.1
    },
    {
      id: "farmer-003",
      name: "Hamza Dawdi",
      email: "hamza@radi.app",
      userType: "farmer",
      location: "Constantine, Algeria",
      farmSize: 28.5
    },
    {
      id: "insurer-001", 
      name: "CRMA Representative",
      email: "crma@radi.app",
      userType: "insurer",
      location: "Constantine Regional Office"
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
    
    // Set the appropriate farmer profile based on which farmer is logging in
    if (user.userType === "farmer") {
      if (user.email === "salem@radi.app") {
        switchFarmerProfile("salem");
      } else if (user.email === "hamza@radi.app") {
        switchFarmerProfile("hamza");
      } else {
        switchFarmerProfile("ahmed");
      }
    }
    
    return user;
  }
  
  return null;
};

export const loginUser = authenticateUser;
