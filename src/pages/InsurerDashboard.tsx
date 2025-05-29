
import React, { useState } from 'react';
import InsurerDashboardLayout from '@/components/InsurerDashboardLayout';
import InsurerDashboardOverview from '@/components/InsurerDashboardOverview';
import FarmerManagement from '@/components/insurer/FarmerManagement';
import RiskAssessment from '@/components/insurer/RiskAssessment';
import ClaimsAlerts from '@/components/insurer/ClaimsAlerts';
import ReportsAnalytics from '@/components/insurer/ReportsAnalytics';
import PortfolioManagement from '@/components/insurer/PortfolioManagement';

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
      case 'claims':
        return <ClaimsAlerts />;
      case 'reports':
        return <ReportsAnalytics />;
      case 'portfolio':
        return <PortfolioManagement />;
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
