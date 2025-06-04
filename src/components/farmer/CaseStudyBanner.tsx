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
      title: 'Salem Khrobi Case Study',
      subtitle: 'Olive Cultivation Drought Monitoring',
      location: 'Lkhrob, Constantine, Algeria',
      period: 'June 2024 - Ongoing',
      riskScore: '8.0/10',
      riskLevel: 'Low Risk',
      status: 'Active Monitoring',
      highlights: ['NDVI: 0.31 (Stable vegetation health)', 'Rainfall Anomaly: -38mm (Moderate drought)', 'LST Anomaly: +4.3°C (Heat stress monitoring)', 'CNMA Policy: CNMA-AGR-2024-002'],
      description: 'This case study demonstrates RADI\'s capability to monitor olive cultivation under drought conditions in the Constantine region. Despite challenging weather patterns, the farm maintains low risk through effective irrigation management.',
      icon: TrendingUp,
      color: 'green'
    },
    hamza: {
      title: 'Hamza Dawdi Case Study',
      subtitle: 'Hailstorm Damage Validation & Claims Processing',
      location: 'Mezaguet Roha, Constantine, Algeria',
      period: 'May 2023 - Claim Processed',
      riskScore: '3.0/10',
      riskLevel: 'High Risk',
      status: 'Claim Approved',
      highlights: ['Pre-storm NDVI: 0.22 → Post-storm: 0.18', 'Weather Event: CAPE 2850 J/kg, LI -5.8°C', 'Damage Confirmed: Satellite evidence', 'CNMA Claim: 45,000 DZD (Approved & Paid)'],
      description: 'This case study validates RADI\'s predictive accuracy. The system correctly identified high-risk conditions before the May 19, 2023 hailstorm, and satellite evidence confirmed crop damage, leading to successful claim processing.',
      icon: AlertTriangle,
      color: 'red'
    }
  };
  const data = caseStudyData[currentProfile as keyof typeof caseStudyData];
  if (!data) return null;
  const IconComponent = data.icon;
  return <Card className={`border-2 ${data.color === 'green' ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'} mb-6`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4 flex-1">
            <div className={`w-12 h-12 ${data.color === 'green' ? 'bg-green-100' : 'bg-red-100'} rounded-lg flex items-center justify-center`}>
              <IconComponent className={`h-6 w-6 ${data.color === 'green' ? 'text-green-600' : 'text-red-600'}`} />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h2 className="text-xl font-bold text-gray-900">{data.title}</h2>
                
                <Badge className={data.color === 'green' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                  {data.status}
                </Badge>
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">{data.subtitle}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>{data.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>{data.period}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <IconComponent className="h-4 w-4" />
                  <span>Risk Score: {data.riskScore} ({data.riskLevel})</span>
                </div>
              </div>

              <p className="text-sm text-gray-700 mb-4">{data.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {data.highlights.map((highlight, index) => <div key={index} className="flex items-start space-x-2">
                    <CheckCircle className={`h-4 w-4 mt-0.5 ${data.color === 'green' ? 'text-green-600' : 'text-blue-600'}`} />
                    <span className="text-sm text-gray-700">{highlight}</span>
                  </div>)}
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-end space-y-2">
            <Badge variant="outline" className={`${data.color === 'green' ? 'border-green-500 text-green-700' : 'border-red-500 text-red-700'} font-semibold`}>
              RADI Score: {data.riskScore}
            </Badge>
            <button className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-800 transition-colors">
              <Eye className="h-4 w-4" />
              <span>View Full Analysis</span>
            </button>
          </div>
        </div>
      </CardContent>
    </Card>;
};
export default CaseStudyBanner;