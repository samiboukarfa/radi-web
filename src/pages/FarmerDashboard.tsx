
import React, { useState } from 'react';
import FarmerDashboardLayout from '@/components/FarmerDashboardLayout';
import FarmerDashboardOverview from '@/components/FarmerDashboardOverview';

// Placeholder components for other sections
const PlaceholderContent: React.FC<{ title: string; description: string }> = ({ title, description }) => (
  <div className="space-y-6">
    <div className="text-center py-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">{title}</h2>
      <p className="text-gray-600 max-w-md mx-auto">{description}</p>
      <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg max-w-md mx-auto">
        <p className="text-sm text-blue-700">
          This section is under development. Content will be populated in subsequent updates.
        </p>
      </div>
    </div>
  </div>
);

const FarmerDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <FarmerDashboardOverview />;
      case 'plots':
        return (
          <PlaceholderContent 
            title="My Plots" 
            description="Manage and monitor all your agricultural plots with real-time data and mapping capabilities."
          />
        );
      case 'risk':
        return (
          <PlaceholderContent 
            title="Risk Monitoring" 
            description="Real-time risk assessment and monitoring for all your plots with AI-powered insights."
          />
        );
      case 'weather':
        return (
          <PlaceholderContent 
            title="Weather Data" 
            description="Detailed weather information, forecasts, and climate data for your location."
          />
        );
      case 'sensors':
        return (
          <PlaceholderContent 
            title="Sensor Data" 
            description="IoT sensor readings including soil moisture, temperature, and other environmental factors."
          />
        );
      case 'reports':
        return (
          <PlaceholderContent 
            title="Reports" 
            description="Generate and view detailed reports on crop performance, yield predictions, and historical data."
          />
        );
      case 'alerts':
        return (
          <PlaceholderContent 
            title="Alerts & Notifications" 
            description="Manage all your notifications, warnings, and important updates about your farm operations."
          />
        );
      case 'profile':
        return (
          <PlaceholderContent 
            title="Profile Settings" 
            description="Manage your account settings, preferences, and personal information."
          />
        );
      default:
        return <FarmerDashboardOverview />;
    }
  };

  return (
    <FarmerDashboardLayout 
      activeSection={activeSection}
      onSectionChange={setActiveSection}
    >
      {renderContent()}
    </FarmerDashboardLayout>
  );
};

export default FarmerDashboard;
