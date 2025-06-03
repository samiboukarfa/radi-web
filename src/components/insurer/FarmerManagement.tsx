
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { getDemoInsurerData } from '@/utils/auth';
import { 
  Search, 
  Filter, 
  Plus, 
  Upload, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Clock,
  MapPin,
  User,
  Phone,
  Mail,
  Award,
  BarChart3,
  AlertTriangle,
  Activity
} from 'lucide-react';

const FarmerManagement = () => {
  const data = getDemoInsurerData();
  const [searchTerm, setSearchTerm] = useState('');
  const [riskFilter, setRiskFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [selectedFarmers, setSelectedFarmers] = useState<number[]>([]);
  const [expandedFarmer, setExpandedFarmer] = useState<number | null>(null);
  const [detailView, setDetailView] = useState<number | null>(null);

  const filteredFarmers = useMemo(() => {
    return data.farmers.filter(farmer => {
      const matchesSearch = farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          farmer.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRisk = riskFilter === 'all' || farmer.risk.toLowerCase() === riskFilter.toLowerCase();
      const matchesStatus = statusFilter === 'all' || farmer.policy.toLowerCase() === statusFilter.toLowerCase();
      
      return matchesSearch && matchesRisk && matchesStatus;
    });
  }, [data.farmers, searchTerm, riskFilter, statusFilter]);

  const paginatedFarmers = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredFarmers.slice(startIndex, startIndex + pageSize);
  }, [filteredFarmers, currentPage, pageSize]);

  const totalPages = Math.ceil(filteredFarmers.length / pageSize);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800 border-green-200';
      case 'Pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Inactive': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleSelectFarmer = (farmerId: number) => {
    setSelectedFarmers(prev => 
      prev.includes(farmerId) 
        ? prev.filter(id => id !== farmerId)
        : [...prev, farmerId]
    );
  };

  const handleSelectAll = () => {
    if (selectedFarmers.length === paginatedFarmers.length) {
      setSelectedFarmers([]);
    } else {
      setSelectedFarmers(paginatedFarmers.map(farmer => farmer.id));
    }
  };

  const getFarmerDetails = (farmer: any) => {
    const baseDetails = {
      email: `${farmer.name.toLowerCase().replace(' ', '.')}@email.dz`,
      phone: `+213 555 ${Math.floor(Math.random() * 900) + 100} ${Math.floor(Math.random() * 900) + 100}`,
      primaryCrop: farmer.crop,
      totalPlots: Math.floor(Math.random() * 5) + 1,
      registered: 'Jan 2024',
      policyType: 'Standard Coverage',
      premium: '15,000 DZD/year',
      renewal: 'Dec 2024'
    };

    // Case study specific details
    if (farmer.name === 'Salem Khrobi') {
      return {
        ...baseDetails,
        email: 'salem.khrobi@olive-farms.dz',
        phone: '+213 555 234 567',
        primaryCrop: 'Olives',
        specialNotes: 'Drought monitoring case study - NDVI 0.31, successful irrigation management',
        riskFactors: ['Drought resistance', 'Soil quality monitoring', 'Irrigation efficiency'],
        achievements: ['Low risk maintenance despite drought conditions', 'RADI validation success']
      };
    }

    if (farmer.name === 'Hamza Dawdi') {
      return {
        ...baseDetails,
        email: 'hamza.dawdi@wheat-farms.dz',
        phone: '+213 555 345 678',
        primaryCrop: 'Wheat',
        specialNotes: 'Hailstorm damage case study - Successful claim processing with satellite validation',
        riskFactors: ['Weather vulnerability', 'Hail damage recovery', 'Crop reconstruction'],
        achievements: ['Rapid claim processing', 'Satellite evidence validation', 'Recovery monitoring'],
        claimHistory: 'May 2023: 45,000 DZD approved for hail damage'
      };
    }

    return baseDetails;
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Farmer Management</h1>
          <p className="text-gray-600">
            Manage farmer registrations and policies • {filteredFarmers.length} of {data.farmers.length} farmers shown
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Bulk Upload
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Register New Farmer
          </Button>
        </div>
      </div>

      {/* Enhanced Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Farmers</p>
                <p className="text-2xl font-bold">{data.farmers.length}</p>
                <p className="text-xs text-blue-600">2 Case Studies Active</p>
              </div>
              <User className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Policies</p>
                <p className="text-2xl font-bold">{data.farmers.filter(f => f.policy === 'Active').length}</p>
                <p className="text-xs text-green-600">100% validated</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold">{data.farmers.filter(f => f.policy === 'Pending').length}</p>
                <p className="text-xs text-yellow-600">Awaiting review</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">High Risk</p>
                <p className="text-2xl font-bold">{data.farmers.filter(f => f.risk === 'High').length}</p>
                <p className="text-xs text-red-600">Needs attention</p>
              </div>
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Farmer Database</CardTitle>
          <CardDescription>Search, filter, and manage farmer registrations with detailed profiles</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or location..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value)}
            >
              <option value="all">All Risk Levels</option>
              <option value="low">Low Risk</option>
              <option value="medium">Medium Risk</option>
              <option value="high">High Risk</option>
            </select>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="inactive">Inactive</option>
            </select>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
            >
              <option value={25}>25 per page</option>
              <option value={50}>50 per page</option>
              <option value={100}>100 per page</option>
            </select>
          </div>

          {/* Bulk Actions */}
          {selectedFarmers.length > 0 && (
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-blue-900">
                  {selectedFarmers.length} farmer{selectedFarmers.length !== 1 ? 's' : ''} selected
                </span>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">Send Notification</Button>
                  <Button size="sm" variant="outline">Update Policy</Button>
                  <Button size="sm" variant="outline">Export Selected</Button>
                </div>
              </div>
            </div>
          )}

          {/* Farmers Table */}
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <input
                      type="checkbox"
                      checked={selectedFarmers.length === paginatedFarmers.length && paginatedFarmers.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300"
                    />
                  </TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Area (ha)</TableHead>
                  <TableHead>Risk Level</TableHead>
                  <TableHead>Policy Status</TableHead>
                  <TableHead>Last Update</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedFarmers.map((farmer) => (
                  <React.Fragment key={farmer.id}>
                    <TableRow className="hover:bg-gray-50">
                      <TableCell>
                        <input
                          type="checkbox"
                          checked={selectedFarmers.includes(farmer.id)}
                          onChange={() => handleSelectFarmer(farmer.id)}
                          className="rounded border-gray-300"
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-2">
                          <span>{farmer.name}</span>
                          {(farmer.name === 'Salem Khrobi' || farmer.name === 'Hamza Dawdi') && (
                            <Badge variant="outline" className="text-xs border-blue-500 text-blue-700">
                              <Award className="h-3 w-3 mr-1" />
                              Case Study
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1 text-gray-400" />
                          {farmer.location}
                        </div>
                      </TableCell>
                      <TableCell>{farmer.area}</TableCell>
                      <TableCell>
                        <Badge className={getRiskColor(farmer.risk)} variant="outline">
                          {farmer.risk} ({farmer.riskScore}/10)
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(farmer.policy)} variant="outline">
                          {farmer.policy}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-gray-500">{farmer.lastUpdate}</TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setExpandedFarmer(expandedFarmer === farmer.id ? null : farmer.id)}
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            {expandedFarmer === farmer.id ? 'Hide' : 'View'}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setDetailView(detailView === farmer.id ? null : farmer.id)}
                          >
                            <BarChart3 className="h-3 w-3 mr-1" />
                            Analysis
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    {expandedFarmer === farmer.id && (
                      <TableRow>
                        <TableCell colSpan={8}>
                          <div className="p-4 bg-gray-50 border-t">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                <h4 className="font-semibold mb-2 flex items-center">
                                  <Phone className="h-4 w-4 mr-2" />
                                  Contact Information
                                </h4>
                                <div className="space-y-1 text-sm">
                                  <div className="flex items-center">
                                    <Phone className="h-3 w-3 mr-2 text-gray-400" />
                                    {getFarmerDetails(farmer).phone}
                                  </div>
                                  <div className="flex items-center">
                                    <Mail className="h-3 w-3 mr-2 text-gray-400" />
                                    {getFarmerDetails(farmer).email}
                                  </div>
                                </div>
                              </div>
                              <div>
                                <h4 className="font-semibold mb-2">Farm Details</h4>
                                <div className="text-sm space-y-1">
                                  <p>Primary Crop: {getFarmerDetails(farmer).primaryCrop}</p>
                                  <p>Total Plots: {getFarmerDetails(farmer).totalPlots}</p>
                                  <p>Registered: {getFarmerDetails(farmer).registered}</p>
                                </div>
                              </div>
                              <div>
                                <h4 className="font-semibold mb-2">Policy Information</h4>
                                <div className="text-sm space-y-1">
                                  <p>Policy Type: {getFarmerDetails(farmer).policyType}</p>
                                  <p>Premium: {getFarmerDetails(farmer).premium}</p>
                                  <p>Renewal: {getFarmerDetails(farmer).renewal}</p>
                                </div>
                              </div>
                            </div>
                            {getFarmerDetails(farmer).specialNotes && (
                              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                                <h5 className="font-semibold text-blue-900 mb-1">Case Study Notes:</h5>
                                <p className="text-sm text-blue-700">{getFarmerDetails(farmer).specialNotes}</p>
                              </div>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                    {detailView === farmer.id && (
                      <TableRow>
                        <TableCell colSpan={8}>
                          <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-t">
                            <h4 className="font-bold text-lg mb-4 flex items-center">
                              <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
                              Detailed Risk Analysis: {farmer.name}
                            </h4>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                              <div>
                                <h5 className="font-semibold mb-3 text-gray-900">Risk Factors</h5>
                                <div className="space-y-2">
                                  {getFarmerDetails(farmer).riskFactors?.map((factor, index) => (
                                    <div key={index} className="flex items-center justify-between p-2 bg-white rounded">
                                      <span className="text-sm">{factor}</span>
                                      <Badge variant="outline" className="text-xs">
                                        {farmer.risk === 'Low' ? 'Managed' : farmer.risk === 'High' ? 'Critical' : 'Monitored'}
                                      </Badge>
                                    </div>
                                  )) || (
                                    <div className="flex items-center justify-between p-2 bg-white rounded">
                                      <span className="text-sm">Standard risk assessment</span>
                                      <Badge variant="outline" className="text-xs">
                                        {farmer.risk}
                                      </Badge>
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div>
                                <h5 className="font-semibold mb-3 text-gray-900">Performance & Achievements</h5>
                                <div className="space-y-2">
                                  {getFarmerDetails(farmer).achievements?.map((achievement, index) => (
                                    <div key={index} className="flex items-center p-2 bg-green-50 rounded">
                                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                                      <span className="text-sm text-green-800">{achievement}</span>
                                    </div>
                                  )) || (
                                    <div className="flex items-center p-2 bg-blue-50 rounded">
                                      <Activity className="h-4 w-4 text-blue-600 mr-2" />
                                      <span className="text-sm text-blue-800">Standard performance tracking</span>
                                    </div>
                                  )}
                                </div>
                                {getFarmerDetails(farmer).claimHistory && (
                                  <div className="mt-4">
                                    <h6 className="font-medium text-gray-900 mb-2">Claims History</h6>
                                    <div className="p-2 bg-yellow-50 rounded border border-yellow-200">
                                      <span className="text-sm text-yellow-800">{getFarmerDetails(farmer).claimHistory}</span>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Enhanced Pagination */}
          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, filteredFarmers.length)} of {filteredFarmers.length} farmers
              {filteredFarmers.length !== data.farmers.length && (
                <span className="text-blue-600 ml-2">(filtered from {data.farmers.length} total)</span>
              )}
            </div>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const page = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                  return (
                    <PaginationItem key={page}>
                      <PaginationLink 
                        onClick={() => setCurrentPage(page)}
                        isActive={page === currentPage}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FarmerManagement;
