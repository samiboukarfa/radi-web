
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getUserSession, clearUserSession, switchFarmerProfile, getCurrentProfile } from '@/utils/auth';
import { getFarmerProfile } from '@/utils/farmerProfiles';
import { 
  Bell, 
  MapPin, 
  AlertTriangle, 
  Cloud, 
  BarChart2, 
  FileText, 
  User, 
  LogOut,
  Menu,
  X,
  Home,
  Users
} from 'lucide-react';

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  badge?: number;
}

const navigationItems: NavigationItem[] = [
  { id: 'dashboard', label: 'Dashboard Overview', icon: Home },
  { id: 'plots', label: 'My Plots', icon: MapPin },
  { id: 'risk', label: 'Risk Monitoring', icon: AlertTriangle, badge: 2 },
  { id: 'weather', label: 'Weather Data', icon: Cloud },
  { id: 'sensors', label: 'Sensor Data', icon: BarChart2 },
  { id: 'reports', label: 'Reports', icon: FileText },
  { id: 'alerts', label: 'Alerts', icon: Bell, badge: 2 },
  { id: 'profile', label: 'Profile', icon: User }
];

interface FarmerDashboardLayoutProps {
  children: React.ReactNode;
  activeSection?: string;
  onSectionChange?: (section: string) => void;
}

const FarmerDashboardLayout: React.FC<FarmerDashboardLayoutProps> = ({ 
  children, 
  activeSection = 'dashboard',
  onSectionChange
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState(activeSection);
  const [language, setLanguage] = useState('EN');
  const [currentProfileId, setCurrentProfileId] = useState(getCurrentProfile());
  const navigate = useNavigate();
  
  const user = getUserSession();
  const farmerProfile = getFarmerProfile(currentProfileId);

  useEffect(() => {
    if (!user || user.userType !== 'farmer') {
      navigate('/login');
      return;
    }
  }, [user, navigate]);

  useEffect(() => {
    setCurrentSection(activeSection);
  }, [activeSection]);

  const handleLogout = () => {
    clearUserSession();
    navigate('/');
  };

  const handleSectionChange = (sectionId: string) => {
    setCurrentSection(sectionId);
    setSidebarOpen(false); // Close sidebar on mobile after selection
    if (onSectionChange) {
      onSectionChange(sectionId);
    }
  };

  const handleProfileSwitch = (profileId: string) => {
    setCurrentProfileId(profileId);
    switchFarmerProfile(profileId);
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'EN' ? 'AR' : prev === 'AR' ? 'FR' : 'EN');
  };

  const getSectionTitle = (sectionId: string) => {
    const section = navigationItems.find(item => item.id === sectionId);
    return section?.label || 'Dashboard';
  };

  const profileOptions = [
    { id: 'ahmed', name: 'Ahmed Benali', location: 'Skikda', description: 'Mixed farming (Original)' },
    { id: 'salem', name: 'Salem Khrobi', location: 'Constantine', description: 'Olive cultivation case study' },
    { id: 'hamza', name: 'Hamza Dawdi', location: 'Constantine', description: 'Wheat hailstorm claim case study' }
  ];

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Sidebar Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">R</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-green-700">RADI</h1>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          {/* User Info */}
          <div className="mt-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-700 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {farmerProfile.personalInfo.fullName.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{farmerProfile.personalInfo.fullName}</p>
                <p className="text-xs text-gray-500">Demo Farmer</p>
              </div>
            </div>
            <div className="mt-2 flex items-center space-x-2">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                DEMO MODE
              </span>
              {(currentProfileId === 'salem' || currentProfileId === 'hamza') && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  CASE STUDY
                </span>
              )}
            </div>
          </div>

          {/* Profile Switcher */}
          <div className="mt-4">
            <label className="text-xs font-medium text-gray-600 block mb-2">Switch Demo Profile</label>
            <Select value={currentProfileId} onValueChange={handleProfileSwitch}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {profileOptions.map((profile) => (
                  <SelectItem key={profile.id} value={profile.id}>
                    <div className="flex flex-col">
                      <span className="font-medium">{profile.name}</span>
                      <span className="text-xs text-gray-500">{profile.description}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => handleSectionChange(item.id)}
                className={`
                  w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors
                  ${isActive 
                    ? 'bg-green-700 text-white' 
                    : 'text-gray-700 hover:bg-gray-100 hover:text-green-700'
                  }
                `}
              >
                <div className="flex items-center space-x-3">
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`
                    inline-flex items-center justify-center px-2 py-1 text-xs font-bold rounded-full
                    ${isActive ? 'bg-white text-green-700' : 'bg-red-500 text-white'}
                  `}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-200">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full justify-start text-gray-700 hover:text-red-600 hover:border-red-600"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen lg:ml-0">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left Side - Breadcrumb and Mobile Menu */}
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  {getSectionTitle(currentSection)}
                </h1>
                <p className="text-sm text-gray-500">
                  {farmerProfile.personalInfo.fullName} • {farmerProfile.personalInfo.farmAddress.split(',')[1]} • Last login: Today at {user.lastLogin}
                </p>
              </div>
            </div>

            {/* Right Side - Quick Info and Actions */}
            <div className="flex items-center space-x-4">
              {/* Weather Widget */}
              <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600">
                <Cloud className="h-4 w-4" />
                <span>{farmerProfile.weather.current.temperature}°C</span>
                <span className="text-gray-400">|</span>
                <span>{farmerProfile.weather.current.condition}</span>
              </div>

              {/* Language Toggle */}
              <Button
                variant="outline"
                size="sm"
                onClick={toggleLanguage}
                className="hidden sm:flex"
              >
                {language}
              </Button>

              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {farmerProfile.alerts.length > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {farmerProfile.alerts.length}
                  </span>
                )}
              </Button>

              {/* Profile Indicator */}
              <div className="hidden md:flex items-center space-x-2">
                <Users className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">
                  {profileOptions.find(p => p.id === currentProfileId)?.name}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-6 pb-20 lg:pb-6">
          {/* Case Study Banner */}
          {(currentProfileId === 'salem' || currentProfileId === 'hamza') && (
            <Card className="mb-6 border-blue-200 bg-blue-50">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 text-sm text-blue-800">
                  <AlertTriangle className="h-4 w-4" />
                  <span className="font-medium">Case Study Environment:</span>
                  <span>
                    {currentProfileId === 'salem' 
                      ? 'Salem Khrobi - Constantine olive farm with drought monitoring'
                      : 'Hamza Dawdi - Wheat farm with validated hailstorm claim (CNMA-CLM-2023-001)'
                    }
                  </span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Demo Disclaimer */}
          <Card className="mb-6 border-orange-200 bg-orange-50">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 text-sm text-orange-800">
                <AlertTriangle className="h-4 w-4" />
                <span className="font-medium">Demo Environment:</span>
                <span>This is a demonstration account with sample data for testing purposes.</span>
              </div>
            </CardContent>
          </Card>

          {/* Dynamic Content */}
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation (shown on very small screens) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-1 sm:hidden">
        <div className="flex items-center justify-around">
          {navigationItems.slice(0, 5).map((item) => {
            const Icon = item.icon;
            const isActive = currentSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => handleSectionChange(item.id)}
                className={`
                  flex flex-col items-center p-2 rounded-lg transition-colors relative
                  ${isActive ? 'text-green-700' : 'text-gray-600'}
                `}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs mt-1">{item.label.split(' ')[0]}</span>
                {item.badge && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboardLayout;
