
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { getHistoricalRiskData, getDateRangeData, HistoricalRiskEntry } from '@/utils/historicalRiskData';
import { Calendar as CalendarIcon, TrendingUp, TrendingDown, AlertTriangle, Eye, Download } from 'lucide-react';
import { format } from 'date-fns';

const HistoricalRiskData = () => {
  const [selectedFarmer, setSelectedFarmer] = useState<string>('salem');
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(2023, 4, 1),
    to: new Date()
  });
  const [viewMode, setViewMode] = useState<'single' | 'range'>('range');

  const farmers = [
    { id: 'salem', name: 'Salem Khrobi', location: 'Lkhrob, Constantine' },
    { id: 'hamza', name: 'Hamza Dawdi', location: 'Mezaguet Roha, Constantine' }
  ];

  const farmerData = getHistoricalRiskData(selectedFarmer);
  const rangeData = viewMode === 'range' 
    ? getDateRangeData(selectedFarmer, dateRange.from.toISOString(), dateRange.to.toISOString())
    : selectedDate 
      ? farmerData?.entries.filter(entry => entry.date === format(selectedDate, 'yyyy-MM-dd')) || []
      : [];

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const RiskEntryCard: React.FC<{ entry: HistoricalRiskEntry }> = ({ entry }) => (
    <Card className="mb-4">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{format(new Date(entry.date), 'MMMM dd, yyyy')}</CardTitle>
          <Badge className={getRiskColor(entry.riskLevel)} variant="outline">
            {entry.riskLevel} Risk - {entry.riskScore}/10
          </Badge>
        </div>
        {entry.weatherEvent && (
          <CardDescription className="flex items-center">
            <AlertTriangle className="h-4 w-4 mr-2" />
            {entry.weatherEvent}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold mb-2">Risk Indicators</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>NDVI:</span>
                <span className="font-medium">{entry.indicators.ndvi}</span>
              </div>
              <div className="flex justify-between">
                <span>CAPE:</span>
                <span className="font-medium">{entry.indicators.cape} J/kg</span>
              </div>
              <div className="flex justify-between">
                <span>Wind Shear:</span>
                <span className="font-medium">{entry.indicators.windShear} m/s</span>
              </div>
              <div className="flex justify-between">
                <span>Temperature:</span>
                <span className="font-medium">{entry.indicators.temperature}°C</span>
              </div>
              <div className="flex justify-between">
                <span>Precipitation Anomaly:</span>
                <span className="font-medium">{entry.indicators.precipitation}mm</span>
              </div>
              <div className="flex justify-between">
                <span>Soil Moisture:</span>
                <span className="font-medium">{entry.indicators.soilMoisture}%</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Analysis & Interpretation</h4>
            <p className="text-sm text-gray-700">{entry.interpretation}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Historical Risk Analysis</h1>
          <p className="text-gray-600">View historical risk scores and contributing indicators for registered farmers</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Farmer Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Select Farmer</CardTitle>
          <CardDescription>Choose a registered farmer to view their historical risk data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {farmers.map((farmer) => (
              <div
                key={farmer.id}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedFarmer === farmer.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedFarmer(farmer.id)}
              >
                <h3 className="font-semibold">{farmer.name}</h3>
                <p className="text-sm text-gray-600">{farmer.location}</p>
                {selectedFarmer === farmer.id && (
                  <Badge className="mt-2" variant="outline">Selected</Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Date Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Date Selection</CardTitle>
          <CardDescription>Choose to view data for a specific date or date range</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4 mb-4">
            <Button
              variant={viewMode === 'single' ? 'default' : 'outline'}
              onClick={() => setViewMode('single')}
            >
              Single Date
            </Button>
            <Button
              variant={viewMode === 'range' ? 'default' : 'outline'}
              onClick={() => setViewMode('range')}
            >
              Date Range
            </Button>
          </div>

          {viewMode === 'single' ? (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, 'PPP') : 'Select a date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">From Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {format(dateRange.from, 'PPP')}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={dateRange.from}
                      onSelect={(date) => date && setDateRange(prev => ({ ...prev, from: date }))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <label className="text-sm font-medium">To Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {format(dateRange.to, 'PPP')}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={dateRange.to}
                      onSelect={(date) => date && setDateRange(prev => ({ ...prev, to: date }))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Historical Data Display */}
      <Card>
        <CardHeader>
          <CardTitle>Historical Risk Data</CardTitle>
          <CardDescription>
            {farmerData && `Showing ${rangeData.length} entries for ${farmerData.farmerName}`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {rangeData.length > 0 ? (
            <div className="space-y-4">
              {rangeData.map((entry, index) => (
                <RiskEntryCard key={index} entry={entry} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Eye className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No historical data found for the selected date{viewMode === 'range' ? ' range' : ''}.</p>
              <p className="text-sm mt-2">Try selecting a different date or farmer.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default HistoricalRiskData;
