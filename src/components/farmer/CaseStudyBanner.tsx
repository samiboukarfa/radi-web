import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getCurrentProfile } from '@/utils/auth';
import { Award, MapPin, Calendar, TrendingDown, TrendingUp, AlertTriangle, CheckCircle, Eye } from 'lucide-react';
const CaseStudyBanner: React.FC = () => {
  const currentProfile = getCurrentProfile();
  if (currentProfile === 'ahmed') {
    return null; // No banner for the default profile
  }
  const caseStudyData = {
    salem: {
      title: 'Constantine olive grove monitoring - Drought and hail conditions managed',
      subtitle: 'Olive Cultivation Monitoring',
      location: 'Lkhrob, Constantine, Algeria',
      period: 'June 2024 - Ongoing',
      riskScore: '8.0/10',
      riskLevel: 'Low Risk',
      status: 'Active Monitoring',
      highlights: ['NDVI: 0.31 (Stable vegetation health)', 'Rainfall Anomaly: -38mm (Moderate drought)', 'LST Anomaly: +4.3°C (Heat stress monitoring)', 'CRMA Policy: CRMA-AGR-2024-002'],
      description: 'This monitoring demonstrates RADI\'s capability to monitor olive cultivation under drought and hail conditions in the Constantine region. Despite challenging weather patterns, the farm maintains low risk through effective management.',
      icon: TrendingUp,
      color: 'green'
    },
    hamza: {
      title: 'Hailstorm Damage Validation & Claims Processing',
      subtitle: 'Hailstorm Damage Validation & Claims Processing',
      location: 'Mezaguet Roha, Constantine, Algeria',
      period: 'May 2023 - Claim Processed',
      riskScore: '3.0/10',
      riskLevel: 'High Risk',
      status: 'Claim Approved',
      highlights: ['Pre-storm NDVI: 0.22 → Post-storm: 0.18', 'Weather Event: CAPE 2850 J/kg, LI -5.8°C', 'Damage Confirmed: Satellite evidence', 'CRMA Claim: 45,000 DZD (Approved & Paid)'],
      description: 'This validation demonstrates RADI\'s predictive accuracy. The system correctly identified high-risk conditions before the May 19, 2023 hailstorm, and satellite evidence confirmed crop damage, leading to successful claim processing.',
      icon: AlertTriangle,
      color: 'red'
    }
  };
  const data = caseStudyData[currentProfile as keyof typeof caseStudyData];
  if (!data) return null;
  const IconComponent = data.icon;
  return <Card className={`border-2 ${data.color === 'green' ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'} mb-6`}>
      
    </Card>;
};
export default CaseStudyBanner;