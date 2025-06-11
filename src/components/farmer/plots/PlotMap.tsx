import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getEnhancedFarmerData, Plot } from '@/utils/farmerData';
import AddPlotForm from './AddPlotForm';
import { MapPin, Plus, Edit, Trash2, Search } from 'lucide-react';
interface PlotMapProps {
  onPlotSelect?: (plot: Plot) => void;
  selectedPlot?: Plot | null;
  isCreating?: boolean;
  onSetCreating?: (creating: boolean) => void;
}
interface PlotFormData {
  name: string;
  crop: string;
  area: number;
  soilType: string;
  irrigationMethod: string;
  plantingDate: string;
  expectedHarvest: string;
  latitude: number;
  longitude: number;
  notes?: string;
}
const PlotMap: React.FC<PlotMapProps> = ({
  onPlotSelect,
  selectedPlot,
  isCreating = false,
  onSetCreating
}) => {
  const [farmerData, setFarmerData] = useState(getEnhancedFarmerData());
  const [searchTerm, setSearchTerm] = useState('');

  // Use internal state if no external handler provided (for backward compatibility)
  const [internalIsCreating, setInternalIsCreating] = useState(false);
  const actualIsCreating = onSetCreating ? isCreating : internalIsCreating;
  const actualSetCreating = onSetCreating || setInternalIsCreating;
  const getRiskColor = (level: string) => {
    switch (level) {
      case 'High':
        return '#EF4444';
      case 'Medium':
        return '#F59E0B';
      case 'Low':
        return '#10B981';
      default:
        return '#6B7280';
    }
  };
  const filteredPlots = farmerData.plots.filter(plot => plot.name.toLowerCase().includes(searchTerm.toLowerCase()) || plot.crop.toLowerCase().includes(searchTerm.toLowerCase()));
  const handleAddPlot = (formData: PlotFormData) => {
    const newPlot: Plot = {
      id: Date.now(),
      name: formData.name,
      crop: formData.crop,
      area: formData.area,
      coordinates: [[formData.latitude, formData.longitude], [formData.latitude + 0.001, formData.longitude + 0.001], [formData.latitude + 0.001, formData.longitude - 0.001], [formData.latitude - 0.001, formData.longitude]],
      soilType: formData.soilType,
      irrigationMethod: formData.irrigationMethod,
      plantingDate: formData.plantingDate,
      expectedHarvest: formData.expectedHarvest,
      riskLevel: 'Low',
      color: '#10B981',
      riskScore: Math.floor(Math.random() * 40) + 10,
      lastYield: 0,
      sensors: [],
      ndviTrend: [0.5],
      moistureLevels: [65]
    };
    setFarmerData(prev => ({
      ...prev,
      plots: [...prev.plots, newPlot]
    }));
    actualSetCreating(false);
    console.log('New plot added:', newPlot);
  };
  return <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="h-5 w-5" />
              <span>Plot Management - Constantine Region</span>
            </CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input type="text" placeholder="Search plots..." className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm w-48" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
              </div>
              <Button onClick={() => actualSetCreating(!actualIsCreating)} variant={actualIsCreating ? "outline" : "default"}>
                <Plus className="h-4 w-4 mr-2" />
                {actualIsCreating ? 'Cancel' : 'Add Plot'}
              </Button>
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

          {actualIsCreating && <div className="mb-6">
              <AddPlotForm onCancel={() => actualSetCreating(false)} onSubmit={handleAddPlot} />
            </div>}

          {!actualIsCreating && <div className="text-center py-8 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg border">
              <MapPin className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
Constantine Agricultural Region</h3>
              <p className="text-gray-600 mb-4">Manage your plots manually by adding coordinates and plot information</p>
              <p className="text-sm text-gray-500">
                Total Plots: {farmerData.plots.length} | Total Area: {farmerData.plots.reduce((sum, plot) => sum + plot.area, 0).toFixed(1)} ha
              </p>
            </div>}

          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">Plot Risk Levels</h4>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span>Low Risk (7-10)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                  <span>Medium Risk (4-6)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded"></div>
                  <span>High Risk (0-3)</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Management Actions</h4>
              <div className="space-y-1">
                <p>Add new plots manually</p>
                <p>Edit existing plot details</p>
                <p>Monitor risk assessments</p>
                <p>Track sensor deployment</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Location Guidelines</h4>
              <div className="space-y-1">
                <p>Latitude: 36.5 - 37.5</p>
                <p>Longitude: 6.5 - 7.5</p>
                
                <p>Coordinate precision: 6 decimals</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredPlots.map(plot => <Card key={plot.id} className={`cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-105 ${selectedPlot?.id === plot.id ? 'ring-2 ring-green-500 shadow-lg' : ''}`} onClick={() => onPlotSelect?.(plot)}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">{plot.name}</h3>
                <Badge variant="outline" style={{
              borderColor: getRiskColor(plot.riskLevel),
              color: getRiskColor(plot.riskLevel)
            }}>
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
                <p className="text-xs text-gray-500">
                  Coords: {plot.coordinates[0][0].toFixed(4)}, {plot.coordinates[0][1].toFixed(4)}
                </p>
              </div>
              <div className="mt-3">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="h-2 rounded-full transition-all duration-300" style={{
                width: `${plot.riskScore}%`,
                backgroundColor: getRiskColor(plot.riskLevel)
              }}></div>
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
          </Card>)}
      </div>

      {filteredPlots.length === 0 && searchTerm && <Card>
          <CardContent className="p-8 text-center">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No plots found</h3>
            <p className="text-gray-600">
              No plots match your search term "{searchTerm}". Try different keywords.
            </p>
          </CardContent>
        </Card>}
    </div>;
};
export default PlotMap;