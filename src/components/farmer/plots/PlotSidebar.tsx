
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plot } from '@/utils/farmerData';
import { Search, MapPin, Edit, Trash2 } from 'lucide-react';

interface PlotSidebarProps {
  plots: Plot[];
  selectedPlot: Plot | null;
  onPlotSelect: (plot: Plot) => void;
  onZoomToPlot: (plot: Plot) => void;
  onEditPlot: (plot: Plot) => void;
  onDeletePlot: (plot: Plot) => void;
}

const PlotSidebar: React.FC<PlotSidebarProps> = ({
  plots,
  selectedPlot,
  onPlotSelect,
  onZoomToPlot,
  onEditPlot,
  onDeletePlot
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cropFilter, setCropFilter] = useState('all');
  const [riskFilter, setRiskFilter] = useState('all');

  const filteredPlots = plots.filter(plot => {
    const matchesSearch = plot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plot.crop.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCrop = cropFilter === 'all' || plot.crop === cropFilter;
    const matchesRisk = riskFilter === 'all' || plot.riskLevel === riskFilter;
    
    return matchesSearch && matchesCrop && matchesRisk;
  });

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'High': return 'bg-red-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const uniqueCrops = [...new Set(plots.map(plot => plot.crop))];

  return (
    <div className="w-80 h-full bg-white border-r border-gray-200 flex flex-col">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">My Plots ({plots.length})</CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-hidden flex flex-col space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search plots..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filters */}
        <div className="grid grid-cols-2 gap-2">
          <Select value={cropFilter} onValueChange={setCropFilter}>
            <SelectTrigger className="text-xs">
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
            <SelectTrigger className="text-xs">
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

        {/* Plot List */}
        <div className="flex-1 overflow-y-auto space-y-2">
          {filteredPlots.map((plot) => (
            <Card
              key={plot.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                selectedPlot?.id === plot.id ? 'ring-2 ring-green-500 bg-green-50' : ''
              }`}
              onClick={() => onPlotSelect(plot)}
            >
              <CardContent className="p-3">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm">{plot.name}</h3>
                    <p className="text-xs text-gray-600">{plot.crop}</p>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${getRiskColor(plot.riskLevel)}`} />
                </div>
                
                <div className="space-y-1 text-xs text-gray-600">
                  <p>Area: {plot.area} ha</p>
                  <p>Risk: {plot.riskScore}/100</p>
                  <p>Sensors: {plot.sensors.filter(s => s.status === 'online').length}/{plot.sensors.length}</p>
                </div>

                <div className="flex space-x-1 mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-6 px-2 text-xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      onZoomToPlot(plot);
                    }}
                  >
                    <MapPin className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-6 px-2 text-xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditPlot(plot);
                    }}
                  >
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-6 px-2 text-xs text-red-600 hover:text-red-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeletePlot(plot);
                    }}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </div>
  );
};

export default PlotSidebar;
