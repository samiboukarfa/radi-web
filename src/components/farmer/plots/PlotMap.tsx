
import React, { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Polygon, Popup, Marker } from 'react-leaflet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getEnhancedFarmerData, Plot, Sensor } from '@/utils/farmerData';
import { MapPin, Activity, Thermometer, Droplets, Zap } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

interface PlotMapProps {
  onPlotSelect?: (plot: Plot) => void;
  selectedPlot?: Plot | null;
}

const PlotMap: React.FC<PlotMapProps> = ({ onPlotSelect, selectedPlot }) => {
  const [farmerData] = useState(getEnhancedFarmerData());
  const mapRef = useRef(null);

  // Skikda, Algeria coordinates
  const centerPosition: [number, number] = [36.8756, 6.9147];

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
      case 'soil_moisture': return <Droplets className="h-4 w-4" />;
      case 'temperature': return <Thermometer className="h-4 w-4" />;
      case 'ph': return <Activity className="h-4 w-4" />;
      case 'humidity': return <Zap className="h-4 w-4" />;
      default: return <MapPin className="h-4 w-4" />;
    }
  };

  const getSensorStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'offline': return 'bg-red-500';
      case 'battery_low': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Map Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="h-5 w-5" />
            <span>Interactive Plot Map - Skikda Region</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-wrap gap-2">
            <Badge variant="outline" className="border-green-500 text-green-700">
              Low Risk
            </Badge>
            <Badge variant="outline" className="border-yellow-500 text-yellow-700">
              Medium Risk
            </Badge>
            <Badge variant="outline" className="border-red-500 text-red-700">
              High Risk
            </Badge>
          </div>
          
          {/* Map Container */}
          <div className="h-96 w-full rounded-lg overflow-hidden border">
            <MapContainer
              center={centerPosition}
              zoom={14}
              style={{ height: '100%', width: '100%' }}
              ref={mapRef}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              
              {/* Plot Polygons */}
              {farmerData.plots.map((plot) => (
                <Polygon
                  key={plot.id}
                  positions={plot.coordinates}
                  pathOptions={{
                    color: getRiskColor(plot.riskLevel),
                    fillColor: getRiskColor(plot.riskLevel),
                    fillOpacity: 0.3,
                    weight: selectedPlot?.id === plot.id ? 4 : 2
                  }}
                  eventHandlers={{
                    click: () => onPlotSelect?.(plot)
                  }}
                >
                  <Popup>
                    <div className="p-2 min-w-48">
                      <h3 className="font-semibold text-lg">{plot.name}</h3>
                      <div className="space-y-1 text-sm">
                        <p><span className="font-medium">Crop:</span> {plot.crop}</p>
                        <p><span className="font-medium">Area:</span> {plot.area} hectares</p>
                        <p><span className="font-medium">Risk Level:</span> 
                          <Badge 
                            variant="outline" 
                            className={`ml-1 border-${getRiskColor(plot.riskLevel).replace('#', '')} text-${getRiskColor(plot.riskLevel).replace('#', '')}`}
                          >
                            {plot.riskLevel}
                          </Badge>
                        </p>
                        <p><span className="font-medium">Risk Score:</span> {plot.riskScore}/100</p>
                        <p><span className="font-medium">Last Yield:</span> {plot.lastYield} tons/ha</p>
                        <p><span className="font-medium">Sensors:</span> {plot.sensors.length} active</p>
                      </div>
                      <Button 
                        size="sm" 
                        className="mt-2 w-full"
                        onClick={() => onPlotSelect?.(plot)}
                      >
                        View Details
                      </Button>
                    </div>
                  </Popup>
                </Polygon>
              ))}
              
              {/* Sensor Markers */}
              {farmerData.plots.flatMap(plot => 
                plot.sensors.map(sensor => (
                  <Marker 
                    key={sensor.id} 
                    position={sensor.position}
                  >
                    <Popup>
                      <div className="p-2">
                        <h4 className="font-semibold flex items-center space-x-2">
                          {getSensorIcon(sensor.type)}
                          <span>{sensor.id}</span>
                        </h4>
                        <div className="space-y-1 text-sm mt-2">
                          <p><span className="font-medium">Type:</span> {sensor.type.replace('_', ' ')}</p>
                          <p><span className="font-medium">Status:</span> 
                            <span className={`inline-block w-2 h-2 rounded-full ml-2 ${getSensorStatusColor(sensor.status)}`}></span>
                            <span className="ml-1 capitalize">{sensor.status.replace('_', ' ')}</span>
                          </p>
                          <p><span className="font-medium">Last Reading:</span> {sensor.lastReading}</p>
                          <p><span className="font-medium">Battery:</span> {sensor.batteryLevel}%</p>
                          <p><span className="font-medium">Plot:</span> {plot.name}</p>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))
              )}
            </MapContainer>
          </div>
        </CardContent>
      </Card>

      {/* Plot Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {farmerData.plots.map((plot) => (
          <Card 
            key={plot.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
              selectedPlot?.id === plot.id ? 'ring-2 ring-green-500' : ''
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
                <p>{plot.crop} • {plot.area} ha</p>
                <p>Risk Score: {plot.riskScore}/100</p>
                <p>Sensors: {plot.sensors.filter(s => s.status === 'online').length}/{plot.sensors.length} online</p>
              </div>
              <div className="mt-3">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full"
                    style={{ 
                      width: `${plot.riskScore}%`,
                      backgroundColor: getRiskColor(plot.riskLevel)
                    }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PlotMap;
