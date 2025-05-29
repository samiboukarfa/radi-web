
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RiskCharts from './RiskCharts';
import { getEnhancedFarmerData, Plot } from '@/utils/farmerData';
import { AlertTriangle, TrendingUp, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

const RiskSection: React.FC = () => {
  const [farmerData] = useState(getEnhancedFarmerData());
  const [selectedPlot, setSelectedPlot] = useState<Plot>(farmerData.plots[0]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Risk Monitoring</h1>
          <p className="text-gray-600">Real-time risk assessment and monitoring for all your plots</p>
        </div>
        <Button variant="outline">
          <Settings className="h-4 w-4 mr-2" />
          Configure Alerts
        </Button>
      </div>

      {/* Plot Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Select Plot for Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {farmerData.plots.map((plot) => (
              <button
                key={plot.id}
                onClick={() => setSelectedPlot(plot)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedPlot.id === plot.id 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-left">
                  <h3 className="font-semibold">{plot.name}</h3>
                  <p className="text-sm text-gray-600">{plot.crop} • {plot.area} ha</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      plot.riskLevel === 'High' ? 'bg-red-100 text-red-700' :
                      plot.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {plot.riskLevel}
                    </span>
                    <span className="text-sm font-medium">{plot.riskScore}/100</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs defaultValue="charts">
        <TabsList>
          <TabsTrigger value="charts">Data Visualization</TabsTrigger>
          <TabsTrigger value="anomaly">Anomaly Detection</TabsTrigger>
          <TabsTrigger value="comparison">Period Comparison</TabsTrigger>
          <TabsTrigger value="thresholds">Alert Thresholds</TabsTrigger>
        </TabsList>

        <TabsContent value="charts">
          <RiskCharts selectedPlot={selectedPlot} />
        </TabsContent>

        <TabsContent value="anomaly">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                  <span>Anomaly Detection for {selectedPlot.name}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {selectedPlot.riskLevel === 'High' && (
                    <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                      <div className="flex items-start space-x-3">
                        <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                        <div>
                          <h3 className="font-semibold text-red-700">Critical Risk Detected</h3>
                          <p className="text-sm text-red-600 mt-1">
                            Multiple risk indicators show concerning patterns. Immediate attention recommended.
                          </p>
                          <ul className="text-sm text-red-600 mt-2 space-y-1">
                            <li>• NDVI values below healthy threshold for 2 weeks</li>
                            <li>• Soil moisture showing irregular patterns</li>
                            <li>• Sensor offline: pH sensor requires maintenance</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="p-4 border border-yellow-200 rounded-lg bg-yellow-50">
                    <div className="flex items-start space-x-3">
                      <TrendingUp className="h-5 w-5 text-yellow-500 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-yellow-700">Temperature Trend Analysis</h3>
                        <p className="text-sm text-yellow-600 mt-1">
                          Temperature consistently 3°C above seasonal average for the past week.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border border-blue-200 rounded-lg bg-blue-50">
                    <div className="flex items-start space-x-3">
                      <TrendingUp className="h-5 w-5 text-blue-500 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-blue-700">Irrigation Efficiency</h3>
                        <p className="text-sm text-blue-600 mt-1">
                          Soil moisture response to irrigation suggests 85% efficiency - within optimal range.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="comparison">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Period Comparison</h2>
            <p className="text-gray-600 max-w-md mx-auto">
              Compare current performance with historical data and identify trends.
            </p>
            <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg max-w-md mx-auto">
              <p className="text-sm text-blue-700">
                This section will include year-over-year comparisons and seasonal analysis.
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="thresholds">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Alert Thresholds</h2>
            <p className="text-gray-600 max-w-md mx-auto">
              Configure custom alert thresholds for different risk indicators.
            </p>
            <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg max-w-md mx-auto">
              <p className="text-sm text-blue-700">
                This section will include customizable threshold settings for NDVI, moisture, temperature, etc.
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RiskSection;
