
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getDemoInsurerData } from '@/utils/auth';
import { 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Eye, 
  Phone, 
  FileText, 
  MapPin,
  Calendar,
  DollarSign,
  Filter,
  Search,
  Download,
  Image,
  Satellite
} from 'lucide-react';

const ClaimsAlerts = () => {
  const data = getDemoInsurerData();
  const [activeTab, setActiveTab] = useState<'alerts' | 'claims'>('alerts');
  const [alertFilter, setAlertFilter] = useState('all');
  const [claimFilter, setClaimFilter] = useState('all');
  const [expandedClaim, setExpandedClaim] = useState<number | null>(null);

  const additionalClaims = [
    { id: 4, farmer: 'Youcef Hammadi', type: 'Flood Damage', amount: 28000, status: 'Under Review', date: '2024-01-15', location: 'Annaba', riskScore: 75 },
    { id: 5, farmer: 'Leila Benaissa', type: 'Crop Disease', amount: 15000, status: 'Investigating', date: '2024-01-12', location: 'Oran', riskScore: 45 },
    { id: 6, farmer: 'Rachid Boumediene', type: 'Storm Damage', amount: 38000, status: 'Approved', date: '2024-01-08', location: 'Blida', riskScore: 68 }
  ];

  const allClaims = [...data.claims, ...additionalClaims];

  const additionalAlerts = [
    { id: 4, title: 'Sensor Offline - Monitoring Issue', severity: 'medium', farmer: 'Youcef Hammadi', time: '1 hour ago', location: 'Annaba' },
    { id: 5, title: 'Crop Disease Detected - Urgent', severity: 'high', farmer: 'Leila Benaissa', time: '3 hours ago', location: 'Oran' },
    { id: 6, title: 'Policy Renewal Due', severity: 'low', farmer: 'Rachid Boumediene', time: '5 hours ago', location: 'Blida' }
  ];

  const allAlerts = [...data.alerts, ...additionalAlerts];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'Under Review': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Investigating': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Approved': return <CheckCircle className="h-4 w-4" />;
      case 'Under Review': return <Clock className="h-4 w-4" />;
      case 'Investigating': return <Eye className="h-4 w-4" />;
      case 'Rejected': return <XCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-DZ', {
      style: 'currency',
      currency: 'DZD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const filteredAlerts = allAlerts.filter(alert => 
    alertFilter === 'all' || alert.severity === alertFilter
  );

  const filteredClaims = allClaims.filter(claim => 
    claimFilter === 'all' || claim.status.toLowerCase().replace(' ', '') === claimFilter
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Claims & Alerts Management</h1>
          <p className="text-gray-600">Monitor active claims and risk notifications</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button>
            <AlertTriangle className="h-4 w-4 mr-2" />
            Create Alert
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Alerts</p>
                <p className="text-2xl font-bold text-red-600">{allAlerts.length}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Claims</p>
                <p className="text-2xl font-bold text-yellow-600">{allClaims.filter(c => c.status === 'Under Review').length}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Approved Claims</p>
                <p className="text-2xl font-bold text-green-600">{allClaims.filter(c => c.status === 'Approved').length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Claims Value</p>
                <p className="text-2xl font-bold text-blue-600">{formatCurrency(allClaims.reduce((sum, claim) => sum + claim.amount, 0))}</p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('alerts')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'alerts'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Active Alerts ({allAlerts.length})
          </button>
          <button
            onClick={() => setActiveTab('claims')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'claims'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Claims Processing ({allClaims.length})
          </button>
        </nav>
      </div>

      {/* Alerts Tab */}
      {activeTab === 'alerts' && (
        <Card>
          <CardHeader>
            <CardTitle>Active Alerts Dashboard</CardTitle>
            <CardDescription>Priority-sorted notifications requiring attention</CardDescription>
            <div className="flex space-x-4">
              <select
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={alertFilter}
                onChange={(e) => setAlertFilter(e.target.value)}
              >
                <option value="all">All Severities</option>
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredAlerts.map((alert) => (
                <div key={alert.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <AlertTriangle className="h-5 w-5 text-gray-400" />
                        <h3 className="font-medium text-gray-900">{alert.title}</h3>
                        <Badge className={getSeverityColor(alert.severity)} variant="outline">
                          {alert.severity.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          Farmer: {alert.farmer}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          Location: {alert.location || 'N/A'}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {alert.time}
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <Button size="sm" variant="outline">
                        <Eye className="h-3 w-3 mr-1" />
                        Investigate
                      </Button>
                      <Button size="sm" variant="outline">
                        <Phone className="h-3 w-3 mr-1" />
                        Contact
                      </Button>
                      <Button size="sm">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Resolve
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Claims Tab */}
      {activeTab === 'claims' && (
        <Card>
          <CardHeader>
            <CardTitle>Claims Processing Interface</CardTitle>
            <CardDescription>Manage claim submissions and validation</CardDescription>
            <div className="flex space-x-4">
              <select
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={claimFilter}
                onChange={(e) => setClaimFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="underreview">Under Review</option>
                <option value="investigating">Investigating</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredClaims.map((claim) => (
                <div key={claim.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          {getStatusIcon(claim.status)}
                          <h3 className="font-medium text-gray-900">{claim.type}</h3>
                          <Badge className={getStatusColor(claim.status)} variant="outline">
                            {claim.status}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">Farmer:</span> {claim.farmer}
                          </div>
                          <div>
                            <span className="font-medium">Amount:</span> {formatCurrency(claim.amount)}
                          </div>
                          <div>
                            <span className="font-medium">Date:</span> {claim.date}
                          </div>
                          <div>
                            <span className="font-medium">Location:</span> {claim.location || 'N/A'}
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setExpandedClaim(expandedClaim === claim.id ? null : claim.id)}
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          {expandedClaim === claim.id ? 'Hide' : 'Details'}
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Claim Details */}
                  {expandedClaim === claim.id && (
                    <div className="border-t border-gray-200 bg-gray-50 p-4">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold mb-3">Claim Information</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Policy Number:</span>
                              <span className="font-medium">POL-{claim.id.toString().padStart(6, '0')}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Risk Score at Incident:</span>
                              <span className="font-medium">{claim.riskScore || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Incident Type:</span>
                              <span className="font-medium">{claim.type}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Estimated Damage:</span>
                              <span className="font-medium">{formatCurrency(claim.amount)}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-3">Validation Tools</h4>
                          <div className="space-y-3">
                            <Button variant="outline" className="w-full justify-start">
                              <Satellite className="h-4 w-4 mr-2" />
                              View Satellite Imagery
                            </Button>
                            <Button variant="outline" className="w-full justify-start">
                              <Image className="h-4 w-4 mr-2" />
                              NDVI Analysis
                            </Button>
                            <Button variant="outline" className="w-full justify-start">
                              <Calendar className="h-4 w-4 mr-2" />
                              Weather Data Correlation
                            </Button>
                            <Button variant="outline" className="w-full justify-start">
                              <FileText className="h-4 w-4 mr-2" />
                              Historical Pattern Analysis
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-gray-200">
                        <div className="flex justify-between items-center">
                          <div className="text-sm text-gray-600">
                            Recommended Action: {claim.status === 'Under Review' ? 'Approve with conditions' : 'Complete review'}
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <XCircle className="h-3 w-3 mr-1" />
                              Reject
                            </Button>
                            <Button variant="outline" size="sm">
                              <Clock className="h-3 w-3 mr-1" />
                              Request More Info
                            </Button>
                            <Button size="sm">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Approve
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ClaimsAlerts;
