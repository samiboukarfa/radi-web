import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { RiskCalculationResult, ClimateHazard } from '@/utils/riskScore';
import { X } from 'lucide-react';

interface RiskScoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: RiskCalculationResult;
  hazard: ClimateHazard;
}

const RiskScoreModal: React.FC<RiskScoreModalProps> = ({
  isOpen,
  onClose,
  result,
  hazard
}) => {
  const getRiskBadgeColor = (level: string) => {
    switch (level) {
      case 'Low':
        return 'bg-green-100 text-green-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'High':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getParameterDisplayName = (param: string): string => {
    const displayNames: Record<string, string> = {
      NDVI: 'Normalized Difference Vegetation Index',
      EVI: 'Enhanced Vegetation Index',
      NDMI: 'Normalized Difference Moisture Index',
      LST: 'Land Surface Temperature',
      LSTAnomaly: 'LST Anomaly',
      totalRainfall: 'Total Rainfall',
      rainfallAnomaly: 'Rainfall Anomaly',
      liftedIndex: 'Lifted Index',
      CAPE: 'Convective Available Potential Energy',
      windShear: 'Vertical Wind Shear',
      ETa: 'Actual Evapotranspiration',
      weatherAlerts: 'Government Weather Alerts'
    };
    return displayNames[param] || param;
  };

  const getParameterUnit = (param: string): string => {
    const units: Record<string, string> = {
      NDVI: '',
      EVI: '',
      NDMI: '',
      LST: '°C',
      LSTAnomaly: '°C',
      totalRainfall: 'mm/day',
      rainfallAnomaly: 'mm',
      liftedIndex: '°C',
      CAPE: 'J/kg',
      windShear: 'm/s',
      ETa: 'mm/day',
      weatherAlerts: 'count'
    };
    return units[param] || '';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-xl font-bold">
                Risk Score Breakdown - {hazard}
              </DialogTitle>
              <DialogDescription>
                Detailed calculation showing how each parameter contributes to the final risk score
              </DialogDescription>
            </div>
            <button
              onClick={onClose}
              className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Final Score Summary */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Final Risk Score</h3>
                <p className="text-sm text-gray-600">For {hazard} climate hazard</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-gray-900">
                  {result.finalScore}/10
                </div>
                <Badge className={getRiskBadgeColor(result.riskLevel)}>
                  {result.riskLevel} Risk
                </Badge>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className={`h-3 rounded-full transition-all duration-300 ${
                  result.riskLevel === 'Low' ? 'bg-green-500' :
                  result.riskLevel === 'Medium' ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${(result.finalScore / 10) * 100}%` }}
              />
            </div>
          </div>

          {/* Parameter Breakdown Table */}
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-6 py-3 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Parameter Contributions</h3>
              <p className="text-sm text-gray-600">How each environmental factor affects the risk score</p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Parameter
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Raw Value
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Normalized Score (/10)
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Weight (%)
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contribution
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Impact
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {result.breakdown
                    .sort((a, b) => b.weightedScore - a.weightedScore)
                    .map((item, index) => (
                    <tr key={item.parameter} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {item.parameter}
                          </div>
                          <div className="text-xs text-gray-500">
                            {getParameterDisplayName(item.parameter)}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {typeof item.rawValue === 'number' ? 
                          item.rawValue.toFixed(item.rawValue < 1 ? 2 : 1) : 
                          item.rawValue
                        }
                        <span className="text-xs text-gray-500 ml-1">
                          {getParameterUnit(item.parameter)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-gray-900">
                            {item.normalizedScore.toFixed(1)}
                          </span>
                          <div className="w-20">
                            <Progress 
                              value={(item.normalizedScore / 10) * 100} 
                              className="h-2"
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {item.weight.toFixed(1)}%
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-sm font-medium ${
                          item.weightedScore > 0.5 ? 'text-red-600' :
                          item.weightedScore > 0.2 ? 'text-yellow-600' : 'text-green-600'
                        }`}>
                          {item.weightedScore.toFixed(2)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="w-24">
                          <div 
                            className={`h-2 rounded-full ${
                              item.weightedScore > 0.5 ? 'bg-red-500' :
                              item.weightedScore > 0.2 ? 'bg-yellow-500' : 'bg-green-500'
                            }`}
                            style={{ 
                              width: `${Math.min((item.weightedScore / Math.max(...result.breakdown.map(b => b.weightedScore))) * 100, 100)}%` 
                            }}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Methodology Note */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-blue-900 mb-2">Calculation Methodology</h4>
            <div className="text-xs text-blue-800 space-y-1">
              <p>• Each parameter is normalized to a 0-10 scale where 0 = lowest risk, 10 = highest risk</p>
              <p>• Weights are specific to the {hazard.toLowerCase()} hazard type based on RADI algorithm</p>
              <p>• Final score = Σ(normalized score × weight) for all parameters</p>
              <p>• Risk levels: Low (0-3), Medium (3-6), High (6-10)</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RiskScoreModal;