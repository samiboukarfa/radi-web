
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

  const profileData = {
    salem: {
      title: 'Constantine olive grove monitoring - Drought and hail conditions managed',
      subtitle: 'Olive Cultivation Monitoring',
      location: 'Lkhrob, Constantine, Algeria',
      period: 'June 2024 - Ongoing',
      riskScore: '3.1/10',
      riskLevel: 'Low Risk',
      status: 'Active Monitoring',
      highlights: [
        'NDVI: 0.31 (Stable vegetation health)',
        'Rainfall Anomaly: -38mm (Moderate drought)',
        'LST Anomaly: +4.3°C (Heat stress monitoring)',
        'CRMA Policy: CRMA-AGR-2024-002'
      ],
      description: 'This monitoring demonstrates RADI\'s capability to monitor olive cultivation under drought and hail conditions in the Constantine region. Despite challenging weather patterns, the farm maintains low risk through effective management.',
      icon: TrendingUp,
      color: 'green'
    },
    hamza: {
      title: 'Hailstorm Damage Validation & Claims Processing',
      subtitle: 'Hailstorm Damage Validation & Claims Processing',
      location: 'Mezaguet Roha, Constantine, Algeria',
      period: 'May 2023 - Claim Processed',
      riskScore: '8.2/10',
      riskLevel: 'High Risk',
      status: 'Claim Approved',
      highlights: [
        'Pre-storm NDVI: 0.22 → Post-storm: 0.18',
        'Weather Event: CAPE 2850 J/kg, LI -5.8°C',
        'Damage Confirmed: Satellite evidence',
        'CRMA Claim: 45,000 DZD (Approved & Paid)'
      ],
      description: 'This validation demonstrates RADI\'s predictive accuracy. The system correctly identified high-risk conditions before the May 19, 2023 hailstorm, and satellite evidence confirmed crop damage, leading to successful claim processing.',
      icon: AlertTriangle,
      color: 'red'
    }
  };

  const data = profileData[currentProfile as keyof typeof profileData];
  if (!data) return null;

  const IconComponent = data.icon;

  return (
    <Card className={`border-2 ${data.color === 'green' ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'} mb-6`}>
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <div className={`p-3 rounded-lg ${data.color === 'green' ? 'bg-green-100' : 'bg-red-100'}`}>
            <IconComponent className={`h-8 w-8 ${data.color === 'green' ? 'text-green-600' : 'text-red-600'}`} />
          </div>
          
          <div className="flex-1">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{data.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{data.subtitle}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {data.location}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {data.period}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <Badge variant="outline" className={data.color === 'green' ? 'border-green-500 text-green-700' : 'border-red-500 text-red-700'}>
                  {data.status}
                </Badge>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Risk Score</p>
                  <p className={`font-bold ${data.color === 'green' ? 'text-green-600' : 'text-red-600'}`}>
                    {data.riskScore}
                  </p>
                  <p className="text-xs text-gray-500">{data.riskLevel}</p>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="font-semibold text-gray-900 mb-2">Key Highlights</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {data.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center text-sm text-gray-700">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500 flex-shrink-0" />
                    {highlight}
                  </div>
                ))}
              </div>
            </div>

            <p className="text-sm text-gray-700 leading-relaxed">{data.description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CaseStudyBanner;
