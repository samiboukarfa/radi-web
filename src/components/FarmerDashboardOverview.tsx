import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getUserSession, getCurrentProfile } from '@/utils/auth';
import { getFarmerProfile } from '@/utils/farmerProfiles';
import { ClimateHazard, getRiskScoreColor } from '@/utils/riskScore';
import RiskScoreModal from '@/components/farmer/risk/RiskScoreModal';
import RiskParametersEditor from '@/components/farmer/risk/RiskParametersEditor';
import { useRiskCalculator } from '@/hooks/useRiskCalculator';
import { MapPin, AlertTriangle, Cloud, TrendingUp, Plus, Eye, CheckCircle, Award, Activity, Droplets, Calculator, Settings, RefreshCw } from 'lucide-react';

const FarmerDashboardOverview: React.FC = () => {
  const user = getUserSession();
  const currentProfileId = getCurrentProfile();
  const farmerData = getFarmerProfile(currentProfileId);

  const totalArea = farmerData.plots.reduce((sum, plot) => sum + plot.area, 0);
  const highRiskPlots = farmerData.plots.filter(plot => plot.riskLevel === 'High').length;

  // Risk Calculator Hook
  const riskCalculator = useRiskCalculator({
    initialParameters: farmerData.riskParameters,
    onParametersUpdate: (parameters) => {
      // Here you could save to backend/localStorage if needed
      console.log('Parameters updated:', parameters);
    }
  });

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'High':
        return 'text-red-600 bg-red-100';
      case 'Medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'Low':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'text-red-600 bg-red-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'low':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getProfileSpecificMessage = () => {
    switch (currentProfileId) {
      case 'salem':
        return {
          title: `Welcome back, ${farmerData.personalInfo.fullName} 🫒`,
          subtitle: 'Constantine olive grove monitoring - Drought and hail conditions managed',
          highlight: 'RADI Score: 8.0/10 (Low Risk) • NDVI: 0.31 (Stable) • LST: +4.3°C anomaly'
        };
      case 'hamza':
        return {
          title: `Welcome back, ${farmerData.personalInfo.fullName} 🌾`,
          subtitle: 'Wheat field recovery status - Post-hailstorm monitoring',
          highlight: 'CRMA Claim CNMA-CLM-2023-001: Documentation approved and processed'
        };
      default:
        return {
          title: `Welcome back, ${farmerData.personalInfo.fullName} 👋`,
          subtitle: `Managing your agricultural operations in ${farmerData.personalInfo.farmAddress.split(',')[1]}`,
          highlight: 'Comprehensive farm monitoring with RADI risk assessment'
        };
    }
  };

  const profileMessage = getProfileSpecificMessage();

  return (
    <div className="space-y-6">
      {/* Welcome Message */}
      <div className="bg-gradient-to-r from-agri-green to-green-600 text-white p-6 rounded-lg">
        <h1 className="text-2xl font-bold mb-2">
          {profileMessage.title}
        </h1>
        
        <div className="mt-4 flex items-center space-x-4 text-sm flex-wrap gap-2">
          <span className="inline-flex items-center px-3 py-1 bg-white bg-opacity-20 rounded-full">
            Demo Account Active
          </span>
          {currentProfileId === 'salem' || currentProfileId === 'hamza'}
          
        </div>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Plots</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{farmerData.plots.length}</div>
            <p className="text-xs text-muted-foreground">
              {totalArea.toFixed(1)} hectares total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">RADI Risk Score</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getRiskScoreColor(riskCalculator.result.finalScore)}`}>
              {riskCalculator.result.finalScore}/10
            </div>
            <p className="text-xs text-muted-foreground">
              {riskCalculator.result.riskLevel} Risk - {riskCalculator.hazard} Assessment
            </p>
          </CardContent>
        </Card>

        {/* Only show Active Alerts card for non-Salem profiles */}
        {currentProfileId !== 'salem' && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{farmerData.alerts.length}</div>
              <p className="text-xs text-muted-foreground">
                {currentProfileId === 'hamza' ? 'Damage assessment active' : 'Require immediate attention'}
              </p>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weather Status</CardTitle>
            <Cloud className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{farmerData.weather.current.temperature}°C</div>
            <p className="text-xs text-muted-foreground">
              {farmerData.weather.current.condition}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Plot Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Plot Overview</CardTitle>
            <CardDescription>
              Current status of your {currentProfileId === 'salem' ? 'olive grove' : currentProfileId === 'hamza' ? 'wheat field' : 'agricultural plots'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {farmerData.plots.map(plot => (
                <div key={plot.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 rounded-full" style={{
                      backgroundColor: plot.color
                    }} />
                    <div>
                      <p className="font-medium">{plot.name}</p>
                      <p className="text-sm text-gray-500">{plot.crop} • {plot.area} ha</p>
                      {currentProfileId === 'salem' && (
                        <div className="flex items-center space-x-4 text-xs text-gray-600 mt-1">
                          <span>NDVI: 0.31</span>
                          <span>LST: +4.3°C</span>
                          <span className="text-yellow-600">Rainfall: -38mm</span>
                        </div>
                      )}
                      {currentProfileId === 'hamza' && (
                        <div className="text-xs text-red-600 mt-1">
                          <span>Post-hail NDVI: 0.18 (was 0.22)</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRiskColor(plot.riskLevel)}`}>
                      {plot.riskLevel}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">Score: {plot.riskScore}/100</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4" size="sm">
              <MapPin className="h-4 w-4 mr-2" />
              View Detailed Maps
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates from your farm operations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {farmerData.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-agri-green rounded-full mt-2 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-700">{activity}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {index === 0 ? '1 hour ago' : index === 1 ? '3 hours ago' : index === 2 ? '6 hours ago' : index === 3 ? '1 day ago' : index === 4 ? '2 days ago' : '3 days ago'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Current Alerts */}
        <Card>
          <CardHeader>
            <CardTitle>Current Alerts</CardTitle>
            <CardDescription>Notifications requiring your attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {farmerData.alerts.map(alert => (
                <div key={alert.id} className="p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{alert.title}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {alert.plot} • {alert.time}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">{alert.description}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(alert.severity)}`}>
                      {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              View All Alerts
            </Button>
          </CardContent>
        </Card>

        {/* Profile-Specific Panel */}
        <Card>
          <CardHeader>
            <CardTitle>
              {currentProfileId === 'hamza' ? 'Damage Assessment Status' : currentProfileId === 'salem' ? 'Drought Monitoring' : 'Weather Summary'}
            </CardTitle>
            <CardDescription>
              {currentProfileId === 'hamza' ? 'CRMA documentation and damage validation' : currentProfileId === 'salem' ? 'Constantine region drought conditions' : `Current conditions in ${farmerData.personalInfo.farmAddress.split(',')[1]}`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {currentProfileId === 'hamza' && farmerData.claims ? (
              <div className="space-y-4">
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm font-medium text-green-800">CRMA Claim Status</p>
                  <p className="text-xs text-green-700 mt-1">
                    Claim ID: CNMA-CLM-2023-001 - Approved and processed
                  </p>
                </div>
              </div>
            ) : currentProfileId === 'salem' ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-yellow-50 rounded-lg">
                    <Droplets className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-yellow-800">Rainfall Deficit</p>
                    <p className="text-lg font-bold text-yellow-900">-38mm</p>
                  </div>
                  <div className="text-center p-3 bg-red-50 rounded-lg">
                    <Activity className="h-8 w-8 text-red-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-red-800">LST Anomaly</p>
                    <p className="text-lg font-bold text-red-900">+4.3°C</p>
                  </div>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm font-medium text-green-800">Vegetation Health (NDVI)</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{
                        width: '62%'
                      }}></div>
                    </div>
                    <span className="text-sm font-bold text-green-700">0.31</span>
                  </div>
                  <p className="text-xs text-green-600 mt-1">Stable despite drought conditions</p>
                </div>
                {farmerData.weather.alerts.length > 0 && (
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm font-medium text-yellow-800">
                      Active Alert: {farmerData.weather.alerts[0].message}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Cloud className="h-8 w-8 text-sky-blue" />
                    <div>
                      <p className="text-2xl font-bold">{farmerData.weather.current.temperature}°C</p>
                      <p className="text-sm text-gray-500">{farmerData.weather.current.condition}</p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Humidity</p>
                    <p className="font-medium">{farmerData.weather.current.humidity}%</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Wind Speed</p>
                    <p className="font-medium">{farmerData.weather.current.windSpeed} km/h</p>
                  </div>
                </div>
                
                {farmerData.weather.alerts.length > 0 && (
                  <div className="p-2 bg-yellow-50 border border-yellow-200 rounded">
                    <p className="text-xs text-yellow-800 font-medium">
                      Weather Alert: {farmerData.weather.alerts[0].message}
                    </p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Live Risk Assessment */}
      <Card className="border-2 border-dashed border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Calculator className="h-5 w-5 text-blue-600" />
                <span>Live Risk Assessment</span>
              </CardTitle>
              <CardDescription>
                Calculate real-time risk scores using RADI algorithm for different climate hazards
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={riskCalculator.openEditor}
              >
                <Settings className="h-4 w-4 mr-2" />
                Update Parameters
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={riskCalculator.refreshData}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh Data
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Hazard Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Select Climate Hazard</label>
              <Select value={riskCalculator.hazard} onValueChange={riskCalculator.updateHazard}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose hazard type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Drought">🌵 Drought</SelectItem>
                  <SelectItem value="Heavy Rainfall">🌧️ Heavy Rainfall</SelectItem>
                  <SelectItem value="Hailstorm">⛈️ Hailstorm</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Risk Score Display */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Risk Score for {riskCalculator.hazard}</h3>
                  <p className="text-sm text-gray-600">Based on current farm conditions</p>
                  <p className="text-xs text-gray-500">Last updated: {riskCalculator.lastUpdated.toLocaleTimeString()}</p>
                </div>
                <div className="text-right">
                  <div className={`text-3xl font-bold ${getRiskScoreColor(riskCalculator.result.finalScore)}`}>
                    {riskCalculator.result.finalScore}/10
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(riskCalculator.result.riskLevel)}`}>
                    {riskCalculator.result.riskLevel} Risk
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                <div 
                  className={`h-3 rounded-full transition-all duration-500 ${
                    riskCalculator.result.riskLevel === 'Low' ? 'bg-green-500' :
                    riskCalculator.result.riskLevel === 'Medium' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${(riskCalculator.result.finalScore / 10) * 100}%` }}
                />
              </div>

              {/* Top Contributors */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Top Risk Contributors</h4>
                <div className="space-y-2">
                  {riskCalculator.result.breakdown
                    .sort((a, b) => b.weightedScore - a.weightedScore)
                    .slice(0, 3)
                    .map((item, index) => (
                    <div key={item.parameter} className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">{item.parameter}</span>
                      <span className={`font-medium ${
                        item.weightedScore > 0.5 ? 'text-red-600' :
                        item.weightedScore > 0.2 ? 'text-yellow-600' : 'text-green-600'
                      }`}>
                        {item.weightedScore.toFixed(2)} ({(item.weight).toFixed(1)}%)
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <Button 
                onClick={riskCalculator.openModal}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Eye className="h-4 w-4 mr-2" />
                View Detailed Breakdown
              </Button>
            </div>

            {/* Profile-Specific Insights */}
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Farm-Specific Insights</h4>
              <div className="text-sm text-gray-600 space-y-1">
                {currentProfileId === 'salem' ? (
                  <>
                    <p>• Olive trees show drought resilience with stable NDVI (0.31)</p>
                    <p>• High LST anomaly (+4.3°C) increases drought risk</p>
                    <p>• Rainfall deficit (-38mm) is well-managed by irrigation</p>
                  </>
                ) : currentProfileId === 'hamza' ? (
                  <>
                    <p>• Post-hailstorm NDVI damage evident (0.18 vs normal 0.25+)</p>
                    <p>• High CAPE (2850 J/kg) confirms severe convective conditions</p>
                    <p>• Wind shear (22.4 m/s) contributed to hail formation</p>
                  </>
                ) : (
                  <>
                    <p>• Mixed crop portfolio provides natural risk diversification</p>
                    <p>• Current NDVI levels indicate healthy vegetation</p>
                    <p>• Weather monitoring essential for timely interventions</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and monitoring features</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Button className="justify-start h-auto p-4 bg-agri-green hover:bg-agri-green-dark">
              <Plus className="h-5 w-5 mr-2" />
              <div className="text-left">
                <p className="font-medium">
                  {currentProfileId === 'salem' ? 'Monitor Olive Health' : currentProfileId === 'hamza' ? 'Update Recovery Status' : 'Add New Plot'}
                </p>
                <p className="text-xs opacity-90">
                  {currentProfileId === 'salem' ? 'Check NDVI & drought impact' : currentProfileId === 'hamza' ? 'Report recovery progress' : 'Register a new field'}
                </p>
              </div>
            </Button>
            
            <Button variant="outline" className="justify-start h-auto p-4">
              <AlertTriangle className="h-5 w-5 mr-2" />
              <div className="text-left">
                <p className="font-medium">View Risk Analysis</p>
                <p className="text-xs text-gray-500">
                  {currentProfileId === 'salem' ? 'Drought risk assessment' : currentProfileId === 'hamza' ? 'Post-storm evaluation' : 'Check urgent notifications'}
                </p>
              </div>
            </Button>
            
            <Button variant="outline" className="justify-start h-auto p-4">
              <Award className="h-5 w-5 mr-2" />
              <div className="text-left">
                <p className="font-medium">
                  {currentProfileId === 'hamza' ? 'Recovery Report' : currentProfileId === 'salem' ? 'Drought Analysis' : 'Farm Reports'}
                </p>
                <p className="text-xs text-gray-500">
                  {currentProfileId === 'hamza' ? 'Hailstorm recovery docs' : currentProfileId === 'salem' ? 'Olive resilience analysis' : 'Performance analytics'}
                </p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Risk Score Modal */}
      <RiskScoreModal
        isOpen={riskCalculator.isModalOpen}
        onClose={riskCalculator.closeModal}
        result={riskCalculator.result}
        hazard={riskCalculator.hazard}
      />

      {/* Risk Parameters Editor */}
      <RiskParametersEditor
        isOpen={riskCalculator.isEditorOpen}
        onClose={riskCalculator.closeEditor}
        parameters={riskCalculator.parameters}
        onParametersChange={riskCalculator.updateParameters}
        onSave={riskCalculator.updateParameters}
      />
    </div>
  );
};

export default FarmerDashboardOverview;
