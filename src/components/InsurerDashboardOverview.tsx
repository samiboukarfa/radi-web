
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getDemoInsurerData } from '@/utils/auth';
import { 
  Users, 
  MapPin, 
  Shield, 
  AlertCircle, 
  TrendingUp, 
  DollarSign,
  Activity,
  Clock,
  FileText,
  Award
} from 'lucide-react';

const InsurerDashboardOverview = () => {
  const data = getDemoInsurerData();

  const StatCard: React.FC<{ title: string; value: string | number; icon: any; trend?: string; color?: string }> = 
    ({ title, value, icon: Icon, trend, color = "blue" }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
        <Icon className={`h-4 w-4 text-${color}-600`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900">{value}</div>
        {trend && (
          <p className="text-xs text-green-600 flex items-center mt-1">
            <TrendingUp className="h-3 w-3 mr-1" />
            {trend}
          </p>
        )}
      </CardContent>
    </Card>
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-DZ', {
      style: 'currency',
      currency: 'DZD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* CNMA Welcome Section */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-800 text-white rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">C</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold">
                  {data.company.name}
                </h1>
                <p className="text-blue-100 text-sm">{data.company.tagline}</p>
              </div>
            </div>
            <p className="text-blue-100 mb-2">
              Agricultural Insurance Portfolio Management - Demo Environment
            </p>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <Award className="h-4 w-4" />
                <span>{data.company.marketShare}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Shield className="h-4 w-4" />
                <span>{data.company.ranking}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-blue-100">License: {data.company.license}</p>
            <p className="text-sm text-blue-100">Office: {data.company.office}</p>
            <p className="text-sm text-blue-100">Last Login: Today at 11:30 AM</p>
          </div>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Key Performance Indicators</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <StatCard
            title="Total Farmers"
            value={data.kpis.totalFarmers}
            icon={Users}
            trend="+12% this month"
            color="blue"
          />
          <StatCard
            title="Coverage Area"
            value={`${data.kpis.totalArea.toLocaleString()} ha`}
            icon={MapPin}
            trend="+8% this quarter"
            color="green"
          />
          <StatCard
            title="Active Policies"
            value={data.kpis.activePolicies}
            icon={Shield}
            trend="+15% this month"
            color="purple"
          />
          <StatCard
            title="Pending Claims"
            value={data.kpis.pendingClaims}
            icon={AlertCircle}
            color="orange"
          />
          <StatCard
            title="Monthly Premiums"
            value={formatCurrency(data.kpis.monthlyPremium)}
            icon={DollarSign}
            trend="+5% vs last month"
            color="emerald"
          />
          <StatCard
            title="Risk Distribution"
            value={`${data.kpis.riskDistribution.low}% Low Risk`}
            icon={Activity}
            color="indigo"
          />
        </div>
      </div>

      {/* Case Studies and Farmers Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Case Study Farmers */}
        <Card>
          <CardHeader>
            <CardTitle>Case Study Farmers</CardTitle>
            <CardDescription>Featured farmers with documented RADI validation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.farmers.map((farmer) => (
                <div key={farmer.id} className="border border-gray-200 rounded-lg p-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium text-gray-900 text-sm">{farmer.name}</h4>
                        {(farmer.name === 'Salem Khrobi' || farmer.name === 'Hamza Dawdi') && (
                          <Badge variant="outline" className="text-xs border-blue-500 text-blue-700">
                            Case Study
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        {farmer.location} • {farmer.crop} • {farmer.area} ha
                      </p>
                      <p className="text-xs text-gray-600">
                        Policy: {farmer.policyNumber}
                      </p>
                      {farmer.claims.length > 0 && (
                        <p className="text-xs text-green-600 mt-1">
                          ✓ Claim processed: {formatCurrency(farmer.claims[0].amount)}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <Badge 
                        className={`text-xs ${
                          farmer.risk === 'Low' ? 'bg-green-100 text-green-800' :
                          farmer.risk === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}
                      >
                        Risk: {farmer.riskScore}/10
                      </Badge>
                      <p className="text-xs text-gray-500 mt-1">{farmer.policy}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest portfolio updates and CNMA operations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Clock className="h-4 w-4 text-gray-400 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity}</p>
                    <p className="text-xs text-gray-500">
                      {index === 0 ? '5 minutes ago' : 
                       index === 1 ? '1 hour ago' : 
                       index === 2 ? '3 hours ago' : 
                       index === 3 ? '1 day ago' : '2 days ago'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Risk Distribution and Claims Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Risk Distribution</CardTitle>
            <CardDescription>Portfolio risk breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Low Risk (Salem)</span>
                </div>
                <span className="font-semibold">{data.kpis.riskDistribution.low}%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Medium Risk (Ahmed)</span>
                </div>
                <span className="font-semibold">{data.kpis.riskDistribution.medium}%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">High Risk (Hamza)</span>
                </div>
                <span className="font-semibold">{data.kpis.riskDistribution.high}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Alerts */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Active Alerts
              <Badge variant="destructive">{data.alerts.length}</Badge>
            </CardTitle>
            <CardDescription>Critical notifications requiring attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.alerts.map((alert) => (
                <div key={alert.id} className="border border-gray-200 rounded-lg p-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm">{alert.title}</h4>
                      <p className="text-xs text-gray-600 mt-1">Farmer: {alert.farmer}</p>
                      <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                    </div>
                    <Badge className={getSeverityColor(alert.severity)} variant="outline">
                      {alert.severity.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Claims Processing */}
      <Card>
        <CardHeader>
          <CardTitle>Claims Management</CardTitle>
          <CardDescription>Recent claims with case study validation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {data.claims.map((claim) => (
              <div key={claim.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-gray-900 text-sm">{claim.type}</h4>
                      {claim.farmer === 'Hamza Dawdi' && (
                        <Badge variant="outline" className="text-xs border-green-500 text-green-700">
                          Validated Case Study
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 mt-1">Farmer: {claim.farmer}</p>
                    <p className="text-xs text-gray-600">Amount: {formatCurrency(claim.amount)}</p>
                    <p className="text-xs text-gray-600">Location: {claim.location}</p>
                    {claim.evidence && (
                      <p className="text-xs text-blue-600 mt-1">Evidence: {claim.evidence}</p>
                    )}
                    {claim.weatherData && (
                      <p className="text-xs text-purple-600 mt-1">Weather: {claim.weatherData}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">{claim.date}</p>
                  </div>
                  <div className="text-right">
                    <Badge 
                      variant={claim.status === 'Paid' ? 'default' : 
                              claim.status === 'Under Review' ? 'secondary' : 'outline'}
                    >
                      {claim.status}
                    </Badge>
                    {claim.claimId && (
                      <p className="text-xs text-gray-500 mt-1">{claim.claimId}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Frequently used CNMA tools and functions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Users className="h-6 w-6 text-blue-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900">Register New Farmer</p>
            </button>
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <AlertCircle className="h-6 w-6 text-orange-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900">Process Claims</p>
            </button>
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Activity className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900">Risk Assessment</p>
            </button>
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <FileText className="h-6 w-6 text-purple-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900">Generate Report</p>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InsurerDashboardOverview;
