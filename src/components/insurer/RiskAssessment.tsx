
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getDemoInsurerData } from '@/utils/auth';
import { 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown, 
  MapPin, 
  Search, 
  Calendar,
  Thermometer,
  Droplets,
  Wind,
  Sun
} from 'lucide-react';

const RiskAssessment = () => {
  const data = getDemoInsurerData();
  const [selectedFarmer, setSelectedFarmer] = useState<string>('');
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [timeframe, setTimeframe] = useState<string>('6months');

  const riskFactors = [
    { name: 'Weather Risk', value: 72, trend: 'up', color: 'text-red-600' },
    { name: 'Soil Quality', value: 45, trend: 'down', color: 'text-yellow-600' },
    { name: 'Historical Performance', value: 38, trend: 'stable', color: 'text-green-600' },
    { name: 'Crop Type', value: 55, trend: 'up', color: 'text-yellow-600' }
  ];

  const regionalRisks = [
    { region: 'Skikda', riskScore: 68, farmers: 15, avgYield: 85, trend: 'increasing' },
    { region: 'Constantine', riskScore: 45, farmers: 22, avgYield: 92, trend: 'stable' },
    { region: 'Setif', riskScore: 78, farmers: 8, avgYield: 78, trend: 'increasing' },
    { region: 'Batna', riskScore: 42, farmers: 18, avgYield: 88, trend: 'decreasing' },
    { region: 'Tlemcen', riskScore: 52, farmers: 12, avgYield: 90, trend: 'stable' }
  ];

  const weatherData = {
    temperature: { current: 28, forecast: [26, 29, 31, 27, 25], risk: 'medium' },
    precipitation: { current: 12, forecast: [8, 15, 22, 18, 10], risk: 'low' },
    humidity: { current: 65, forecast: [62, 68, 75, 70, 60], risk: 'low' },
    windSpeed: { current: 15, forecast: [12, 18, 20, 14, 16], risk: 'low' }
  };

  const getRiskColor = (score: number) => {
    if (score >= 70) return 'bg-red-100 text-red-800 border-red-200';
    if (score >= 50) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-green-100 text-green-800 border-green-200';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
      case 'increasing':
        return <TrendingUp className="h-4 w-4 text-red-500" />;
      case 'down':
      case 'decreasing':
        return <TrendingDown className="h-4 w-4 text-green-500" />;
      default:
        return <div className="h-4 w-4 bg-gray-400 rounded-full" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Risk Assessment</h1>
          <p className="text-gray-600">Monitor and analyze risk factors across your portfolio</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
          <Button>
            <AlertTriangle className="h-4 w-4 mr-2" />
            Risk Alerts
          </Button>
        </div>
      </div>

      {/* Selection Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Select Farmer</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <select
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={selectedFarmer}
                onChange={(e) => setSelectedFarmer(e.target.value)}
              >
                <option value="">Search farmer...</option>
                {data.farmers.map((farmer) => (
                  <option key={farmer.id} value={farmer.name}>
                    {farmer.name} - {farmer.location}
                  </option>
                ))}
              </select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Select Region</CardTitle>
          </CardHeader>
          <CardContent>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
            >
              <option value="">All Regions</option>
              {regionalRisks.map((region) => (
                <option key={region.region} value={region.region}>
                  {region.region}
                </option>
              ))}
            </select>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Time Frame</CardTitle>
          </CardHeader>
          <CardContent>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
            >
              <option value="1month">Last Month</option>
              <option value="3months">Last 3 Months</option>
              <option value="6months">Last 6 Months</option>
              <option value="1year">Last Year</option>
            </select>
          </CardContent>
        </Card>
      </div>

      {/* Overall Risk Score */}
      <Card>
        <CardHeader>
          <CardTitle>Portfolio Risk Overview</CardTitle>
          <CardDescription>Current risk assessment across all farmers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="relative w-24 h-24 mx-auto mb-3">
                <svg className="w-24 h-24" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#E5E7EB"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#F59E0B"
                    strokeWidth="3"
                    strokeDasharray={`${58}, 100`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-900">58</span>
                </div>
              </div>
              <p className="text-sm font-medium text-gray-900">Overall Risk Score</p>
              <p className="text-xs text-gray-500">Medium Risk</p>
            </div>

            {riskFactors.map((factor, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <span className={`text-2xl font-bold ${factor.color}`}>{factor.value}</span>
                  <div className="ml-2">
                    {getTrendIcon(factor.trend)}
                  </div>
                </div>
                <p className="text-sm font-medium text-gray-900">{factor.name}</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className={`h-2 rounded-full ${
                      factor.value >= 70 ? 'bg-red-500' :
                      factor.value >= 50 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${factor.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Regional Risk Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Regional Risk Analysis</CardTitle>
          <CardDescription>Risk assessment by geographic region</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {regionalRisks.map((region, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-4">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <div>
                    <h3 className="font-medium text-gray-900">{region.region}</h3>
                    <p className="text-sm text-gray-500">{region.farmers} farmers • {region.avgYield}% avg yield</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">Risk Score</p>
                    <p className="text-lg font-bold">{region.riskScore}</p>
                  </div>
                  <Badge className={getRiskColor(region.riskScore)} variant="outline">
                    {region.riskScore >= 70 ? 'High' : region.riskScore >= 50 ? 'Medium' : 'Low'}
                  </Badge>
                  {getTrendIcon(region.trend)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weather Risk Factors */}
      <Card>
        <CardHeader>
          <CardTitle>Weather Risk Analysis</CardTitle>
          <CardDescription>Current weather conditions and 5-day forecast impact</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <Thermometer className="h-8 w-8 mx-auto mb-2 text-orange-500" />
              <p className="text-sm font-medium text-gray-900">Temperature</p>
              <p className="text-2xl font-bold text-gray-900">{weatherData.temperature.current}°C</p>
              <div className="flex justify-center space-x-1 mt-2">
                {weatherData.temperature.forecast.map((temp, i) => (
                  <div key={i} className="text-xs text-gray-500">{temp}°</div>
                ))}
              </div>
              <Badge className={getRiskColor(weatherData.temperature.risk === 'medium' ? 55 : 30)} variant="outline">
                {weatherData.temperature.risk} risk
              </Badge>
            </div>

            <div className="text-center">
              <Droplets className="h-8 w-8 mx-auto mb-2 text-blue-500" />
              <p className="text-sm font-medium text-gray-900">Precipitation</p>
              <p className="text-2xl font-bold text-gray-900">{weatherData.precipitation.current}mm</p>
              <div className="flex justify-center space-x-1 mt-2">
                {weatherData.precipitation.forecast.map((prec, i) => (
                  <div key={i} className="text-xs text-gray-500">{prec}mm</div>
                ))}
              </div>
              <Badge className={getRiskColor(30)} variant="outline">
                {weatherData.precipitation.risk} risk
              </Badge>
            </div>

            <div className="text-center">
              <Droplets className="h-8 w-8 mx-auto mb-2 text-cyan-500" />
              <p className="text-sm font-medium text-gray-900">Humidity</p>
              <p className="text-2xl font-bold text-gray-900">{weatherData.humidity.current}%</p>
              <div className="flex justify-center space-x-1 mt-2">
                {weatherData.humidity.forecast.map((hum, i) => (
                  <div key={i} className="text-xs text-gray-500">{hum}%</div>
                ))}
              </div>
              <Badge className={getRiskColor(35)} variant="outline">
                {weatherData.humidity.risk} risk
              </Badge>
            </div>

            <div className="text-center">
              <Wind className="h-8 w-8 mx-auto mb-2 text-gray-500" />
              <p className="text-sm font-medium text-gray-900">Wind Speed</p>
              <p className="text-2xl font-bold text-gray-900">{weatherData.windSpeed.current} km/h</p>
              <div className="flex justify-center space-x-1 mt-2">
                {weatherData.windSpeed.forecast.map((wind, i) => (
                  <div key={i} className="text-xs text-gray-500">{wind}</div>
                ))}
              </div>
              <Badge className={getRiskColor(25)} variant="outline">
                {weatherData.windSpeed.risk} risk
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Risk Predictions */}
      <Card>
        <CardHeader>
          <CardTitle>Risk Predictions & Recommendations</CardTitle>
          <CardDescription>AI-powered risk forecasting and mitigation strategies</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3">30-Day Risk Forecast</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div>
                    <p className="font-medium text-yellow-800">Drought Risk Increasing</p>
                    <p className="text-sm text-yellow-600">Setif and Batna regions</p>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200" variant="outline">
                    Week 2-3
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div>
                    <p className="font-medium text-blue-800">Heavy Rain Expected</p>
                    <p className="text-sm text-blue-600">Northern coastal regions</p>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800 border-blue-200" variant="outline">
                    Week 4
                  </Badge>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Recommended Actions</h3>
              <div className="space-y-3">
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="font-medium text-green-800">Increase Monitoring</p>
                  <p className="text-sm text-green-600">Focus on high-risk farmers in Setif region</p>
                </div>
                <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <p className="font-medium text-orange-800">Policy Adjustments</p>
                  <p className="text-sm text-orange-600">Consider premium adjustments for drought-prone areas</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RiskAssessment;
