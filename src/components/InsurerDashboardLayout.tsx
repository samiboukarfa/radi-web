import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { clearUserSession, getUserSession, getDemoInsurerData } from '@/utils/auth';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  AlertTriangle, 
  FileText, 
  Shield,
  Bell,
  LogOut,
  Menu,
  X,
  Award
} from 'lucide-react';

interface InsurerDashboardLayoutProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  children: React.ReactNode;
}

const InsurerDashboardLayout: React.FC<InsurerDashboardLayoutProps> = ({
  activeSection,
  onSectionChange,
  children
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const user = getUserSession();
  const insurerData = getDemoInsurerData();

  useEffect(() => {
    if (!user || user.userType !== 'insurer') {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    clearUserSession();
    navigate('/');
  };

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'farmers', label: 'Farmer Management', icon: Users },
    { id: 'risk', label: 'Risk Assessment', icon: AlertTriangle },
    { id: 'alerts', label: 'Risk & Alerts', icon: Bell },
    { id: 'reports', label: 'Reports & Analytics', icon: FileText }
  ];

  const NavItem: React.FC<{ item: any; isMobile?: boolean }> = ({ item, isMobile = false }) => (
    <button
      onClick={() => {
        onSectionChange(item.id);
        if (isMobile) setIsMobileMenuOpen(false);
      }}
      className={`
        flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200
        ${activeSection === item.id 
          ? 'bg-blue-600 text-white shadow-md' 
          : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
        }
        ${isMobile ? 'w-full justify-start' : ''}
      `}
    >
      <item.icon className="h-5 w-5" />
      <span className="font-medium">{item.label}</span>
    </button>
  );

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Company Info */}
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-blue-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">C</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  {insurerData.company.name}
                </h1>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">{insurerData.company.office}</span>
                  <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs font-medium rounded-full">
                    DEMO MODE
                  </span>
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full flex items-center">
                    <Award className="h-3 w-3 mr-1" />
                    Market Leader
                  </span>
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navigationItems.map((item) => (
                <NavItem key={item.id} item={item} />
              ))}
            </nav>

            {/* User Info and Actions */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <div className="relative">
                <Button variant="outline" size="sm" className="relative">
                  <Bell className="h-4 w-4" />
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {insurerData.alerts.length}
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
              <Button
                variant="outline"
                size="sm"
                className="lg:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
          <div className="bg-white w-80 h-full p-6 space-y-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Navigation</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            {navigationItems.map((item) => (
              <NavItem key={item.id} item={item} isMobile />
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default InsurerDashboardLayout;
