
import React, { useState } from 'react';
import InsurerDashboardLayout from '@/components/InsurerDashboardLayout';
import InsurerDashboardOverview from '@/components/InsurerDashboardOverview';
import FarmerManagement from '@/components/insurer/FarmerManagement';
import RiskAssessment from '@/components/insurer/RiskAssessment';
import RiskAlerts from '@/components/insurer/RiskAlerts';
import HistoricalRiskData from '@/components/insurer/HistoricalRiskData';

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
      case 'historical':
        return <HistoricalRiskData />;
      case 'alerts':
        return <RiskAlerts />;
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
