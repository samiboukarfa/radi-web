
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getDemoInsurerData } from '@/utils/auth';
import { 
  PieChart, 
  TrendingUp, 
  DollarSign, 
  Shield, 
  Calendar, 
  Target, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Plus,
  Settings,
  RefreshCw
} from 'lucide-react';

const PortfolioManagement = () => {
  const data = getDemoInsurerData();
  const [selectedView, setSelectedView] = useState<'overview' | 'policies' | 'financial'>('overview');

  const portfolioStats = {
    totalValue: 12450000,
    activePolicies: 89,
    avgPremium: 18500,
    coverageRatio: 87.2,
    renewalRate: 92.5,
    profitMargin: 23.8
  };

  const policyTypes = [
    { type: 'Standard Coverage', count: 45, premium: 15000, coverage: 85, color: 'bg-blue-500' },
    { type: 'Premium Coverage', count: 28, premium: 25000, coverage: 95, color: 'bg-green-500' },
    { type: 'Basic Coverage', count: 16, premium: 10000, coverage: 70, color: 'bg-yellow-500' }
  ];

  const upcomingRenewals = [
    { farmer: 'Ahmed Benali', policy: 'Standard', amount: 15000, dueDate: '2024-02-15', status: 'pending' },
    { farmer: 'Fatima Kaddour', policy: 'Premium', amount: 25000, dueDate: '2024-02-20', status: 'confirmed' },
    { farmer: 'Mohamed Brahim', policy: 'Standard', amount: 15000, dueDate: '2024-02-25', status: 'pending' },
    { farmer: 'Aicha Meziane', policy: 'Basic', amount: 10000, dueDate: '2024-03-01', status: 'overdue' }
  ];

  const profitabilityMetrics = [
    { region: 'Skikda', premiums: 275000, claims: 85000, profit: 190000, margin: 69.1 },
    { region: 'Constantine', premiums: 385000, claims: 92000, profit: 293000, margin: 76.1 },
    { region: 'Setif', premiums: 165000, claims: 125000, profit: 40000, margin: 24.2 },
    { region: 'Batna', premiums: 295000, claims: 78000, profit: 217000, margin: 73.6 },
    { region: 'Tlemcen', premiums: 195000, claims: 65000, profit: 130000, margin: 66.7 }
  ];

  const riskOpportunities = [
    { opportunity: 'Expand in Low-Risk Regions', impact: 'High', revenue: '+180,000 DZD', priority: 'high' },
    { opportunity: 'Premium Adjustment for High-Risk', impact: 'Medium', revenue: '+95,000 DZD', priority: 'medium' },
    { opportunity: 'New Product Development', impact: 'High', revenue: '+250,000 DZD', priority: 'high' },
    { opportunity: 'Retention Program', impact: 'Medium', revenue: '+120,000 DZD', priority: 'medium' }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-DZ', {
      style: 'currency',
      currency: 'DZD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'overdue': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Portfolio Management</h1>
          <p className="text-gray-600">Comprehensive portfolio overview and optimization</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Data
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Policy
          </Button>
        </div>
      </div>

      {/* Portfolio KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <DollarSign className="h-6 w-6 mx-auto mb-2 text-green-600" />
              <p className="text-sm text-gray-600">Total Portfolio Value</p>
              <p className="text-xl font-bold text-green-600">{formatCurrency(portfolioStats.totalValue)}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <Shield className="h-6 w-6 mx-auto mb-2 text-blue-600" />
              <p className="text-sm text-gray-600">Active Policies</p>
              <p className="text-xl font-bold text-blue-600">{portfolioStats.activePolicies}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <Target className="h-6 w-6 mx-auto mb-2 text-purple-600" />
              <p className="text-sm text-gray-600">Avg Premium</p>
              <p className="text-xl font-bold text-purple-600">{formatCurrency(portfolioStats.avgPremium)}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <PieChart className="h-6 w-6 mx-auto mb-2 text-orange-600" />
              <p className="text-sm text-gray-600">Coverage Ratio</p>
              <p className="text-xl font-bold text-orange-600">{portfolioStats.coverageRatio}%</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <RefreshCw className="h-6 w-6 mx-auto mb-2 text-cyan-600" />
              <p className="text-sm text-gray-600">Renewal Rate</p>
              <p className="text-xl font-bold text-cyan-600">{portfolioStats.renewalRate}%</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <TrendingUp className="h-6 w-6 mx-auto mb-2 text-indigo-600" />
              <p className="text-sm text-gray-600">Profit Margin</p>
              <p className="text-xl font-bold text-indigo-600">{portfolioStats.profitMargin}%</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setSelectedView('overview')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              selectedView === 'overview'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Portfolio Overview
          </button>
          <button
            onClick={() => setSelectedView('policies')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              selectedView === 'policies'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Policy Management
          </button>
          <button
            onClick={() => setSelectedView('financial')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              selectedView === 'financial'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Financial Analysis
          </button>
        </nav>
      </div>

      {/* Portfolio Overview Tab */}
      {selectedView === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Policy Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Policy Type Distribution</CardTitle>
              <CardDescription>Breakdown of active policies by coverage type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {policyTypes.map((policy, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 ${policy.color} rounded`}></div>
                      <div>
                        <h3 className="font-medium">{policy.type}</h3>
                        <p className="text-sm text-gray-500">{policy.count} policies • {policy.coverage}% coverage</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{formatCurrency(policy.premium)}</p>
                      <p className="text-sm text-gray-500">avg premium</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Growth Opportunities */}
          <Card>
            <CardHeader>
              <CardTitle>Growth Opportunities</CardTitle>
              <CardDescription>Identified opportunities for portfolio expansion</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {riskOpportunities.map((opportunity, index) => (
                  <div key={index} className="p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium text-sm">{opportunity.opportunity}</h3>
                      <Badge className={getPriorityColor(opportunity.priority)} variant="outline">
                        {opportunity.priority}
                      </Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Impact: {opportunity.impact}</span>
                      <span className="font-medium text-green-600">{opportunity.revenue}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Policy Management Tab */}
      {selectedView === 'policies' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Renewals</CardTitle>
              <CardDescription>Policies requiring renewal attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingRenewals.map((renewal, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Calendar className="h-5 w-5 text-gray-400" />
                      <div>
                        <h3 className="font-medium">{renewal.farmer}</h3>
                        <p className="text-sm text-gray-500">{renewal.policy} Coverage • Due: {renewal.dueDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="font-medium">{formatCurrency(renewal.amount)}</p>
                        <Badge className={getStatusColor(renewal.status)} variant="outline">
                          {renewal.status}
                        </Badge>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">Contact</Button>
                        <Button size="sm">Renew</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Financial Analysis Tab */}
      {selectedView === 'financial' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Regional Profitability Analysis</CardTitle>
              <CardDescription>Profit margins and performance by region</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Region</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Premiums</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Claims</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Profit</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Margin</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Performance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {profitabilityMetrics.map((metric, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{metric.region}</td>
                        <td className="py-3 px-4">{formatCurrency(metric.premiums)}</td>
                        <td className="py-3 px-4">{formatCurrency(metric.claims)}</td>
                        <td className="py-3 px-4 text-green-600 font-medium">{formatCurrency(metric.profit)}</td>
                        <td className="py-3 px-4">
                          <span className={metric.margin > 50 ? 'text-green-600' : metric.margin > 30 ? 'text-yellow-600' : 'text-red-600'}>
                            {metric.margin.toFixed(1)}%
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <Badge 
                            className={metric.margin > 50 ? 'bg-green-100 text-green-800' : 
                                      metric.margin > 30 ? 'bg-yellow-100 text-yellow-800' : 
                                      'bg-red-100 text-red-800'} 
                            variant="outline"
                          >
                            {metric.margin > 50 ? 'Excellent' : metric.margin > 30 ? 'Good' : 'Poor'}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Financial Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle>Financial Recommendations</CardTitle>
              <CardDescription>AI-powered insights for portfolio optimization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-green-800">Increase Constantine Coverage</h3>
                      <p className="text-sm text-green-600 mt-1">High profitability region with 76.1% margin. Consider expanding farmer acquisition.</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-yellow-800">Review Setif Pricing</h3>
                      <p className="text-sm text-yellow-600 mt-1">Low margin (24.2%) suggests need for premium adjustment or enhanced risk assessment.</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-blue-800">Optimize Premium Collection</h3>
                      <p className="text-sm text-blue-600 mt-1">Current 94.8% collection rate. Target 98% through automated reminders.</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Target className="h-5 w-5 text-purple-600 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-purple-800">New Product Development</h3>
                      <p className="text-sm text-purple-600 mt-1">Consider weather index insurance for high-risk areas to reduce claims volatility.</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default PortfolioManagement;
