
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getEnhancedFarmerData, Plot, Sensor } from '@/utils/farmerData';
import { 
  MapPin, 
  Activity, 
  Thermometer, 
  Droplets, 
  Zap, 
  Plus,
  Edit,
  Trash2,
  Layers,
  Search,
  Maximize,
  Navigation
} from 'lucide-react';

interface PlotMapProps {
  onPlotSelect?: (plot: Plot) => void;
  selectedPlot?: Plot | null;
}

const PlotMap: React.FC<PlotMapProps> = ({ onPlotSelect, selectedPlot }) => {
  const [farmerData] = useState(getEnhancedFarmerData());
  const [isCreating, setIsCreating] = useState(false);
  const [showSatellite, setShowSatellite] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'High': return '#EF4444';
      case 'Medium': return '#F59E0B';
      case 'Low': return '#10B981';
      default: return '#6B7280';
    }
  };

  const getSensorIcon = (type: string) => {
    switch (type) {
      case 'soil_moisture': return <Droplets className="h-3 w-3" />;
      case 'temperature': return <Thermometer className="h-3 w-3" />;
      case 'ph': return <Activity className="h-3 w-3" />;
      case 'humidity': return <Zap className="h-3 w-3" />;
      default: return <MapPin className="h-3 w-3" />;
    }
  };

  const getSensorStatusColor = (status: string) => {
    switch (status) {
      case 'online': return '#10B981';
      case 'offline': return '#EF4444';
      case 'battery_low': return '#F59E0B';
      default: return '#6B7280';
    }
  };

  const filteredPlots = farmerData.plots.filter(plot =>
    plot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plot.crop.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="h-5 w-5" />
              <span>Interactive Plot Map - Skikda Region</span>
            </CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search plots..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm w-48"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-wrap gap-2">
            <Badge variant="outline" className="border-green-500 text-green-700">
              Low Risk ({farmerData.plots.filter(p => p.riskLevel === 'Low').length})
            </Badge>
            <Badge variant="outline" className="border-yellow-500 text-yellow-700">
              Medium Risk ({farmerData.plots.filter(p => p.riskLevel === 'Medium').length})
            </Badge>
            <Badge variant="outline" className="border-red-500 text-red-700">
              High Risk ({farmerData.plots.filter(p => p.riskLevel === 'High').length})
            </Badge>
          </div>
          
          {/* Temporary Map Placeholder */}
          <div className="relative h-[500px] md:h-[400px] w-full rounded-lg overflow-hidden border bg-gradient-to-br from-green-50 to-blue-50">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-4">
                <MapPin className="h-16 w-16 text-green-600 mx-auto" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Skikda Agricultural Region</h3>
                  <p className="text-gray-600 mb-4">Interactive map view temporarily unavailable</p>
                  <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                    {filteredPlots.map((plot) => (
                      <div
                        key={plot.id}
                        className={`p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
                          selectedPlot?.id === plot.id 
                            ? 'border-green-500 bg-green-50' 
                            : 'border-gray-200 bg-white hover:border-gray-300'
                        }`}
                        onClick={() => onPlotSelect?.(plot)}
                        style={{
                          borderColor: selectedPlot?.id === plot.id ? getRiskColor(plot.riskLevel) : undefined
                        }}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-sm">{plot.name}</span>
                          <div 
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: getRiskColor(plot.riskLevel) }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-600">
                          <p>{plot.crop} - {plot.area}ha</p>
                          <p>{plot.sensors.filter(s => s.status === 'online').length}/{plot.sensors.length} sensors</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Map Controls */}
            <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
              <Button
                size="sm"
                variant={isCreating ? "default" : "outline"}
                onClick={() => setIsCreating(!isCreating)}
                className="bg-white/90 backdrop-blur-sm shadow-lg"
              >
                <Plus className="h-4 w-4 mr-1" />
                {isCreating ? 'Cancel' : 'Add Plot'}
              </Button>
              
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowSatellite(!showSatellite)}
                className="bg-white/90 backdrop-blur-sm shadow-lg"
              >
                <Layers className="h-4 w-4 mr-1" />
                {showSatellite ? 'Map' : 'Satellite'}
              </Button>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">Plot Risk Levels</h4>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span>Low Risk (0-40)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                  <span>Medium Risk (41-70)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded"></div>
                  <span>High Risk (71-100)</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Sensor Status</h4>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <span>Online</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                  <span>Battery Low</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                  <span>Offline</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Map Controls</h4>
              <div className="space-y-1">
                <p>Click plots for details</p>
                <p>Search to filter plots</p>
                <p>Toggle satellite view</p>
                <p>Add new plots</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredPlots.map((plot) => (
          <Card 
            key={plot.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-105 ${
              selectedPlot?.id === plot.id ? 'ring-2 ring-green-500 shadow-lg' : ''
            }`}
            onClick={() => onPlotSelect?.(plot)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">{plot.name}</h3>
                <Badge 
                  variant="outline"
                  style={{ 
                    borderColor: getRiskColor(plot.riskLevel),
                    color: getRiskColor(plot.riskLevel)
                  }}
                >
                  {plot.riskLevel}
                </Badge>
              </div>
              <div className="space-y-1 text-sm text-gray-600">
                <p className="flex items-center justify-between">
                  <span>{plot.crop}</span>
                  <span>{plot.area} ha</span>
                </p>
                <p>Risk Score: {plot.riskScore}/100</p>
                <p>Sensors: {plot.sensors.filter(s => s.status === 'online').length}/{plot.sensors.length} online</p>
                <p>Last Yield: {plot.lastYield} t/ha</p>
              </div>
              <div className="mt-3">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${plot.riskScore}%`,
                      backgroundColor: getRiskColor(plot.riskLevel)
                    }}
                  ></div>
                </div>
              </div>
              <div className="flex gap-1 mt-3">
                <Button size="sm" variant="outline" className="text-xs flex-1">
                  <Edit className="h-3 w-3 mr-1" />
                  Edit
                </Button>
                <Button size="sm" variant="outline" className="text-xs">
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPlots.length === 0 && searchTerm && (
        <Card>
          <CardContent className="p-8 text-center">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No plots found</h3>
            <p className="text-gray-600">
              No plots match your search term "{searchTerm}". Try different keywords.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PlotMap;
