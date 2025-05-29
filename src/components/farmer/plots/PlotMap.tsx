import React, { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Polygon, Popup, Marker, useMap, useMapEvents } from 'react-leaflet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { getEnhancedFarmerData, Plot, Sensor } from '@/utils/farmerData';
import { MapPin, Activity, Thermometer, Droplets, Zap, Plus, Edit, Trash2, Maximize, RotateCcw } from 'lucide-react';
import PlotCreationForm from './PlotCreationForm';
import PlotSidebar from './PlotSidebar';
import L from 'leaflet';
import 'leaflet-draw';

// Fix Leaflet default markers
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

interface DrawingState {
  isDrawing: boolean;
  currentPolygon: [number, number][];
  area: number;
}

const MapEvents: React.FC<{
  drawingState: DrawingState;
  setDrawingState: (state: DrawingState) => void;
  onPolygonComplete: (coordinates: [number, number][], area: number) => void;
}> = ({ drawingState, setDrawingState, onPolygonComplete }) => {
  const map = useMap();

  useMapEvents({
    click: (e) => {
      if (!drawingState.isDrawing) return;

      const { lat, lng } = e.latlng;
      const newPolygon = [...drawingState.currentPolygon, [lat, lng] as [number, number]];
      
      // Calculate area using simple polygon area formula
      const area = calculatePolygonArea(newPolygon);
      
      setDrawingState({
        ...drawingState,
        currentPolygon: newPolygon,
        area
      });

      // Complete polygon on double-click or when we have enough points
      if (newPolygon.length >= 3) {
        // Listen for double-click or right-click to complete
        setTimeout(() => {
          map.once('dblclick', () => {
            onPolygonComplete(newPolygon, area);
            setDrawingState({
              isDrawing: false,
              currentPolygon: [],
              area: 0
            });
          });
        }, 100);
      }
    }
  });

  return null;
};

const calculatePolygonArea = (coordinates: [number, number][]) => {
  if (coordinates.length < 3) return 0;
  
  let area = 0;
  const n = coordinates.length;
  
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n;
    area += coordinates[i][0] * coordinates[j][1];
    area -= coordinates[j][0] * coordinates[i][1];
  }
  
  area = Math.abs(area) / 2;
  // Convert to hectares (rough approximation)
  return area * 111320 * 111320 / 10000; // Convert degrees to meters then to hectares
};

const PlotMap: React.FC<PlotMapProps> = ({ onPlotSelect, selectedPlot }) => {
  const [farmerData, setFarmerData] = useState(getEnhancedFarmerData());
  const [drawingState, setDrawingState] = useState<DrawingState>({
    isDrawing: false,
    currentPolygon: [],
    area: 0
  });
  const [showForm, setShowForm] = useState(false);
  const [currentDrawnCoordinates, setCurrentDrawnCoordinates] = useState<[number, number][]>([]);
  const [currentDrawnArea, setCurrentDrawnArea] = useState(0);
  const mapRef = useRef<L.Map>(null);

  // Algeria coordinates - center on Skikda region
  const centerPosition: [number, number] = [36.8756, 6.9147];

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'High': return '#EF4444';
      case 'Medium': return '#EAB308';
      case 'Low': return '#22C55E';
      default: return '#6B7280';
    }
  };

  const getSensorIcon = (type: string) => {
    switch (type) {
      case 'soil_moisture': return <Droplets className="h-4 w-4" />;
      case 'temperature': return <Thermometer className="h-4 w-4" />;
      case 'ph': return <Activity className="h-4 w-4" />;
      case 'humidity': return <Zap className="h-4 w-4" />;
      default: return <MapPin className="h-4 w-4" />;
    }
  };

  const startDrawing = () => {
    setDrawingState({
      isDrawing: true,
      currentPolygon: [],
      area: 0
    });
  };

  const stopDrawing = () => {
    setDrawingState({
      isDrawing: false,
      currentPolygon: [],
      area: 0
    });
  };

  const handlePolygonComplete = (coordinates: [number, number][], area: number) => {
    if (coordinates.length >= 3) {
      setCurrentDrawnCoordinates(coordinates);
      setCurrentDrawnArea(area);
      setShowForm(true);
    }
  };

  const handlePlotSave = (formData: any) => {
    const newPlot: Plot = {
      id: farmerData.plots.length + 1,
      name: formData.name,
      crop: formData.crop,
      area: currentDrawnArea,
      riskLevel: 'Low',
      color: '#22C55E',
      coordinates: currentDrawnCoordinates,
      sensors: [],
      plantingDate: formData.plantingDate || new Date().toISOString().split('T')[0],
      expectedHarvest: formData.expectedHarvest || new Date().toISOString().split('T')[0],
      soilType: 'Loam',
      irrigationMethod: 'Drip Irrigation',
      lastYield: 0,
      riskScore: 25,
      ndviTrend: [0.3, 0.35, 0.4],
      moistureLevels: [40, 42, 38]
    };

    setFarmerData(prev => ({
      ...prev,
      plots: [...prev.plots, newPlot]
    }));

    setShowForm(false);
    setCurrentDrawnCoordinates([]);
    setCurrentDrawnArea(0);
  };

  const handlePlotCancel = () => {
    setShowForm(false);
    setCurrentDrawnCoordinates([]);
    setCurrentDrawnArea(0);
  };

  const zoomToPlot = (plot: Plot) => {
    if (mapRef.current && plot.coordinates.length > 0) {
      const bounds = L.latLngBounds(plot.coordinates);
      mapRef.current.fitBounds(bounds, { padding: [20, 20] });
    }
  };

  const handleEditPlot = (plot: Plot) => {
    console.log('Edit plot:', plot.name);
    // TODO: Implement edit functionality
  };

  const handleDeletePlot = (plot: Plot) => {
    if (window.confirm(`Are you sure you want to delete ${plot.name}?`)) {
      setFarmerData(prev => ({
        ...prev,
        plots: prev.plots.filter(p => p.id !== plot.id)
      }));
    }
  };

  return (
    <div className="flex h-[calc(100vh-12rem)] bg-gray-50">
      {/* Sidebar */}
      <PlotSidebar
        plots={farmerData.plots}
        selectedPlot={selectedPlot}
        onPlotSelect={onPlotSelect || (() => {})}
        onZoomToPlot={zoomToPlot}
        onEditPlot={handleEditPlot}
        onDeletePlot={handleDeletePlot}
      />

      {/* Main Map Area */}
      <div className="flex-1 flex flex-col">
        {/* Map Controls */}
        <Card className="m-4 mb-2">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">Interactive Plot Map - Skikda Region</h3>
                <p className="text-sm text-gray-600">
                  {drawingState.isDrawing 
                    ? `Drawing new plot... Points: ${drawingState.currentPolygon.length}, Area: ${drawingState.area.toFixed(2)} ha`
                    : 'Click "Add Plot" to start drawing a new plot boundary'
                  }
                </p>
              </div>
              <div className="flex space-x-2">
                {drawingState.isDrawing ? (
                  <Button onClick={stopDrawing} variant="outline">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Cancel Drawing
                  </Button>
                ) : (
                  <Button onClick={startDrawing}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Plot
                  </Button>
                )}
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="border-green-500 text-green-700">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Low Risk
              </Badge>
              <Badge variant="outline" className="border-yellow-500 text-yellow-700">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                Medium Risk
              </Badge>
              <Badge variant="outline" className="border-red-500 text-red-700">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                High Risk
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Map Container */}
        <div className="flex-1 mx-4 mb-4">
          <div className="h-full w-full rounded-lg overflow-hidden border shadow-lg">
            <MapContainer
              center={centerPosition}
              zoom={12}
              style={{ height: '100%', width: '100%' }}
              ref={mapRef}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              
              {/* Map Events for Drawing */}
              <MapEvents
                drawingState={drawingState}
                setDrawingState={setDrawingState}
                onPolygonComplete={handlePolygonComplete}
              />

              {/* Current Drawing Polygon */}
              {drawingState.currentPolygon.length > 0 && (
                <Polygon
                  positions={drawingState.currentPolygon}
                  pathOptions={{
                    color: '#3B82F6',
                    fillColor: '#3B82F6',
                    fillOpacity: 0.3,
                    weight: 2
                  }}
                />
              )}

              {/* Existing Plots */}
              {farmerData.plots.map((plot) => (
                <React.Fragment key={plot.id}>
                  <Polygon
                    positions={plot.coordinates}
                    pathOptions={{
                      color: getRiskColor(plot.riskLevel),
                      fillColor: getRiskColor(plot.riskLevel),
                      fillOpacity: selectedPlot?.id === plot.id ? 0.8 : 0.6,
                      weight: selectedPlot?.id === plot.id ? 4 : 2
                    }}
                    eventHandlers={{
                      click: () => onPlotSelect?.(plot),
                      mouseover: (e) => {
                        e.target.setStyle({ fillOpacity: 0.8 });
                      },
                      mouseout: (e) => {
                        if (selectedPlot?.id !== plot.id) {
                          e.target.setStyle({ fillOpacity: 0.6 });
                        }
                      }
                    }}
                  >
                    <Popup>
                      <div className="p-2 min-w-[200px]">
                        <h3 className="font-semibold text-lg mb-2">{plot.name}</h3>
                        <div className="space-y-1 text-sm">
                          <p><span className="font-medium">Crop:</span> {plot.crop}</p>
                          <p><span className="font-medium">Area:</span> {plot.area} ha</p>
                          <p><span className="font-medium">Risk Level:</span> 
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
                          <p><span className="font-medium">Last Yield:</span> {plot.lastYield} t/ha</p>
                          <p><span className="font-medium">Sensors:</span> {plot.sensors.filter(s => s.status === 'online').length}/{plot.sensors.length} online</p>
                        </div>
                        <div className="flex space-x-2 mt-3">
                          <Button size="sm" variant="outline" onClick={() => handleEditPlot(plot)}>
                            <Edit className="h-3 w-3 mr-1" />
                            Edit
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => zoomToPlot(plot)}>
                            <MapPin className="h-3 w-3 mr-1" />
                            Zoom
                          </Button>
                        </div>
                      </div>
                    </Popup>
                  </Polygon>

                  {/* Plot Center Marker */}
                  {plot.coordinates.length > 0 && (
                    <Marker
                      position={[
                        plot.coordinates.reduce((sum, coord) => sum + coord[0], 0) / plot.coordinates.length,
                        plot.coordinates.reduce((sum, coord) => sum + coord[1], 0) / plot.coordinates.length
                      ]}
                    >
                      <Popup>
                        <div className="text-center">
                          <h4 className="font-semibold">{plot.name}</h4>
                          <p className="text-sm text-gray-600">{plot.crop}</p>
                        </div>
                      </Popup>
                    </Marker>
                  )}
                </React.Fragment>
              ))}
            </MapContainer>
          </div>
        </div>

        {/* Plot Creation Form Dialog */}
        <Dialog open={showForm} onOpenChange={setShowForm}>
          <DialogContent className="max-w-md">
            <PlotCreationForm
              area={currentDrawnArea}
              onSave={handlePlotSave}
              onCancel={handlePlotCancel}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default PlotMap;
