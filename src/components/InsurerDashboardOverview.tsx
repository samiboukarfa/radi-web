import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getDemoInsurerData } from '@/utils/auth';
import { Users, MapPin, Shield, AlertCircle, TrendingUp, DollarSign, Activity, Clock, FileText, Award, CheckCircle, Eye, Building } from 'lucide-react';
const InsurerDashboardOverview = () => {
  const data = getDemoInsurerData();
  const StatCard: React.FC<{
    title: string;
    value: string | number;
    icon: any;
    trend?: string;
    color?: string;
  }> = ({
    title,
    value,
    icon: Icon,
    trend,
    color = "blue"
  }) => <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
        <Icon className={`h-4 w-4 text-${color}-600`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900">{value}</div>
        {trend && <p className="text-xs text-green-600 flex items-center mt-1">
            <TrendingUp className="h-3 w-3 mr-1" />
            {trend}
          </p>}
      </CardContent>
    </Card>;
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-DZ', {
      style: 'currency',
      currency: 'DZD',
      minimumFractionDigits: 0
    }).format(amount);
  };
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  return <div className="space-y-6">
      {/* CNMA Company Header */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-800 text-white rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                <Building className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">CRMA</h1>
                <p className="text-lg text-blue-100">La Caisse Régionale de Mutualité Agricole</p>
                <p className="text-sm text-blue-200 italic">Mutualité Agricole – حقكم أمانة</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-blue-100">Market Leadership</p>
                <p className="font-semibold">{data.company.marketShare}</p>
              </div>
              <div>
                <p className="text-blue-100">National Ranking</p>
                <p className="font-semibold">{data.company.ranking}</p>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <p className="text-sm text-blue-100">License</p>
              <p className="font-semibold text-lg">{data.company.license}</p>
              <p className="text-xs text-blue-200 mt-2">{data.company.office}</p>
              <p className="text-xs text-blue-200">Demo Environment</p>
            </div>
          </div>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Portfolio Performance Indicators</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <StatCard title="Insured Farmers" value={data.kpis.totalFarmers} icon={Users} trend="+12% this quarter" color="blue" />
          <StatCard title="Coverage Area" value={`${data.kpis.totalArea.toLocaleString()} ha`} icon={MapPin} trend="+8% expansion" color="green" />
          <StatCard title="Active Policies" value={data.kpis.activePolicies} icon={Shield} trend="+15% new policies" color="purple" />
          <StatCard title="Pending Claims" value={data.kpis.pendingClaims} icon={AlertCircle} color="orange" />
          <StatCard title="Monthly Premiums" value={formatCurrency(data.kpis.monthlyPremium)} icon={DollarSign} trend="+5% vs last month" color="emerald" />
          <StatCard title="Risk Distribution" value={`${data.kpis.riskDistribution.low}% Low Risk`} icon={Activity} color="indigo" />
        </div>
      </div>

      {/* Case Studies Portfolio */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-blue-600" />
              <span>Farmer's  List</span>
            </CardTitle>
            <CardDescription>RADI validation through documented farmer cases</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.farmers.map(farmer => <div key={farmer.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-semibold text-gray-900">{farmer.name}</h4>
                        {farmer.name === 'Salem Khrobi' || farmer.name === 'Hamza Dawdi'}
                        {farmer.claims && farmer.claims.length > 0}
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p><strong>Location:</strong> {farmer.location}</p>
                        <p><strong>Crop:</strong> {farmer.crop} • {farmer.area} ha</p>
                        <p><strong>Policy:</strong> {farmer.policyNumber}</p>
                        {farmer.claims && farmer.claims.length > 0 && <p className="text-green-600">
                            <CheckCircle className="h-3 w-3 inline mr-1" />
                            Claim: {formatCurrency(farmer.claims[0].amount)} - {farmer.claims[0].status}
                          </p>}
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={`mb-2 ${farmer.risk === 'Low' ? 'bg-green-100 text-green-800' : farmer.risk === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                        {farmer.riskScore}/10
                      </Badge>
                      <p className="text-xs text-gray-500">{farmer.policy}</p>
                    </div>
                  </div>
                </div>)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>CRMA Operations Activity</CardTitle>
            <CardDescription>Recent portfolio management and case study updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.recentActivity.map((activity, index) => <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Clock className="h-4 w-4 text-gray-400 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity}</p>
                    <p className="text-xs text-gray-500">
                      {index === 0 ? '2 hours ago' : index === 1 ? '5 hours ago' : index === 2 ? '1 day ago' : index === 3 ? '2 days ago' : index === 4 ? '3 days ago' : '1 week ago'}
                    </p>
                  </div>
                </div>)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Risk Analysis and Claims Management */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Portfolio Risk Analysis</CardTitle>
            <CardDescription>Distribution across farmer risk categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span className="text-sm text-gray-600">Low Risk (Salem - Olives)</span>
                </div>
                <span className="font-semibold">{data.kpis.riskDistribution.low}%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                  <span className="text-sm text-gray-600">Medium Risk (Ahmed - Mixed)</span>
                </div>
                <span className="font-semibold">{data.kpis.riskDistribution.medium}%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-red-500 rounded"></div>
                  <span className="text-sm text-gray-600">High Risk (Hamza - Wheat)</span>
                </div>
                <span className="font-semibold">{data.kpis.riskDistribution.high}%</span>
              </div>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-xs text-blue-700">
                  <strong>Validation Note:</strong> Hamza's high-risk score (3.0/10) correctly predicted hailstorm vulnerability, validating RADI methodology.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Claims & Risk Alerts
              <Badge variant="destructive">{data.alerts.length}</Badge>
            </CardTitle>
            <CardDescription>Active notifications requiring CNMA attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.alerts.map(alert => <div key={alert.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm">{alert.title}</h4>
                      <p className="text-xs text-gray-600 mt-1">
                        <strong>Farmer:</strong> {alert.farmer} • <strong>Location:</strong> {alert.location}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                    </div>
                    <Badge className={getSeverityColor(alert.severity)} variant="outline">
                      {alert.severity.toUpperCase()}
                    </Badge>
                  </div>
                </div>)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Comprehensive Claims Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-purple-600" />
            <span>Claims Processing & Validation</span>
          </CardTitle>
          <CardDescription>Detailed claims history including validation with satellite evidence</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.claims.map(claim => <div key={claim.id} className="border-2 border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-semibold text-gray-900">{claim.type}</h4>
                      {claim.farmer === 'Hamza Dawdi'}
                      {claim.claimId && <Badge variant="secondary" className="text-xs">
                          {claim.claimId}
                        </Badge>}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Farmer</p>
                        <p className="font-medium">{claim.farmer}</p>
                      </div>
                      
                      <div>
                        <p className="text-gray-500">Location</p>
                        <p className="font-medium">{claim.location}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Date</p>
                        <p className="font-medium">{claim.date}</p>
                      </div>
                    </div>
                    {claim.evidence && <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                        <p className="text-xs font-medium text-blue-800">Satellite Evidence:</p>
                        <p className="text-xs text-blue-700">{claim.evidence}</p>
                      </div>}
                    {claim.weatherData && <div className="mt-2 p-3 bg-purple-50 rounded-lg">
                        <p className="text-xs font-medium text-purple-800">Weather Validation:</p>
                        <p className="text-xs text-purple-700">{claim.weatherData}</p>
                      </div>}
                  </div>
                  <div className="text-right">
                    <Badge variant={claim.status === 'Paid' ? 'default' : claim.status === 'Under Review' ? 'secondary' : 'outline'} className="mb-2">
                      {claim.status}
                    </Badge>
                    {claim.farmer === 'Hamza Dawdi' && <p className="text-xs text-green-600 font-medium">
                        <CheckCircle className="h-3 w-3 inline mr-1" />
                        RADI Validated
                      </p>}
                  </div>
                </div>
              </div>)}
          </div>
        </CardContent>
      </Card>

      {/* CNMA Service Portfolio */}
      <Card>
        <CardHeader>
          <CardTitle>CRMA Service Portfolio & Quick Actions</CardTitle>
          <CardDescription>
            Algeria's leading agricultural insurance provider - Full service capabilities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-blue-50 transition-colors">
              <Users className="h-6 w-6 text-blue-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900">Register Farmer</p>
              <p className="text-xs text-gray-500">Add new case study</p>
            </button>
            
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-green-50 transition-colors">
              <Activity className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900">Risk Assessment</p>
              <p className="text-xs text-gray-500">RADI score validation</p>
            </button>
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-purple-50 transition-colors">
              <FileText className="h-6 w-6 text-purple-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900">Report</p>
              <p className="text-xs text-gray-500">Generate documentation</p>
            </button>
          </div>
          
          
        </CardContent>
      </Card>
    </div>;
};
export default InsurerDashboardOverview;