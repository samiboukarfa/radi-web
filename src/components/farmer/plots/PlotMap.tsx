
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { MapContainer, TileLayer, Polygon, Popup, Marker, useMapEvents } from 'react-leaflet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { getEnhancedFarmerData, Plot, Sensor } from '@/utils/farmerData';
import { MapPin, Plus, Edit, Trash2, Search, Filter, Layers, Maximize, Navigation, Download } from 'lucide-react';
import { useForm } from 'react-hook-form';
import L from 'leaflet';

// Fix for default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface PlotMapProps {
  onPlotSelect?: (plot: Plot) => void;
  selectedPlot?: Plot | null;
}

interface NewPlotForm {
  name: string;
  crop: string;
  plantingDate: string;
  expectedHarvest: string;
  notes: string;
}

// Drawing component to handle plot creation
const DrawingHandler: React.FC<{
  isDrawing: boolean;
  onPlotCreate: (coordinates: [number, number][], area: number) => void;
}> = ({ isDrawing, onPlotCreate }) => {
  const [currentPath, setCurrentPath] = useState<[number, number][]>([]);
  const [isComplete, setIsComplete] = useState(false);

  const map = useMapEvents({
    click: (e) => {
      if (!isDrawing || isComplete) return;
      
      const newPoint: [number, number] = [e.latlng.lat, e.latlng.lng];
      const newPath = [...currentPath, newPoint];
      setCurrentPath(newPath);
      
      // Complete polygon on minimum 3 points and close to first point
      if (newPath.length >= 3) {
        const firstPoint = newPath[0];
        const distance = map.distance(e.latlng, L.latLng(firstPoint[0], firstPoint[1]));
        
        if (distance < 100) { // Close to first point
          setIsComplete(true);
          const area = calculatePolygonArea(newPath);
          onPlotCreate(newPath, area);
          setCurrentPath([]);
          setIsComplete(false);
        }
      }
    }
  });

  const calculatePolygonArea = (coordinates: [number, number][]): number => {
    if (coordinates.length < 3) return 0;
    
    // Simple area calculation using shoelace formula
    let area = 0;
    const n = coordinates.length;
    
    for (let i = 0; i < n; i++) {
      const j = (i + 1) % n;
      area += coordinates[i][0] * coordinates[j][1];
      area -= coordinates[j][0] * coordinates[i][1];
    }
    
    area = Math.abs(area) / 2;
    
    // Convert from degrees to approximate hectares (rough conversion)
    // This is a simplified calculation - in production you'd use proper geodetic calculations
    return area * 12100; // Approximate conversion factor for Algeria region
  };

  if (currentPath.length === 0) return null;

  return (
    <Polygon
      positions={currentPath}
      color="#3B82F6"
      fillColor="#3B82F6"
      fillOpacity={0.3}
      weight={2}
    />
  );
};

const PlotMap: React.FC<PlotMapProps> = ({ onPlotSelect, selectedPlot }) => {
  const [farmerData, setFarmerData] = useState(getEnhancedFarmerData());
  const [isDrawing, setIsDrawing] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [pendingPlotData, setPendingPlotData] = useState<{coordinates: [number, number][], area: number} | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [cropFilter, setCropFilter] = useState('all');
  const [riskFilter, setRiskFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'street' | 'satellite'>('street');
  const mapRef = useRef<L.Map>(null);

  const form = useForm<NewPlotForm>({
    defaultValues: {
      name: '',
      crop: '',
      plantingDate: '',
      expectedHarvest: '',
      notes: ''
    }
  });

  // Algeria coordinates - centered on the country
  const centerPosition: [number, number] = [28.0339, 1.6596];

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'High': return '#EF4444';
      case 'Medium': return '#EAB308';
      case 'Low': return '#22C55E';
      default: return '#6B7280';
    }
  };

  const getRiskOpacity = (plot: Plot, isSelected: boolean, isHovered: boolean) => {
    if (isSelected) return 0.9;
    if (isHovered) return 0.8;
    return 0.6;
  };

  const handlePlotCreate = useCallback((coordinates: [number, number][], area: number) => {
    setPendingPlotData({ coordinates, area });
    setIsDrawing(false);
    setShowCreateDialog(true);
  }, []);

  const onSubmitNewPlot = (data: NewPlotForm) => {
    if (!pendingPlotData) return;

    const newPlot: Plot = {
      id: farmerData.plots.length + 1,
      name: data.name,
      crop: data.crop,
      area: Number(pendingPlotData.area.toFixed(1)),
      riskLevel: 'Low',
      color: getRiskColor('Low'),
      coordinates: pendingPlotData.coordinates,
      sensors: [],
      plantingDate: data.plantingDate,
      expectedHarvest: data.expectedHarvest,
      soilType: 'Clay Loam',
      irrigationMethod: 'Drip Irrigation',
      lastYield: 0,
      riskScore: 25,
      ndviTrend: [0.4, 0.42, 0.45, 0.48, 0.46, 0.44, 0.42],
      moistureLevels: [40, 42, 45, 43, 41, 44, 46]
    };

    setFarmerData(prev => ({
      ...prev,
      plots: [...prev.plots, newPlot]
    }));

    setShowCreateDialog(false);
    setPendingPlotData(null);
    form.reset();
  };

  const filteredPlots = farmerData.plots.filter(plot => {
    const matchesSearch = plot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plot.crop.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCrop = cropFilter === 'all' || plot.crop === cropFilter;
    const matchesRisk = riskFilter === 'all' || plot.riskLevel === riskFilter;
    
    return matchesSearch && matchesCrop && matchesRisk;
  });

  const cropTypes = ['Wheat', 'Barley', 'Oats', 'Corn', 'Tomatoes', 'Potatoes', 'Olives'];
  const uniqueCrops = [...new Set(farmerData.plots.map(p => p.crop))];

  const zoomToPlot = (plot: Plot) => {
    if (mapRef.current && plot.coordinates.length > 0) {
      const bounds = L.latLngBounds(plot.coordinates);
      mapRef.current.fitBounds(bounds, { padding: [20, 20] });
      onPlotSelect?.(plot);
    }
  };

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-semibold text-lg mb-4">Plot Management</h3>
          
          <div className="space-y-3">
            <Button
              onClick={() => setIsDrawing(!isDrawing)}
              className={`w-full ${isDrawing ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
            >
              <Plus className="h-4 w-4 mr-2" />
              {isDrawing ? 'Cancel Drawing' : 'Add New Plot'}
            </Button>
            
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setViewMode(viewMode === 'street' ? 'satellite' : 'street')}
              >
                <Layers className="h-4 w-4 mr-1" />
                {viewMode === 'street' ? 'Satellite' : 'Street'}
              </Button>
              
              <Button variant="outline" size="sm">
                <Navigation className="h-4 w-4 mr-1" />
                Locate
              </Button>
            </div>
          </div>
        </div>

        <div className="p-4 border-b border-gray-200 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search plots..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex space-x-2">
            <Select value={cropFilter} onValueChange={setCropFilter}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Crop" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Crops</SelectItem>
                {uniqueCrops.map(crop => (
                  <SelectItem key={crop} value={crop}>{crop}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={riskFilter} onValueChange={setRiskFilter}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Risk" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Risk</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-2">
            {filteredPlots.map((plot) => (
              <Card
                key={plot.id}
                className={`mb-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
                  selectedPlot?.id === plot.id ? 'ring-2 ring-green-500' : ''
                }`}
                onClick={() => onPlotSelect?.(plot)}
                onDoubleClick={() => zoomToPlot(plot)}
              >
                <CardContent className="p-3">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-sm">{plot.name}</h4>
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: getRiskColor(plot.riskLevel) }}
                    />
                  </div>
                  <div className="text-xs text-gray-600 space-y-1">
                    <p>{plot.crop} • {plot.area} ha</p>
                    <p>Risk: {plot.riskLevel}</p>
                    <p className="text-gray-400">Updated: 2 hours ago</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 relative">
        {isDrawing && (
          <div className="absolute top-4 left-4 z-[1000] bg-blue-100 border border-blue-300 rounded-lg p-3">
            <p className="text-sm font-medium text-blue-800">
              Click to add points. Click near the first point to complete the plot.
            </p>
            <p className="text-xs text-blue-600 mt-1">
              Minimum 3 points required
            </p>
          </div>
        )}

        <MapContainer
          center={centerPosition}
          zoom={6}
          style={{ height: '100%', width: '100%' }}
          ref={mapRef}
        >
          <TileLayer
            url={viewMode === 'satellite' 
              ? "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            }
            attribution={viewMode === 'satellite' 
              ? '&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
              : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }
          />
          
          <DrawingHandler
            isDrawing={isDrawing}
            onPlotCreate={handlePlotCreate}
          />
          
          {filteredPlots.map((plot) => (
            <React.Fragment key={plot.id}>
              <Polygon
                positions={plot.coordinates}
                color={getRiskColor(plot.riskLevel)}
                fillColor={getRiskColor(plot.riskLevel)}
                fillOpacity={getRiskOpacity(plot, selectedPlot?.id === plot.id, false)}
                weight={selectedPlot?.id === plot.id ? 4 : 2}
                className="plot-polygon"
                eventHandlers={{
                  click: () => onPlotSelect?.(plot),
                  mouseover: (e) => {
                    e.target.setStyle({ fillOpacity: 0.8 });
                  },
                  mouseout: (e) => {
                    e.target.setStyle({ 
                      fillOpacity: getRiskOpacity(plot, selectedPlot?.id === plot.id, false) 
                    });
                  }
                }}
              >
                <Popup>
                  <div className="w-64">
                    <h3 className="font-semibold text-lg mb-2">{plot.name}</h3>
                    <div className="space-y-1 text-sm">
                      <p><span className="font-medium">Crop:</span> {plot.crop}</p>
                      <p><span className="font-medium">Area:</span> {plot.area} hectares</p>
                      <p>
                        <span className="font-medium">Risk Level:</span>
                        <Badge
                          variant="outline"
                          className="ml-2"
                          style={{
                            borderColor: getRiskColor(plot.riskLevel),
                            color: getRiskColor(plot.riskLevel)
                          }}
                        >
                          {plot.riskLevel}
                        </Badge>
                      </p>
                      <p><span className="font-medium">Last NDVI:</span> {plot.ndviTrend[plot.ndviTrend.length - 1].toFixed(3)}</p>
                      <p><span className="font-medium">Soil Moisture:</span> {plot.moistureLevels[plot.moistureLevels.length - 1]}%</p>
                    </div>
                    <div className="flex space-x-2 mt-3">
                      <Button size="sm" variant="outline">
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </div>
                  </div>
                </Popup>
              </Polygon>
              
              {/* Plot center marker */}
              {plot.coordinates.length > 0 && (
                <Marker
                  position={[
                    plot.coordinates.reduce((sum, coord) => sum + coord[0], 0) / plot.coordinates.length,
                    plot.coordinates.reduce((sum, coord) => sum + coord[1], 0) / plot.coordinates.length
                  ]}
                >
                  <Popup>
                    <div className="text-center">
                      <h4 className="font-medium">{plot.name}</h4>
                      <p className="text-sm text-gray-600">{plot.crop}</p>
                    </div>
                  </Popup>
                </Marker>
              )}
            </React.Fragment>
          ))}
        </MapContainer>
      </div>

      {/* Create Plot Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Plot</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitNewPlot)} className="space-y-4">
              {pendingPlotData && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <p className="text-sm font-medium text-green-800">
                    Plot Area: {pendingPlotData.area.toFixed(2)} hectares
                  </p>
                </div>
              )}
              
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Plot Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., North Field" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="crop"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Crop Type *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select crop type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {cropTypes.map(crop => (
                          <SelectItem key={crop} value={crop}>{crop}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="plantingDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Planting Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="expectedHarvest"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expected Harvest</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Additional information..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex space-x-2 pt-4">
                <Button type="submit" className="flex-1">
                  Create Plot
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowCreateDialog(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PlotMap;
