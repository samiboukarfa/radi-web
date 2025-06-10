import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getFilteredInsurerData } from '@/utils/insurerInteractiveData';
import { AlertTriangle, TrendingUp, TrendingDown, MapPin, Search, Calendar, Thermometer, Droplets, Wind, Sun, User, Target } from 'lucide-react';
const RiskAssessment = () => {
  const [selectedFarmer, setSelectedFarmer] = useState<string>('');
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [timeframe, setTimeframe] = useState<string>('6months');
  const filteredData = useMemo(() => getFilteredInsurerData(selectedFarmer, selectedRegion, timeframe), [selectedFarmer, selectedRegion, timeframe]);
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

  // Clear all selections
  const clearSelections = () => {
    setSelectedFarmer('');
    setSelectedRegion('');
  };
  return <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Risk Assessment</h1>
          <p className="text-gray-600">
            {selectedFarmer && selectedRegion ? `Analyzing ${selectedFarmer} in ${selectedRegion}` : selectedFarmer ? `Analyzing ${selectedFarmer}` : selectedRegion ? `Analyzing ${selectedRegion} region` : 'Monitor and analyze risk factors across your portfolio'}
          </p>
        </div>
        <div className="flex space-x-3">
          {(selectedFarmer || selectedRegion) && <Button variant="outline" onClick={clearSelections}>
              <Target className="h-4 w-4 mr-2" />
              Clear Filters
            </Button>}
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
          <Button>
            <AlertTriangle className="h-4 w-4 mr-2" />
            Risk Alerts ({filteredData.alerts.length})
          </Button>
        </div>
      </div>

      {/* Selection Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <User className="h-4 w-4 mr-2" />
              Select Farmer
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <select className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" value={selectedFarmer} onChange={e => setSelectedFarmer(e.target.value)}>
                <option value="">All farmers...</option>
                <option value="Ahmed Ben Ahmed">Ahmed Ben Ahmed - Skikda</option>
                <option value="Salem Khrobi">Salem Khrobi - Constantine (Case Study)</option>
                <option value="Hamza Dawdi">Hamza Dawdi - Constantine (Case Study)</option>
              </select>
              {selectedFarmer && <div className="mt-2 p-2 bg-blue-50 rounded text-xs text-blue-700">
                  <strong>Selected:</strong> {selectedFarmer}
                </div>}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <MapPin className="h-4 w-4 mr-2" />
              Select Region
            </CardTitle>
          </CardHeader>
          <CardContent>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" value={selectedRegion} onChange={e => setSelectedRegion(e.target.value)}>
              <option value="">All Regions</option>
              <option value="Constantine">Constantine (Case Studies)</option>
              <option value="Skikda">Skikda</option>
              <option value="Setif">Setif</option>
              <option value="Batna">Batna</option>
              <option value="Tlemcen">Tlemcen</option>
            </select>
            {selectedRegion && <div className="mt-2 p-2 bg-green-50 rounded text-xs text-green-700">
                <strong>Active Region:</strong> {selectedRegion}
                {selectedRegion === 'Constantine' && <p className="mt-1">Includes Salem & Hamza case studies</p>}
              </div>}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Time Frame</CardTitle>
          </CardHeader>
          <CardContent>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" value={timeframe} onChange={e => setTimeframe(e.target.value)}>
              <option value="1month">Last Month</option>
              <option value="3months">Last 3 Months</option>
              <option value="6months">Last 6 Months</option>
              <option value="1year">Last Year</option>
            </select>
          </CardContent>
        </Card>
      </div>

      {/* Dynamic Context Banner */}
      {(selectedFarmer || selectedRegion) && <Card className="border-2 border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-blue-600" />
              <h3 className="font-semibold text-blue-900">Focused Analysis Active</h3>
            </div>
            <p className="text-sm text-blue-700 mt-1">
              {selectedFarmer && selectedRegion ? `Displaying risk analysis specifically for ${selectedFarmer} in ${selectedRegion} region over the ${timeframe}.` : selectedFarmer ? `Showing risk profile and recommendations tailored for ${selectedFarmer}.` : `Regional analysis focused on ${selectedRegion} with ${filteredData.farmers.length} farmers.`}
            </p>
          </CardContent>
        </Card>}

      {/* Overall Risk Score - Dynamic */}
      <Card>
        <CardHeader>
          <CardTitle>
            {selectedFarmer ? `${selectedFarmer} Risk Profile` : selectedRegion ? `${selectedRegion} Regional Risk Overview` : 'Portfolio Risk Overview'}
          </CardTitle>
          <CardDescription>
            {selectedFarmer ? 'Individual farmer risk assessment' : selectedRegion ? `Risk assessment for ${selectedRegion} region` : 'Current risk assessment across all farmers'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="relative w-24 h-24 mx-auto mb-3">
                <svg className="w-24 h-24" viewBox="0 0 36 36">
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#E5E7EB" strokeWidth="3" />
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke={filteredData.overallRiskScore >= 70 ? "#EF4444" : filteredData.overallRiskScore >= 50 ? "#F59E0B" : "#10B981"} strokeWidth="3" strokeDasharray={`${filteredData.overallRiskScore}, 100`} />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-900">{filteredData.overallRiskScore}</span>
                </div>
              </div>
              <p className="text-sm font-medium text-gray-900">Overall Risk Score</p>
              <p className="text-xs text-gray-500">
                {filteredData.overallRiskScore >= 70 ? 'High Risk' : filteredData.overallRiskScore >= 50 ? 'Medium Risk' : 'Low Risk'}
              </p>
            </div>

            {filteredData.riskFactors.map((factor, index) => <div key={index} className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <span className={`text-2xl font-bold ${factor.color}`}>{factor.value}</span>
                  <div className="ml-2">
                    {getTrendIcon(factor.trend)}
                  </div>
                </div>
                <p className="text-sm font-medium text-gray-900">{factor.name}</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div className={`h-2 rounded-full ${factor.value >= 70 ? 'bg-red-500' : factor.value >= 50 ? 'bg-yellow-500' : 'bg-green-500'}`} style={{
                width: `${factor.value}%`
              }} />
                </div>
              </div>)}
          </div>
        </CardContent>
      </Card>

      {/* Regional Risk Analysis - Dynamic */}
      <Card>
        
        
      </Card>

      {/* Weather Risk Factors - Dynamic */}
      <Card>
        <CardHeader>
          <CardTitle>Weather Risk Analysis</CardTitle>
          <CardDescription>
            {selectedRegion ? `Weather conditions for ${selectedRegion}` : 'Current weather conditions and 5-day forecast impact'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <Thermometer className="h-8 w-8 mx-auto mb-2 text-orange-500" />
              <p className="text-sm font-medium text-gray-900">Temperature</p>
              <p className="text-2xl font-bold text-gray-900">{filteredData.weatherData.temperature.current}°C</p>
              <div className="flex justify-center space-x-1 mt-2">
                {filteredData.weatherData.temperature.forecast.map((temp, i) => <div key={i} className="text-xs text-gray-500">{temp}°</div>)}
              </div>
              <Badge className={getRiskColor(filteredData.weatherData.temperature.risk === 'medium' ? 55 : 30)} variant="outline">
                {filteredData.weatherData.temperature.risk} risk
              </Badge>
            </div>

            <div className="text-center">
              <Droplets className="h-8 w-8 mx-auto mb-2 text-blue-500" />
              <p className="text-sm font-medium text-gray-900">Precipitation</p>
              <p className="text-2xl font-bold text-gray-900">{filteredData.weatherData.precipitation.current}mm</p>
              <div className="flex justify-center space-x-1 mt-2">
                {filteredData.weatherData.precipitation.forecast.map((prec, i) => <div key={i} className="text-xs text-gray-500">{prec}mm</div>)}
              </div>
              <Badge className={getRiskColor(filteredData.weatherData.precipitation.risk === 'high' ? 75 : 30)} variant="outline">
                {filteredData.weatherData.precipitation.risk} risk
              </Badge>
            </div>

            <div className="text-center">
              <Droplets className="h-8 w-8 mx-auto mb-2 text-cyan-500" />
              <p className="text-sm font-medium text-gray-900">Humidity</p>
              <p className="text-2xl font-bold text-gray-900">{filteredData.weatherData.humidity.current}%</p>
              <div className="flex justify-center space-x-1 mt-2">
                {filteredData.weatherData.humidity.forecast.map((hum, i) => <div key={i} className="text-xs text-gray-500">{hum}%</div>)}
              </div>
              <Badge className={getRiskColor(35)} variant="outline">
                {filteredData.weatherData.humidity.risk} risk
              </Badge>
            </div>

            <div className="text-center">
              <Wind className="h-8 w-8 mx-auto mb-2 text-gray-500" />
              <p className="text-sm font-medium text-gray-900">Wind Speed</p>
              <p className="text-2xl font-bold text-gray-900">{filteredData.weatherData.windSpeed.current} km/h</p>
              <div className="flex justify-center space-x-1 mt-2">
                {filteredData.weatherData.windSpeed.forecast.map((wind, i) => <div key={i} className="text-xs text-gray-500">{wind}</div>)}
              </div>
              <Badge className={getRiskColor(filteredData.weatherData.windSpeed.risk === 'medium' ? 55 : 25)} variant="outline">
                {filteredData.weatherData.windSpeed.risk} risk
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filtered Alerts */}
      {filteredData.alerts.length > 0 && <Card>
          <CardHeader>
            <CardTitle>
              Active Alerts
              <Badge variant="destructive" className="ml-2">{filteredData.alerts.length}</Badge>
            </CardTitle>
            <CardDescription>
              {selectedFarmer || selectedRegion ? 'Filtered alerts for current selection' : 'All active alerts'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredData.alerts.map(alert => <div key={alert.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm">{alert.title}</h4>
                      <p className="text-xs text-gray-600 mt-1">
                        <strong>Farmer:</strong> {alert.farmer} • <strong>Location:</strong> {alert.location}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                    </div>
                    <Badge className={alert.severity === 'high' ? 'bg-red-100 text-red-800 border-red-200' : alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' : 'bg-green-100 text-green-800 border-green-200'} variant="outline">
                      {alert.severity.toUpperCase()}
                    </Badge>
                  </div>
                </div>)}
            </div>
          </CardContent>
        </Card>}

      {/* Risk Predictions & Recommendations - Dynamic */}
      <Card>
        <CardHeader>
          <CardTitle>Risk Predictions & Recommendations</CardTitle>
          <CardDescription>
            {selectedFarmer ? `Personalized recommendations for ${selectedFarmer}` : selectedRegion ? `Regional strategies for ${selectedRegion}` : 'AI-powered risk forecasting and mitigation strategies'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3">30-Day Risk Forecast</h3>
              <div className="space-y-3">
                {selectedFarmer === 'Salem Khrobi' ? <>
                    <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div>
                        <p className="font-medium text-yellow-800">Drought Monitoring</p>
                        <p className="text-sm text-yellow-600">NDVI: 0.31 stable, continue monitoring</p>
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200" variant="outline">
                        Ongoing
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div>
                        <p className="font-medium text-blue-800">Irrigation Optimization</p>
                        <p className="text-sm text-blue-600">Efficiency gains possible in Week 2-3</p>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800 border-blue-200" variant="outline">
                        Week 2-3
                      </Badge>
                    </div>
                  </> : selectedFarmer === 'Hamza Dawdi' ? <>
                    <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div>
                        <p className="font-medium text-green-800">Recovery Monitoring</p>
                        <p className="text-sm text-green-600">Crop recovery progressing well</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800 border-green-200" variant="outline">
                        Positive
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div>
                        <p className="font-medium text-yellow-800">Weather Sensitivity</p>
                        <p className="text-sm text-yellow-600">Monitor for severe weather patterns</p>
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200" variant="outline">
                        Ongoing
                      </Badge>
                    </div>
                  </> : <>
                    <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div>
                        <p className="font-medium text-yellow-800">
                          {selectedRegion === 'Constantine' ? 'Regional Drought Risk' : 'Drought Risk Increasing'}
                        </p>
                        <p className="text-sm text-yellow-600">
                          {selectedRegion === 'Constantine' ? 'Constantine farmers affected' : 'Setif and Batna regions'}
                        </p>
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
                  </>}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Recommended Actions</h3>
              <div className="space-y-3">
                {selectedFarmer === 'Salem Khrobi' ? <>
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="font-medium text-green-800">Maintain Current Strategy</p>
                      <p className="text-sm text-green-600">Drought management is effective, continue monitoring</p>
                    </div>
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="font-medium text-blue-800">Case Study Documentation</p>
                      <p className="text-sm text-blue-600">Document successful drought mitigation practices</p>
                    </div>
                  </> : selectedFarmer === 'Hamza Dawdi' ? <>
                    <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                      <p className="font-medium text-orange-800">Enhanced Monitoring</p>
                      <p className="text-sm text-orange-600">Increase weather pattern surveillance for early warning</p>
                    </div>
                    <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                      <p className="font-medium text-purple-800">Recovery Support</p>
                      <p className="text-sm text-purple-600">Provide additional resources for crop recovery</p>
                    </div>
                  </> : <>
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="font-medium text-green-800">
                        {selectedRegion ? `Focus on ${selectedRegion}` : 'Increase Monitoring'}
                      </p>
                      <p className="text-sm text-green-600">
                        {selectedRegion === 'Constantine' ? 'Support Salem and Hamza case studies' : 'Focus on high-risk farmers in affected regions'}
                      </p>
                    </div>
                    
                  </>}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>;
};
export default RiskAssessment;