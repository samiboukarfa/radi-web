
import React, { useState } from 'react';
import InsurerDashboardLayout from '@/components/InsurerDashboardLayout';
import InsurerDashboardOverview from '@/components/InsurerDashboardOverview';

// Placeholder components for other sections
const PlaceholderContent: React.FC<{ title: string; description: string }> = ({ title, description }) => (
  <div className="space-y-6">
    <div className="text-center py-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">{title}</h2>
      <p className="text-gray-600 max-w-md mx-auto">{description}</p>
      <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg max-w-md mx-auto">
        <p className="text-sm text-blue-700">
          This section is under development. Advanced insurer features will be populated in subsequent updates.
        </p>
      </div>
    </div>
  </div>
);

const InsurerDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <InsurerDashboardOverview />;
      case 'farmers':
        return (
          <PlaceholderContent 
            title="Farmer Management" 
            description="Comprehensive farmer registration, management, and policy administration system with bulk operations and detailed farmer profiles."
          />
        );
      case 'risk':
        return (
          <PlaceholderContent 
            title="Risk Assessment" 
            description="Advanced risk scoring system with regional analysis, predictive modeling, and real-time risk monitoring for individual farmers and geographic areas."
          />
        );
      case 'claims':
        return (
          <PlaceholderContent 
            title="Claims & Alerts Management" 
            description="Streamlined claims processing workflow with automated validation, satellite imagery analysis, and real-time alert management system."
          />
        );
      case 'reports':
        return (
          <PlaceholderContent 
            title="Reports & Analytics" 
            description="Comprehensive reporting suite with performance analytics, risk trend analysis, financial reports, and customizable data exports."
          />
        );
      case 'portfolio':
        return (
          <PlaceholderContent 
            title="Portfolio Management" 
            description="Complete portfolio overview with policy management, premium tracking, coverage analysis, and financial performance monitoring."
          />
        );
      default:
        return <InsurerDashboardOverview />;
    }
  };

  return (
    <InsurerDashboardLayout 
      activeSection={activeSection}
      onSectionChange={setActiveSection}
    >
      {renderContent()}
    </InsurerDashboardLayout>
  );
};

export default InsurerDashboard;
