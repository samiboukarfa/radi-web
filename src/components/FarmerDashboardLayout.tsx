import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { clearUserSession, getUserSession, switchFarmerProfile, getCurrentProfile } from '@/utils/auth';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, MapPin, AlertTriangle, Cloud, Activity, FileText, Bell, Settings, LogOut, Menu, X, ChevronDown, Award, Users } from 'lucide-react';
interface FarmerDashboardLayoutProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  children: React.ReactNode;
}
const FarmerDashboardLayout: React.FC<FarmerDashboardLayoutProps> = ({
  activeSection,
  onSectionChange,
  children
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const user = getUserSession();
  const currentProfile = getCurrentProfile();
  useEffect(() => {
    if (!user || user.userType !== 'farmer') {
      navigate('/login');
    }
  }, [user, navigate]);
  const handleLogout = () => {
    clearUserSession();
    navigate('/');
  };
  const navigationItems = [{
    id: 'dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard
  }, {
    id: 'plots',
    label: 'My Plots',
    icon: MapPin
  }, {
    id: 'risk',
    label: 'Risk Monitoring',
    icon: AlertTriangle
  }, {
    id: 'weather',
    label: 'Weather',
    icon: Cloud
  }, {
    id: 'sensors',
    label: 'Sensors',
    icon: Activity
  }, {
    id: 'reports',
    label: 'Reports',
    icon: FileText
  }, {
    id: 'alerts',
    label: 'Alerts',
    icon: Bell
  }, {
    id: 'profile',
    label: 'Profile',
    icon: Settings
  }];
  const farmerProfiles = [{
    id: 'ahmed',
    name: 'Ahmed Benali',
    location: 'Skikda, Algeria',
    description: 'Original demo farmer - Mixed crops',
    isDefault: true
  }, {
    id: 'salem',
    name: 'Salem Khrobi',
    location: 'Lkhrob, Constantine',
    description: 'Case Study: Olive cultivation with drought monitoring',
    isCaseStudy: true
  }, {
    id: 'hamza',
    name: 'Hamza Dawdi',
    location: 'Mezaguet Roha, Constantine',
    description: 'Case Study: Wheat farming with hailstorm claim',
    isCaseStudy: true
  }];
  const currentProfileData = farmerProfiles.find(p => p.id === currentProfile) || farmerProfiles[0];
  const handleProfileSwitch = (profileId: string) => {
    switchFarmerProfile(profileId);
    setIsProfileDropdownOpen(false);
  };
  const NavItem: React.FC<{
    item: any;
    isMobile?: boolean;
  }> = ({
    item,
    isMobile = false
  }) => <button onClick={() => {
    onSectionChange(item.id);
    if (isMobile) setIsMobileMenuOpen(false);
  }} className={`
        flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200
        ${activeSection === item.id ? 'bg-agri-green text-white shadow-md' : 'text-gray-700 hover:bg-green-50 hover:text-agri-green'}
        ${isMobile ? 'w-full justify-start' : ''}
      `}>
      <item.icon className="h-5 w-5" />
      <span className="font-medium">{item.label}</span>
    </button>;
  if (!user) return null;
  return <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Profile Switcher */}
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-agri-green rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">R</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">RADI</h1>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Farmer Dashboard</span>
                  <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs font-medium rounded-full">
                    DEMO MODE
                  </span>
                  {currentProfileData.isCaseStudy && <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full flex items-center">
                      <Award className="h-3 w-3 mr-1" />
                      Case Study
                    </span>}
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navigationItems.map(item => <NavItem key={item.id} item={item} />)}
            </nav>

            {/* User Info and Actions */}
            <div className="flex items-center space-x-4">
              {/* Profile Switcher */}
              <div className="relative">
                
                
                {isProfileDropdownOpen && <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="p-3 border-b border-gray-100">
                      <h3 className="font-medium text-gray-900">Switch Demo Profile</h3>
                      <p className="text-xs text-gray-500">Experience different farmer scenarios</p>
                    </div>
                    <div className="p-2">
                      {farmerProfiles.map(profile => <button key={profile.id} onClick={() => handleProfileSwitch(profile.id)} className={`w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors ${currentProfile === profile.id ? 'bg-green-50 border border-green-200' : ''}`}>
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2">
                                <h4 className="font-medium text-gray-900 text-sm">{profile.name}</h4>
                                {profile.isCaseStudy && <Award className="h-3 w-3 text-blue-600" />}
                                {currentProfile === profile.id && <span className="text-xs text-green-600 font-medium">ACTIVE</span>}
                              </div>
                              <p className="text-xs text-gray-600 mt-1">{profile.location}</p>
                              <p className="text-xs text-gray-500 mt-1">{profile.description}</p>
                            </div>
                          </div>
                        </button>)}
                    </div>
                  </div>}
              </div>

              {/* Notifications */}
              <div className="relative">
                <Button variant="outline" size="sm" className="relative">
                  <Bell className="h-4 w-4" />
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {currentProfile === 'salem' ? '2' : currentProfile === 'hamza' ? '3' : '2'}
                  </span>
                </Button>
              </div>

              {/* User Profile */}
              <div className="hidden md:block text-right">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-600">{user.location}</p>
              </div>

              {/* Logout */}
              <Button onClick={handleLogout} variant="outline" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>

              {/* Mobile Menu Button */}
              <Button variant="outline" size="sm" className="lg:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Click outside handler for profile dropdown */}
      {isProfileDropdownOpen && <div className="fixed inset-0 z-30" onClick={() => setIsProfileDropdownOpen(false)} />}

      {/* Mobile Navigation Overlay */}
      {isMobileMenuOpen && <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
          <div className="bg-white w-80 h-full p-6 space-y-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Navigation</h2>
              <Button variant="outline" size="sm" onClick={() => setIsMobileMenuOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            {navigationItems.map(item => <NavItem key={item.id} item={item} isMobile />)}
          </div>
        </div>}

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>;
};
export default FarmerDashboardLayout;