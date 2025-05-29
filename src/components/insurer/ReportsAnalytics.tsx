
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getDemoInsurerData } from '@/utils/auth';
import { 
  FileText, 
  Download, 
  Calendar, 
  TrendingUp, 
  PieChart, 
  BarChart3, 
  Target,
  DollarSign,
  Users,
  AlertTriangle,
  Settings
} from 'lucide-react';

const ReportsAnalytics = () => {
  const data = getDemoInsurerData();
  const [selectedTimeframe, setSelectedTimeframe] = useState('monthly');
  const [selectedReportType, setSelectedReportType] = useState('performance');

  const performanceMetrics = {
    claimsRatio: 15.2,
    avgSettlementTime: 12,
    customerSatisfaction: 4.3,
    portfolioGrowth: 8.5,
    riskAccuracy: 87.3,
    premiumCollection: 94.8
  };

  const reportTypes = [
    {
      id: 'performance',
      name: 'Performance Report',
      description: 'Portfolio performance and KPI analysis',
      icon: TrendingUp,
      metrics: ['Claims Ratio', 'Settlement Time', 'Growth Rate', 'Collection Rate']
    },
    {
      id: 'risk',
      name: 'Risk Analytics Report',
      description: 'Risk assessment accuracy and trends',
      icon: AlertTriangle,
      metrics: ['Risk Scoring Accuracy', 'Prediction Models', 'Regional Analysis', 'Trend Patterns']
    },
    {
      id: 'financial',
      name: 'Financial Report',
      description: 'Revenue, claims, and profitability analysis',
      icon: DollarSign,
      metrics: ['Premium Revenue', 'Claims Payout', 'Profit Margins', 'Cost Analysis']
    },
    {
      id: 'farmer',
      name: 'Farmer Portfolio Report',
      description: 'Individual farmer profiles and engagement',
      icon: Users,
      metrics: ['Registration Trends', 'Risk Profiles', 'Engagement Levels', 'Communication Logs']
    }
  ];

  const monthlyData = [
    { month: 'Aug', premiums: 220000, claims: 85000, farmers: 115 },
    { month: 'Sep', premiums: 235000, claims: 92000, farmers: 119 },
    { month: 'Oct', premiums: 245000, claims: 78000, farmers: 123 },
    { month: 'Nov', premiums: 240000, claims: 105000, farmers: 125 },
    { month: 'Dec', premiums: 245000, claims: 88000, farmers: 127 }
  ];

  const regionalPerformance = [
    { region: 'Skikda', farmers: 15, premiums: 45000, claims: 12000, ratio: 26.7 },
    { region: 'Constantine', farmers: 22, premiums: 66000, claims: 8000, ratio: 12.1 },
    { region: 'Setif', farmers: 8, premiums: 24000, claims: 18000, ratio: 75.0 },
    { region: 'Batna', farmers: 18, premiums: 54000, claims: 9000, ratio: 16.7 },
    { region: 'Tlemcen', farmers: 12, premiums: 36000, claims: 6000, ratio: 16.7 }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-DZ', {
      style: 'currency',
      currency: 'DZD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getPerformanceColor = (value: number, type: string) => {
    if (type === 'ratio' && value > 50) return 'text-red-600';
    if (type === 'ratio' && value > 25) return 'text-yellow-600';
    if (type === 'growth' && value > 5) return 'text-green-600';
    if (type === 'accuracy' && value > 85) return 'text-green-600';
    return 'text-gray-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600">Comprehensive reporting and data analysis suite</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Schedule Reports
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Quick Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">Claims Ratio</p>
              <p className={`text-2xl font-bold ${getPerformanceColor(performanceMetrics.claimsRatio, 'ratio')}`}>
                {performanceMetrics.claimsRatio}%
              </p>
              <p className="text-xs text-gray-500">Target: &lt;20%</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">Avg Settlement</p>
              <p className="text-2xl font-bold text-blue-600">{performanceMetrics.avgSettlementTime} days</p>
              <p className="text-xs text-gray-500">Target: &lt;15 days</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">Satisfaction</p>
              <p className="text-2xl font-bold text-green-600">{performanceMetrics.customerSatisfaction}/5</p>
              <p className="text-xs text-gray-500">⭐⭐⭐⭐⭐</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">Portfolio Growth</p>
              <p className={`text-2xl font-bold ${getPerformanceColor(performanceMetrics.portfolioGrowth, 'growth')}`}>
                +{performanceMetrics.portfolioGrowth}%
              </p>
              <p className="text-xs text-gray-500">This quarter</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">Risk Accuracy</p>
              <p className={`text-2xl font-bold ${getPerformanceColor(performanceMetrics.riskAccuracy, 'accuracy')}`}>
                {performanceMetrics.riskAccuracy}%
              </p>
              <p className="text-xs text-gray-500">Model precision</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">Collection Rate</p>
              <p className="text-2xl font-bold text-green-600">{performanceMetrics.premiumCollection}%</p>
              <p className="text-xs text-gray-500">Premium collection</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Report Generation Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Report Configuration</CardTitle>
            <CardDescription>Select report type and parameters</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Time Frame</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
              >
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="yearly">Yearly</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
              <div className="space-y-2">
                {reportTypes.map((report) => (
                  <div
                    key={report.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      selectedReportType === report.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedReportType(report.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <report.icon className="h-5 w-5 text-gray-600" />
                      <div>
                        <h3 className="font-medium text-sm">{report.name}</h3>
                        <p className="text-xs text-gray-500">{report.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Button className="w-full">
                <FileText className="h-4 w-4 mr-2" />
                Generate PDF Report
              </Button>
              <Button variant="outline" className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Export to Excel
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Monthly Performance Trends</CardTitle>
            <CardDescription>Premium collection vs claims payout over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Simple chart representation */}
              <div className="h-64 bg-gray-50 rounded-lg p-4 flex items-end justify-around">
                {monthlyData.map((month, index) => (
                  <div key={month.month} className="flex flex-col items-center space-y-2">
                    <div className="flex space-x-1">
                      <div
                        className="w-8 bg-blue-500 rounded-t"
                        style={{ height: `${(month.premiums / 250000) * 180}px` }}
                        title={`Premiums: ${formatCurrency(month.premiums)}`}
                      />
                      <div
                        className="w-8 bg-red-400 rounded-t"
                        style={{ height: `${(month.claims / 250000) * 180}px` }}
                        title={`Claims: ${formatCurrency(month.claims)}`}
                      />
                    </div>
                    <span className="text-xs font-medium">{month.month}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded"></div>
                  <span>Premium Collection</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded"></div>
                  <span>Claims Payout</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Regional Performance Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Regional Performance Analysis</CardTitle>
          <CardDescription>Performance metrics by geographic region</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Region</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Farmers</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Premiums</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Claims</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Claims Ratio</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Performance</th>
                </tr>
              </thead>
              <tbody>
                {regionalPerformance.map((region, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{region.region}</td>
                    <td className="py-3 px-4">{region.farmers}</td>
                    <td className="py-3 px-4">{formatCurrency(region.premiums)}</td>
                    <td className="py-3 px-4">{formatCurrency(region.claims)}</td>
                    <td className="py-3 px-4">
                      <span className={getPerformanceColor(region.ratio, 'ratio')}>
                        {region.ratio.toFixed(1)}%
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <Badge 
                        className={region.ratio < 25 ? 'bg-green-100 text-green-800' : 
                                  region.ratio < 50 ? 'bg-yellow-100 text-yellow-800' : 
                                  'bg-red-100 text-red-800'} 
                        variant="outline"
                      >
                        {region.ratio < 25 ? 'Excellent' : region.ratio < 50 ? 'Good' : 'Needs Attention'}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Scheduled Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Scheduled Reports</CardTitle>
          <CardDescription>Automated report generation and delivery</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-4">
                <Calendar className="h-5 w-5 text-gray-400" />
                <div>
                  <h3 className="font-medium">Monthly Performance Report</h3>
                  <p className="text-sm text-gray-500">Every 1st of month • PDF format • Email delivery</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Badge variant="outline" className="bg-green-100 text-green-800">Active</Badge>
                <Button size="sm" variant="outline">Edit</Button>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-4">
                <Calendar className="h-5 w-5 text-gray-400" />
                <div>
                  <h3 className="font-medium">Weekly Risk Summary</h3>
                  <p className="text-sm text-gray-500">Every Monday • Excel format • Dashboard notification</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Badge variant="outline" className="bg-green-100 text-green-800">Active</Badge>
                <Button size="sm" variant="outline">Edit</Button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-4">
                <Calendar className="h-5 w-5 text-gray-400" />
                <div>
                  <h3 className="font-medium">Quarterly Financial Analysis</h3>
                  <p className="text-sm text-gray-500">Every quarter end • PDF + Excel • Management review</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Scheduled</Badge>
                <Button size="sm" variant="outline">Edit</Button>
              </div>
            </div>

            <Button variant="outline" className="w-full">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule New Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsAnalytics;
