
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PlotMap from './PlotMap';
import { getEnhancedFarmerData, Plot } from '@/utils/farmerData';
import { MapPin, Plus, Settings, Upload, Download, BarChart3 } from 'lucide-react';

const PlotsSection: React.FC = () => {
  const [farmerData] = useState(getEnhancedFarmerData());
  const [selectedPlot, setSelectedPlot] = useState<Plot | null>(null);
  const [activeTab, setActiveTab] = useState('map');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Plots</h1>
          <p className="text-gray-600">Interactive plot management and monitoring system</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Import Data
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export All
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{farmerData.plots.length}</p>
              <p className="text-sm text-gray-600">Total Plots</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">
                {farmerData.plots.reduce((sum, plot) => sum + plot.area, 0).toFixed(1)}
              </p>
              <p className="text-sm text-gray-600">Total Hectares</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">
                {farmerData.plots.flatMap(p => p.sensors).filter(s => s.status === 'online').length}
              </p>
              <p className="text-sm text-gray-600">Active Sensors</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(farmerData.plots.reduce((sum, plot) => sum + plot.riskScore, 0) / farmerData.plots.length)}
              </p>
              <p className="text-sm text-gray-600">Avg Risk Score</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="map">Interactive Map</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="sensors">Sensors</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="map" className="space-y-4">
          <PlotMap onPlotSelect={setSelectedPlot} selectedPlot={selectedPlot} />
        </TabsContent>

        <TabsContent value="analytics">
          <div className="text-center py-12">
            <BarChart3 className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Plot Analytics</h2>
            <p className="text-gray-600 max-w-md mx-auto">
              Detailed analytics and performance metrics for your plots including yield predictions, historical data, and trend analysis.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="sensors">
          <div className="text-center py-12">
            <Settings className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Sensor Management</h2>
            <p className="text-gray-600 max-w-md mx-auto">
              Configure and monitor IoT sensors across your plots for real-time data collection and automated alerts.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="reports">
          <div className="text-center py-12">
            <Download className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Reports & Export</h2>
            <p className="text-gray-600 max-w-md mx-auto">
              Generate comprehensive reports, export data, and access historical performance analysis for your plots.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PlotsSection;
