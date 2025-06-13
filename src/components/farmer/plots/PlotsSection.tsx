import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PlotMap from './PlotMap';
import { getEnhancedFarmerData, Plot } from '@/utils/farmerData';
import { MapPin, Plus, Settings, Upload, Download } from 'lucide-react';

const PlotsSection: React.FC = () => {
  const [farmerData] = useState(getEnhancedFarmerData());
  const [selectedPlot, setSelectedPlot] = useState<Plot | null>(null);
  const [activeTab, setActiveTab] = useState('map');
  const [isCreating, setIsCreating] = useState(false);

  const handleAddNewPlot = () => {
    setActiveTab('map');
    setIsCreating(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Plots</h1>
          <p className="text-gray-600">Manage and monitor all your agricultural plots</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Import Data
          </Button>
          <Button onClick={handleAddNewPlot}>
            <Plus className="h-4 w-4 mr-2" />
            Add New Plot
          </Button>
        </div>
      </div>

      {/* Quick Stats - Removed Total Plots and Active Sensors cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <TabsTrigger value="list">Plot List</TabsTrigger>
          <TabsTrigger value="sensors">Sensor Management</TabsTrigger>
          <TabsTrigger value="upload">Data Upload</TabsTrigger>
        </TabsList>

        <TabsContent value="map" className="space-y-4">
          <PlotMap 
            onPlotSelect={setSelectedPlot} 
            selectedPlot={selectedPlot} 
            isCreating={isCreating}
            onSetCreating={setIsCreating}
          />
          
          {selectedPlot && (
            <Card>
              <CardHeader>
                <CardTitle>Plot Details - {selectedPlot.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Basic Information</h3>
                      <div className="space-y-2 text-sm">
                        <p><span className="font-medium">Crop:</span> {selectedPlot.crop}</p>
                        <p><span className="font-medium">Area:</span> {selectedPlot.area} hectares</p>
                        <p><span className="font-medium">Soil Type:</span> {selectedPlot.soilType}</p>
                        <p><span className="font-medium">Irrigation:</span> {selectedPlot.irrigationMethod}</p>
                        <p><span className="font-medium">Planting Date:</span> {new Date(selectedPlot.plantingDate).toLocaleDateString()}</p>
                        <p><span className="font-medium">Expected Harvest:</span> {new Date(selectedPlot.expectedHarvest).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Performance Metrics</h3>
                      <div className="space-y-2 text-sm">
                        <p><span className="font-medium">Risk Score:</span> {selectedPlot.riskScore}/100</p>
                        <p><span className="font-medium">Last Yield:</span> {selectedPlot.lastYield} tons/ha</p>
                        <p><span className="font-medium">Current NDVI:</span> {selectedPlot.ndviTrend[selectedPlot.ndviTrend.length - 1].toFixed(3)}</p>
                        <p><span className="font-medium">Soil Moisture:</span> {selectedPlot.moistureLevels[selectedPlot.moistureLevels.length - 1]}%</p>
                        <p><span className="font-medium">Active Sensors:</span> {selectedPlot.sensors.filter(s => s.status === 'online').length}/{selectedPlot.sensors.length}</p>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4 mr-2" />
                        Edit Plot
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Export Data
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>All Plots</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Plot Name</th>
                      <th className="text-left p-2">Crop</th>
                      <th className="text-left p-2">Area (ha)</th>
                      <th className="text-left p-2">Risk Level</th>
                      <th className="text-left p-2">Sensors</th>
                      <th className="text-left p-2">Last Yield</th>
                      <th className="text-left p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {farmerData.plots.map((plot) => (
                      <tr key={plot.id} className="border-b hover:bg-gray-50">
                        <td className="p-2 font-medium">{plot.name}</td>
                        <td className="p-2">{plot.crop}</td>
                        <td className="p-2">{plot.area}</td>
                        <td className="p-2">
                          <span 
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              plot.riskLevel === 'High' ? 'bg-red-100 text-red-700' :
                              plot.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-green-100 text-green-700'
                            }`}
                          >
                            {plot.riskLevel}
                          </span>
                        </td>
                        <td className="p-2">
                          {plot.sensors.filter(s => s.status === 'online').length}/{plot.sensors.length}
                        </td>
                        <td className="p-2">{plot.lastYield} t/ha</td>
                        <td className="p-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedPlot(plot)}
                          >
                            View
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sensors">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Sensor Management</h2>
            <p className="text-gray-600 max-w-md mx-auto">
              Configure and monitor IoT sensors across your plots for real-time data collection.
            </p>
            <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg max-w-md mx-auto">
              <p className="text-sm text-blue-700">
                This section will include sensor placement, calibration, and maintenance scheduling.
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="upload">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Upload</h2>
            <p className="text-gray-600 max-w-md mx-auto">
              Upload historical yield data, soil analysis results, and other field documentation.
            </p>
            <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg max-w-md mx-auto">
              <p className="text-sm text-blue-700">
                This section will include drag-and-drop file upload and data validation.
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PlotsSection;
