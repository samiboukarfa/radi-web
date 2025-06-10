
import React, { useState } from 'react';
import InsurerDashboardLayout from '@/components/InsurerDashboardLayout';
import InsurerDashboardOverview from '@/components/InsurerDashboardOverview';
import FarmerManagement from '@/components/insurer/FarmerManagement';
import RiskAssessment from '@/components/insurer/RiskAssessment';
import RiskAlerts from '@/components/insurer/RiskAlerts';
import ReportsAnalytics from '@/components/insurer/ReportsAnalytics';

const InsurerDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <InsurerDashboardOverview />;
      case 'farmers':
        return <FarmerManagement />;
      case 'risk':
        return <RiskAssessment />;
      case 'alerts':
        return <RiskAlerts />;
      case 'reports':
        return <ReportsAnalytics />;
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
