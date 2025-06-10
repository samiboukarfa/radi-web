
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getUserSession, getCurrentProfile } from '@/utils/auth';
import { getFarmerProfile } from '@/utils/farmerProfiles';
import CaseStudyBanner from './farmer/CaseStudyBanner';
import { MapPin, AlertTriangle, Cloud, TrendingUp, Plus, Eye, CheckCircle, Award, Activity, Droplets } from 'lucide-react';

const FarmerDashboardOverview: React.FC = () => {
  const user = getUserSession();
  const currentProfileId = getCurrentProfile();
  const farmerData = getFarmerProfile(currentProfileId);
  const totalArea = farmerData.plots.reduce((sum, plot) => sum + plot.area, 0);
  const highRiskPlots = farmerData.plots.filter(plot => plot.riskLevel === 'High').length;

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
      {/* Case Study Banner (only for Salem and Hamza) */}
      <CaseStudyBanner />

      {/* Welcome Message */}
      <div className="bg-gradient-to-r from-agri-green to-green-600 text-white p-6 rounded-lg">
        <h1 className="text-2xl font-bold mb-2">
          {profileMessage.title}
        </h1>
        <p className="text-green-100 mb-2">
          {profileMessage.subtitle}
        </p>
        <div className="mt-4 flex items-center space-x-4 text-sm flex-wrap gap-2">
          <span className="inline-flex items-center px-3 py-1 bg-white bg-opacity-20 rounded-full">
            Demo Account Active
          </span>
          {currentProfileId === 'salem' || currentProfileId === 'hamza'}
          <span className="text-green-100 font-medium">{profileMessage.highlight}</span>
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
            <div className={`text-2xl font-bold ${currentProfileId === 'salem' ? 'text-green-600' : currentProfileId === 'hamza' ? 'text-red-600' : 'text-yellow-600'}`}>
              {currentProfileId === 'salem' ? '8.0/10' : currentProfileId === 'hamza' ? '3.0/10' : '6.5/10'}
            </div>
            <p className="text-xs text-muted-foreground">
              {currentProfileId === 'salem' ? 'Low Risk - Drought managed' : currentProfileId === 'hamza' ? 'High Risk - Post-storm recovery' : `${highRiskPlots} plot${highRiskPlots !== 1 ? 's' : ''} need attention`}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{farmerData.alerts.length}</div>
            <p className="text-xs text-muted-foreground">
              {currentProfileId === 'salem' ? 'Drought & heat monitoring' : currentProfileId === 'hamza' ? 'Damage assessment active' : 'Require immediate attention'}
            </p>
          </CardContent>
        </Card>

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
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: plot.color }} />
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
                {farmerData.claims.map((claim, index) => (
                  <div key={index} className="p-4 bg-green-50 border-2 border-green-200 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          <p className="font-semibold text-green-800">{claim.event} Damage Claim</p>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <p className="text-gray-600">Claim ID:</p>
                            <p className="font-medium text-green-700">{claim.id}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Status:</p>
                            <p className="font-medium text-green-700">{claim.status}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Date:</p>
                            <p className="font-medium text-green-700">{claim.date}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Insurer:</p>
                            <p className="font-medium text-green-700">{claim.insurer}</p>
                          </div>
                        </div>
                        <div className="mt-3 p-2 bg-white rounded border">
                          <p className="text-xs font-medium text-gray-700">Evidence:</p>
                          <p className="text-xs text-gray-600">{claim.evidence}</p>
                        </div>
                      </div>
                      <span className="px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-800">
                        {claim.status}
                      </span>
                    </div>
                  </div>
                ))}
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
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '62%' }}></div>
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
            <Button variant="outline" className="w-full mt-4" size="sm">
              <TrendingUp className="h-4 w-4 mr-2" />
              {currentProfileId === 'hamza' ? 'View Full Documentation' : currentProfileId === 'salem' ? 'View Drought Analysis' : 'View 7-Day Forecast'}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and case study features</CardDescription>
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
                  {currentProfileId === 'hamza' ? 'Case Study Report' : currentProfileId === 'salem' ? 'Drought Case Study' : 'Farm Reports'}
                </p>
                <p className="text-xs text-gray-500">
                  {currentProfileId === 'hamza' ? 'Hailstorm validation docs' : currentProfileId === 'salem' ? 'Olive resilience analysis' : 'Performance analytics'}
                </p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FarmerDashboardOverview;
