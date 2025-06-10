
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getDemoInsurerData } from '@/utils/auth';
import { FileText, Download, Calendar, TrendingUp, BarChart3, Target, Users, AlertTriangle, Settings } from 'lucide-react';

const ReportsAnalytics = () => {
  const data = getDemoInsurerData();
  const [selectedTimeframe, setSelectedTimeframe] = useState('monthly');
  const [selectedReportType, setSelectedReportType] = useState('performance');

  const performanceMetrics = {
    avgAssessmentTime: 12,
    customerSatisfaction: 4.3,
    portfolioGrowth: 8.5,
    riskAccuracy: 87.3,
    documentationRate: 94.8
  };

  const reportTypes = [
    {
      id: 'performance',
      name: 'Performance Report',
      description: 'Portfolio performance and KPI analysis',
      icon: TrendingUp,
      metrics: ['Assessment Time', 'Documentation Rate', 'Growth Rate', 'Accuracy Score']
    },
    {
      id: 'risk',
      name: 'Risk Analytics Report',
      description: 'Risk assessment accuracy and trends',
      icon: AlertTriangle,
      metrics: ['Risk Scoring Accuracy', 'Prediction Models', 'Regional Analysis', 'Trend Patterns']
    },
    {
      id: 'operational',
      name: 'Operational Report',
      description: 'Documentation and process analysis',
      icon: Target,
      metrics: ['Processing Time', 'Documentation Quality', 'Service Metrics', 'Efficiency Analysis']
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
    {
      month: 'Aug',
      farmers: 115,
      assessments: 85,
      documentation: 78
    },
    {
      month: 'Sep',
      farmers: 119,
      assessments: 92,
      documentation: 86
    },
    {
      month: 'Oct',
      farmers: 123,
      assessments: 78,
      documentation: 95
    },
    {
      month: 'Nov',
      farmers: 125,
      assessments: 105,
      documentation: 102
    },
    {
      month: 'Dec',
      farmers: 127,
      assessments: 88,
      documentation: 91
    }
  ];

  const regionalPerformance = [
    {
      region: 'Skikda',
      farmers: 15,
      assessments: 45,
      documentation: 42,
      efficiency: 93.3
    },
    {
      region: 'Constantine', 
      farmers: 22,
      assessments: 66,
      documentation: 58,
      efficiency: 87.9
    },
    {
      region: 'Setif',
      farmers: 8,
      assessments: 24,
      documentation: 18,
      efficiency: 75.0
    },
    {
      region: 'Batna',
      farmers: 18,
      assessments: 54,
      documentation: 49,
      efficiency: 90.7
    },
    {
      region: 'Tlemcen',
      farmers: 12,
      assessments: 36,
      documentation: 33,
      efficiency: 91.7
    }
  ];

  const getPerformanceColor = (value: number, type: string) => {
    if (type === 'efficiency' && value > 90) return 'text-green-600';
    if (type === 'efficiency' && value > 80) return 'text-yellow-600';
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">Avg Assessment</p>
              <p className="text-2xl font-bold text-blue-600">{performanceMetrics.avgAssessmentTime} days</p>
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
              <p className="text-sm text-gray-600">Documentation Rate</p>
              <p className="text-2xl font-bold text-green-600">{performanceMetrics.documentationRate}%</p>
              <p className="text-xs text-gray-500">Completion rate</p>
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
                onChange={e => setSelectedTimeframe(e.target.value)}
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
                {reportTypes.map(report => (
                  <div 
                    key={report.id} 
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      selectedReportType === report.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'
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
            <CardTitle>Regional Performance Analysis</CardTitle>
            <CardDescription>Service efficiency and performance by region</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Region</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Farmers</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Assessments</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Documentation</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Efficiency</th>
                  </tr>
                </thead>
                <tbody>
                  {regionalPerformance.map((region, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{region.region}</td>
                      <td className="py-3 px-4">{region.farmers}</td>
                      <td className="py-3 px-4">{region.assessments}</td>
                      <td className="py-3 px-4">{region.documentation}</td>
                      <td className="py-3 px-4">
                        <span className={getPerformanceColor(region.efficiency, 'efficiency')}>
                          {region.efficiency.toFixed(1)}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

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
                  <h3 className="font-medium">Quarterly Operational Analysis</h3>
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
