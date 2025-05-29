
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
  Mail
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

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Farmer Management</h1>
          <p className="text-gray-600">Manage farmer registrations and policies</p>
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

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Farmers</p>
                <p className="text-2xl font-bold">{data.farmers.length}</p>
              </div>
              <User className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Policies</p>
                <p className="text-2xl font-bold">{data.farmers.filter(f => f.policy === 'Active').length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold">{data.farmers.filter(f => f.policy === 'Pending').length}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">High Risk</p>
                <p className="text-2xl font-bold">{data.farmers.filter(f => f.risk === 'High').length}</p>
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
          <CardDescription>Search, filter, and manage farmer registrations</CardDescription>
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
                    <TableRow>
                      <TableCell>
                        <input
                          type="checkbox"
                          checked={selectedFarmers.includes(farmer.id)}
                          onChange={() => handleSelectFarmer(farmer.id)}
                          className="rounded border-gray-300"
                        />
                      </TableCell>
                      <TableCell className="font-medium">{farmer.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1 text-gray-400" />
                          {farmer.location}
                        </div>
                      </TableCell>
                      <TableCell>{farmer.area}</TableCell>
                      <TableCell>
                        <Badge className={getRiskColor(farmer.risk)} variant="outline">
                          {farmer.risk}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(farmer.policy)} variant="outline">
                          {farmer.policy}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-gray-500">{farmer.lastUpdate}</TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setExpandedFarmer(expandedFarmer === farmer.id ? null : farmer.id)}
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          {expandedFarmer === farmer.id ? 'Hide' : 'View'}
                        </Button>
                      </TableCell>
                    </TableRow>
                    {expandedFarmer === farmer.id && (
                      <TableRow>
                        <TableCell colSpan={8}>
                          <div className="p-4 bg-gray-50 border-t">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                <h4 className="font-semibold mb-2">Contact Information</h4>
                                <div className="space-y-1 text-sm">
                                  <div className="flex items-center">
                                    <Phone className="h-3 w-3 mr-2 text-gray-400" />
                                    +213 555 {Math.floor(Math.random() * 900) + 100} {Math.floor(Math.random() * 900) + 100}
                                  </div>
                                  <div className="flex items-center">
                                    <Mail className="h-3 w-3 mr-2 text-gray-400" />
                                    {farmer.name.toLowerCase().replace(' ', '.')}@email.dz
                                  </div>
                                </div>
                              </div>
                              <div>
                                <h4 className="font-semibold mb-2">Farm Details</h4>
                                <div className="text-sm space-y-1">
                                  <p>Primary Crop: Wheat</p>
                                  <p>Total Plots: 3</p>
                                  <p>Registered: Jan 2024</p>
                                </div>
                              </div>
                              <div>
                                <h4 className="font-semibold mb-2">Policy Information</h4>
                                <div className="text-sm space-y-1">
                                  <p>Policy Type: Standard Coverage</p>
                                  <p>Premium: 15,000 DZD/year</p>
                                  <p>Renewal: Dec 2024</p>
                                </div>
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

          {/* Pagination */}
          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, filteredFarmers.length)} of {filteredFarmers.length} farmers
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
