
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { getEnhancedFarmerData, Plot } from '@/utils/farmerData';
import { TrendingUp, AlertTriangle, Droplets, Activity, Download } from 'lucide-react';

interface RiskChartsProps {
  selectedPlot?: Plot | null;
}

const RiskCharts: React.FC<RiskChartsProps> = ({ selectedPlot }) => {
  const [farmerData] = useState(getEnhancedFarmerData());
  const [timeframe, setTimeframe] = useState<'week' | 'month' | '3months' | '6months'>('month');
  
  const currentPlot = selectedPlot || farmerData.plots[0];

  // Generate NDVI data with dates
  const ndviData = currentPlot.ndviTrend.map((value, index) => ({
    date: new Date(2024, 0, (index + 1) * 7).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    ndvi: value,
    threshold: 0.4 // Healthy vegetation threshold
  }));

  // Generate soil moisture data
  const moistureData = currentPlot.moistureLevels.map((value, index) => ({
    date: new Date(2024, 0, (index + 1) * 7).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    moisture: value,
    optimal_min: 35,
    optimal_max: 50
  }));

  // Generate rainfall data for the past 7 weeks
  const rainfallData = [
    { date: 'Dec 25', rainfall: 0, temperature: 22 },
    { date: 'Jan 1', rainfall: 15, temperature: 20 },
    { date: 'Jan 8', rainfall: 8, temperature: 25 },
    { date: 'Jan 15', rainfall: 0, temperature: 28 },
    { date: 'Jan 22', rainfall: 22, temperature: 24 },
    { date: 'Jan 29', rainfall: 5, temperature: 26 },
    { date: 'Feb 5', rainfall: 0, temperature: 30 }
  ];

  // Risk comparison data
  const riskComparisonData = farmerData.plots.map(plot => ({
    name: plot.name,
    current: plot.riskScore,
    lastMonth: Math.max(10, plot.riskScore - Math.random() * 20),
    area: plot.area
  }));

  const getRiskColor = (score: number) => {
    if (score >= 70) return '#EF4444';
    if (score >= 40) return '#F59E0B';
    return '#10B981';
  };

  const exportChart = (chartName: string) => {
    // Placeholder for chart export functionality
    console.log(`Exporting ${chartName} chart`);
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center space-x-2">
              <Activity className="h-5 w-5" />
              <span>Risk Monitoring - {currentPlot.name}</span>
            </span>
            <div className="flex space-x-2">
              {(['week', 'month', '3months', '6months'] as const).map((period) => (
                <Button
                  key={period}
                  variant={timeframe === period ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTimeframe(period)}
                >
                  {period === '3months' ? '3M' : period === '6months' ? '6M' : period.charAt(0).toUpperCase() + period.slice(1)}
                </Button>
              ))}
            </div>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Risk Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Current Risk Score</p>
                <p className="text-2xl font-bold" style={{ color: getRiskColor(currentPlot.riskScore) }}>
                  {currentPlot.riskScore}/100
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">NDVI Current</p>
                <p className="text-2xl font-bold text-green-600">
                  {currentPlot.ndviTrend[currentPlot.ndviTrend.length - 1].toFixed(2)}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Soil Moisture</p>
                <p className="text-2xl font-bold text-blue-600">
                  {currentPlot.moistureLevels[currentPlot.moistureLevels.length - 1]}%
                </p>
              </div>
              <Droplets className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Sensors Status</p>
                <p className="text-2xl font-bold text-gray-700">
                  {currentPlot.sensors.filter(s => s.status === 'online').length}/{currentPlot.sensors.length}
                </p>
              </div>
              <Activity className="h-8 w-8 text-gray-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* NDVI Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>NDVI Vegetation Health Trend</span>
            <Button variant="outline" size="sm" onClick={() => exportChart('NDVI')}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={ndviData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[0, 1]} />
                <Tooltip 
                  formatter={(value: number, name: string) => [
                    name === 'ndvi' ? value.toFixed(3) : value,
                    name === 'ndvi' ? 'NDVI Value' : 'Healthy Threshold'
                  ]}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="ndvi" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                  name="NDVI Value"
                />
                <Line 
                  type="monotone" 
                  dataKey="threshold" 
                  stroke="#F59E0B" 
                  strokeDasharray="5 5"
                  name="Healthy Threshold"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>NDVI > 0.4: Healthy vegetation</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span>NDVI 0.2-0.4: Moderate stress</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span>NDVI < 0.2: High stress</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Soil Moisture Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Soil Moisture Levels</span>
            <Button variant="outline" size="sm" onClick={() => exportChart('Moisture')}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={moistureData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value: number) => [`${value}%`, 'Moisture Level']} />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="optimal_max" 
                  stackId="1"
                  stroke="#22C55E" 
                  fill="#22C55E"
                  fillOpacity={0.1}
                  name="Optimal Range"
                />
                <Area 
                  type="monotone" 
                  dataKey="optimal_min" 
                  stackId="1"
                  stroke="#22C55E" 
                  fill="#ffffff"
                  fillOpacity={1}
                />
                <Line 
                  type="monotone" 
                  dataKey="moisture" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  name="Current Moisture"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Rainfall and Temperature Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Rainfall and Temperature</span>
            <Button variant="outline" size="sm" onClick={() => exportChart('Weather')}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={rainfallData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Bar 
                  yAxisId="left"
                  dataKey="rainfall" 
                  fill="#3B82F6" 
                  name="Rainfall (mm)"
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="temperature" 
                  stroke="#F59E0B" 
                  strokeWidth={2}
                  name="Temperature (°C)"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Risk Comparison Across Plots */}
      <Card>
        <CardHeader>
          <CardTitle>Risk Comparison Across All Plots</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={riskComparisonData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar 
                  dataKey="current" 
                  fill="#EF4444" 
                  name="Current Risk Score"
                />
                <Bar 
                  dataKey="lastMonth" 
                  fill="#F59E0B" 
                  name="Last Month"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Anomaly Detection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            <span>Anomaly Detection</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border border-red-200 rounded-lg bg-red-50">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-red-700">NDVI Decline Detected</h3>
                  <p className="text-sm text-red-600">
                    {currentPlot.name} showing 15% NDVI decrease over past 2 weeks
                  </p>
                </div>
                <Badge variant="destructive">High Priority</Badge>
              </div>
            </div>
            
            <div className="p-4 border border-yellow-200 rounded-lg bg-yellow-50">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-yellow-700">Moisture Fluctuation</h3>
                  <p className="text-sm text-yellow-600">
                    Irregular soil moisture patterns detected in North Field
                  </p>
                </div>
                <Badge variant="outline" className="border-yellow-500 text-yellow-700">
                  Medium Priority
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RiskCharts;
